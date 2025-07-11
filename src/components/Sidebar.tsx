import React, { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>(["apple", "Watch", "Fashion", "Trend", "Shoes", "Shirt"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error Fetching Data', error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword('');
  };

  return (
    <motion.aside
      className="w-full sm:w-64 h-screen bg-white p-6 shadow-lg overflow-y-auto"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-8 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        eCommerce Website
      </motion.h1>
      <motion.h2
        className="text-l mb-8 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        by Akshaj Deepak
      </motion.h2>

      <section className="space-y-6">
        <motion.input
          type="text"
          className="w-full border px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
          placeholder="Search for products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        <motion.div
          className="flex items-center justify-between gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <input
            type="text"
            className="w-1/2 border px-3 py-2 rounded-full text-sm text-center"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="w-1/2 border px-3 py-2 rounded-full text-sm text-center"
            placeholder="Max"
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="space-y-2">
            <AnimatePresence>
              {categories.map((category, index) => (
                <motion.label
                  key={index}
                  className="flex items-center text-sm cursor-pointer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    className="mr-2 accent-black"
                    onChange={() => handleRadioChangeCategories(category)}
                    checked={selectedCategory === category}
                  />
                  {category.toUpperCase()}
                </motion.label>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-lg font-semibold mb-2 mt-4">Keywords</h2>
          <div className="grid grid-cols-2 gap-2">
            {keywords.map((word, index) => (
              <motion.button
                key={index}
                onClick={() => handleKeywordClick(word)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-sm transition-all hover:scale-105"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.03 }}
              >
                {word.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.button
          className="w-full py-2 bg-black text-white rounded-full mt-6 hover:bg-gray-800 transition hover:scale-105"
          onClick={handleResetFilters}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Reset Filters
        </motion.button>
      </section>
    </motion.aside>
  );
};

export default Sidebar;
