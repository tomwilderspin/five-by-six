import * as cdk from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution, OriginAccessIdentity, PriceClass } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface InfraStackProps extends cdk.StackProps {
  certArn: string;
  domainName: string;
  deployEnvironment?: string;
  
}
// basic stack for static serving.
export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);
    const { certArn, domainName, deployEnvironment = 'dev' } = props;

    const webBucket = new Bucket(this, 'WebBucket', {
      accessControl: BucketAccessControl.PRIVATE,
      bucketName: `${deployEnvironment}-five-by-six`,
    });

    const originAccessId = new OriginAccessIdentity(this, 'webOriginAccessId');
    webBucket.grantRead(originAccessId);

    const webDistro = new Distribution(this, 'webDistro', {
      domainNames: [domainName],
      certificate: Certificate.fromCertificateArn(this, 'CertArn', certArn),
      priceClass: PriceClass.PRICE_CLASS_100,
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(webBucket, { originAccessIdentity: originAccessId }),
      },
    });
    new cdk.CfnOutput(this, 'distroDomain', { value: webDistro.domainName });
  }
}
