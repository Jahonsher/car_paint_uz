# CarPaint mazmuni va foto manbalari

2026-10-16 kuni manba sayt Chrome orqali tekshirildi. Asosiy manba:
https://car-paint-uz.vercel.app/

| Sahifa | Tasdiqlangan mazmun | Yangi dizaynda qo‘llanishi |
| --- | --- | --- |
| `/` | Avtomobil bo‘yoqlari va laklari; 2018; PPG, DUXONE, AKRiPOL, Polaron, Orbay, Befar, Henkel, Axalta, CST; 1600 mahsulot, 500+ rang; elastiklik va tez qurish | Bosh sahifa, kompaniya, assortiment va afzalliklar |
| `/about` | Orbay: avtota’mirlash va sanoat bo‘yoqlari, yordamchi mahsulotlar, izolyatsion mastikalar; Axalta: qoplamalar; CST: metall uchun bo‘yoqlar | Alohida brend tavsiflari; ishlab chiqaruvchilarning faoliyati CarPaint xizmati sifatida ko‘rsatilmaydi |
| `/product` | Avtomobil bo‘yoqlari va laklarini tanlash/sotib olish platformasi; qidiruv, kategoriya, brend, sahifalash | API katalogi, qidiruv, filtrlar, mahsulot tafsilotlari |
| `/news` | Kompaniya/mahsulot yangiliklari sahifasi | Faqat API orqali kelgan yozuvlar; bo‘sh/xato holati alohida |
| `/contact` | +998 90 955 75 55; info@carpaint.uz; Toshkent, Yangihayot tumani; mavjud Google Maps embed; ism/email/telefon maydonlari | Barcha sahifalarda yagona kontaktlar; xarita va email ilovasiga yo‘naltiruvchi murojaat maydonlari |

Saytda RU/UZ/EN tanlovlari mavjud. Tekshiruvda ijtimoiy tarmoq havolalari, savat yoki onlayn to‘lov topilmadi. Tasdiqlanmagan manzil tafsilotlari va ijtimoiy havolalar qo‘shilmadi.

Katalog va yangiliklar ma’lumotlari tekshiruv vaqtida ko‘rinmadi. Joriy mahsulotlar ro‘yxati, narx, mavjudlik va dinamik kategoriya nomlari mustaqil tasdiqlanmadi. Mahalliy suratlar API katalogi yozuvi yoki ombor qoldig‘i sifatida ishlatilmaydi.

Bo‘yash, kuzov ta’miri va detailing xizmatlari tasdiqlanmadi. Auditoriyaning ustalar va ustaxonalardan iboratligi mahsulotlardan chiqarilgan xulosa, tasdiqlangan mijozlar ro‘yxati emas. Soxta sharh, kafolat, sertifikat yoki narx yaratilmagan. 30 daqiqalik qurish da’vosi barcha mahsulot uchun kafolat sifatida berilmaydi.

Mahalliy eski koddagi `jasur03@gmail.com`, boshqa telefon raqami, Bali manzili, `Lorem ipsum`, mexanik servis matnlari va `30 000 so‘m` narxi manba tasdig‘i bo‘lmagani uchun faol sahifalarga ko‘chirilmagan.

## `public/images` rasmlari

34 ta fayl vizual kontakt varag‘ida ko‘rildi: `artifacts/source-image-contact-sheet.jpg`. O‘lchamlar: `artifacts/source-image-manifest.json`. Ayrim `_w (1)` suratlari bir xil kompozitsiyaning dublikatlari.

| Faylning oxirgi qismi (`photo_532823988989769…`) | Ko‘rinadigan mazmun | Vazifa |
| --- | --- | --- |
| `2512_w.jpg` | Dexin Car paint juft ko‘k idishlari | Hero; bo‘yoq mahsuloti, xizmat jarayoni emas |
| `2505_y.jpg` | Daybond 440 Polyester Putty qadoqlari | Tayyorlash materiallari; fotogalereya |
| `2496_w.jpg` | Daybond 445 1K Acrylic Primer javoni | Kompaniya/assortiment; fotogalereya |
| `2504_w.jpg` | Coloron 2K Acrylic Topcoat idishi | Bo‘yoqlar scroll bosqichi; fotogalereya |
| `2510_w.jpg` | Dexin Car paint idishi | Fotogalereya |
| `2482_w.jpg` | Daybond 458 2K Acrylic Hardener idishi | Yordamchi mahsulotlar scroll bosqichi |
| `2486_w.jpg` | Daybond 220 Plastic Primer idishi | Fotogalereya |

Nomlar qadoqlarda o‘qiladigan yorliqlardan olingan. Daybond, Coloron va Dexin nomlarining fotosuratlarda bo‘lishi rasmiy hamkorlikni tasdiqlamaydi; ular manbadagi hamkor brendlar ro‘yxatiga qo‘shilmadi.

2026-10-23: tanlangan 7 surat asosida `imagegen` yordamida shaffof fonli mahsulot
cutoutlari tayyorlandi (`src/assets/products/`). Tokchalar, devorlar, LED chiziqlar
va chetdagi begona qadoqlar olib tashlandi. Qadoqning asosiy brendi, raqami va
ko‘rinishi manba bilan solishtirildi. Bu AI yordamida tahrirlangan mahsulot tasvirlari;
texnik tavsifning manbasi sifatida qadoq maketidan foydalanilmaydi.

`scripts/optimize-showroom.cjs` PNG cutoutlardan shaffof WebP variantlari va
`src/assets/showroom.json` yaratadi, eskirgan derivativlarni tozalaydi. 7 ta asl
namuna surat kelajakda tekshirish uchun saqlandi. Boshqa ishlatilmagan 27 ta surat,
eski `src/images` va `src/assets/automotive` rasmlari, keraksiz brand mahsulot nusxalari
va takroriy logotiplar o‘chirildi. Faol `logo-light.png` saqlandi.

Tekshiruv artefaktlari: `artifacts/source-site-audit.json` va `artifacts/source-{home,about,product,news,contact}.png`.
