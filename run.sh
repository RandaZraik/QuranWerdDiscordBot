#!/bin/bash
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
