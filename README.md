# Kalbimde Kalanlar — son düzeltme

Bu sürüm bir önceki 28 bölümlük mektup içeriğini korur. İşaretlenen üst yazılar, yan yazı, büyük başlangıç kapağı ve “Okumaya başla” düğmesi kaldırılmıştır. Site doğrudan ilk mektupla açılır. Sayfanın kaydırması tarayıcının kendi doğal kaydırmasıdır; hem mobil parmak hareketi hem fare tekerleği ve klavye çalışır.

## GitHub / Vercel

1. ZIP’i açın ve **ZIP içindeki dosyaları** GitHub deponuzun ana dizinine yükleyin. Eski `index.html`, `style.css`, `app.js`, `content.js`, `vercel.json`, `package.json`, `README.md` dosyalarını yenileriyle değiştirin, `build.mjs` dosyasını ekleyin.
2. Vercel GitHub `main` dalından otomatik yeni deployment başlatır. Mevcut proje Vite olduğu için ayarı değiştirmek zorunda değilsiniz.
3. Vercel Build Command: `npm run build`, Output Directory: `dist`. `vercel.json` bunları tanımlar.
4. Mektup metinlerini `content.js` içinden değiştirin. İçerik 28 bölümün tamamını içerir.

Yerelde test için Node.js 18+ ile `npm run build` çalıştırın; oluşan `dist/` klasörünü herhangi bir statik sunucuda açabilirsiniz.

Önemli: GitHub deposu public ise, mektup içeriği kaynak dosyalarında başkaları tarafından görülebilir.
