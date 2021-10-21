#!/bin/sh
git pull
export LASTPULLID=$(git log --format="%H" -n 1)
sed -i '1 i\var lastID="$LASTPULLID";' guestabot.js
