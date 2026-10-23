import { useEffect, useRef } from 'react';
import AutomotiveImage from './AutomotiveImage';
import PaintSplash from './PaintSplash';

export default function AutomotiveStory({ text }) {
  const root = useRef(null);
  useEffect(() => {
    const node = root.current;
    const media = window.matchMedia('(min-width: 900px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)');
    let cleanup = () => {};
    function configure() {
      cleanup();
      node.removeAttribute('data-motion');
      node.removeAttribute('data-step');
      node.style.removeProperty('--progress');
      node.style.removeProperty('--scene-drift');
      if (!media.matches || !('IntersectionObserver' in window)) return;
      let frame = 0;
      let visible = false;
      const steps = Array.from(node.querySelectorAll('.auto-step'));
      const update = () => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const distance = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / distance));
        let active = 0;
        steps.forEach((step, index) => {
          const bounds = step.getBoundingClientRect();
          if (bounds.top + bounds.height / 2 < window.innerHeight * 0.6) active = index;
        });
        node.style.setProperty('--progress', progress.toFixed(4));
        node.style.setProperty('--scene-drift', `${((progress - 0.5) * 9).toFixed(3)}deg`);
        node.dataset.step = String(active);
      };
      const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(update); };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      });
      node.dataset.motion = 'on';
      observer.observe(node);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      };
    }
    configure();
    media.addEventListener('change', configure);
    return () => { cleanup(); media.removeEventListener('change', configure); node.removeAttribute('data-motion'); node.style.removeProperty('--scene-drift'); node.style.removeProperty('--progress'); };
  }, []);
  return <section className="auto-story" id="process" aria-labelledby="process-title">
    <div className="auto-container auto-story-heading">
      <p className="auto-eyebrow">{text.storyLabel}</p>
      <h2 id="process-title">{text.storyTitle}<br /><span>{text.storyAccent}</span></h2>
      <p>{text.storyIntro}</p>
    </div>
    <div className="auto-story-track auto-container" ref={root}>
      <figure className="auto-story-visual">
        <PaintSplash tone="story" variant={1} className="paint-story-splash" />
        <div className="product-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="product-scene-type" aria-hidden="true">{['PREPARE', 'COLOR', 'FINISH'].map((word, index) => <span key={word} className={`product-scene-word product-scene-word-${index}`}>{word}</span>)}</div>
        <div className="product-scene-floor" aria-hidden="true" />
        {['putty', 'topcoat', 'hardener'].map((image, index) => <AutomotiveImage key={image} className={`company-story-frame company-story-frame-${index}`} name={image} alt={text.storyAlts[index]} sizes="(max-width: 899px) 100vw, 58vw" />)}
        <figcaption><span>CARPAINT / MATERIAL IN FOCUS</span><span className="product-scene-count" aria-hidden="true">{['01','02','03'].map((number,index)=><b key={number} className={`product-scene-count-${index}`}>{number} / 03</b>)}</span></figcaption>
        <div className="auto-progress" aria-hidden="true"><span /></div>
      </figure>
      <div className="auto-steps">
        {text.steps.map(([title, description], index) => <article className="auto-step" key={index}>
          <span className="auto-step-number">0{index + 1}</span>
          <div><AutomotiveImage className="company-step-image" name={['putty', 'topcoat', 'hardener'][index]} alt={text.storyAlts[index]} sizes="(max-width: 899px) 90vw, 1px" /><h3>{title}</h3><p>{description}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
