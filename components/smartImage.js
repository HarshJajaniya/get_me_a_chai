"use client";
import Image from "next/image";
import { useState } from "react";

const SmartImage = ({
  src,
  fallback,
  alt,
  width,
  height,
  className,
  priority,
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setImgSrc(fallback)}
    />
  );
};

export default SmartImage;
