import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import { motion, AnimatePresence } from "framer-motion";

const MainContent = () => {
  const { keyword, searchQuery, selectedCategory, minPrice, maxPrice } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching specific data", error));
  }, [currentPage, keyword]);

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (minPrice && maxPrice) {
      filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    }
    if (searchQuery) {
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    switch (filter) {
      case "cheap":
        return filtered.sort((a, b) => a.price - b.price);
      case "expensive":
        return filtered.sort((a, b) => b.price - a.price);
      case "popular":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <motion.section
      className="max-w-6xl mx-auto p-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="relative">
            <motion.button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-5 py-2 rounded-full flex items-center gap-2 bg-white shadow-sm hover:shadow-md transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tally3 className="text-gray-600" />
              <span className="capitalize">{filter === "all" ? "Filter" : filter}</span>
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="absolute z-10 mt-2 bg-white rounded-xl shadow-md border w-40 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {["cheap", "expensive", "popular"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilter(option);
                        setDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              <BookCard
                id={product.id}
                title={product.title}
                image={product.thumbnail}
                price={product.price}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-8 gap-4">
          <motion.button
            className="px-6 py-2 border rounded-full bg-white shadow-sm hover:bg-gray-100 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>

          <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>

          <motion.button
            className="px-6 py-2 border rounded-full bg-white shadow-sm hover:bg-gray-100 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default MainContent;
