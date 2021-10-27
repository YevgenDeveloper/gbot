#!/bin/sh
pm2 stop guestabot
git reset --hard
git pull
export LASTPULLID=$(git log --format="%H" -n 1)
sed -i "1 i\var lastID=\"$LASTPULLID\";" guestabot.js
pm2 restart guestabot
