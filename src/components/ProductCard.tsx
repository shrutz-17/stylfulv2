import React, { useState } from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const hasDiscount = product.discount && product.originalPrice;

  return (
    <div className="group relative">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={product.imageUrl}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        {hasDiscount && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
            {product.discount}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
          </div>
          <a
            href={product.productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-gray-900">
            {product.currentPrice}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice}
            </span>
          )}
        </div>

        {(product.swatchImage1 || product.swatchImage2) && (
          <div className="flex gap-2 mt-2">
            {product.swatchImage1 && (
              <img
                src={product.swatchImage1}
                alt={product.swatchAlt1}
                className="w-6 h-6 rounded-full border border-gray-200"
              />
            )}
            {product.swatchImage2 && (
              <img
                src={product.swatchImage2}
                alt={product.swatchAlt2}
                className="w-6 h-6 rounded-full border border-gray-200"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}