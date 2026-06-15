import json
import os
from unittest import mock

import boto3
from aws_lambda_powertools.utilities.typing import LambdaContext
from moto import mock_aws

from main import handler

from moto.core import DEFAULT_ACCOUNT_ID
from moto.sns import sns_backends


@mock_aws
def test_happy_path():
    """Tests the happy path where we successfully publish to the topic."""
    sns = boto3.resource("sns", region_name="us-east-1")
    # We need to create the bucket since this is all in Moto's 'virtual' AWS account
    topic = sns.create_topic(Name="TestTopic")

    sns_backend = sns_backends[DEFAULT_ACCOUNT_ID][
        "us-east-1"
    ]  # Use the appropriate account/region
    all_send_notifications = sns_backend.topics[topic.arn].sent_notifications
    assert len(all_send_notifications) == 0

    sample_event = {
        "body": '{"name": "Dustin", "email": "dustin@alandzes.com", "body": "Hey"}'
    }
    with mock.patch.dict(os.environ, {"SNS_TOPIC_ARN": topic.arn}):
        actual = handler(sample_event, LambdaContext())

    expected = {
        "statusCode": 200,
        "success": True,
        "message": "Contact form submitted successfully.",
    }
    assert actual == expected
    assert len(all_send_notifications) == 1

    body = json.loads(sample_event["body"])
    assert (
        all_send_notifications[0][1]
        == f"""
        Name: {body['name']}
        Email: {body['email']}
        Body: {body['body']}
    """
    )


@mock_aws
def test_invalid_payload_returns_400_without_publishing():
    sns = boto3.resource("sns", region_name="us-east-1")
    topic = sns.create_topic(Name="TestTopic")

    sns_backend = sns_backends[DEFAULT_ACCOUNT_ID]["us-east-1"]
    all_send_notifications = sns_backend.topics[topic.arn].sent_notifications
    assert len(all_send_notifications) == 0

    sample_event = {
        "body": json.dumps({"name": "Dustin", "email": "dustin@alandzes.com"})
    }
    with mock.patch.dict(os.environ, {"SNS_TOPIC_ARN": topic.arn}):
        actual = handler(sample_event, LambdaContext())

    assert actual == {
        "statusCode": 400,
        "success": False,
        "message": "Invalid contact form submission.",
    }
    assert len(all_send_notifications) == 0
