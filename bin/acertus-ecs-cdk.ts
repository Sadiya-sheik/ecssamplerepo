#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AcertusEcsCdkStacksample } from '../lib/acertus-ecs-cdk-stack';

const app = new cdk.App();
new AcertusEcsCdkStacksample(app, 'AcertusEcsCdkStacksample');
