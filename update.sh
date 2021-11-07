#!/bin/sh
pm2 stop guestabot
git checkout guestabot.js
git checkout config.json
git checkout package.json
git pull
npm i
export LASTPULLID=$(git log --format="%H" -n 1) | awk '{print substr($0,0,5)}'
sed -i "1 i\var lastID=\"$LASTPULLID\";" guestabot.js
pm2 restart guestabot
