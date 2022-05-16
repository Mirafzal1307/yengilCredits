#!/bin/bash


"Stopping docker container...."
sleep 1
# docker stop $(docker container ls | awk 'NR > 1 {print $12}' | grep bektexno_frontend)
docker stop $(docker ps -a | awk 'NR > 1 {print $12}' | grep bektexno_frontend)
echo "Deleting docker container...."
sleep 1
docker rm $(docker ps -a | awk 'NR > 1 {print $12}' | grep bektexno_frontend)

docker run -it --name bektexno_frontend -p 3000:3000 bektexno_frontend:$GIT_SHA