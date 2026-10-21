const { test, expect } = require('@playwright/test');
// Body materials observed in the real viewers, independent of the application catalog.
const vehicleFixtures = require('./fixtures/paint-vehicles.json');
const sdk = `window.Sketchfab = function(version, frame) {
  this.init = function(uid, options) {
    window.viewerUid = uid;
    window.viewerOptions = options;
    const tracker = uid === '11af5e8331e742238e4c5fb121960df6';
    const fixture = ${JSON.stringify(vehicleFixtures)}.find(model=>model.uid===uid);
    const body = fixture ? structuredClone(fixture.material) : {name:tracker?'ID986':'primary',stateSetID:10,channels:{AlbedoPBR:{color:[1,1,1]},GlossinessPBR:{factor:0.7785},RoughnessPBR:{enable:tracker,factor:1}}};
    let ready;
    options.success({addEventListener(name, cb){ready=cb},start(){setTimeout(()=>ready(),20)},stop(){},
      setBackground(value){window.studioBackground=value},setEnvironment(value){window.studioEnvironment=value},
      getRootMatrixNode(cb){window.orientationModels=[...(window.orientationModels||[]),uid];cb(window.failOrientation?'unavailable':null,900)},
      getMatrix(id,cb){cb(null,{local:{0:1,1:0,2:0,3:0,4:0,5:1,6:0,7:0,8:0,9:0,10:1,11:0,12:0,13:0,14:0,15:1}})},
      setMatrix(id,matrix,cb){window.correctedMatrix=matrix;cb(null)},
      getCameraLookAt(cb){cb(null,{position:[0,-10,5],target:[0,-2,0]})},
      setCameraLookAt(position,target,duration,cb){window.studioCamera={position,target,duration};cb(null)},
      getMaterialList(cb){cb(null,[body,{name:'glass',stateSetID:2,channels:{}}])},
      setMaterial(material, cb){window.paintCalls = [...(window.paintCalls||[]),material];setTimeout(()=>cb(window.failPaint ? 'failed' : null),20)}
    });
  };
};`;
async function prepare(page) {
  await page.route('https://static.sketchfab.com/**', route => route.fulfill({contentType:'application/javascript',body:sdk}));
  await page.goto('/');
  await page.getByRole('combobox').selectOption('en');
  await page.locator('#paint-studio').scrollIntoViewIfNeeded();
  await expect(page.locator('.paint-apply')).toBeEnabled();
}

test('real-model API contract: paint only body, compare originals, reset', async ({page}) => {
  await prepare(page);
  expect(await page.evaluate(()=>window.viewerUid)).toBe('6bbacfcb4c224acda978f5ee74554b58');
  await page.getByRole('radio',{name:'Ocean blue',exact:true}).check();
  await page.getByRole('radio',{name:'Satin',exact:true}).check();
  await page.locator('.paint-apply').click();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','painting');
  await expect(page.locator('.paint-apply')).toBeDisabled();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','done');
  const material = await page.evaluate(()=>window.paintCalls.at(-1));
  expect(material.stateSetID).toBe(10);
  expect(material.channels.GlossinessPBR.factor).toBe(.55);
  expect(material.channels.ClearCoat.enable).toBe(true);
  expect(material.channels.AlbedoPBR.color[2]).toBeGreaterThan(material.channels.AlbedoPBR.color[0]);
  await page.getByRole('button',{name:'Before',exact:true}).click();
  await expect(page.getByRole('button',{name:'Before',exact:true})).toHaveAttribute('aria-pressed','true');
  expect(await page.evaluate(()=>window.paintCalls.at(-1).channels.AlbedoPBR.color)).toEqual([1,1,1]);
  await page.getByRole('button',{name:'Result',exact:true}).click();
  await expect(page.getByRole('button',{name:'Result',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.locator('.paint-reset').click();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','ready');
});

test('material failure never reports a finished result; retry works', async ({page}) => {
  await prepare(page);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.evaluate(()=>window.failPaint=true);
  await page.locator('.paint-apply').click();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','paintError');
  await page.evaluate(()=>window.failPaint=false);
  await page.locator('.paint-apply').click();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','done');
});

test('all vehicle choices update the viewer, body finish, credits and enquiry', async ({page}) => {
  await prepare(page);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('input[name="paint-model"]')).toHaveCount(14);
  await expect(page.getByRole('radio',{name:/Matiz/i})).toHaveCount(0);
  for (const [name, uid, materialName] of [
    ['Chevrolet Tracker 2','11af5e8331e742238e4c5fb121960df6','ID986'],
    ['Chevrolet Onix','bfd798c2695847b28ab681d42abc7056','primary'],
    ['Chevrolet Gentra','99f158337e2741ac9af2848675f9128a','primary'],
    ['Chevrolet Cobalt LTZ','6bbacfcb4c224acda978f5ee74554b58','primary'],
    ...vehicleFixtures.map(model=>[model.label,model.uid,model.material.name]),
  ]) {
    await page.getByRole('radio',{name,exact:true}).check();
    await expect(page.locator('.paint-stage-top')).toContainText(name);
    await expect(page.locator('.paint-apply')).toBeEnabled();
    expect(await page.evaluate(()=>window.viewerUid)).toBe(uid);
    await expect(page.locator('.paint-credit a').first()).toHaveAttribute('href',new RegExp(uid));
    await expect(page.locator('.paint-studio-foot a')).toHaveAttribute('href',new RegExp(encodeURIComponent(name)));
    await page.getByRole('radio',{name:'Satin',exact:true}).check();
    await page.locator('.paint-apply').click();
    await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','done');
    const material = await page.evaluate(()=>window.paintCalls.at(-1));
    expect(material.name).toBe(materialName);
    const roughness = material.channels.RoughnessPBR?.enable;
    expect(material.channels[roughness?'RoughnessPBR':'GlossinessPBR'].factor).toBe(roughness?.45:.55);
    await page.getByRole('button',{name:'Before',exact:true}).click();
    const original = vehicleFixtures.find(model=>model.uid===uid)?.material.channels.AlbedoPBR.color || [1,1,1];
    expect(await page.evaluate(()=>window.paintCalls.at(-1).channels.AlbedoPBR.color)).toEqual(original);
  }
});

test('Nexia 1 is corrected upright before painting becomes available', async ({page}) => {
  await prepare(page);
  for (const name of ['Daewoo Nexia 1']) {
    await page.getByRole('radio',{name,exact:true}).check();
    await expect(page.locator('.paint-apply')).toBeEnabled();
    const state = await page.evaluate(()=>({matrix:window.correctedMatrix,camera:window.studioCamera,cameraOption:window.viewerOptions.camera}));
    expect(state.cameraOption).toBe(0);
    // The source's up vector (0,-1,0) must point along viewer +Z.
    expect(state.matrix.slice(4,7).map(v=>-v).map(v=>v||0)).toEqual([0,0,1]);
    expect(state.camera.target.map(v=>v||0)).toEqual([0,0,2]);
    expect(state.camera.position[2]).toBeGreaterThan(state.camera.target[2]);
    expect(state.camera.duration).toBe(0);
  }
  await page.getByRole('radio',{name:'Chevrolet Onix',exact:true}).check();
  await expect(page.locator('.paint-apply')).toBeEnabled();
  expect(await page.evaluate(()=>window.orientationModels)).toHaveLength(1);
});

test('custom colors, expanded palette, validation and comparison preserve the applied color', async ({page}) => {
  await prepare(page);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('input[name="paint-color"]')).toHaveCount(32);
  const hex = page.getByRole('textbox',{name:'Color code (HEX)',exact:true});
  await hex.fill('#12ABCF');
  await expect(page.locator('input[type="color"]')).toHaveValue('#12abcf');
  await page.locator('.paint-apply').click();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','done');
  const applied = await page.evaluate(()=>window.paintCalls.at(-1));
  expect(applied.channels.AlbedoPBR.color[2]).toBeGreaterThan(applied.channels.AlbedoPBR.color[0]);
  expect(applied.channels.ClearCoat.factor).toBeGreaterThan(.5);
  await expect(page.locator('.paint-result-bar')).toContainText('#12ABCF');
  await expect(page.locator('.paint-studio-foot a')).toHaveAttribute('href',/%2312abcf/);
  await page.getByRole('radio',{name:'Gold',exact:true}).check();
  await page.getByRole('button',{name:'Before',exact:true}).click();
  await page.getByRole('button',{name:'Result',exact:true}).click();
  expect(await page.evaluate(()=>window.paintCalls.at(-1))).toEqual(applied);
  await hex.fill('#GGG');
  await expect(hex).toHaveAttribute('aria-invalid','true');
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.paint-apply')).toBeDisabled();
  await hex.fill('a1b2c3');
  await expect(hex).toHaveAttribute('aria-invalid','false');
  await expect(page.locator('.paint-apply')).toBeEnabled();
  await page.locator('input[type="color"]').fill('#ff8800');
  await expect(hex).toHaveValue('#FF8800');
  await page.locator('.paint-reset').click();
  await expect(hex).toHaveValue('#CE263D');
});

test('orientation failure can retry without enabling an incorrectly oriented model', async ({page}) => {
  await prepare(page);
  await page.evaluate(()=>window.failOrientation=true);
  await page.getByRole('radio',{name:'Daewoo Nexia 1',exact:true}).check();
  await expect(page.getByRole('button',{name:'Try again',exact:true})).toBeVisible();
  await expect(page.locator('.paint-apply')).toBeDisabled();
  await page.evaluate(()=>window.failOrientation=false);
  await page.getByRole('button',{name:'Try again',exact:true}).click();
  await expect(page.locator('.paint-apply')).toBeEnabled();
  expect(await page.evaluate(()=>window.correctedMatrix[6])).toBe(-1);
});

test('switching models cancels painting and clears the previous result', async ({page}) => {
  await prepare(page);
  await page.locator('.paint-apply').click();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','painting');
  await page.getByRole('radio',{name:'Chevrolet Onix',exact:true}).check();
  await expect(page.locator('.paint-apply')).toBeEnabled();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','ready');
  await expect(page.getByRole('button',{name:'Before',exact:true})).toBeDisabled();
  await page.waitForTimeout(2800);
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','ready');
  for (const name of ['Chevrolet Tracker 2','Chevrolet Gentra','Chevrolet Onix']) {
    await page.getByRole('radio',{name,exact:true}).check();
  }
  await expect(page.locator('iframe[title="Chevrolet Onix — 3D"]')).toHaveCount(1);
  await expect(page.locator('.paint-apply')).toBeEnabled();
});

test('SDK failure disables painting and can recover', async ({page}) => {
  await page.route('https://static.sketchfab.com/**',route=>route.abort());
  await page.goto('/');
  await page.getByRole('combobox').selectOption('en');
  await page.locator('#paint-studio').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button',{name:'Try again',exact:true})).toBeVisible();
  await expect(page.locator('.paint-apply')).toBeDisabled();
  await page.route('https://static.sketchfab.com/**',route=>route.fulfill({contentType:'application/javascript',body:sdk}));
  await page.getByRole('button',{name:'Try again',exact:true}).click();
  await expect(page.locator('.paint-apply')).toBeEnabled();
});

test('mobile layout, reduced motion and language changes preserve viewer', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await prepare(page);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.paint-apply').click();
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','done');
  await page.getByRole('combobox').selectOption('ru');
  await expect(page.locator('.paint-stage')).toHaveAttribute('data-phase','done');
  for (const width of [320,390,768]) {
    await page.setViewportSize({width,height:844});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('radio',{name:'Chevrolet Tahoe',exact:true}).check();
  await expect(page.locator('.paint-apply')).toBeEnabled();
  await expect(page.locator('.paint-model-card')).toContainText('Tahoe');
  await page.locator('.paint-workspace').screenshot({path:'artifacts/paint-studio-mobile.png'});
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('.paint-workspace').screenshot({path:'artifacts/paint-studio-desktop.png'});
  await expect(page.locator('.paint-credit a').first()).toHaveAttribute('href',/sketchfab.com/);
});
