#!/usr/bin/env bash

if [[ $# -eq 0 ]] ; then
    echo 'Missing NODE_ENV, APP_ENV, and APP_TYPE parameters'
    exit 0
fi

if [[ $# -eq 1 ]] ; then
    echo 'Missing APP_ENV, and APP_TYPE parameters'
    exit 0
fi

if [[ $# -eq 2 ]] ; then
    echo 'Missing APP_TYPE parameter'
    exit 0
fi

rm -rf ./build
rm -rf ./dist
mkdir dist
NODE_ENV=$1 APP_ENV=$2 APP_TYPE=$3 ./node_modules/webpack/bin/webpack.js

zip -r dist/build-frontend-$3 build
