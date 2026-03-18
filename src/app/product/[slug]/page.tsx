import ProductImageGallery from "@/components/ProductImageGallery";
import { getProductBySlug } from "@/data/product";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const Products = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* breadcrumb navigation */}

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl px-4 py-4 sm:px-6 lg:px-88">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>

            <Link
              href={`/?category=${product.category}`}
              className="hover:text-gray-900 transition-colors"
            >
              {product.category}
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href={`product/${product.slug}`}
              className="hover:text-gray-900 transition-colors"
            >
              {product.name}
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 grid-cols-1 mb-16">
          {/* product images */}
          <div className="sticky top-8 self-start">
            <ProductImageGallery
              images={product.images || [product.image]}
              productName={product.name}
            />
          </div>

          {/* product info */}
          <div>product info</div>
        </div>
      </div>
    </>
  );
};

export default Products;
