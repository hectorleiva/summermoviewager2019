# Serverless Scrapping

## Pre-requisite
```
node --version # 8.10.0 - required to be exact to match the same behavior on AWS

npm install
```

Serverless framework: https://serverless.com/framework/docs/getting-started/

```
npm install -g serverless
```

## Environment Variables

A `env.yml` is required within this directory to be able to run the [Serverless](https://serverless.com/) service

The following enviornment variables are required:
```
    globalSchedule: # The cron expression of how often the lambda should trigger. Be nice and don't trigger this more than once a day
    S3_BUCKET_NAME: # The name of the S3 bucket that is created for containing the data generated from the lambda function
    SUMMER_MOVIE_FILE_NAME: # The name of the JSON file that is generated
    SUMMER_MOVIE_PAGE: # The location of where the lambda function should scrap for data
```

## Test locally

Uncomment out the following:
```
    events:
      - schedule: ${self:custom.globalSchedule}
      # - http:
      #     path: /
      #     method: get
```

from the `serverless.yml` file in order to be able to test locally. This is not required when deploying to an AWS instance.

You are able to to test this locally to ensure that it is working as expected by running the following command:
```
serverless offline
```

and then performing a curl to `http://localhost:3000` - this will act as if there was a request to the API Gateway which will then trigger the lambda.

## Deploy to AWS

This guide: https://serverless.com/framework/docs/providers/aws/guide/quick-start/ - offers insight on how to deploy to AWS. It involves creating a specific AWS account with IAM permissions and ensuring you have a terminal that has the variables required to deploy to AWS.