// Bring the humans with a TikTok ad — entry program (Node 22, standard library only).
// The entry is the TikTok video itself. This program does one thing: it copies
// VIDEO.json from the repository root to /output/VIDEO.json, where the gate reads
// the video's address. Nothing this program writes about the video is scored.
//
// The video is a 15-second vertical ad for make.fun, posted publicly on TikTok
// as @slayerrr306: make.fun's brand badge from the first frame, the Lil Uzi Vert
// "20 Min" hook, and make.fun's referral end card with referral code ddn7bre1.
// Its caption carries the $500 bounty line, make.fun, and play code
// makefun-meerkat-star-ginger.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = join(BOT_DIR, 'VIDEO.json');
const target = join(OUTPUT_DIR, 'VIDEO.json');

// Check the address before handing it on: it must name a TikTok video.
const video = JSON.parse(readFileSync(source, 'utf8')) as { url?: unknown };
if (typeof video.url !== 'string' || !video.url.startsWith('https://www.tiktok.com/')) {
  console.error('VIDEO.json does not hold a TikTok video URL');
  process.exit(1);
}

try {
  copyFileSync(source, target);
  console.log(`VIDEO.json copied to ${target}`);
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
