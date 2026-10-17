import { useId } from 'react';

const bodies = {
  sedan: {
    body: 'M73 249 Q77 225 112 215 L223 198 Q271 142 318 137 L447 137 Q479 139 550 192 L671 211 Q714 216 733 245 L740 282 Q738 302 713 306 L659 306 C658 224 542 224 541 306 L275 306 C274 224 158 224 157 306 L99 306 Q75 304 71 282 Z',
    windows: 'M242 197 Q279 153 322 149 L442 149 Q469 151 526 195 Z',
    pillar: 'M381 149 L381 195 M451 151 L470 195',
    doors: 'M242 207 L261 252 M393 204 L397 292 M528 206 L545 249 M278 294 L535 294',
    roof: 'M227 195 Q275 137 319 133 L447 133 Q482 135 552 190',
  },
  suv: {
    body: 'M74 244 L89 194 Q91 180 111 175 L209 172 L251 115 Q262 102 284 102 L470 102 Q501 104 554 170 L670 190 Q719 200 735 233 L740 281 Q741 305 713 311 L661 311 C657 222 540 222 538 311 L276 311 C274 222 156 222 153 311 L96 311 Q72 307 70 284 Z',
    windows: 'M225 172 L261 125 Q267 117 286 116 L466 116 Q490 119 530 171 Z',
    pillar: 'M329 117 L329 172 M425 117 L436 172',
    doors: 'M224 185 L241 238 M365 183 L367 293 M531 182 L546 237 M281 295 L531 295',
    roof: 'M215 167 L251 111 Q260 98 285 98 L471 98 Q501 100 556 167',
  },
  coupe: {
    body: 'M73 254 Q83 228 119 225 L218 210 Q283 152 330 150 L426 150 Q466 151 543 204 L674 218 Q718 226 737 252 L742 282 Q740 303 713 307 L660 307 C657 225 541 225 539 307 L276 307 C274 225 157 225 155 307 L98 307 Q72 303 70 283 Z',
    windows: 'M244 207 Q290 165 334 162 L423 162 Q454 163 520 205 Z',
    pillar: 'M350 162 L363 206',
    doors: 'M254 218 L265 248 M484 217 L485 292 M280 295 L532 295',
    roof: 'M220 205 Q284 148 329 146 L426 146 Q469 147 546 201',
  },
};

function Wheel({ x, rim }) {
  return <g transform={`translate(${x} 294)`}>
    <circle r="52" fill="#0a0d12" stroke="#242b34" strokeWidth="5" />
    <circle r="40" fill={`url(#${rim})`} stroke="#747f8e" strokeWidth="2" />
    <circle r="31" fill="#18212c" />
    {[0, 60, 120, 180, 240, 300].map(angle => <path key={angle} transform={`rotate(${angle})`} d="M-5 -7 L-8 -34 L1 -38 L8 -10 Z" fill="#bac5d2" stroke="#e2e9f0" strokeWidth="1" />)}
    <circle r="12" fill="#929eac" stroke="#dde4ee" strokeWidth="2" />
    <circle r="5" fill="#293341" />
  </g>;
}

export default function CarModel({ model, color, previousColor, painting, finish, label }) {
  const id = useId().replace(/:/g, '');
  const shape = bodies[model];
  const glossy = finish === 'gloss';
  const paint = suffix => `${id}-${suffix}`;
  const gradient = (name, value) => <linearGradient id={paint(name)} x1="0" y1="0" x2=".1" y2="1">
    <stop offset="0" stopColor={value} />
    <stop offset=".45" stopColor={value} />
    <stop offset="1" stopColor={value} />
  </linearGradient>;

  return <svg className="paint-car" viewBox="0 0 820 410" role="img" aria-label={label}>
    <defs>
      {gradient('base', previousColor)}{gradient('color', color)}
      <linearGradient id={paint('shade')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="white" stopOpacity={glossy ? '.65' : '.25'} />
        <stop offset=".32" stopColor="white" stopOpacity={glossy ? '.15' : '.08'} />
        <stop offset=".48" stopColor="white" stopOpacity={glossy ? '.45' : '.08'} />
        <stop offset=".51" stopColor="#000" stopOpacity=".06" />
        <stop offset="1" stopColor="#000" stopOpacity={glossy ? '.65' : '.4'} />
      </linearGradient>
      <linearGradient id={paint('glass')} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#72899d" /><stop offset=".45" stopColor="#263849" /><stop offset="1" stopColor="#0b131e" />
      </linearGradient>
      <linearGradient id={paint('rim')}><stop stopColor="#6a7687" /><stop offset=".45" stopColor="#e2e9ef" /><stop offset="1" stopColor="#424e5e" /></linearGradient>
      <radialGradient id={paint('shadow')}><stop stopColor="#000" stopOpacity=".8" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      <radialGradient id={paint('mist')}><stop stopColor={color} stopOpacity=".6" /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient>
      <clipPath id={paint('body-clip')}><path d={shape.body} /></clipPath>
    </defs>
    <ellipse cx="412" cy="347" rx="363" ry="33" fill={`url(#${paint('shadow')})`} />
    <Wheel x={216} rim={paint('rim')} /><Wheel x={600} rim={paint('rim')} />
    <path d={shape.body} fill={`url(#${paint('base')})`} stroke="#aab6c333" strokeWidth="1.5" />
    <g className={painting ? 'paint-color-layer is-painting' : 'paint-color-layer'}>
      <path d={shape.body} fill={`url(#${paint('color')})`} />
    </g>
    <path d={shape.body} fill={`url(#${paint('shade')})`} />
    <g clipPath={`url(#${paint('body-clip')})`} fill="none">
      <path d="M80 229 Q320 209 724 237" stroke="white" strokeOpacity={glossy ? '.48' : '.12'} strokeWidth="2" />
      <path d="M75 278 Q396 307 737 269" stroke="#000" strokeOpacity=".25" strokeWidth="10" />
      <path d={shape.doors} stroke="#111b28" strokeOpacity=".5" strokeWidth="1.5" />
      <path d="M95 299 L716 299" stroke="#111923" strokeWidth="10" />
    </g>
    <path d={shape.roof} fill="none" stroke="#dbe7ee" strokeOpacity=".65" strokeWidth="2" />
    <path d={shape.windows} fill={`url(#${paint('glass')})`} stroke="#151f2b" strokeWidth="6" strokeLinejoin="round" />
    <path d={shape.pillar} fill="none" stroke="#101824" strokeWidth="9" />
    <path d={shape.windows} fill="none" stroke="#b5c3d1" strokeOpacity=".6" strokeWidth="1.5" />
    <path d="M501 201 Q521 190 540 202 L542 212 L518 216 Z" fill="#202b37" stroke="#acb8c4" strokeWidth="1" />
    <rect x="357" y={model === 'suv' ? 192 : 217} width="25" height="5" rx="2.5" fill="#242e3b" />
    {model !== 'coupe' && <rect x="482" y={model === 'suv' ? 192 : 217} width="24" height="5" rx="2.5" fill="#242e3b" />}
    <path d="M681 226 L725 240 L732 250 L683 242 Z" fill="#e9f7ff" stroke="#9bc4df" strokeWidth="1" />
    <path d="M82 238 L119 232 L116 244 L77 252 Z" fill="#ff4856" />
    <path d="M693 271 L738 264 L734 285 L692 290 Z" fill="#121c28" />
    <path d="M699 275 L732 270 M699 281 L730 277" stroke="#566474" strokeWidth="2" />
    {painting && <g className="paint-spray" aria-hidden="true">
      <ellipse cx="0" cy="226" rx="76" ry="107" fill={`url(#${paint('mist')})`} />
      {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={(i * 29) % 100 - 50} cy={145 + (i * 37) % 160} r={1 + i % 3} fill={color} opacity={.25 + (i % 4) * .15} />)}
      <path d="M-16 78 L13 78 L20 88 L12 97 L-15 97 Z" fill="#e4eaf0" stroke="#8492a2" strokeWidth="2" />
      <rect x="-10" y="47" width="19" height="29" rx="4" fill="#eef1f5" />
      <path d="M-5 97 L-12 116 L-4 120 L5 98" fill="#8492a2" />
      <path d="M0 108 L0 126" stroke="#d4dfe9" strokeWidth="3" />
      <path d="M0 127 L-40 183 L40 183 Z" fill={`url(#${paint('mist')})`} />
    </g>}
  </svg>;
}
