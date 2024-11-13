#!/bin/bash

# Check if pageIndex.json exists; if not, create it with a starting index
if [ ! -f "./pageIndex.json" ]; then
    echo '{"currentPageIndex": 1}' > "./pageIndex.json"
    echo "Created pageIndex.json with a starting index of 1"
fi

docker build -t discord-bot-quran-werd . --no-cache
docker stop discord-bot-quran-werd
docker rm discord-bot-quran-werd
docker run -d \
  --name discord-bot-quran-werd \
  --restart unless-stopped \
  --env-file .env \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/pageIndex.json:/app/pageIndex.json \
  discord-bot-quran-werd
