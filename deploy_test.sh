#!/bin/bash

npm run dll


buildEnvDir=$1
target_site=www@10.1.60.201
target_site_port=9830


test01_ip=ali-docker-test01
test02_ip=ali-docker-test02
test03_ip=ali-docker-test03
test04_ip=ali-docker-test04

case $1 in
  

  test01 )
    target_site="www@${test01_ip}"
    target_site_port=22
    
    npm run build:test01 
  ;;

  test02 )
    target_site="www@${test02_ip}"
    target_site_port=22

    npm run  build:test02 
  ;;
  test03)
    target_site="www@${test03_ip}"
    target_site_port=22

    npm run build:test03
  ;;
  test04)
    target_site="www@${test04_ip}"
    target_site_port=22

    npm run build:test04
  ;;
  *)
  target_site=www@10.1.60.201
  target_site_port=9830

    npm run  build:test 

  ;;
esac

echo $1
echo $target_site

rsync -cza --delete-before  -e "ssh -p ${target_site_port}"  ./dist/* ${target_site}:/data/work/frontend/kr-admin/${buildEnvDir} >/dev/null
