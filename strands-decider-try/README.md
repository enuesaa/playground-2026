# Strands Decider

- strands-lab の jev みたいなモデル
- コマンドを実行したらモデルのダウンロードが始まって、そのあと回答がかえる

```bash
$ uv run strands-decider ask StrandsAgents/strands-decider-2B-hobson-v19 --state "ERROR 2026-11-28T03:12:44Z db-primary: connection pool exhausted (max=100, active=100, waiting=312). Latency p99 jumped from 80ms to 9s." --choice "Which component is the likely cause?=database,network,application,cache" --noul "Should an on-call engineer be paged right now?" --score "How severe is this incident?=low,medium,high,critical"
noul_0 noul = 0.702
choice_0 -> database (confidence 0.900)
    database                 0.925
    network                  0.029
    application              0.026
    cache                    0.020
score_0 score = 2.04 (confidence 0.415)
    0: low                                      0.112
    1: medium                                   0.153
    2: high                                     0.317
    3: critical                                 0.418
```

## Links
- https://github.com/strands-labs/strands-decider
