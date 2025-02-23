#!/bin/bash

# Create fonts directory if it doesn't exist
mkdir -p src/fonts

# Download MonaCode font
curl -L "https://github.com/mona-sans/mona-code/raw/main/fonts/woff2/MonaCode-Regular.woff2" -o src/fonts/MonaCode-Regular.woff2

echo "Fonts downloaded successfully!"
