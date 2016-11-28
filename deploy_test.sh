#!/bin/bash

#npm run dll
#npm run  test

target_site=www@10.1.60.201

if [ $1 = 'test01' ]; then
  target_site=www@114.215.78.9
elif [ $1 = 'test02' ]; then
    target_site=www@114.215.78.48
elif [ $1 = 'test' ]; then
    target_site=www@10.1.60.201
fi

echo $target_site

rsync -cza --delete-before  -e 'ssh -p 9830'  ./webpack/dist/* ${target_site}:/data/work/frontend/kr-admin/
