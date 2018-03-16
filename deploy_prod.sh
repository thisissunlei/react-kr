#!/bin/bash

npm run build


if [ $1 = 'prod01' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-01:/data/work/kr-admin-new/

elif [ $1 = 'prod02' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-02:/data/work/kr-admin-new/

elif [ $1 = 'all' ]; then

rsync -rvltOD ./dist/* ali-krspace-web-01:/data/work/kr-admin-new/
rsync -rvltOD ./dist/* ali-krspace-web-02:/data/work/kr-admin-new/

fi
