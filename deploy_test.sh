#!/bin/bash
target=${1:7}

npm run  build:$target

if [ $target = 'test' ] || [ $target = 'test4' ]; then
  server='03'
elif [ $target = 'test2' ] || [ $target = 'test3' ]; then
  server='02'
elif [ $target = 'dev' ]; then
  server='04'
fi

# rsync -rvltOD ./dist/* "dev$server:/data/work/frontend/$target/36kr/space/dist"