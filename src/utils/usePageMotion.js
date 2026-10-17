import { useEffect, useRef } from 'react';

export default function usePageMotion(pathname, language) {
  const root = useRef(null);

  useEffect(() => {
    const node = root.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set();
    let observer;

    const configure = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (preference.matches || !window.IntersectionObserver || !node.animate) return;

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          observer.unobserve(element);
          const siblings = Array.from(element.parentElement.children);
          const stagger = element.matches('.company-photo-card, .company-editorial-grid article, .company-stats > div');
          const delay = stagger ? (siblings.indexOf(element) % 3) * 90 : 0;
          const animation = element.animate([
            { opacity: 0, transform: 'translateY(32px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 720, delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

      node.querySelectorAll('[data-reveal], .auto-section-head, .auto-story-heading, .company-photo-card, .company-page-heading, .company-editorial-grid article, .company-stats > div, .auto-contact-grid > div, .auto-contact-form').forEach(element => observer.observe(element));
    };

    configure();
    preference.addEventListener('change', configure);
    return () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', configure);
    };
  }, [pathname, language]);

  return root;
}
