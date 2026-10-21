const clone = value => JSON.parse(JSON.stringify(value));
const linearColor = hex => hex.match(/[a-f\d]{2}/gi).map(value => {
  const channel = parseInt(value, 16) / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
});

export function makePaintMaterial(original, hex, finish = 'gloss') {
  const material = clone(original);
  if (hex) material.channels.AlbedoPBR.color = linearColor(hex);
  const satin = finish === 'satin';
  if (material.channels.RoughnessPBR?.enable) {
    material.channels.RoughnessPBR.factor = satin ? 0.45 : 0.2;
  } else {
    material.channels.GlossinessPBR.enable = true;
    material.channels.GlossinessPBR.factor = satin ? 0.55 : 0.8;
  }
  // A dielectric varnish above the base coat creates automotive reflections.
  material.channels.ClearCoat = { ...material.channels.ClearCoat, enable: true, factor: satin ? 0.35 : 0.85, thickness: 1, reflectivity: 0.5 };
  material.channels.ClearCoatRoughness = { ...material.channels.ClearCoatRoughness, enable: true, factor: satin ? 0.3 : 0.12 };
  return material;
}

const call = (api, method, ...args) => new Promise((resolve, reject) => {
  api[method](...args, (error, value) => error ? reject(error) : resolve(value));
});

export async function preparePaintViewer(api, vehicle, isCurrent = () => true) {
  api.setBackground({ color: [0.065, 0.08, 0.105] });
  // Keep each author's HDR map; tune its intensity rather than replacing it.
  api.setEnvironment({ exposure: 1, rotation: 0.65, lightIntensity: 1, shadowEnabled: true });
  if (vehicle.upAxis !== '-y') return;
  const node = await call(api, 'getRootMatrixNode');
  if (!isCurrent()) return;
  const matrix = await call(api, 'getMatrix', node);
  if (!isCurrent()) return;
  const camera = await call(api, 'getCameraLookAt');
  if (!isCurrent()) return;
  const local = matrix.local || matrix;
  // Rotate -90° around X: the source's -Y up becomes the viewer's +Z up.
  // Multiply the existing matrix so scale and translations remain intact.
  const upright = [];
  for (let column = 0; column < 4; column++) {
    const i = column * 4;
    upright.push(local[i], local[i + 2], -local[i + 1], local[i + 3]);
  }
  await call(api, 'setMatrix', node, upright);
  if (!isCurrent()) return;
  const target = [camera.target[0], camera.target[2], -camera.target[1]];
  const distance = Math.hypot(...camera.position.map((value, i) => value - camera.target[i]));
  const direction = [0.48, -0.6, 0.26];
  await call(api, 'setCameraLookAt', target.map((value, i) => value + distance * direction[i]), target, 0);
}
