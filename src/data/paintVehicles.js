// Each model uses its own verified body material; keep source credits with the asset.
export const paintVehicles = [{
  id: 'cobalt', name: 'Cobalt LTZ', label: 'Chevrolet Cobalt LTZ', brand: 'Chevrolet',
  uid: '6bbacfcb4c224acda978f5ee74554b58', paintMaterial: 'primary',
  source: 'https://sketchfab.com/3d-models/chevrolet-cobalt-ltz-6bbacfcb4c224acda978f5ee74554b58',
  author: 'uzb_rx7', authorUrl: 'https://sketchfab.com/uzbek_supra',
  license: 'https://creativecommons.org/licenses/by/4.0/',
}, {
  id: 'tracker', name: 'Tracker', label: 'Chevrolet Tracker 2', brand: 'Chevrolet',
  uid: '11af5e8331e742238e4c5fb121960df6', paintMaterial: 'ID986',
  source: 'https://sketchfab.com/3d-models/chevrolet-tracker-2-11af5e8331e742238e4c5fb121960df6',
  author: 'UZBEK 3D', authorUrl: 'https://sketchfab.com/Uzbek3D',
  license: 'https://creativecommons.org/licenses/by/4.0/',
}, {
  id: 'onix', name: 'Onix', label: 'Chevrolet Onix', brand: 'Chevrolet',
  uid: 'bfd798c2695847b28ab681d42abc7056', paintMaterial: 'primary',
  source: 'https://sketchfab.com/3d-models/chevrolet-onix-bfd798c2695847b28ab681d42abc7056',
  author: 'uzb_rx7', authorUrl: 'https://sketchfab.com/uzbek_supra',
  license: 'https://creativecommons.org/licenses/by/4.0/',
}, {
  id: 'gentra', name: 'Gentra', label: 'Chevrolet Gentra', brand: 'Chevrolet',
  uid: '99f158337e2741ac9af2848675f9128a', paintMaterial: 'primary',
  source: 'https://sketchfab.com/3d-models/gentra-99f158337e2741ac9af2848675f9128a',
  author: 'uzb_rx7', authorUrl: 'https://sketchfab.com/uzbek_supra',
  license: 'https://creativecommons.org/licenses/by/4.0/',
}, ...[
  ['nexia1', 'Nexia 1', 'Daewoo', 'da4b8f0266304991a8d45955b96cb3cf', 'daewoo--nexia--sedan-1996', 'carpaint', 'UZBEK 3D', 'Uzbek3D'],
  ['nexia2', 'Nexia 2', 'Daewoo', '7356a1413a384f7f8290ddfbdee11a7f', 'nexia-2', 'carpaint', 'uzb_rx7', 'uzbek_supra'],
  ['spark', 'Spark', 'Chevrolet', 'eb18b11b97834da295fc170b39fd2a84', 'chevrolet-spark-2013', 'body', 'UZBEK 3D', 'Uzbek3D'],
  ['damas', 'Damas', 'Daewoo', 'd08929608f2343a8b93650cca33110fd', 'daewoo--damas-2012', 'carpaint', 'UZBEK 3D', 'Uzbek3D'],
  ['malibu', 'Malibu', 'Chevrolet', 'a155e069dbf84db0b3454ba313d0e79f', 'chevrolet-malibu-2022', 'malibupaint', 'Glory Hunter', 'Glory_Hunter'],
  ['captiva', 'Captiva', 'Chevrolet', 'a26600f16c544a15886dfa6ad1877622', 'chevrolet-captiva-4', 'carpaint', 'UZBEK 3D', 'Uzbek3D'],
  ['equinox', 'Equinox', 'Chevrolet', 'f9b935582076423790864ee5a66d0178', 'chevrolet-equinox', 'carpaint.071', 'Nieve5677', 'niev'],
  ['orlando', 'Orlando', 'Chevrolet', '39023a9e79d14a0b881a4c12bce4ddcd', 'chevrolet-orlando-2011', 'carpaint', 'Q.SARDOR', 'qsardor57913'],
  ['kia-k5', 'K5', 'Kia', '1fa025db826442f18db0401757f5695a', 'kia-k5-2025', 'secondary_3', 'UZBEK 3D', 'Uzbek3D'],
  ['tahoe', 'Tahoe', 'Chevrolet', '8248b851dc9646bb8e2da175846d28d0', '2010-chevrolet-tahoe', 'carpaint.106', 'Nieve5677', 'niev'],
].map(([id, name, brand, uid, slug, paintMaterial, author, username]) => ({
  id, name, label: `${brand} ${name}`, brand, uid, paintMaterial,
  upAxis: id === 'nexia1' ? '-y' : 'z',
  source: `https://sketchfab.com/3d-models/${slug}-${uid}`,
  author, authorUrl: `https://sketchfab.com/${username}`,
  license: 'https://creativecommons.org/licenses/by/4.0/',
}))];
export const defaultVehicle = paintVehicles[0];
export const getPaintVehicle = id => paintVehicles.find(vehicle => vehicle.id === id) || defaultVehicle;
