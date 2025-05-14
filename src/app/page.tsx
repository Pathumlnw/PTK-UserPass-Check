"use client"; // Add this directive at the top to make it a client component

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Define the type for our student profile data
interface StudentProfile {
  [key: string]: string | number | boolean | null;
}

export default function Page() {
  const [nationalID, setNationalID] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const toastStyle = {
    background: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    borderRadius: "10px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and limit to 13 characters
    if (/^\d*$/.test(value) && value.length <= 13) {
      setNationalID(value);
    }
  };

  const handleSubmit = async () => {
    if (nationalID.length === 13) {
      setLoading(true);
      setError("");
      setShowResults(false);

      try {
        // Show loading toast
        const loadingToast = toast.loading("กำลังค้นหาข้อมูลนักเรียน...", {
          position: "top-center",
          style: toastStyle,
        });

        // Fetch student profiles from API
        const response = await fetch(`/api/get-profile?id=${nationalID}`);
        const data = await response.json();
        toast.dismiss(loadingToast);

        if (response.ok) {
          if (data.studentProfiles && data.studentProfiles.length > 0) {
            setStudentProfiles(data.studentProfiles);
            setShowResults(true);
            toast.success("พบข้อมูลนักเรียนเรียบร้อย", {
              duration: 3000,
              position: "top-center",
              style: toastStyle,
              icon: "✅",
              iconTheme: {
                primary: "#7F7FDB",
                secondary: "#FFFFFF",
              },
            });
          } else {
            setStudentProfiles([]);
            setError("ไม่พบข้อมูลนักเรียนที่ตรงกับเลขบัตรประชาชนนี้");
            toast.error("ไม่พบข้อมูลนักเรียนที่ตรงกับเลขบัตรประชาชนนี้", {
              duration: 3000,
              position: "top-center",
              style: toastStyle,
              icon: "❌",
              iconTheme: {
                primary: "#FF4B4B",
                secondary: "#FFFFFF",
              },
            });
          }
        } else {
          setError(
            `เกิดข้อผิดพลาด: ${
              data.error || "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์"
            }`
          );
          toast.error("เกิดข้อผิดพลาดในการค้นหาข้อมูล", {
            duration: 3000,
            position: "top-center",
            style: toastStyle,
            icon: "⚠️",
            iconTheme: {
              primary: "#FF4B4B",
              secondary: "#FFFFFF",
            },
          });
        }
      } catch (err) {
        setError(
          `เกิดข้อผิดพลาด: ${
            err instanceof Error
              ? err.message
              : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ"
          }`
        );
        toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์", {
          duration: 3000,
          position: "top-center",
          style: toastStyle,
          icon: "⚠️",
          iconTheme: {
            primary: "#FF4B4B",
            secondary: "#FFFFFF",
          },
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก", {
        duration: 3000,
        position: "top-center",
        style: toastStyle,
        icon: "⚠️",
        iconTheme: {
          primary: "#FF4B4B",
          secondary: "#FFFFFF",
        },
      });
    }
  };

  const currentYear = new Date().getFullYear();

  // Helper function to format field names for display
  const formatFieldName = (key: string) => {
    // Map database field names to Thai display names
    const fieldNameMap: Record<string, string> = {
      id: "รหัสนักเรียน",
      NatId: "เลขประจำตัวประชาชน",
      FirstName: "ชื่อ",
      LastName: "นามสกุล",
      Class: "ระดับชั้น",
      Room: "ห้อง",
      StudentNum: "เลขที่",
      Gender: "เพศ",
      Birthday: "วันเกิด",
      Address: "ที่อยู่",
      Phone: "เบอร์โทรศัพท์",
      Email: "อีเมล",
      ParentName: "ชื่อผู้ปกครอง",
      ParentPhone: "เบอร์โทรผู้ปกครอง",
      created_at: "วันที่สร้างข้อมูล",
      updated_at: "วันที่อัพเดทล่าสุด",
      // Add more mappings as needed
    };

    return fieldNameMap[key] || key;
  };

  return (
    <div className="min-h-screen py-8 px-4 overflow-auto">
      {/* Toast Container */}
      <Toaster />{" "}
      <div className="max-w-xl mx-auto">
        <div className="space-y-6">
          {/* Logo */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Image
                src="/Logo.png"
                alt="PTK Logo"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl font-bold text-shadow-lg text-white"
            >
              ระบบฐานข้อมูลผู้ใช้งานระบบบริการนักเรียน
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-2 text-white text-shadow-lg font-light"
            >
              ระบบลงทะเบียนวิชาทั่วไป วิชาเลือก กิจกรรมชุมนุม
            </motion.p>
          </motion.div>{" "}
          {/* Search Form */}
          <motion.div
            className="bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div className="space-y-4">
              {/* National ID Input */}
              <div>
                <motion.div
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-[#ffffff]"
                    viewBox="0 0 576 512"
                    fill="white"
                  >
                    <path d="M0 96l576 0c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96zm0 32L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-288L0 128zM64 405.3c0-29.5 23.9-53.3 53.3-53.3l117.3 0c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7L74.7 416c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z" />
                  </svg>
                  <h2 className="text-xl text-shadow-md font-semibold text-white">
                    เลขประจำตัวประชาชน
                  </h2>
                </motion.div>
                <motion.input
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  type="text"
                  value={nationalID}
                  onChange={handleInputChange}
                  placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
                  className="relative w-full cursor-default rounded-lg bg-[rgba(0,0,0,0)] backdrop-blur-sm border border-[rgba(255,255,255,0.25)] py-3 px-4 text-left text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-500 sm:text-sm"
                />
              </div>{" "}
              {/* Submit Button and Clear Button */}
              <div className="flex space-x-2">
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  className="shadow-md flex-grow rounded-lg bg-[#fff] py-3 px-4 text-[#7F7FDB] hover:bg-[#ddd] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-[#7F7FDB]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>กำลังค้นหา...</span>
                    </div>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>ค้นหา</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setNationalID("");
                    setShowResults(false);
                    setError("");
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shadow-md rounded-lg bg-[rgba(255,255,255,0.3)] py-3 px-4 text-white hover:bg-[rgba(255,255,255,0.4)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                >
                  ล้าง
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          {/* Student Profile Results */}
          <AnimatePresence>
            {showResults && studentProfiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-br from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.05)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] rounded-2xl p-8 shadow-xl overflow-hidden relative"
              >
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

                <div className="flex items-center mb-6 relative z-10">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-[#ffffff]"
                    viewBox="0 0 512 512"
                    fill="white"
                    >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                    <h2 className="text-xl text-shadow-md font-semibold text-white">
                    ข้อมูลนักเรียน
                    </h2>
                </div>

                <div className="space-y-4">
                  {studentProfiles.map((profile, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="bg-white bg-opacity-95 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2"></div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {Object.entries(profile).map(([key, value], idx) => (
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
                                <span className="text-gray-800 font-medium">
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
            )}

            {error && (
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
            )}
          </AnimatePresence>
          {/* Analytics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-xl p-6 shadow-lg text-white"
          >
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ffffff]"
                viewBox="0 0 448 512"
                fill="white"
              >
                <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
              </svg>
              <h2 className="text-xl text-shadow-md font-semibold">
                สถิติข้อมูลนักเรียน
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              {/* Total Students */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center p-3 bg-white shadow-lg rounded-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                  }}
                  className="p-2 rounded-full bg-[rgba(255,127,196,0.3)] mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FF7FC4]"
                    viewBox="0 0 640 512"
                    fill="currentColor"
                  >
                    <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                  </svg>
                </motion.div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-900 font-light opacity-80">
                    จำนวนนักเรียนทั้งหมด
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-2xl font-bold text-[#FF7FC4]"
                  >
                    3827
                  </motion.p>
                </div>
              </motion.div>

              {/* Male Students */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center p-3 bg-white shadow-lg rounded-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5,
                  }}
                  className="p-2 rounded-full bg-[rgba(99,179,237,0.3)] mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#63B3ED]"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                  </svg>
                </motion.div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-900 font-light opacity-80">
                    นักเรียนชาย
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-2xl font-bold text-[#63B3ED]"
                  >
                    1595
                  </motion.p>
                </div>
              </motion.div>

              {/* Female Students */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center p-3 bg-white shadow-lg rounded-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.7,
                  }}
                  className="p-2 rounded-full bg-[rgba(246,135,179,0.3)] mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#F687B3]"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                  </svg>
                </motion.div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-900 font-light opacity-80">
                    นักเรียนหญิง
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-2xl font-bold text-[#F687B3]"
                  >
                    2232
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>{" "}
          {/* Instructions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-xl p-6 shadow-lg text-white"
          >
            <motion.div
              className="flex items-center mb-4"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ffffff]"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
              </svg>
              <h2 className="text-xl text-shadow-md font-semibold">
                วิธีใช้งานระบบ
              </h2>
            </motion.div>

            <div className="space-y-3">
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-[#F89EBA] text-sm font-medium mr-3 mt-0.5 shrink-0">
                  1
                </div>
                <div className="text-left">
                  <p className="font-medium">ค้นหาข้อมูลนักเรียน</p>
                  <p className="text-sm font-light opacity-80">
                    กรอกเลขประจำตัวประชาชน 13 หลักของนักเรียนในช่องค้นหา
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-[#F89EBA] text-sm font-medium mr-3 mt-0.5 shrink-0">
                  2
                </div>
                <div className="text-left">
                  <p className="font-medium">ดูข้อมูลนักเรียน</p>
                  <p className="text-sm font-light opacity-80">
                    คลิกที่ปุ่ม &quot;ค้นหา&quot;
                    เพื่อแสดงข้อมูลทั้งหมดของนักเรียน
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-[#F89EBA] text-sm font-medium mr-3 mt-0.5 shrink-0">
                  3
                </div>
                <div className="text-left">
                  <p className="font-medium">ดูสถิติข้อมูลนักเรียน</p>
                  <p className="text-sm font-light opacity-80">
                    เลื่อนลงไปที่ส่วน &quot;สถิติข้อมูลนักเรียน&quot;
                    เพื่อดูจำนวนนักเรียนทั้งหมด
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {/* MIT License Copyright */}
          <div className="text-xs font-light text-white opacity-50 text-center py-4">
            <p>
              สงวนลิขสิทธิ์{" "}
              <Link
                href="https://github.com/Pathumlnw"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:opacity-80"
              >
                Pathumlnw
              </Link>{" "}
              © {currentYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
