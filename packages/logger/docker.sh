#!/bin/bash

# Use jenkins job name as image name
image_name="${JOB_NAME/\//@}"
image_name=$(echo "$image_name" | sed 's/\//-/g')
image_name="${image_name/\@//}"

echo "BUILD_VERSION = $BUILD_VERSION"
echo "image_name = $image_name"
version="${BUILD_VERSION}"

registry_url="develop.dztec.net:50243"

full_name="${registry_url}/${image_name}:${version}"
latest_name="${registry_url}/${image_name}:latest"

echo "---------------------"
echo "start to build images"
docker build . -t $full_name
docker push $full_name
docker tag $full_name $latest_name
docker push $latest_name

echo "---------------------"
echo "start clean images"
docker rmi $full_name
docker rmi $latest_name

echo "---------------------"
echo "build and push docker image success!"

