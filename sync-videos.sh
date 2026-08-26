#!/usr/bin/env bash
# Copies the finished film loops out of the animations folder and into the site,
# and cuts a poster frame for each one.
#
# The site carries the BARE cuts (film-<verb>.mp4) rather than the shorts: the
# hero and the gallery loop, and a loop should not replay the brand sting every
# time round. The shorts, with intro and end card, are for pitches and LinkedIn.
#
# The poster is taken from near the end of the clip, on the held final frame --
# that frame is the argument, and it is what a visitor sees before pressing play
# and on any browser that will not autoplay.
set -euo pipefail
cd "$(dirname "$0")"
SRC=../marketing/animations
OUT=assets/video
mkdir -p "$OUT"

for name in validation trace absent ask deploy; do
  src="$SRC/film-$name.mp4"
  [ -f "$src" ] || { echo "  missing $src -- run $SRC/build.sh"; continue; }
  cp "$src" "$OUT/film-$name.mp4"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  at=$(python3 -c "print(max(0, $dur - 1.2))")
  ffmpeg -loglevel error -y -ss "$at" -i "$src" -frames:v 1 -q:v 4 "$OUT/poster-$name.jpg"
  printf '  %-11s %6sKB video  %5sKB poster\n' "$name" \
    "$(( $(stat -c%s "$OUT/film-$name.mp4") / 1024 ))" \
    "$(( $(stat -c%s "$OUT/poster-$name.jpg") / 1024 ))"
done
