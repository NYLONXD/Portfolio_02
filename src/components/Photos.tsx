import { useState } from "react";
import { Photo, photos } from "../data/profile";
import "../styles/photos.css";

/** A photo as the tube would show it: one phosphor color, scanlines, fading at the edges. */
export function PhosphorImage({
  photo,
  sizes,
  color = false,
  lazy = false,
}: {
  photo: Photo;
  sizes: string;
  color?: boolean;
  lazy?: boolean;
}) {
  return (
    <div className="phosphor" data-color={color || undefined}>
      <img
        src={`${photo.src}-800.webp`}
        srcSet={`${photo.src}-480.webp 480w, ${photo.src}-800.webp 800w`}
        sizes={sizes}
        width={800}
        height={1000}
        alt={photo.alt}
        loading={lazy ? "lazy" : undefined}
        decoding="async"
      />
    </div>
  );
}

/** Image viewer for the About section: pick a photo, or see it in real color. */
export default function Photos() {
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(false);

  return (
    <figure className="file photos">
      <div className="file-name photos-bar">
        <span className="photos-files">
          {photos.map((p, i) => (
            <button
              key={p.file}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              {p.file}
            </button>
          ))}
        </span>
        <button
          type="button"
          className="photos-color"
          aria-pressed={color}
          onClick={() => setColor((c) => !c)}
        >
          color
        </button>
      </div>
      <PhosphorImage
        key={photos[index].file}
        photo={photos[index]}
        color={color}
        sizes="(max-width: 900px) calc(100vw - 32px), 460px"
        lazy
      />
    </figure>
  );
}
