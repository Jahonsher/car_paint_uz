const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../artifacts/paint-models');
fs.mkdirSync(root, { recursive: true });
async function json(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.json();
}
async function main() {
  const mode = process.argv[2];
  if (['preview', 'diagnose'].includes(mode)) {
    const { chromium } = require('@playwright/test');
    const { paintVehicles } = await import('../src/data/paintVehicles.js');
    const helper = fs.readFileSync(path.resolve(__dirname,'../src/utils/paintViewer.js'),'utf8').replace(/^export /gm,'');
    const browser = await chromium.launch({channel:'chrome',headless:true});
    try {
      for (const argument of process.argv.slice(3)) {
        const [uid, ...names] = argument.split(':');
        const page = await browser.newPage({viewport:{width:1000,height:680}});
        try {
          await page.setContent('<iframe style="width:980px;height:650px;border:0"></iframe>');
          await page.addScriptTag({content:helper+';window.paintViewer={makePaintMaterial,preparePaintViewer};'});
          await page.addScriptTag({url:'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'});
          const vehicle = paintVehicles.find(model=>model.uid===uid) || {uid};
          await page.evaluate(vehicle=>{
            new window.Sketchfab('1.12.1',document.querySelector('iframe')).init(vehicle.uid,{
              autostart:1,camera:vehicle.upAxis==='-y'?0:1,ui_infos:0,ui_stop:0,success(api){
                window.modelApi=api;
                api.addEventListener('viewerready',()=>{window.modelReady=true;});api.start();
              },error(){window.modelError=true;},
            });
          },vehicle);
          await page.waitForFunction(()=>window.modelReady||window.modelError,null,{timeout:90000});
          if(await page.evaluate(()=>window.modelError)) throw new Error('Viewer initialization failed');
          await page.evaluate(vehicle=>window.paintViewer.preparePaintViewer(window.modelApi,vehicle),vehicle);
          const result=await page.evaluate(names=>new Promise((resolve,reject)=>window.modelApi.getMaterialList(async(error,materials)=>{
            if(error) return reject(error);
            const selected=names.map(name=>materials.find(m=>m.name===name));
            if(selected.some(m=>!m)) return reject(new Error('Missing body material: '+names));
            window.originals=JSON.parse(JSON.stringify(selected));
            for(const material of selected){
              await new Promise((res,rej)=>window.modelApi.setMaterial(window.paintViewer.makePaintMaterial(material,'#2165b0','gloss'),err=>err?rej(err):res()));
            }
            resolve(selected.map(m=>({name:m.name,roughness:!!m.channels.RoughnessPBR?.enable})));
          })),names);
          await page.waitForTimeout(1500);
          await page.screenshot({path:path.join(root,uid+'-studio.png')});
          const before=await page.evaluate(()=>new Promise(resolve=>window.modelApi.getCameraLookAt((err,camera)=>resolve(camera))));
          await page.mouse.move(450,330);await page.mouse.down();await page.mouse.move(680,330,{steps:20});await page.mouse.up();
          await page.waitForTimeout(1000);
          const after=await page.evaluate(()=>new Promise(resolve=>window.modelApi.getCameraLookAt((err,camera)=>resolve(camera))));
          await page.screenshot({path:path.join(root,uid+'-orbit.png')});
          console.log('VERIFIED',uid,JSON.stringify({materials:result,before,after}));
        } catch(error){console.log('FAILED',uid,error.message);process.exitCode=1;}
        finally{await page.close();}
      }
    } finally {await browser.close();}
    return;
  }
  if (mode === 'search') {
    for (const query of process.argv.slice(3)) {
      const data=await json(`https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(query)}&downloadable=true&count=12`);
      fs.writeFileSync(path.join(root,query.replace(/\W/g,'-')+'.json'),JSON.stringify(data,null,2));
      console.log(query,JSON.stringify(data.results.map(m=>({uid:m.uid,name:m.name,author:m.user.username,faces:m.faceCount}))));
    }
    return;
  }
  for (const uid of process.argv.slice(2)) {
    const [model,options]=await Promise.all([json(`https://sketchfab.com/i/models/${uid}`),json(`https://sketchfab.com/i/models/${uid}/options`)]);
    fs.writeFileSync(path.join(root,uid+'.json'),JSON.stringify({model,options},null,2));
    console.log(JSON.stringify({uid,name:model.name,author:model.user.username,license:model.license?.slug,materials:Object.values(options.materials).filter(m=>m.channels).map(m=>({name:m.name,id:m.stateSetID,color:m.channels.AlbedoPBR?.color,texture:!!m.channels.AlbedoPBR?.texture}))}));
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
