
from aws_cdk import Stack
from aws_cdk import CfnOutput
from constructs import Construct
import aws_cdk.aws_ec2 as ec2
import aws_cdk.aws_ecs as ecs
import aws_cdk.aws_ecs_patterns as ecs_patterns


import os.path as path


class FargateStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Creating VPC
        self.vpc = ec2.Vpc(self, "NavvisChallengeVPC", max_azs=2)

        # Creating Fargate Cluster
        self.ecs_cluster = ecs.Cluster(
            self,
            "NavvisChallengeCluster",
            vpc=self.vpc,
        )

        # Adding Dockerfile path to Fargate Service
        docker_file_path = path.abspath(
            path.join(__file__, "../../../backend-api"))
        docker_image = ecs_patterns.ApplicationLoadBalancedTaskImageOptions(
            image=ecs.ContainerImage.from_asset(
                directory=docker_file_path,
            )
        )

        # Creating Fargate Service with Application Load Balancer
        self.ecs_service = ecs_patterns.ApplicationLoadBalancedFargateService(
            self,
            "NavvisChallengeService",
            cluster=self.ecs_cluster,
            cpu=256,
            memory_limit_mib=512,
            desired_count=1,
            task_image_options=docker_image,
        )

        # Output url
        CfnOutput(
            self,
            "FargateLoadBalancerDNS",
            value=self.ecs_service.load_balancer.load_balancer_dns_name,
        )
