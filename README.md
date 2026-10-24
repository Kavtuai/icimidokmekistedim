# Kalbimde Kalanlar
Sıfırdan tasarlanmış, mobil öncelikli, tam ekran kaydırmalı dijital mektup.

## İçerik düzenleme
`content.js` dosyasındaki `chapters` dizisini düzenle. `title` alanında `<i>...</i>` vurgulu yazı için kullanılabilir; `\n` satır sonudur. `body`, `tag`, `highlight`, `footer` alanlarını değiştirebilirsin. Son sayfanın sözünü `kind: 'ending'` bölümündeki `body` alanından değiştir.

## Vercel (en kolay yöntem)
Bu klasörü GitHub deposuna yükle, Vercel'de **Import Project** de. Framework Preset: **Other**. Build Command: **boş** (override kapalı). Output Directory: **.**. Site statik HTML/CSS/JS olarak çalışır, npm kurulumu gerektirmez.

## Yerelde çalıştırma
`index.html` dosyasını tarayıcıda aç. İstersen `python -m http.server 8080` komutuyla da çalıştırabilirsin.

## Özellikler
10 tam ekran bölüm, scroll-snap, mobil safe-area, ilerleme çubuğu, klavye gezinmesi, erişilebilir yardım penceresi, reduced-motion, internetten yüklenen Google Fonts (internet yoksa serif/sans fallback).
