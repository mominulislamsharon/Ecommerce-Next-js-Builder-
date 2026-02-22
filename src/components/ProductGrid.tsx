"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { categories } from "@/data/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  initialCategory?: string;
}

export default function ProductGrid({
  products,
  initialCategory = "all",
}: ProductGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || initialCategory,
  );

  // useEffect(() => {
  //   const category = searchParams.get("category") || "all";
  //   setSelectedCategory(category);
  // }, [searchParams]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug === "all") {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-4 border-b border-gray-200 pb-4">
        {categories.map((category) => (
          <button
            onClick={() => handleCategoryChange(category.slug)}
            className={`font-medium cursor-pointer transition-colors ${selectedCategory === category.slug ? "text-indigo-600 " : ""}`}
            key={category.slug}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-gray-500">
          No products available in this category.
        </div>
      )}
    </div>
  );
}
