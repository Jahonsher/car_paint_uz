import images from '../assets/showroom.json';

export default function AutomotiveImage({ name, alt, hero = false, sizes = '(max-width: 760px) 100vw, 60vw', ...props }) {
  const image = images[name];
  return <img src={image.src} srcSet={image.srcSet} sizes={sizes} width={image.width} height={image.height} alt={alt} loading={hero ? 'eager' : 'lazy'} fetchpriority={hero ? 'high' : 'auto'} decoding="async" {...props} />;
}
