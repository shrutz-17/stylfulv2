import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { ProductCard } from './components/ProductCard';
import { fetchAndMergeCSV } from './utils/csvUtils';
import { parsePrice } from './utils/productData';

function App() {
  const [products, setProducts] = useState<any[]>([]); // List of all products
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColour, setSelectedColour] = useState<string | null>(null); // New state for colour filter
  const [sortOption, setSortOption] = useState('newest');
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 1000]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [page, setPage] = useState(1); // Current pagination page

  // Load products from multiple CSV files on mount
  useEffect(() => {
    fetchAndMergeCSV([
      '/riverislandpetite.csv',
      '/dorothyperkins.csv',
      '/matalan-2024-11-21.csv',
      'boden-2024-11-24.csv',
      //'/products.csv'
    ])
      .then((data) => {
        console.log('Fetched Data:', data); // Debugging: log fetched data
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading CSV:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  // Calculate min and max price dynamically
  const minPrice = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.min(
      ...products.map((product) => parsePrice(product.currentPrice) || 0)
    );
  }, [products]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.max(
      ...products.map((product) => parsePrice(product.currentPrice) || 0)
    );
  }, [products]);

  // Get unique colours and include "All Colours" option
  const uniqueColours = Array.from(
    new Set(products.map((product) => product.colour))
  );
  uniqueColours.unshift('All Colours'); // Add 'All Colours' as a default option

  // Updated filtered and sorted products logic
  const filteredAndSortedProducts = useMemo(() => {
    try {
      let result = [...products];

      // Apply search filter
      if (searchQuery) {
        result = result.filter(
          (product) =>
            (product.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) ||
            (product.description
              ?.toLowerCase()
              ?.includes(searchQuery.toLowerCase()) ?? false)
        );
      }

      // Apply brand filter
      if (selectedBrand) {
        result = result.filter((product) => product.brand === selectedBrand);
      }

      // Apply category filter
      if (selectedCategory) {
        result = result.filter((product) => product.category === selectedCategory);
      }

      // Apply colour filter (new logic to handle empty colour fields)
      if (selectedColour && selectedColour !== 'All Colours') {
        result = result.filter((product) => {
          const productColour = product.colour?.toLowerCase()?.trim(); // Normalize to lowercase and trim spaces
          const selectedColourNormalized = selectedColour.toLowerCase().trim(); // Normalize selected colour

          // Return true if product color matches the selected color
          return productColour === selectedColourNormalized;
        });
      } else if (selectedColour === 'All Colours') {
        // If "All Colours" is selected, don't filter by colour at all
      }

      // Apply price range filter
      result = result.filter((product) => {
        const price = parsePrice(product.currentPrice);
        return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
      });

      // Sorting logic
      if (sortOption === 'price-asc') {
        result.sort((a, b) => parsePrice(a.currentPrice) - parsePrice(b.currentPrice));
      } else if (sortOption === 'price-desc') {
        result.sort((a, b) => parsePrice(b.currentPrice) - parsePrice(a.currentPrice));
      } else if (sortOption === 'discount') {
        result.sort((a, b) => parsePrice(b.originalPrice) - parsePrice(a.originalPrice));
      } else if (sortOption === 'newest') {
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      }

      return result;
    } catch (error) {
      console.error('Error during filtering or sorting', error);
      return [];
    }
  }, [products, selectedBrand, selectedCategory, selectedColour, selectedPriceRange, sortOption, searchQuery]);

  // Pagination logic (after filtering and sorting)
  const itemsPerPage = 40;
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, page]);

  // Total product count (after filtering)
  const totalProductCount = filteredAndSortedProducts.length;

  // Calculate total pages
  const totalPages = Math.ceil(totalProductCount / itemsPerPage);

  return (
    <div className="App">
      <Header />
      <div className="container mx-auto px-4 py-6 flex">
        {/* Filters on the left */}
        <div className="w-full sm:w-1/4 lg:w-1/4">
          <Filters
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedColour={selectedColour}
            setSelectedColour={setSelectedColour}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            sortOption={sortOption}
            setSortOption={setSortOption}
            minPrice={minPrice}
            maxPrice={maxPrice}
            uniqueColours={uniqueColours}
          />
        </div>

        {/* Product listings on the right */}
        <div className="w-full sm:w-3/4 lg:w-3/4 pl-6">
          {/* Product Count and Sort by Filter */}
          <div className="flex justify-between items-center mb-4">
            <div>{totalProductCount} products found</div>
            <div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border px-2 py-1"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>

          {/* Display the products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {/* Display page numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-4 py-2 border rounded ${page === pageNumber ? 'bg-blue-500 text-white' : 'bg-white'}`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
