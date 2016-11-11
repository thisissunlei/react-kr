#!/bin/bash

target_site=www@10.1.60.201

rsync -cza --delete-before  -e 'ssh -p 9830'  ./* ${target_site}:/data/work/frontend/kr-admin/ >/dev/null


