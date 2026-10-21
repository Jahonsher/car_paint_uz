import { useCallback, useEffect, useRef, useState } from 'react';
import CarModel from './CarModel';
import copy from '../localization/paintStudio';
import { company } from '../data/company';
import { defaultVehicle, getPaintVehicle, paintVehicles } from '../data/paintVehicles';
import { paintColors as colors } from '../data/paintColors';
import '../pages/PaintStudio.css';

export default function PaintStudio({ lang }) {
  const text = copy[lang] || copy.uz;
  const [vehicleId, setVehicleId] = useState(defaultVehicle.id);
  const vehicle = getPaintVehicle(vehicleId);
  const [selected, setSelected] = useState(colors[0]);
  const [hexDraft, setHexDraft] = useState(colors[0].toUpperCase());
  const [finish, setFinish] = useState('gloss');
  const [applied, setApplied] = useState(null);
  const [phase, setPhase] = useState('ready');
  const [before, setBefore] = useState(false);
  const [viewerStatus, setViewerStatus] = useState('loading');
  const [busy, setBusy] = useState(false);
  const viewer = useRef(null);
  const stage = useRef(null);
  const operation = useRef(0);
  const complete = useRef(null);
  const timer = useRef(null);
  const painting = phase === 'painting';
  const disabled = busy || painting || viewerStatus !== 'ready';
  const invalidHex = !/^#?[a-f\d]{6}$/i.test(hexDraft);
  const colorName = hex => {
    const index = colors.indexOf(hex);
    return index < 0 ? text.customColor : text.colors[index];
  };
  const chooseColor = value => { setSelected(value.toLowerCase()); setHexDraft(value.toUpperCase()); };
  const editHex = value => {
    setHexDraft(value);
    if (/^#?[a-f\d]{6}$/i.test(value)) setSelected(('#' + value.replace(/^#/, '')).toLowerCase());
  };
  const onStatus = useCallback(status => {
    setViewerStatus(status);
    if (status !== 'ready') { operation.current++; clearTimeout(timer.current); complete.current = null; setPhase('ready'); setApplied(null); setBefore(false); setBusy(false); }
  }, []);
  const selectVehicle = id => {
    if (id === vehicleId) return;
    onStatus('loading');
    setVehicleId(id);
  };
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => { if (media.matches) complete.current?.(); };
    const cancelOperation = () => { operation.current++; clearTimeout(timer.current); complete.current = null; };
    media.addEventListener('change', change);
    return () => { cancelOperation(); media.removeEventListener('change', change); };
  }, []);
  const apply = async () => {
    if (disabled || invalidHex) return;
    const token = ++operation.current;
    setBefore(false); setPhase('painting');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (window.matchMedia('(max-width: 899px)').matches) stage.current?.scrollIntoView({ behavior: media.matches ? 'auto' : 'smooth', block: 'center' });
    try {
      await viewer.current.paint(selected, finish);
      if (token !== operation.current) return;
      const done = () => {
        clearTimeout(timer.current); complete.current = null;
        setApplied({ color: selected, finish }); setPhase('done');
      };
      complete.current = done;
      if (media.matches) done(); else timer.current = setTimeout(done, 2600);
    } catch {
      if (token === operation.current) setPhase('paintError');
    }
  };
  const compare = async (original, reset = false) => {
    if (disabled) return;
    const token = ++operation.current;
    setBusy(true);
    try {
      await viewer.current.paint(original ? null : applied.color, applied?.finish);
      if (token !== operation.current) return;
      setBefore(original);
      if (reset) { chooseColor(colors[0]); setFinish('gloss'); setApplied(null); setBefore(false); setPhase('ready'); }
    } catch { if (token === operation.current) setPhase('paintError'); }
    finally { if (token === operation.current) setBusy(false); }
  };
  const resultName = before || !applied ? text.before : colorName(applied.color);
  const message = `${vehicle.label} / ${colorName(selected)} (${selected}) / ${text[finish]}`;
  return <section id="paint-studio" className="paint-studio auto-container" aria-labelledby="paint-studio-title">
    <div className="auto-section-head"><div><p className="auto-eyebrow">{text.eyebrow}</p><h2 id="paint-studio-title">{text.title}</h2></div><p className="paint-studio-intro">{text.intro}</p></div>
    <div className="paint-workspace">
      <div className="paint-controls">
        <fieldset><legend><span>01</span>{text.model}</legend><div className="paint-model-card"><span>{vehicle.brand.toUpperCase()}</span><strong>{vehicle.name}</strong><b>3D · 360°</b></div><div className="paint-models">{paintVehicles.map(model => <label key={model.id} className={vehicleId === model.id ? 'is-selected' : ''}><input type="radio" name="paint-model" value={model.id} aria-label={model.label} checked={vehicleId === model.id} onChange={() => selectVehicle(model.id)} /><span>{model.name}</span></label>)}</div><p className="paint-model-note">{text.moreModels}</p></fieldset>
        <fieldset disabled={disabled}><legend><span>02</span>{text.color}</legend><div className="paint-swatches">{colors.map((value, i) => <label key={value} className={selected === value ? 'is-selected' : ''} title={text.colors[i]} style={{ '--swatch': value }}><input type="radio" name="paint-color" value={value} aria-label={text.colors[i]} checked={selected === value} onChange={() => chooseColor(value)} /><span aria-hidden="true">{selected === value ? '✓' : ''}</span></label>)}</div><div className="paint-color-name"><strong>{colorName(selected)}</strong><span>{selected.toUpperCase()}</span></div><div className="paint-custom-color"><label className="paint-picker"><input type="color" aria-label={text.customColor} value={selected} onChange={event => chooseColor(event.target.value)} /><span>{text.customColor}</span></label><label className="paint-hex"><span>HEX</span><input type="text" aria-label={text.hexColor} aria-invalid={invalidHex} aria-describedby={invalidHex ? 'paint-hex-error' : undefined} value={hexDraft} maxLength={7} spellCheck={false} autoComplete="off" onChange={event => editHex(event.target.value)} /></label></div>{invalidHex && <p id="paint-hex-error" className="paint-hex-error" role="alert">{text.invalidHex}</p>}</fieldset>
        <fieldset disabled={disabled}><legend><span>03</span>{text.finish}</legend><div className="paint-finishes">{['gloss', 'satin'].map(value => <label key={value} className={finish === value ? 'is-selected' : ''}><input type="radio" name="paint-finish" value={value} checked={finish === value} onChange={() => setFinish(value)} /><span>{text[value]}</span></label>)}</div></fieldset>
        <button className="auto-button paint-apply" onClick={apply} disabled={disabled || invalidHex}>{painting ? text.painting : applied ? text.again : text.apply}<span aria-hidden="true">↗</span></button>
      </div>
      <div className="paint-stage" data-phase={phase} ref={stage}>
        <div className="paint-stage-top"><span>CARPAINT <b>3D COLOR LAB</b></span><span>{vehicle.label}</span></div>
        <CarModel key={vehicle.id} ref={viewer} vehicle={vehicle} text={text} onStatus={onStatus} painting={painting} color={selected} />
        <p className="paint-viewer-hint">{text.controls}</p>
        <div className="paint-stage-bottom"><p className="paint-status" role="status"><i />{viewerStatus === 'ready' ? text[phase] : viewerStatus === 'error' ? text.loadError : text.loading}</p><button className="paint-reset" onClick={() => compare(true, true)} disabled={disabled || (phase === 'ready' && !applied)}>{text.reset} ↺</button></div>
        <div className="paint-progress" aria-hidden="true"><span key={painting ? 'painting' : 'static'} /></div>
        <div className="paint-result-bar"><div><span className="paint-result-dot" style={{ background: before || !applied ? '#ffffff' : applied.color }} /><span>{resultName}{applied && !before && <small>{applied.color.toUpperCase()}</small>}</span></div><div className="paint-comparison" role="group" aria-label={text.compare}><button aria-pressed={before} onClick={() => compare(true)} disabled={disabled || !applied}>{text.before}</button><button aria-pressed={!before} onClick={() => compare(false)} disabled={disabled || !applied}>{text.after}</button></div></div>
      </div>
    </div>
    <p className="paint-credit"><a href={vehicle.source} target="_blank" rel="noreferrer">{vehicle.label}</a> · <a href={vehicle.authorUrl} target="_blank" rel="noreferrer">{vehicle.author}</a> · <a href={vehicle.license} target="_blank" rel="noreferrer">CC BY 4.0</a> · {text.modified}</p>
    <div className="paint-studio-foot"><p>{text.note}</p><a className="auto-text-link" href={`mailto:${company.email}?subject=${encodeURIComponent('CarPaint — ' + text.selected)}&body=${encodeURIComponent(message)}`}>{text.ask} ↗</a></div>
  </section>;
}
