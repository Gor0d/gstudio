$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
docker compose up -d --build
if ($LASTEXITCODE -ne 0) { throw 'Falha ao iniciar. Confira se o Docker Desktop esta em execucao com containers Linux.' }
docker compose ps
Write-Host 'Acesse http://localhost:3000 (ou a porta definida em GSTUDIO_PORT).'
