#!/bin/bash

npm run build

rsync -rvltOD ./webpack/dist/* ali-krspace-web-01:/data/work/kr-node-proxy/static/
rsync -rvltOD ./webpack/dist/* ali-krspace-web-02:/data/work/kr-node-proxy/static/
