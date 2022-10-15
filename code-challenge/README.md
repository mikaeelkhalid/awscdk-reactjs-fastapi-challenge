# NAVVIS CODE CHALLENGE

[![Mikaeel Khalid](https://badgen.now.sh/badge/by/mikaeelkhalid/purple)](https://github.com/mikaeelkhalid)

## Project Structure

```
> backend-api (python api)
> docker (docker-compose file)
> frontend (react.js app)
> infra (aws cdk code in python)
```

## How To Run Locally

```
~ cd docker
~ docker-compose up
```

## Resulted Endpoints

You'll get thses endpoints

```
Frontend: http://127.0.0.1:3000
Backend: http://127.0.0.1:8000
Backend with swagger: http://127.0.0.1:8000/docs
```

## AWS Fargate ALB and React.js Endpoints

```
Frontend: http://navvis-challenge-front.s3-website-us-east-1.amazonaws.com
Backend: http://navvi-navvi-1jkhkbgh3j750-1498965141.us-east-1.elb.amazonaws.com
Backend with swagger: http://navvi-navvi-1jkhkbgh3j750-1498965141.us-east-1.elb.amazonaws.com/docs
```

