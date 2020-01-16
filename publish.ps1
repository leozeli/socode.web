Copy-Item -Path ".\build\*" -Recurse -Destination ".\dist\" -Container -Force
Set-Location .\dist
git add .
git commit -a -m 'publish'
git push origin master
Set-Location ..