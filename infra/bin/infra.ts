#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { InfraStack } from "../lib/infra-stack";

const app = new cdk.App();
const AWS_REGION = process.env.AWS_REGION;
const AWS_CERT_ARN = process.env.AWS_CERT_ARN;
const DEPLOY_ENV = process.env.DEPLOY_ENV;
const TAG_PREFIX = process.env.TAG_PREFIX;
const DOMAIN_NAME = process.env.DOMAIN_NAME;

if (
  !AWS_CERT_ARN ||
  !AWS_REGION ||
  !DEPLOY_ENV ||
  !TAG_PREFIX ||
  !DOMAIN_NAME
) {
  throw new Error("missing environment config");
}

// tags for resources in account.
cdk.Tags.of(app).add(`${TAG_PREFIX}:product`, "five-by-six");
cdk.Tags.of(app).add(`${TAG_PREFIX}:system:name`, "five-by-six");
cdk.Tags.of(app).add(`${TAG_PREFIX}:system:environment`, DEPLOY_ENV);
cdk.Tags.of(app).add(
  `${TAG_PREFIX}:cost-allocation:business-unit`,
  "five-by-six"
);

new InfraStack(app, "InfraStack", {
  env: { region: AWS_REGION },
  stackName: `${DEPLOY_ENV}-five-by-six-stack`,
  certArn: AWS_CERT_ARN,
  deployEnvironment: DEPLOY_ENV,
  domainName: DOMAIN_NAME,
});
