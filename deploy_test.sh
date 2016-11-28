#!/bin/bash

#npm run dll
#npm run  test

target_site=www@10.1.60.201
target_site_port=9830

if [ $1 = 'test01' ]; then
  target_site=www@114.215.78.9
  target_site_port=22
elif [ $1 = 'test02' ]; then
    target_site=www@114.215.78.48
    target_site_port=22
elif [ $1 = 'test' ]; then
    target_site=www@10.1.60.201
    target_site_port=9830
fi

echo $target_site

SSH="ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no -o CheckHostIP=no -o GSSAPIAuthentication=no -p ${target_site_port} ${target_site}"

rm -rf /data/work/frontend/kr-admin/*

rsync -cza --delete-before  -e "ssh -p ${target_site_port}"  ./webpack/dist/* ${target_site}:/data/work/frontend/kr-admin >/dev/null
