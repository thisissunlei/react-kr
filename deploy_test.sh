#!/bin/bash

npm run dll


buildEnvDir=$1
target_site=www@10.1.60.201
target_site_port=9830


test01_ip=ali-docker-test01
test02_ip=ali-docker-test02
test03_ip=ali-docker-test03

case $1 in
  test | test00)
    target_site=www@10.6.60.201
    target_site_port=9830

    npm run  build:test 
  ;;

  test01 | test03 | test05)
    target_site="www@${test01_ip}"
    target_site_port=22

    npm run  build:test01 
  ;;

  test02 | test04 | test06)
    target_site="www@${test02_ip}"
    target_site_port=22

    npm run  build:test02 
  ;;
  test07)
    target_site="www@${test03_ip}"
    target_site_port=22

    npm run  build:test03
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
