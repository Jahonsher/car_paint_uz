import { useId } from 'react';

const inks = { amber: '#df9c32', teal: '#078e9d', coral: '#f04b55', blue: '#3374de', green: '#78ac32', mint: '#10a286', cyan: '#35b7de' };

// Decorative, deterministic vector paint: no extra bitmap downloads or runtime filters.
export default function PaintSplash({ tone = 'blue', variant = 0, className = '' }) {
  const id = useId().replace(/:/g, '');
  const droplets = Array.from({ length: 36 }, (_, index) => {
    const angle = (index * 137.508 + variant * 43) * Math.PI / 180;
    const radius = 158 + ((index * 37 + variant * 19) % 128);
    const size = 2 + ((index * 11 + variant * 7) % 13);
    return { x: 320 + Math.cos(angle) * radius, y: 320 + Math.sin(angle) * radius, size, angle: angle * 180 / Math.PI };
  });
  return <svg className={`paint-splash ${className}`} viewBox="0 0 640 640" fill="none" aria-hidden="true" focusable="false" style={tone === 'story' ? undefined : { '--splash-ink': inks[tone] || inks.blue }}>
    <defs>
      <linearGradient id={`${id}-ink`} x1="138" y1="100" x2="490" y2="560" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--splash-ink)" /><stop offset=".56" stopColor="var(--splash-ink)" stopOpacity=".9" /><stop offset="1" stopColor="var(--splash-ink)" stopOpacity=".65" />
      </linearGradient>
      <linearGradient id={`${id}-shine`} x1="220" y1="180" x2="345" y2="490" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity=".3" /><stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g transform={`rotate(${variant * 29} 320 320)`}>
      <path fill={`url(#${id}-ink)`} d="M180 199C198 179 224 186 230 160L243 85C247 64 259 66 263 91L278 161C282 184 298 181 316 165L363 116C383 96 394 103 381 127L356 179C348 196 362 209 381 199L458 154C487 138 498 152 473 176L420 226C405 241 412 256 435 252L535 229C566 222 573 239 540 250L453 283C433 292 442 310 466 315L572 332C604 338 601 351 566 351L463 350C441 350 435 368 454 380L514 420C541 437 533 453 502 442L424 415C404 408 397 426 406 445L432 508C444 538 430 546 413 519L372 458C359 440 344 445 342 469L333 559C329 590 315 590 312 558L301 467C298 446 280 442 268 462L232 522C213 551 199 543 211 511L237 438C243 418 227 407 209 418L148 457C119 475 110 461 134 439L188 389C205 373 196 357 174 362L82 383C49 390 44 374 77 362L167 329C190 320 187 302 164 297L77 279C45 272 48 256 82 259L178 263C199 264 209 247 191 234L126 184C102 164 111 152 138 169Z" />
      <path d="M208 230C253 200 303 224 341 197C375 173 396 183 377 205C339 247 276 229 245 271C223 300 191 288 208 258Z" fill={`url(#${id}-shine)`} />
      <path d="M217 375C245 419 284 432 321 432M363 219C398 231 415 249 426 280" stroke="white" strokeOpacity=".13" strokeWidth="4" strokeLinecap="round" />
      <path d="M174 232C147 220 120 215 89 205M442 371C478 385 498 389 542 391M280 443C272 467 268 493 269 519" stroke="var(--splash-ink)" strokeWidth="8" strokeLinecap="round" opacity=".6" />
    </g>
    <g fill="var(--splash-ink)">{droplets.map((drop, index) => <ellipse key={index} cx={drop.x} cy={drop.y} rx={drop.size} ry={drop.size * .62} transform={`rotate(${drop.angle} ${drop.x} ${drop.y})`} opacity={.45 + (index % 4) * .15} />)}</g>
    <g fill="var(--splash-ink)" opacity=".5">
      {Array.from({ length: 30 }, (_, index) => <circle key={index} cx={72 + (index * 139 + variant * 61) % 496} cy={52 + (index * 197 + variant * 31) % 538} r={.7 + (index % 3) * .65} />)}
    </g>
  </svg>;
}
