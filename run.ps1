# run.ps1

# Check if pageIndex.json exists; if not, create it with a starting index
if (!(Test-Path -Path "./pageIndex.json")) {
    '{"currentPageIndex": 1}' | Out-File -Encoding UTF8 -FilePath "./pageIndex.json"
    Write-Output "Created pageIndex.json with a starting index of 1"
}

docker build -t discord-bot-quran-werd . --no-cache
docker stop discord-bot-quran-werd
docker rm discord-bot-quran-werd
docker run -d `
  --name discord-bot-quran-werd `
  --restart unless-stopped `
  --env-file .env `
  -v ${PWD}/logs:/app/logs `
  -v ${PWD}/pageIndex.json:/app/pageIndex.json `
  discord-bot-quran-werd
