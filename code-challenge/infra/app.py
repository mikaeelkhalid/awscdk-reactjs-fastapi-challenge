#!/usr/bin/env python3
import os

import aws_cdk as cdk

from stacks.fargate_stack import FargateStack
from stacks.frontend_stack import FrontendStack


app = cdk.App()
FargateStack(app, "NavvisChallengeFargateStack")
FrontendStack(app, "NavvisChallengeFrontendStack")

app.synth()
