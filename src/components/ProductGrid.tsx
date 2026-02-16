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
      <div>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
