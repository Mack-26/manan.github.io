#!/bin/sh
# Crops real app screens out of the HRMS case-study deck (1920x1080 pt pages, rendered at 144 dpi).
# Crop boxes are page-point coordinates (x y width height), doubled for the 2x render.
set -e
PDF="public/artifacts/hrms-casestudy.pdf"
OUT="public/projects/hrms/screens"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

crop() { # name page x y w h
  pdftoppm -r 144 -f "$2" -l "$2" -png "$PDF" "$TMP/p$2"
  src="$(ls "$TMP"/p"$2"*.png | head -1)"
  sips --cropOffset $(( $4 * 2 )) $(( $3 * 2 )) -c $(( $6 * 2 )) $(( $5 * 2 )) "$src" --out "$TMP/$1.png" >/dev/null
  sips -s format jpeg -s formatOptions 80 -Z 1100 "$TMP/$1.png" --out "$OUT/$1.jpg" >/dev/null
}

crop home 16 629 274 315 684
crop selfie 14 1013 259 347 738
crop clockin-v2 15 892 170 350 832
crop notifications 17 1238 235 328 698
crop calendar 19 1013 262 327 696
crop selfie-v1-flow 14 165 245 1590 760
rm -rf "$TMP"
ls -la "$OUT"
