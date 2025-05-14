"use client";

import { motion } from "framer-motion";
import { ErrorMessageProps } from "../types/interfaces";

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-gradient-to-r from-[rgba(255,75,75,0.15)] to-[rgba(255,40,40,0.1)] backdrop-blur-md border border-[rgba(255,75,75,0.3)] rounded-xl p-6 shadow-xl"
    >
      <div className="flex items-center">
        <div className="bg-red-500 bg-opacity-20 p-2 rounded-lg mr-3">
          <svg
            className="h-6 w-6 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
        </div>
        <div>
          <p className="text-white font-medium">{error}</p>
          <p className="text-red-200 text-sm mt-1">
            Please try again or contact support
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;