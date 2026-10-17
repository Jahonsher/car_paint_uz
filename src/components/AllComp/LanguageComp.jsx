import React from "react";

export default function LanguageComp({ lang, setLang }) {
  return (
    <div>
      <select
        defaultValue={lang}
        onChange={(e) => {
          setLang(e.target.value);
          localStorage.setItem("lang", JSON.stringify(e.target.value));
        }}
        style={{
          border: "1px solid white",
          outline: "none",
          padding: "5px 10px",
          textTransform: "uppercase",
          background: "none",
          color: "white",
        }}
      >
        <option value="ru" style={{ color: "black" }}>
          ru
        </option>

        <option value="uz" style={{ color: "black" }}>
          uz
        </option>
        <option value="en" style={{ color: "black" }}>
          en
        </option>
      </select>
    </div>
  );
}
