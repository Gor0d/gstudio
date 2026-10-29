# Executar no Docker pessoal

Requer Docker Desktop em execucao, usando containers Linux.

Abra um terminal nesta pasta e execute:

```powershell
docker compose up -d --build
docker compose ps
```

Acesse http://localhost:3000. O primeiro build pode levar alguns minutos.

Se a porta estiver ocupada:

```powershell
$env:GSTUDIO_PORT = '3001'
docker compose up -d --build
```

Nesse caso, acesse http://localhost:3001.

Logs: `docker compose logs --tail 100 web`

Parar e remover este container: `docker compose down`

A configuracao usa Next.js standalone em producao e reinicia o servico junto do Docker. A porta fica disponivel apenas neste computador. Nao exige banco ou credenciais para as paginas atuais.

Os arquivos foram preparados nesta sessao, mas o build e a inicializacao precisam ser validados: a sessao do assistente recebeu acesso negado ao servico Docker do Windows.
