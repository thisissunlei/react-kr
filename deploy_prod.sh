#!/bin/bash

npm run build

rsync -rvltOD ./build/* ali-krspace-web-01:/data/work/admin.krspace.cn/
rsync -rvltOD ./build/* ali-krspace-web-02:/data/work/admin.krspace.cn/
