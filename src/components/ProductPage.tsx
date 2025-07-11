import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error(`Error fetching product: ${error}`));
    }
  }, [id]);

  if (!product) {
    return <h1 className="text-center mt-10 text-xl font-semibold">Loading...</h1>;
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl text-center"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>

        <motion.img
          src={product.images[0]}
          alt={product.title}
          className="mx-auto mb-6 rounded-lg max-h-64 object-contain"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        />

        <motion.h1
          className="text-2xl sm:text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {product.title}
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-4 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {product.description}
        </motion.p>

        <motion.p
          className="text-xl font-semibold mb-2 text-green-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          ${product.price}
        </motion.p>

        <motion.p
          className="text-md font-medium text-yellow-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Rating: {product.rating} ⭐
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ProductPage;
