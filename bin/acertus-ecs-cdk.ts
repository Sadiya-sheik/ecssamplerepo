#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AcertusEcsCdkStacksample } from '../lib/acertus-ecs-cdk-stack';

const app = new cdk.App();
const envUS  = { account: '665106695518', region: 'ap-south-1' };
new AcertusEcsCdkStacksample(app, 'AcertusEcsCdkStacksample', { env: envUS });
