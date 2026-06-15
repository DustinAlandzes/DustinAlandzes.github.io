import json
import os
from json import JSONDecodeError
from typing import Any, NotRequired, TypedDict

import boto3
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEvent
from aws_lambda_powertools.utilities.typing import LambdaContext
from mypy_boto3_sns.service_resource import SNSServiceResource
from pydantic import BaseModel, ValidationError


class ContactFormSubmission(BaseModel):
    name: str
    email: str
    body: str


class Response(TypedDict):
    statusCode: int
    success: bool
    message: NotRequired[str]


def handler(event: dict[str, Any], context: LambdaContext) -> Response:
    """Accepts input from a contact form and publishes it to an SNS topic.
    https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sns.html
    https://docs.aws.amazon.com/sns/
    https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic

    see: main.tf for sns topic details
    """
    del context
    event = APIGatewayProxyEvent(event)

    try:
        submission = ContactFormSubmission.model_validate_json(event.body or "{}")
    except (JSONDecodeError, ValidationError):
        return {
            "statusCode": 400,
            "success": False,
            "message": "Invalid contact form submission.",
        }

    sns_topic_arn = os.environ.get("SNS_TOPIC_ARN")
    if not sns_topic_arn:
        return {
            "statusCode": 500,
            "success": False,
            "message": "Contact form is not configured.",
        }

    sns: SNSServiceResource = boto3.resource("sns", region_name="us-east-1")
    topic: sns.Topic = sns.Topic(sns_topic_arn)
    topic.publish(
        Message=f"""
        Name: {submission.name}
        Email: {submission.email}
        Body: {submission.body}
    """
    )

    # if everything goes well, return a 200 status and success: true
    return {
        "statusCode": 200,
        "success": True,
        "message": "Contact form submitted successfully.",
    }
