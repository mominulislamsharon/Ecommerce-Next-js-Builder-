import { Product } from "@/types/product";
import Link from "next/link";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link className="group" href={`/product/${product.slug}`}>
      <div>
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <ProductImage
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-center rounded-lg transition-transform group-hover:scale-105"
            fallbackText={product.name}
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-sm font-semibold text-gray-500">
          ${product.price.toFixed(2)} {product.currency}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
