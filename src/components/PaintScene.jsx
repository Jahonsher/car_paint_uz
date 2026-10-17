import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../localization/LanguageContext";
const colors = [
  { name: "lime", color: "#d5ed51" },
  { name: "red", color: "#f06550" },
  { name: "blue", color: "#75a7ef" },
  { name: "silver", color: "#c9ced7" },
];
export default function PaintScene() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const scene = useRef(null);
  const frame = useRef(null);
  useEffect(() => {
    const node = scene.current;
    const observer = new IntersectionObserver(([entry]) => {
      node.style.setProperty(
        "--play-state",
        entry.isIntersecting ? "running" : "paused",
      );
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);
  function tilt(event) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      scene.current?.style.setProperty("--tilt-x", -y * 10 + "deg");
      scene.current?.style.setProperty("--tilt-y", x * 16 + "deg");
    });
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    scene.current?.style.setProperty("--tilt-x", "0deg");
    scene.current?.style.setProperty("--tilt-y", "0deg");
  }
  return (
    <div
      className="paint-showcase"
      style={{ "--paint": colors[selected].color }}
    >
      <div
        className="paint-stage"
        ref={scene}
        onPointerMove={tilt}
        onPointerLeave={reset}
        role="img"
        aria-label={t("visualLabel")}
      >
        <div className="stage-grid" />
        <div className="stage-orbit orbit-one" />
        <div className="stage-orbit orbit-two" />
        <span className="scene-coordinate">CP / COLOR STUDIO</span>
        <span className="scene-edition">01 — 04</span>
        <div className="paint-assembly">
          <div className="paint-shadow" />
          <div className="paint-can">
            <div className="can-handle" />
            <div className="can-body">
              <div className="can-label">
                <span className="can-wordmark">carpaint</span>
                <span className="can-rule" />
                <span className="can-series">
                  COLOR
                  <br />
                  WITHOUT
                  <br />
                  <strong>LIMITS.</strong>
                </span>
                <div className="can-label-bottom">
                  <span>
                    PROFESSIONAL
                    <br />
                    AUTOMOTIVE FINISH
                  </span>
                  <span>01</span>
                </div>
              </div>
            </div>
            <div className="can-lid">
              <div />
            </div>
            <div className="can-bottom" />
          </div>
          <div className="color-chip chip-one" />
          <div className="color-chip chip-two" />
          <div className="color-chip chip-three" />
        </div>
        <div className="scene-caption">
          <span className="status-dot" />
          {t("heroFeature1")}
          <span>↗</span>
        </div>
      </div>
      <div className="color-controls">
        <div>
          <span className="micro-label">{t("colorLabel")}</span>
          <p>{t("colorNote")}</p>
        </div>
        <div className="swatches" role="group" aria-label={t("colorLabel")}>
          {colors.map((color, i) => (
            <button
              key={color.name}
              type="button"
              className={"swatch " + (i === selected ? "selected" : "")}
              style={{ "--swatch": color.color }}
              onClick={() => setSelected(i)}
              aria-label={t(color.name)}
              aria-pressed={selected === i}
              title={t(color.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
