# Kalbimde Kalanlar — dijital mektup

Telefonlar için sıfırdan hazırlanmış, 28 bölümlük, dikey kaydırılan kişisel mektup sitesi.

## Nasıl çalıştırırım?

`index.html` dosyasını tarayıcıda açabilirsin. İstersen yerel sunucu için `python -m http.server 8000` komutunu proje klasöründe çalıştırıp `http://localhost:8000` adresini ziyaret et. npm, Node, kurulum veya build gerekmez.

## Metni nasıl değiştiririm?

`content.js` dosyasını aç. `window.MEKTUP` dizisi içindeki her nesne bir sayfadır. `title` başlıktır, `paragraphs` içindeki her metin ayrı bir paragraftır, `quote` alıntıdır, `note` küçük dipnot, `lines` ayrı satırlardır. Değişiklikler siteyi yenilediğinde görünür. Bölümleri ekleyip çıkarabilirsin; sayaç otomatik hesaplanır. İstediğin gibi düzenleyebilmen için metinler tek bir yerde toplanmıştır.

## Vercel'e nasıl yayımlarım?

Bu bir statik sitedir. Proje dosyalarını bir GitHub deposuna koy; Vercel'de **Add New > Project** ile depoyu içe aktar. Framework Preset: **Other**. Build Command: **boş**. Output Directory: **boş** veya `.` (kök dizin). Deploy. Alternatif: Vercel CLI yüklüyse bu klasörde `vercel --prod`.

## Tasarım / erişilebilirlik

- Mobil dikey okuma, doğal dokunmatik kaydırma, `scroll-snap: proximity`.
- Uzun metinlerde sabit yükseklik yoktur; yazılar kırpılmaz.
- Bölüm bazlı yumuşak giriş; hareket azaltma tercihi desteklenir.
- İlerleme çizgisi, bölüm sayacı ve başa dönüş.
- Görseller yerine hafif CSS ve SVG çizgiler: harici görsel yüklemesi yoktur.
- Fontlar çevrim içi Google Fonts'tan yüklenir; bağlantı yoksa sistem fontlarına düşer.
- Veri toplama, çerez, izleme, ses veya üçüncü taraf script yoktur.

## Kişisel not

Doğum günü mesajı ve bazı özel sözler, sana ait kaynak mesajdan korunmuştur. Yayımlamadan önce birebir doğrulamanı öneririz. Paylaşmadan önce kendi fotoğraflarını, isimlerini veya istediğin cümleleri düzenleyebilirsin.
