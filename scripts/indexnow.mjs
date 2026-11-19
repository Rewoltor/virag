// Submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver...). Run after each deploy:
//   node scripts/indexnow.mjs [https://virag-nine.vercel.app]
const site = (process.argv[2] || "https://virag-nine.vercel.app").replace(/\/$/, "");
const key = "404d9ee7367697127e8a0e1a16c44d40"; // also served at /404d9ee7367697127e8a0e1a16c44d40.txt
const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
