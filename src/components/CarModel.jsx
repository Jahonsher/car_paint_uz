import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { makePaintMaterial, preparePaintViewer } from '../utils/paintViewer';

let sdkPromise;
function loadViewer() {
  if (window.Sketchfab) return Promise.resolve(window.Sketchfab);
  if (!sdkPromise) sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
    script.async = true;
    const timer = setTimeout(() => fail(), 20000);
    const fail = () => { clearTimeout(timer); script.remove(); sdkPromise = null; reject(new Error('SDK unavailable')); };
    script.onload = () => { clearTimeout(timer); resolve(window.Sketchfab); };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return sdkPromise;
}
const clone = value => JSON.parse(JSON.stringify(value));
const CarModel = forwardRef(function CarModel({ vehicle, text, onStatus, painting, color }, ref) {
  const iframe = useRef(null);
  const container = useRef(null);
  const apiRef = useRef(null);
  const original = useRef(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('loading');
  useImperativeHandle(ref, () => ({
    paint(hex, finish) {
      const api = apiRef.current;
      if (!api || !original.current) return Promise.reject(new Error('Viewer not ready'));
      const material = hex ? makePaintMaterial(original.current, hex, finish) : clone(original.current);
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Material update timeout')), 10000);
        api.setMaterial(material, error => { clearTimeout(timer); error ? reject(error) : resolve(); });
      });
    },
  }), []);
  useEffect(() => {
    let disposed = false;
    let failed = false;
    let timer;
    let api;
    const update = next => { if (!disposed) { setStatus(next); onStatus(next); } };
    const fail = () => { if (disposed) return; failed = true; clearTimeout(timer); apiRef.current = null; update('error'); };
    update('loading');
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      timer = setTimeout(fail, 90000);
      loadViewer().then(Sketchfab => {
        if (disposed || failed) return;
        new Sketchfab('1.12.1', iframe.current).init(vehicle.uid, {
          autostart: 1, preload: 1, camera: vehicle.upAxis === '-y' ? 0 : 1, ui_infos: 0, ui_stop: 0, scrollwheel: 0,
          success(viewer) {
            if (disposed || failed) return;
            api = viewer;
            viewer.addEventListener('viewerready', async () => {
              if (disposed || failed) return;
              try { await preparePaintViewer(viewer, vehicle, () => !disposed && !failed); }
              catch { fail(); return; }
              if (disposed || failed) return;
              viewer.getMaterialList((error, materials) => {
                if (disposed || failed) return;
                const body = materials?.find(material => material.name === vehicle.paintMaterial);
                if (error || !body?.channels.AlbedoPBR || (!body.channels.GlossinessPBR && !body.channels.RoughnessPBR)) { fail(); return; }
                original.current = clone(body);
                viewer.setMaterial(makePaintMaterial(body), error => {
                  if (disposed || failed) return;
                  if (error) { fail(); return; }
                  clearTimeout(timer);
                  apiRef.current = viewer;
                  update('ready');
                });
              });
            });
            viewer.start();
          }, error: fail,
        });
      }).catch(fail);
    }, { rootMargin: '200px' });
    observer.observe(container.current);
    return () => { disposed = true; clearTimeout(timer); observer.disconnect(); apiRef.current = null; original.current = null; api?.stop(); };
  }, [vehicle, attempt, onStatus]);
  return <div className="paint-viewer" ref={container} aria-busy={status === 'loading'}>
    <iframe key={attempt} ref={iframe} title={`${vehicle.label} — 3D`} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen />
    {status !== 'ready' && <div className="paint-viewer-message" role="status">
      <strong>{status === 'error' ? text.loadError : text.loading}</strong><p>{text.network}</p>
      {status === 'error' && <button type="button" onClick={() => setAttempt(value => value + 1)}>{text.retry}</button>}
    </div>}
    {painting && <div className="paint-mist" style={{ '--paint-color': color }} aria-hidden="true" />}
  </div>;
});
export default CarModel;
