// Renders RoundU ad creatives: PNG for feed ads, frame-exact MP4 for stories.
// usage: node marketing/ads/render.js marketing/ads/ads.html marketing/ads/export [id ...] [--preview]
// needs `npm i -D playwright` and ffmpeg on PATH; set CHROME_PATH to use an existing Chromium.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const [, , htmlPath, outDir, ...rest] = process.argv;
const preview = rest.includes('--preview');
const only = rest.filter((a) => !a.startsWith('--'));
const FEED = ['feed-leak', 'feed-verified', 'feed-price', 'feed-pro'];
const STORY = ['story-doorstep', 'story-track', 'story-pro'];
const FPS = 30, SECONDS = 11;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const ids = only.length ? only : [...FEED, ...STORY];
  for (const id of ids) {
    const story = id.startsWith('story');
    const page = await browser.newPage({ viewport: { width: 1080, height: story ? 1920 : 1350 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.resolve(htmlPath)).href + '?ad=' + id, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const el = page.locator('#' + id);
    if (!story) {
      await el.screenshot({ path: path.join(outDir, id + '.png') });
      console.log('png', id);
    } else {
      const seek = (t) => page.evaluate((ms) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms; }), t);
      if (preview) {
        for (const t of [1, 3.5, 6, 8.5, 10.5]) { await seek(t * 1000); await el.screenshot({ path: path.join(outDir, `${id}@${t}.png`) }); }
        console.log('preview', id);
      } else {
        const fdir = path.join(outDir, '_frames_' + id);
        fs.mkdirSync(fdir, { recursive: true });
        for (let f = 0; f < FPS * SECONDS; f++) {
          await seek((f / FPS) * 1000);
          await el.screenshot({ path: path.join(fdir, String(f).padStart(4, '0') + '.png') });
        }
        execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(fdir, '%04d.png'),
          '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', path.join(outDir, id + '.mp4')]);
        fs.rmSync(fdir, { recursive: true, force: true });
        console.log('mp4', id);
      }
    }
    await page.close();
  }
  await browser.close();
})();
