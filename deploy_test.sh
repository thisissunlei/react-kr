#!/bin/bash

npm run build

rsync -rvltOD ./build/* krspace01:/data/work/kr-admin

