#!/bin/sh
pm2 stop guestabot
git reset --hard
git pull
export LASTPULLID=$(git log --format="%H" -n 1) | awk '{print substr($0,0,5)}'
sed -i "1 i\var lastID=\"$LASTPULLID\";" guestabot.js
pm2 restart guestabot
