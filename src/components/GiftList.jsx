import React from "react";

export default function GifList({ gifs }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {gifs.map((gif, index) => (
        <img
          key={`${gif.id}-${index}`}
          src={gif.images.fixed_height.url}
          alt={gif.title}
          style={{ cursor: "pointer", borderRadius: "6px" }}
        />
      ))}
    </div>
  );
}