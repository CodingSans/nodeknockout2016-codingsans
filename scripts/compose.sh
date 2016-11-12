#!/bin/bash
TAG=${NODE_ENV:-develop}
BUILD=${BUILD_ALWAYS:-true}

getClean() {
	for i in $(docker ps -a -q);
	do
		docker rm $i > /dev/null 2>&1
	done
}

getImagesClean() {
	for i in  $(docker images -a | grep "^<none>" | awk '{print $3}')
	do
		docker rmi $i > /dev/null 2>&1
	done
}

makeClean() {
	getClean
	getImagesClean
  return 0
}

builder() {
  echo "Building dstruct:$TAG"
  rocker build . && rocker-compose run .
}

rocker-compose rm
echo "Looking for dstruct:$TAG"
docker images | grep dstruct | grep $TAG
if [ $? -eq 0 ]; then
  echo "Dstruct image found"
  if [ $BUILD -ne "false"]; then
    echo "Rebuilding image"
    echo "If you dont want to rebuild, export BUILD_ALWAYS=false"
    builder
    makeClean
    return 0
  fi
  echo "No rebuild initiated"
  rocker-compose run .
else
  builder
fi
makeClean
