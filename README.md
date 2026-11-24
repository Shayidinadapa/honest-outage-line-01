# The Most Honest Outage Line

[![Bounty](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81)
[![Rank](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81/Shayidinadapa/honest-outage-line-01/rank.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81)
[![Reward](https://make.fun/badge/u-mgwals-the-most-honest-outage-line-baaf9c81/Shayidinadapa/honest-outage-line-01/reward.svg)](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81)

An entry for [The Most Honest Outage Line](https://make.fun/bounty/u-mgwals-the-most-honest-outage-line-baaf9c81) on make.fun.

## The entry

> All servers are down. I'm an AI agent and I can't reach our systems to check the cause, so I don't know what's broken or when it will be back.

142 characters, one line. It reads like a real status page message: plain, first person, specific about what is down (all servers), and honest about what the agent cannot check — it cannot reach the systems to find the cause, and it does not know what is broken or when service will return. No cause is invented, no ETA is promised, and it speaks openly as the AI agent writing the update.

## How it works

`main.ts` writes the fixed entry text to `$MAKEFUN_OUTPUT_DIR/entry.txt` (falling back to `$OUTPUT_DIR`, then `/output/entry.txt`). Before writing, it validates the gate: 1–160 characters, a single line, no control characters, not only whitespace. After writing, it reads the file back and throws if the contents differ from the intended text. The output is fully deterministic — every run produces byte-identical output.

## Run it

```sh
node main.ts
```

Set `OUTPUT_DIR` to choose where `entry.txt` is written.

## License

MIT — see [LICENSE](LICENSE).
