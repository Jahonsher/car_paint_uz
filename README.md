# CarPaint

React 18 + Create React App (`react-scripts` 5) loyihasi. Stek almashtirilmagan.
Tekshirishda Node.js 24.21.0 ishlatilgan.

## Lokal ishga tushirish

```sh
npm install
npm run dev
```

Standart manzil: http://localhost:3000. `npm start` ham mavjud.
Terminalda server ko‘rsatgan manzilni oching; `Ctrl+C` serverni to‘xtatadi.
PowerShell `npm.ps1`ni bloklasa, `npm.cmd install` va `npm.cmd run dev` ishlating.

## Environment

`.env` majburiy emas: API manzili uchun kodda ommaviy standart qiymat mavjud.
O‘zgartirish kerak bo‘lsa, `.env.example`dan `.env` nusxasini yarating:

```powershell
Copy-Item .env.example .env
```

- `REACT_APP_API_URL`: API bazaviy manzili. Standart: `https://server.carpaint.uz/api/v1`.
- `PORT`: ixtiyoriy lokal port; standart `3000`.

Environment o‘zgarsa, dev serverni qayta ishga tushiring. CRA `REACT_APP_*`
qiymatlarini brauzerga chiqaradi; ularga maxfiy token, parol yoki server kaliti yozmang.
Frontend uchun yetishmayotgan majburiy maxfiy qiymat yo‘q. API ishlamasa, katalog
xato holatini ko‘rsatadi; fotogalereya va kontaktlar mustaqil ishlaydi. Joriy
assortiment va narxlarni tekshirish uchun haqiqiy API ishlashi kerak.

## Tekshirish

```sh
npm run build
npm run preview
```

Production ko‘rinishi: http://127.0.0.1:4173.

```sh
npm test -- --watchAll=false --runInBand src/utils/storage.test.js
npm run test:e2e
```

E2E testdan oldin `npm run build` bajaring. Playwright konfiguratsiyasi lokal
Chrome brauzeridan (`channel: chrome`) foydalanadi. Chrome o‘rnatilgan bo‘lishi kerak.
Testlar API javoblarini mock qiladi; ular jonli narxlar yoki ombor qoldig‘ini tasdiqlamaydi.

Ishlab turgan dev serverni sinash uchun (PowerShell):

```powershell
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:3000'
npm.cmd run test:e2e
```

`PLAYWRIGHT_BASE_URL` faqat test vositasiga tegishli; frontend uchun majburiy emas.

## Rasmlar va mazmun

`public/images` ichida ishlatiladigan 7 ta asl namuna surat saqlanadi. Ularning
foni ajratilgan PNG variantlari `src/assets/products/`da, saytda ochiladigan
shaffof WebP variantlari `public/images/optimized/`da. Ularni ignore qilmang.
Responsive WebP fayllarini qayta yaratish (PNG shaffofligi tekshiriladi):

```sh
node scripts/optimize-showroom.cjs
```

Bosh sahifadagi mahsulotlar scroll bilan almashadigan sticky sahnada ko‘rsatiladi.
Fotogalereya touch, trackpad, klaviatura va strelka tugmalari bilan suriladigan
qatorga aylantirilgan. Harakatni kamaytirish yoqilsa sticky sahna oddiy kartochkalarga
o‘tadi va silliq surilish o‘chadi. Keraksiz eski rasmlar va dublikatlar olib tashlangan.

Mazmun va fotosuratlar manbalari: [COMPANY-SOURCES.md](src/assets/COMPANY-SOURCES.md).
Murojaat maydonlari foydalanuvchining email ilovasida xat tayyorlaydi; avtomatik
server orqali yuborish yoki to‘lov xizmati ulanmagan.

## Rang studiyasi

Bosh sahifadagi `#paint-studio` jami 14 ta 3D modelni Sketchfab Viewer API orqali
ko‘rsatadi: Cobalt LTZ, Tracker 2, Onix, Gentra, Nexia 1, Nexia 2, Spark,
Damas, Malibu, Captiva, Equinox, Orlando, Kia K5 va Tahoe. Internet va WebGL kerak;
SDK yoki model ochilmasa, xabar va qayta yuklash tugmasi ko‘rsatiladi.
Model ko‘rinish maydoniga yaqinlashgandagina yuklanadi. API kaliti talab qilinmaydi.

Manba: [Chevrolet Cobalt LTZ — uzb_rx7](https://sketchfab.com/3d-models/chevrolet-cobalt-ltz-6bbacfcb4c224acda978f5ee74554b58),
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Model uchinchi tomon serveridan ochiladi; lokal GLB fayli loyihaga kiritilmagan.
Muallif va litsenziya tanlangan modelga qarab studiya ostida yangilanadi.
Har bir modelning tekshirilgan alohida kuzov materialida rang va yaltiroqlik
o‘zgartiriladi; boshqa materiallar saqlanadi. Qoplama modeldagi faol roughness
yoki glossiness kanaliga qo‘llanadi. 14 model ro‘yxati ichida alohida scroll bor;
faqat tanlangan model yuklanadi.
Oldin tugmasi asl materialni tiklaydi. 32 ta tayyor rang, erkin rang tanlagich,
HEX kod kiritish, gloss/satin va vizual sepish effekti bor. Noto‘g‘ri HEX kod
kiritilganda bo‘yash bloklanadi; avvalgi natija va uni solishtirish saqlanadi.
Kuzovda alohida clear-coat lak qatlami, HDR yoritish va qoramtir studiya foni ishlatiladi.
Nexia 1’ning manbadagi −Y yuqori o‘qi +Z ga aylantiriladi: avtomobil
tik turadi va odatiy orbital aylantirish bilan boshqariladi. Bu tuzatish model
yuklanganda bajariladi, kamera boshlang‘ich animatsiyasi shu modelda o‘chirilgan.
Bu muallif tayyorlagan model; komplektatsiya va rang haqiqiy avtomobildan farq qilishi mumkin.

Tekshirilgan modellar, manbalar va mualliflar `src/data/paintVehicles.js`da.
Qo‘shimcha modellar: [Tracker 2 — UZBEK 3D](https://sketchfab.com/3d-models/chevrolet-tracker-2-11af5e8331e742238e4c5fb121960df6),
[Onix — uzb_rx7](https://sketchfab.com/3d-models/chevrolet-onix-bfd798c2695847b28ab681d42abc7056),
[Gentra — uzb_rx7](https://sketchfab.com/3d-models/gentra-99f158337e2741ac9af2848675f9128a).
Barchasi CC BY 4.0. Model almashganda oldingi bo‘yash jarayoni bekor qilinadi,
natija tozalanadi; tanlangan rang va qoplama keyingi bo‘yash uchun saqlanadi.
Yangi modelni qo‘shishdan oldin uning geometriyasi, litsenziyasi va alohida kuzov
materiali tekshirilishi kerak.
Harakatni kamaytirish sozlamasi yoqilganda natija animatsiyasiz ko‘rsatiladi.
Yangi modellar haqiqiy Viewer API orqali ochilib, kuzovga rang berib tekshirildi.
Kuzatilgan materiallar `tests/fixtures/paint-vehicles.json`da; testlar barcha 14
modelni tanlash, qoplama, muallif havolalari va asl rangni tiklashni tekshiradi.
Qayta tekshirish vositasi: `node scripts/inspect-paint-models.cjs preview UID:MATERIAL`.
Tekshiruv rasmlari va metama’lumotlari gitga kiritilmaydigan `artifacts/paint-models/`ga yoziladi.

## GitHub

Loyiha repozitoriysi: https://github.com/Jahonsher/car_paint_uz.
`node_modules`, build va test natijalari, lokal sozlamalar hamda maxfiy fayllar
`.gitignore` orqali repozitoriydan chiqarilgan. `.env.example` saqlanadi.
