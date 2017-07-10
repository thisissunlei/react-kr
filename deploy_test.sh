#!/bin/bash

npm run dll

npm run  build 


buildEnvDir=$1
target_site=www@10.1.60.201
target_site_port=9830


test01_ip=192.168.10.2

case $1 in
  test | test00)
    target_site=www@10.1.60.201
    target_site_port=9830
  ;;

  test01 | test03 | test05)
    target_site="www@${test01_ip}"
    target_site_port=22
  ;;

  test02 | test04 | test06)
    target_site=www@114.215.78.48
    target_site_port=22
  ;;

  *)
  target_site=www@10.1.60.201
  target_site_port=9830
  ;;
esac

echo $1
echo $target_site

rsync -cza --delete-before  -e "ssh -p ${target_site_port}"  ./dist/* ${target_site}:/data/work/frontend/kr-admin/${buildEnvDir} >/dev/null
