#!/bin/bash

# Check if an argument was provided
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please provide an MP4 file path."
    exit 1
fi

# The input file
INPUT=$1

# Check if the input file exists
if [ ! -f "$INPUT" ]; then
    echo "The file '$INPUT' does not exist."
    exit 1
fi

# Extract the base name
BASENAME=$(basename -- "$INPUT")
BASENAME="${BASENAME%.*}"

# The output file
OUTPUT="${BASENAME}.gif"

# Convert MP4 to GIF using ffmpeg
ffmpeg -i "$INPUT" -vf "fps=24,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "$OUTPUT"

echo "Conversion complete: $OUTPUT"
