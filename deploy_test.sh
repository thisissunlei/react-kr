#!/bin/bash

npm run  build 

target_site=www@10.1.60.201

rsync -cza --delete-before  -e 'ssh -p 9830'  ./build/* ${target_site}:/data/work/frontend/kr-node-proxy/static/

