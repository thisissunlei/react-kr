#!/bin/bash

npm run build

rsync -cza --delete-before  -e 'ssh -p 9830'  ./build/* krspace01:/data/work/kr-admin >/dev/null

