import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { BrandFilter } from '../types';

interface FiltersProps {
  selectedBrand: BrandFilter | null;
  setSelectedBrand: (brand: BrandFilter | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedPriceRange: [number, number];
  setSelectedPriceRange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
  selectedColour: string | null;
  setSelectedColour: (colour: string | null) => void;
}

export function Filters({
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  minPrice,
  maxPrice,
  selectedColour,
  setSelectedColour,
}: FiltersProps) {
  const brands: BrandFilter[] = [
    'Dorothy Perkins',
    'Oasis',
    'PixieGirl',
    'River Island',
    'Roman',
    'Papaya',
    'Boden',
    'M&Co',
  ];

  const categories: string[] = [
    'Tops',
    'Knitwear',
    'Cardigan',
    'Dresses',
    'Skirts',
    'Jumpsuits & Playsuits',
    'Shorts',
    'Trousers',
    'Jeans',
    'Leggings & Jeggings',
    'Blazers',
    'Coats & Jackets',
    'Swimwear',
    'Nightwear',
    'Lingerie',
  ];

  const colors: { name: string; colorCode: string }[] = [
    { name: 'Black', colorCode: '#000000' },
    { name: 'White', colorCode: '#FFFFFF' },
    { name: 'Gray', colorCode: '#d8d8d8' },
    { name: 'Cream', colorCode: '#F5F5DC' },
    { name: 'Brown', colorCode: '#594235' },
    { name: 'Navy', colorCode: '#000080' },
    { name: 'Burgundy', colorCode: '#800020' },
    { name: 'Floral', colorCode: 'url(/floral-pattern.png)' },
    { name: 'Mid Wash', colorCode: '#6CA0DC' },
    { name: 'Multicolour', colorCode: 'url(/multicolour-pattern.png)' },
    { name: 'Khaki', colorCode: '#BDB76B' },
    { name: 'Berry', colorCode: '#8A2BE2' },
    { name: 'Blue', colorCode: '#0000FF' },
    { name: 'Red', colorCode: '#e32727' },
    { name: 'Pink', colorCode: '#f569d9' },
    { name: 'Green', colorCode: '#299c17' },
    { name: 'Yellow', colorCode: '#f0c802' },
    { name: 'Purple', colorCode: '#b12ed9' },
    { name: 'Orange', colorCode: '#ff7518' },
  ];

  const priceRanges = [
    { label: 'Under £50', range: [0, 50] },
    { label: '£50 - £100', range: [50, 100] },
    { label: '£100 - £200', range: [100, 200] },
    { label: '£200 - £500', range: [200, 500] },
    { label: 'Above £500', range: [500, maxPrice] },
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Brand Filter Section */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Brands:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBrand(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedBrand === null
                  ? 'bg-beige-100 text-black'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() =>
                  setSelectedBrand(selectedBrand === brand ? null : brand)
                }
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedBrand === brand
                    ? 'bg-beige-100 text-black'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Category Filter Section */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Categories:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-beige-100 text-black'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Color Filter Section */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Colours:</span>
            </div>
            <button
              onClick={() => setSelectedColour(null)}
              className="text-sm font-medium text-blue-500 hover:underline"
            >
              Reset
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() =>
                  setSelectedColour(selectedColour === color.name ? null : color.name)
                }
                className={`w-8 h-8 rounded-full border transition-colors ${
                  selectedColour === color.name
                    ? 'border-black'
                    : 'border-gray-300 hover:border-black'
                }`}
                style={{
                  backgroundColor: color.colorCode,
                  backgroundImage: color.colorCode.includes('url')
                    ? color.colorCode
                    : 'none',
                }}
                title={color.name}
              />
            ))}
          </div>

          {/* Price Filter Section */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Price Range:</span>
            </div>
            <select
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              value={JSON.stringify(selectedPriceRange)}
              onChange={(e) => {
                const range = JSON.parse(e.target.value);
                setSelectedPriceRange(range);
              }}
            >
              <option value={JSON.stringify([minPrice, maxPrice])}>
                All Prices
              </option>
              {priceRanges.map(({ label, range }) => (
                <option key={label} value={JSON.stringify(range)}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
