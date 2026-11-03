#!/bin/bash
# 브라우저 동시 2개 제한(세마포어)
exec 9>/home/claude/work/lockA
if ! flock -n 9; then exec 9>/home/claude/work/lockB; flock 9; fi
cd "$(dirname "$0")" && NODE_PATH=$(npm root -g) timeout 900 node t.js "$@"
