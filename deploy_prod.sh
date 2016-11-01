#!/bin/bash

npm run build

rsync -rvltOD ./build/* ali-krspace-web-01:/data/work/kr-node-proxy/static/
rsync -rvltOD ./build/* ali-krspace-web-02:/data/work/kr-node-proxy/static/
