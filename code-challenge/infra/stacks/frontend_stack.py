
from aws_cdk import Stack
from aws_cdk import CfnOutput
from constructs import Construct
import aws_cdk.aws_s3 as s3
import aws_cdk.aws_s3_deployment as s3_deploy


import os.path as path


class FrontendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # create s3 bucket
        self.bucket = s3.Bucket(
            self,
            "ReactAppBucket",
            bucket_name="navvis-challenge-front",
            website_index_document='index.html',
            website_error_document='error.html',
            public_read_access=True
        )

        # create s3 deployment
        react_app_path = path.abspath(
            path.join(__file__, "../../../frontend/build"))
        self.deployment = s3_deploy.BucketDeployment(
            self, "DeploymentBucket",
            sources=[s3_deploy.Source.asset(react_app_path)],
            destination_bucket=self.bucket
        )

        # output bucket url
        CfnOutput(
            self,
            "BucketName",
            value=self.bucket.bucket_website_url,
        )
