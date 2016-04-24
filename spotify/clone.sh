#!/usr/bin/env bash

if [[ $# -eq 0 ]]; then
  echo "Invalid parameters. Expecting ./clone.sh [destination] [project-name]"
  exit 1
fi

if [[ -d $1 ]]; then
  echo "Destination $1 already exists"
  exit 1
fi

echo "Copying files to $1"
rsync -av --exclude='node_modules' --exclude='.git' --exclude="clone.sh" ./ $1

echo "Configuring $2"
sed -i "" s/%DEV_API_HOST%/$2.vm/g "$1/config/development.js"
sed -i "" s/%PRODUCTION_API_HOST%/api.$2.com/g "$1/config/production.js"
sed -i "" s/%PRODUCTION_APP_HOST%/$2.com/g "$1/config/production.js"
sed -i "" s/%QA_API_HOST%/$2-qa.$QA_HOST/g "$1/config/ci.js"
sed -i "" s/%QA_API_HOST%/$2-qa.$QA_HOST/g "$1/config/qa.js"
