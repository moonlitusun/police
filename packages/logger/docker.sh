#!/bin/bash

image_name="${JOB_NAME/\//@}"
image_name=$(echo "$image_name" | sed 's/\//-/g')
image_name=$(echo "$image_name" | sed 's/web-teams/web_teams/g')
image_name="${image_name/\@//}"
image_name=$(echo "$image_name" | tr '[:upper:]' '[:lower:]')
_container_port=80

if [ "$container_port" ]; then
  _container_port=$container_port
fi

echo "modified_JOB_NAME=${image_name}"

docker pull "develop.dztec.net:50243/$image_name"
C_NAME=${image_name##*/}
docker rm -f "$C_NAME"
docker run --restart=always --name "$C_NAME" -p "$deploy_port:$_container_port" -d "develop.dztec.net:50243/$image_name"
