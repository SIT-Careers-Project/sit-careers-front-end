#!/bin/bash

echo Build images..
docker build -t 192479299400.dkr.ecr.ap-southeast-1.amazonaws.com/sit-careers:fe-dev -f docker/app/Dockerfile.dev .
docker build -t 192479299400.dkr.ecr.ap-southeast-1.amazonaws.com/sit-careers:fe-nginx-dev -f docker/nginx/Dockerfile .

echo Push images..
docker push 192479299400.dkr.ecr.ap-southeast-1.amazonaws.com/sit-careers:fe-nginx-dev
docker push 192479299400.dkr.ecr.ap-southeast-1.amazonaws.com/sit-careers:fe-dev
