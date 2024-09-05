import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Spinning Circle */}
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"
        style={{
          borderTopColor: "#3498db", // Warna biru pada bagian atas lingkaran
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      {/* Loading Text */}
      <motion.div
        className="mt-4 text-gray-600 text-xl font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Loading...
      </motion.div>
    </div>
  );
};

export default Loading;
