import { useEffect, useRef, useState } from 'react';
import '../pages/InstagramReels.css';

const reels = ['C2F8n6fNOl8', 'C481asxtgoI', 'C482OtoNWYa', 'C5EWpcYtIW1', 'C56DMYEtGGj', 'DByUHGLKRwe'];
const copy = {
  uz: {
    title: 'CarPaint videolarda.', account: 'Instagram sahifamiz',
    hint: 'Videolarni yon tomonga surib ko‘ring', previous: 'Oldingi video', next: 'Keyingi video',
    video: 'Video', play: 'Videoni ijro etish', open: 'Instagramda ko‘rish',
  },
  ru: {
    title: 'CarPaint в видео.', account: 'Наш Instagram',
    hint: 'Листайте видео по горизонтали', previous: 'Предыдущее видео', next: 'Следующее видео',
    video: 'Видео', play: 'Воспроизвести видео', open: 'Смотреть в Instagram',
  },
  en: {
    title: 'CarPaint in motion.', account: 'Our Instagram',
    hint: 'Swipe to explore the videos', previous: 'Previous video', next: 'Next video',
    video: 'Video', play: 'Play video', open: 'Watch on Instagram',
  },
};

export default function InstagramReels({ lang }) {
  const text = copy[lang] || copy.uz;
  const rail = useRef(null);
  const videos = useRef({});
  const [active, setActive] = useState(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const node = rail.current;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = { start: node.scrollLeft <= 2, end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 2 };
      setEdges(previous => previous.start === next.start && previous.end === next.end ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    node.addEventListener('scroll', schedule, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      node.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio < .35) entry.target.pause();
      });
    }, { threshold: [0, .35] });
    Object.values(videos.current).forEach(video => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  const play = id => {
    const video = videos.current[id];
    setActive(id);
    video.play().catch(() => setActive(current => current === id ? null : current));
  };

  const move = direction => {
    const node = rail.current;
    const card = node.firstElementChild;
    node.scrollBy({
      left: direction * (card.getBoundingClientRect().width + parseFloat(getComputedStyle(node).columnGap)),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return <section className="instagram-reels auto-container" aria-labelledby="instagram-reels-title">
    <div className="auto-section-head">
      <div><p className="auto-eyebrow">CARPAINT / INSTAGRAM</p><h2 id="instagram-reels-title">{text.title}</h2></div>
      <a className="auto-text-link" href="https://www.instagram.com/car_paint.uz/" target="_blank" rel="noopener noreferrer">{text.account} ↗</a>
    </div>
    <div className="instagram-reels-toolbar">
      <p><span aria-hidden="true">↔</span> {text.hint}</p>
      <div>
        <span className="instagram-reels-count">{String(reels.length).padStart(2, '0')} REELS</span>
        <button type="button" aria-label={text.previous} aria-controls="instagram-reels-rail" disabled={edges.start} onClick={() => move(-1)}>←</button>
        <button type="button" aria-label={text.next} aria-controls="instagram-reels-rail" disabled={edges.end} onClick={() => move(1)}>→</button>
      </div>
    </div>
    <div id="instagram-reels-rail" className="instagram-reels-rail" ref={rail} role="region" aria-label={text.title} tabIndex={0} onKeyDown={event => {
      if (event.target === event.currentTarget && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    }}>
      {reels.map((id, index) => <article className="instagram-reel" key={id}>
        <div className="instagram-reel-heading"><span>@car_paint.uz</span><span>0{index + 1}</span></div>
        <div className="instagram-reel-player">
          <video
            ref={node => { if (node) videos.current[id] = node; else delete videos.current[id]; }}
            src={`/videos/instagram/${id}.mp4`}
            poster={`/videos/instagram/${id}.jpg`}
            aria-label={`${text.video} ${index + 1} — @car_paint.uz`}
            preload="none"
            playsInline
            controls={active === id}
            onPlay={() => {
              setActive(id);
              Object.entries(videos.current).forEach(([otherId, video]) => { if (otherId !== id) video.pause(); });
            }}
            onEnded={() => setActive(current => current === id ? null : current)}
          />
          {active !== id && <button className="instagram-reel-play" type="button" aria-label={`${text.play} ${index + 1}`} onClick={() => play(id)}><span aria-hidden="true">▶</span></button>}
        </div>
        <a className="instagram-reel-link" href={`https://www.instagram.com/reel/${id}/`} target="_blank" rel="noopener noreferrer">{text.open}<span aria-hidden="true">↗</span></a>
      </article>)}
    </div>
  </section>;
}
