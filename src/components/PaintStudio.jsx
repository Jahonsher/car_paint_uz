import { useEffect, useRef, useState } from 'react';
import CarModel from './CarModel';
import copy from '../localization/paintStudio';
import { company } from '../data/company';
import '../pages/PaintStudio.css';

const colors = ['#ce263d', '#2165b0', '#18745c', '#353d4a', '#e8e6df', '#a8b2c0', '#bba077', '#7252a0'];
const models = ['sedan', 'suv', 'coupe'];
const initialColor = '#b7bec8';

export default function PaintStudio({ lang }) {
  const text = copy[lang] || copy.uz;
  const [model, setModel] = useState('sedan');
  const [selected, setSelected] = useState(0);
  const [finish, setFinish] = useState('gloss');
  const [appliedFinish, setAppliedFinish] = useState('gloss');
  const [paintedColor, setPaintedColor] = useState(initialColor);
  const [appliedIndex, setAppliedIndex] = useState(null);
  const [phase, setPhase] = useState('ready');
  const [before, setBefore] = useState(false);
  const timer = useRef(null);
  const complete = useRef(null);
  const stage = useRef(null);
  const painting = phase === 'painting';

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => { if (media.matches) complete.current?.(); };
    media.addEventListener('change', onChange);
    return () => { clearTimeout(timer.current); complete.current = null; media.removeEventListener('change', onChange); };
  }, []);

  const apply = () => {
    clearTimeout(timer.current);
    setBefore(false);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.matchMedia('(max-width: 899px)').matches) {
      stage.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
    }
    const done = () => {
      clearTimeout(timer.current);
      setPaintedColor(colors[selected]);
      setAppliedIndex(selected);
      setAppliedFinish(finish);
      setPhase('done');
      complete.current = null;
    };
    complete.current = done;
    if (reducedMotion) done();
    else { setPhase('painting'); timer.current = setTimeout(done, 2600); }
  };

  const reset = () => {
    clearTimeout(timer.current);
    complete.current = null;
    setModel('sedan');
    setSelected(0);
    setFinish('gloss');
    setAppliedFinish('gloss');
    setPaintedColor(initialColor);
    setAppliedIndex(null);
    setBefore(false);
    setPhase('ready');
  };

  const previewColor = before ? initialColor : painting ? colors[selected] : paintedColor;
  const resultName = appliedIndex === null ? text.before : text.colors[appliedIndex];
  const message = `${text.models[models.indexOf(model)]} / ${text.colors[selected]} (${colors[selected]}) / ${finish === 'gloss' ? text.gloss : text.satin}`;

  return <section id="paint-studio" className="paint-studio auto-container" aria-labelledby="paint-studio-title">
    <div className="auto-section-head"><div><p className="auto-eyebrow">{text.eyebrow}</p><h2 id="paint-studio-title">{text.title}</h2></div><p className="paint-studio-intro">{text.intro}</p></div>
    <div className="paint-workspace">
      <div className="paint-controls">
        <fieldset disabled={painting}><legend><span>01</span>{text.model}</legend><div className="paint-models">{models.map((value, i) => <label key={value} className={model === value ? 'is-selected' : ''}>
          <input type="radio" name="paint-model" value={value} checked={model === value} onChange={() => { setModel(value); setBefore(false); }} /><span>{text.models[i]}</span>
        </label>)}</div></fieldset>
        <fieldset disabled={painting}><legend><span>02</span>{text.color}</legend><div className="paint-swatches">{colors.map((value, i) => <label key={value} className={selected === i ? 'is-selected' : ''} title={text.colors[i]} style={{ '--swatch': value }}>
          <input type="radio" name="paint-color" value={value} aria-label={text.colors[i]} checked={selected === i} onChange={() => setSelected(i)} /><span aria-hidden="true">{selected === i ? '✓' : ''}</span>
        </label>)}</div><div className="paint-color-name"><strong>{text.colors[selected]}</strong><span>{colors[selected].toUpperCase()}</span></div></fieldset>
        <fieldset disabled={painting}><legend><span>03</span>{text.finish}</legend><div className="paint-finishes">{['gloss', 'satin'].map(value => <label key={value} className={finish === value ? 'is-selected' : ''}>
          <input type="radio" name="paint-finish" value={value} checked={finish === value} onChange={() => setFinish(value)} /><span>{text[value]}</span>
        </label>)}</div></fieldset>
        <button className="auto-button paint-apply" onClick={apply} disabled={painting}>{painting ? text.painting : phase === 'done' ? text.again : text.apply}<span aria-hidden="true">↗</span></button>
      </div>
      <div className="paint-stage" data-phase={phase} ref={stage}>
        <div className="paint-stage-top"><span>CARPAINT <b>COLOR LAB</b></span><span>{text.models[models.indexOf(model)]} / 0{models.indexOf(model) + 1}</span></div>
        <div className="paint-car-scene">
          <div className="paint-studio-ring" aria-hidden="true" />
          <CarModel model={model} color={previewColor} previousColor={paintedColor} painting={painting} finish={painting ? finish : before ? 'gloss' : appliedFinish} label={`${text.preview}: ${text.models[models.indexOf(model)]}, ${before ? text.before : painting ? text.colors[selected] : resultName}`} />
        </div>
        <div className="paint-stage-bottom"><p className="paint-status" role="status"><i />{text[phase]}</p><button className="paint-reset" onClick={reset} disabled={painting || phase === 'ready'}>{text.reset} ↺</button></div>
        <div className="paint-progress" aria-hidden="true"><span key={painting ? 'painting' : 'static'} /></div>
        <div className="paint-result-bar"><div><span className="paint-result-dot" style={{ background: before ? initialColor : paintedColor }} /><span>{before ? text.before : resultName}</span></div><div className="paint-comparison" role="group" aria-label={text.compare}>
          <button aria-pressed={before} onClick={() => setBefore(true)} disabled={painting || appliedIndex === null}>{text.before}</button><button aria-pressed={!before} onClick={() => setBefore(false)} disabled={painting || appliedIndex === null}>{text.after}</button>
        </div></div>
      </div>
    </div>
    <div className="paint-studio-foot"><p>{text.note}</p><a className="auto-text-link" href={`mailto:${company.email}?subject=${encodeURIComponent('CarPaint — ' + text.selected)}&body=${encodeURIComponent(message)}`}>{text.ask} ↗</a></div>
  </section>;
}
