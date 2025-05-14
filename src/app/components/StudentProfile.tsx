"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StudentProfileProps } from "../types/interfaces";
import { useState } from "react";

const StudentProfile = ({ studentProfiles, formatFieldName }: StudentProfileProps) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Function to check if a field is either student ID or password
  const isPriorityField = (key: string) => {
    const priorityFields = ['รหัสนักเรียน', 'รหัสผ่าน', 'studentId', 'password', 'student_id', 'student_password'];
    return priorityFields.some(field => key.toLowerCase().includes(field.toLowerCase()));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-br from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden relative"
    >
      {/* Modern glass morphism effects */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-20 w-40 h-40 bg-pink-500 opacity-5 rounded-full blur-3xl"></div>

      <div className="flex items-center mb-6 relative z-10">
        <div className="mr-3 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
        </div>
        <h2 className="text-xl text-shadow-md font-semibold text-white">
          ข้อมูลนักเรียน
        </h2>
      </div>

      <div className="space-y-5">
        {studentProfiles.map((profile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white bg-opacity-95 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl"
            onClick={() => toggleCard(index)}
          >
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-1.5"></div>
            <div className="p-5">
              {/* Priority Fields Section (Student ID and Password) */}
              <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(profile)
                    .filter(([key]) => key !== "id")
                    .filter(([key]) => isPriorityField(key))
                    .map(([key, value], idx) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: idx * 0.03 + index * 0.1,
                          duration: 0.3,
                        }}
                        className="group"
                      >
                        <div className="flex flex-col border-l-2 border-blue-500 pl-3 transition-all duration-300">
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                            {formatFieldName(key)}
                          </span>
                          <span className="text-gray-800 font-medium">
                            {value?.toString() || "—"}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Other Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(profile)
                  .filter(([key]) => key !== "id")
                  .filter(([key]) => !isPriorityField(key))
                  .map(([key, value], idx) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: idx * 0.03 + index * 0.1,
                        duration: 0.3,
                      }}
                      className="group"
                    >
                      <div className="flex flex-col border-l-2 border-gray-200 group-hover:border-blue-500 pl-3 transition-all duration-300">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {formatFieldName(key)}
                        </span>
                        <span className="text-gray-800 font-medium truncate">
                          {value?.toString() || "—"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentProfile;