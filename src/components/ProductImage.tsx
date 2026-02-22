import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackText?: string;
}

const ProductImage = ({
  src,
  alt,
  width,
  height,
  className,
  fallbackText,
}: ProductImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImageSrc(
        `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(fallbackText || alt)}`,
      );
    }
  };
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
};

export default ProductImage;
