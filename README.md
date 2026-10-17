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

`public/images` ichidagi asl rasmlar va `public/images/optimized` variantlari
repositoryda saqlanadi. Ularni ignore qilmang. Responsive WebP fayllarini qayta yaratish:

```sh
node scripts/optimize-showroom.cjs
```

Mazmun va fotosuratlar manbalari: [COMPANY-SOURCES.md](src/assets/COMPANY-SOURCES.md).
Murojaat maydonlari foydalanuvchining email ilovasida xat tayyorlaydi; avtomatik
server orqali yuborish yoki to‘lov xizmati ulanmagan.

## GitHub

Loyiha repozitoriysi: https://github.com/Jahonsher/car_paint_uz.
`node_modules`, build va test natijalari, lokal sozlamalar hamda maxfiy fayllar
`.gitignore` orqali repozitoriydan chiqarilgan. `.env.example` saqlanadi.
