import * as cdk from "@aws-cdk/core";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecr from "@aws-cdk/aws-ecr";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
import * as route53 from "@aws-cdk/aws-route53";
import * as route53targets from "@aws-cdk/aws-route53-targets";
import * as certificatemanager from "@aws-cdk/aws-certificatemanager";
import * as cloudfront from "@aws-cdk/aws-cloudfront";

import * as elasticloadbalancing from "@aws-cdk/aws-elasticloadbalancingv2";
/*
interface ECSStackProps extends cdk.StackProps {
  clientName: string;
  environment: string;
  domain: string;
  taskEnv: { [key: string]: string } | undefined;
  vpcId: string;
}

/**
 * EXAMPLE ECS
 *
 * A full provisioned ECS deployment setup
 *
 * Creates all ECS resources from docker containers through to domain configuration
 *
 */
export class AcertusEcsCdkStackfinal extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //const routecertificate = certificatemanager.Certificate.fromCertificateArn(this, "certificate", "arn:aws:acm:ap-south-1:665106695518:certificate/d55e09cc-f9e7-4b8e-9c69-0d85bcd24436");
    const repository = ecr.Repository.fromRepositoryArn(this, "repository", 'arn:aws:ecr:ap-south-1:665106695518:repository/adminui1');
    //const cloudfronturl = cloudfront.fromLookup("arn:aws:cloudfront::850805969385:distribution/E3SXCGGDWS0B0P");
    const clientPrefix = "ADMINUI-final";

    /*const vpc = ec2.Vpc.fromLookup(this, `${clientPrefix}-vpc`, {
      vpcId: "vpc-01e4c6262e955743a",
    });*/
    
    // New VPC creation
    const adminvpc = new ec2.Vpc(this, `${clientPrefix}-vpc`, {
      maxAzs: 2,
      cidr: "10.0.0.0/16",
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'adminpublicsub',
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          cidrMask: 24,
          name: 'adminpriivatesub',
          subnetType: ec2.SubnetType.PRIVATE
        }]

    });

    // The code that defines your stack goes here
    const cluster = new ecs.Cluster(this, `${clientPrefix}-cluster`, {
      clusterName: `${clientPrefix}-cluster`,
      vpc: adminvpc,
    });

    // load balancer resources
    const elb = new elasticloadbalancing.ApplicationLoadBalancer(
      this,
      `${clientPrefix}-elb`,
      {
        vpc: adminvpc,
        vpcSubnets: { subnets: adminvpc.publicSubnets },
        internetFacing: true,
      }
    );
/*
    const zone = route53.HostedZone.fromLookup(this, `${clientPrefix}-zone`, {
      domainName: props.domain,
    });

    new route53.ARecord(this, `${clientPrefix}-domain`, {
      recordName: `${
        props.environment !== "production" ? `${props.environment}-` : ""
      }api.${props.domain}`,
      target: route53.RecordTarget.fromAlias(
        new route53targets.LoadBalancerTarget(elb)
      ),
      ttl: cdk.Duration.seconds(300),
      comment: `${props.environment} API domain`,
      zone: zone,
    }); */

    const targetGroupHttp = new elasticloadbalancing.ApplicationTargetGroup(
      this,
      `${clientPrefix}-target`,
      {
        port: 80,
        vpc:adminvpc,
        protocol: elasticloadbalancing.ApplicationProtocol.HTTP,
        targetType: elasticloadbalancing.TargetType.IP,
      }
    );

    targetGroupHttp.configureHealthCheck({
      path: "/api/status",
      protocol: elasticloadbalancing.Protocol.HTTP,
    });

   /* const cert = new certificatemanager.Certificate(
      this,
      `${clientPrefix}-cert`,
      {
        domainName: props.domain,
        subjectAlternativeNames: [`*.${props.domain}`],
        validation: certificatemanager.CertificateValidation.fromDns(zone),
      }
    );*/
    const listener = elb.addListener("Listener", {
      open: true,
      port: 80
      //certificates: [cert],
    });

    listener.addTargetGroups(`${clientPrefix}-tg`, {
      targetGroups: [targetGroupHttp],
    });

    const elbSG = new ec2.SecurityGroup(this, `${clientPrefix}-elbSG`, {
      vpc:adminvpc,
      allowAllOutbound: true,
    });

    elbSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allow https traffic"
    );

    elb.addSecurityGroup(elbSG);

    //Admin s3 bucket
    const bucket = new s3.Bucket(this, `${clientPrefix}-s3-bucket`, {
      bucketName: `adminuifinal-assets`,
    });



    //task role for the task definition to add access to other resources
    const taskRole = new iam.Role(this, `${clientPrefix}-task-role`, {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
      roleName: `${clientPrefix}-task-role`,
      description: "Role that the api task definitions use to run the api code",
    });

    taskRole.attachInlinePolicy(
      new iam.Policy(this, `${clientPrefix}-task-policy`, {
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["S3:*"],
            resources: [bucket.bucketArn],
          }),
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["dynamodb:*"],
            resources: ["*"],
          }),
        ],
      })
    );

    const taskDefinition = new ecs.TaskDefinition(
      this,
      `${clientPrefix}-task`,
      {
        family: `${clientPrefix}-task`,
        compatibility: ecs.Compatibility.EC2_AND_FARGATE,
        cpu: "256",
        memoryMiB: "512",
        networkMode: ecs.NetworkMode.AWS_VPC,
        taskRole: taskRole,
      }
    );

    const image = ecs.RepositoryImage.fromEcrRepository(repository, "latest");

    const container = taskDefinition.addContainer(`${clientPrefix}-container`, {
      image: image,
      memoryLimitMiB: 512,
      logging: ecs.LogDriver.awsLogs({ streamPrefix: clientPrefix }),
    });

    container.addPortMappings({ containerPort: 8080 });

    const ecsSG = new ec2.SecurityGroup(this, `${clientPrefix}-ecsSG`, {
      vpc: adminvpc,
      allowAllOutbound: true,
    });

    ecsSG.connections.allowFrom(
      elbSG,
      ec2.Port.allTcp(),
      "Application load balancer"
    );

    const service = new ecs.FargateService(this, `${clientPrefix}-service`, {
      cluster,
      desiredCount: 2,
      taskDefinition,
      securityGroups: [ecsSG],
      assignPublicIp: false,
    });

    service.attachToApplicationTargetGroup(targetGroupHttp);

    const scalableTaget = service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 5,
    });

    scalableTaget.scaleOnMemoryUtilization(`${clientPrefix}-ScaleUpMem`, {
      targetUtilizationPercent: 75,
    });

    scalableTaget.scaleOnCpuUtilization(`${clientPrefix}-ScaleUpCPU`, {
      targetUtilizationPercent: 75,
    });
/*
    // outputs to be used in code deployments
    new cdk.CfnOutput(this, `${props.environment}ServiceName`, {
      exportName: `${props.environment}ServiceName`,
      value: service.serviceName,
    });

    new cdk.CfnOutput(this, `${props.environment}ImageRepositoryUri`, {
      exportName: `${props.environment}ImageRepositoryUri`,
      value: repository.repositoryUri,
    });

    new cdk.CfnOutput(this, `${props.environment}ImageName`, {
      exportName: `${props.environment}ImageName`,
      value: image.imageName,
    });

    new cdk.CfnOutput(this, `${props.environment}ClusterName`, {
      exportName: `${props.environment}ClusterName`,
      value: cluster.clusterName,
    });*/
  }
}
