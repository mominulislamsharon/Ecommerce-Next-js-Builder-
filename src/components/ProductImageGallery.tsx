"use client";
import { useState } from "react";
import ProductImage from "./ProductImage";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({
  images,
  productName,
}: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const displayImage = images.length > 0 ? images : [];

  const selectedImage = displayImage[selectedImageIndex] || "";

  if (displayImage.length === 0) {
    return null;
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="space-y-6">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-200">
        <div
        key={selectedImage}
        className="w-full h-full animate-fade-in">
          <ProductImage
            src={selectedImage}
            alt={`${productName} Image ${selectedImageIndex + 1}`}
            width={800}
            height={800}
            className="w-full h-full object-center rounded-lg transition-opacity duration-300"
          />
          fallbackText={productName}
        </div>
      </div>

      {/* Thumbnail gallery */}
      {displayImage.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImage.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-square w-full overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${selectedImageIndex === index ? "border-blue-500 shadow-md" : "border-gray-200 hover:shadow-lg"}`}
            >
              <ProductImage
                src={image}
                alt={`${productName} Image ${index + 1}`}
                width={200}
                height={200}
                className={`w-full h-full object-center rounded-lg transition-opacity duration-300 ${selectedImageIndex === index ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                fallbackText={`${productName} Thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
