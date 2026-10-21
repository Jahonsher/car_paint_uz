const paintStudio = {
  uz: {
    eyebrow: 'INTERAKTIV RANG STUDIYASI', title: 'Avval ko‘ring. Keyin tanlang.',
    intro: 'Avtomobil modelini tanlang, rangni sinab ko‘ring va yangi ko‘rinishni tasavvur qiling.',
    model: 'Avtomobil modeli', brand: 'Avtomobil brendi', color: 'Kuzov rangi',
    colors: ['Qizil', 'Okean ko‘k', 'Zumrad', 'Grafit', 'Marvarid oq', 'Kumush', 'Shampan', 'Binafsha', 'Qora', 'Sof oq', 'Po‘lat kulrang', 'To‘q kulrang', 'Tungi ko‘k', 'Osmon ko‘k', 'Feruza', 'To‘q yashil', 'Zaytun', 'Shalfey', 'Bordo', 'Olcha', 'Mis', 'To‘q sariq', 'Sariq', 'Oltin', 'Shokolad', 'Mokka', 'Qum', 'Pushti oltin', 'To‘q binafsha', 'Lavanda', 'Pushti', 'Ko‘kimtir kulrang'],
    customColor: 'Istalgan rang', hexColor: 'Rang kodi (HEX)', invalidHex: '6 ta belgi kiriting, masalan: #2165B0.',
    finish: 'Qoplama', gloss: 'Yaltiroq', satin: 'Satin', apply: 'Rangni qo‘llash', again: 'Qayta bo‘yash',
    ready: 'Rang tanlang va bo‘yashni boshlang', painting: 'Rang sepilmoqda…', done: 'Yangi ko‘rinish tayyor',
    before: 'Oldin', after: 'Natija', compare: 'Ko‘rinishni solishtirish', reset: 'Qayta boshlash',
    selected: 'Tanlangan rang', preview: 'Avtomobil rangining ko‘rgazmali maketi',
    note: 'Bu modelga moslashtirilgan soddalashtirilgan maket. Ekrandagi rang va yaltiroqlik haqiqiy qoplamadan farq qilishi mumkin. Yakuniy rangni bo‘yoq namunasi orqali tanlang.',
    ask: 'Shu rang haqida so‘rash', studio: 'Rangni sinab ko‘rish',
  },
  ru: {
    eyebrow: 'ИНТЕРАКТИВНАЯ СТУДИЯ ЦВЕТА', title: 'Сначала примерьте цвет.',
    intro: 'Выберите модель автомобиля, попробуйте цвет и оцените новый образ.',
    model: 'Модель автомобиля', brand: 'Марка автомобиля', color: 'Цвет кузова',
    colors: ['Красный', 'Океанский синий', 'Изумрудный', 'Графит', 'Жемчужный белый', 'Серебристый', 'Шампань', 'Фиолетовый', 'Чёрный', 'Чистый белый', 'Стальной серый', 'Тёмно-серый', 'Ночной синий', 'Небесный', 'Бирюзовый', 'Тёмно-зелёный', 'Оливковый', 'Шалфей', 'Бордовый', 'Вишнёвый', 'Медный', 'Оранжевый', 'Жёлтый', 'Золотой', 'Шоколадный', 'Мокко', 'Песочный', 'Розовое золото', 'Тёмно-фиолетовый', 'Лавандовый', 'Розовый', 'Серо-синий'],
    customColor: 'Любой цвет', hexColor: 'Код цвета (HEX)', invalidHex: 'Введите 6 символов, например: #2165B0.',
    finish: 'Покрытие', gloss: 'Глянцевое', satin: 'Сатиновое', apply: 'Нанести цвет', again: 'Покрасить снова',
    ready: 'Выберите цвет и начните покраску', painting: 'Наносим цвет…', done: 'Новый образ готов',
    before: 'До', after: 'Результат', compare: 'Сравнение цвета', reset: 'Начать заново',
    selected: 'Выбранный цвет', preview: 'Иллюстрация цвета автомобиля',
    note: 'Это упрощённая иллюстрация выбранной модели. Цвет и блеск на экране могут отличаться от реального покрытия. Выбирайте окончательный цвет по образцу краски.',
    ask: 'Спросить об этом цвете', studio: 'Примерить цвет',
  },
  en: {
    eyebrow: 'INTERACTIVE COLOR STUDIO', title: 'See it. Then choose it.',
    intro: 'Choose a vehicle model, try a color and explore a new look for your car.',
    model: 'Vehicle model', brand: 'Vehicle brand', color: 'Body color',
    colors: ['Racing red', 'Ocean blue', 'Emerald', 'Graphite', 'Pearl white', 'Silver', 'Champagne', 'Violet', 'Jet black', 'Pure white', 'Steel grey', 'Charcoal', 'Midnight blue', 'Sky blue', 'Teal', 'Forest green', 'Olive', 'Sage', 'Burgundy', 'Cherry', 'Copper', 'Orange', 'Yellow', 'Gold', 'Chocolate', 'Mocha', 'Sand', 'Rose gold', 'Deep purple', 'Lavender', 'Rose', 'Slate blue'],
    customColor: 'Custom color', hexColor: 'Color code (HEX)', invalidHex: 'Enter 6 hex digits, for example: #2165B0.',
    finish: 'Finish', gloss: 'Gloss', satin: 'Satin', apply: 'Apply color', again: 'Paint again',
    ready: 'Choose a color and start painting', painting: 'Applying color…', done: 'Your new look is ready',
    before: 'Before', after: 'Result', compare: 'Compare the finish', reset: 'Start over',
    selected: 'Selected color', preview: 'Illustrated vehicle color preview',
    note: 'This is a simplified illustration of the selected model. Screen color and gloss may differ from the real finish. Choose your final color using a physical paint sample.',
    ask: 'Ask about this color', studio: 'Try a color',
  },
};

Object.assign(paintStudio.uz, {
  intro: '14 ta avtomobil modelidan birini tanlang, 360° aylantiring va kuzov rangini sinab ko‘ring.',
  loading: '3D model yuklanmoqda…', loadError: '3D modelni yuklab bo‘lmadi',
  network: 'Model Sketchfab orqali ochiladi. Internet aloqasi kerak.', retry: 'Qayta yuklash',
  controls: 'Aylantirish: barmoq yoki sichqoncha bilan torting. Yaqinlashtirish: ikki barmoq yoki ikki marta bosing.',
  moreModels: 'Modelni tanlang va uning rangini 3D ko‘rinishda sinab ko‘ring.',
  paintError: 'Rangni qo‘llab bo‘lmadi. Qayta urinib ko‘ring.', modified: 'Rang va qoplama interaktiv o‘zgartiriladi',
  note: 'Mualliflar yaratgan 3D modellar. Komplektatsiya sizning avtomobilingizdan farq qilishi mumkin. Ekrandagi rangni haqiqiy bo‘yoq namunasi bilan tekshiring.',
});
Object.assign(paintStudio.ru, {
  intro: 'Выберите одну из 14 моделей, вращайте её на 360° и меняйте цвет кузова.',
  loading: 'Загружаем 3D-модель…', loadError: 'Не удалось загрузить 3D-модель',
  network: 'Модель открывается через Sketchfab. Нужен интернет.', retry: 'Загрузить снова',
  controls: 'Вращение: перетаскивайте пальцем или мышью. Приближение: два пальца или двойное нажатие.',
  moreModels: 'Выберите модель и попробуйте новый цвет в 3D.',
  paintError: 'Не удалось применить цвет. Попробуйте снова.', modified: 'Интерактивное изменение цвета и покрытия',
  note: 'Авторские 3D-модели. Комплектация может отличаться от вашего автомобиля. Проверяйте цвет по настоящему образцу краски.',
});
Object.assign(paintStudio.en, {
  intro: 'Choose from 14 vehicle models, rotate your car through 360° and try a new body color.',
  loading: 'Loading 3D model…', loadError: 'Unable to load the 3D model',
  network: 'The model loads through Sketchfab. An internet connection is required.', retry: 'Try again',
  controls: 'Rotate: drag with a finger or mouse. Zoom: pinch or double-click.',
  moreModels: 'Select a model and explore its new color in 3D.',
  paintError: 'Unable to apply the color. Please try again.', modified: 'Interactive color and finish changes',
  note: 'Artist-created 3D models. Trim details may differ from your vehicle. Check the screen color against a physical paint sample.',
});

export default paintStudio;
