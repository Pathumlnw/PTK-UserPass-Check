"use client"; // Add this directive at the top to make it a client component

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Page() {
  const [nationalID, setNationalID] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and limit to 13 characters
    if (/^\d*$/.test(value) && value.length <= 13) {
      setNationalID(value);
    }
  };

  const handleSubmit = () => {
    if (nationalID.length === 13) {
      toast.success(`ค้นหาด้วยเลขบัตรประชาชน: ${nationalID}`, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        },
        icon: "🔍",
        iconTheme: {
          primary: "#7F7FDB",
          secondary: "#FFFFFF",
        },
      });
      // Add functionality here for searching with the national ID
    } else {
      toast.error("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          borderRadius: "10px",
          padding: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        },
        icon: "⚠️",
        iconTheme: {
          primary: "#FF4B4B",
          secondary: "#FFFFFF",
        },
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen py-8 px-4 overflow-auto">
      {/* Toast Container */}
      <Toaster />

      <div className="max-w-xl mx-auto">
        <div className="space-y-6">
          {/* Logo */}
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="PTK Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-shadow-lg text-white">
              ระบบฐานข้อมูลผู้ใช้งานระบบบริการนักเรียน
            </h1>
            <p className="mt-2 text-white text-shadow-lg font-light opacity-60">
              ระบบลงทะเบียนวิชาทั่วไป วิชาเลือก กิจกรรมชุมนุม
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              {/* National ID Input */}
              <div>
                <div className="flex items-center mb-4">
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
                </div>
                <input
                  type="text"
                  value={nationalID}
                  onChange={handleInputChange}
                  placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
                  className="relative w-full cursor-default rounded-lg bg-[rgba(0,0,0,0)] backdrop-blur-sm border border-[rgba(255,255,255,0.25)] py-3 px-4 text-left text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-500 sm:text-sm"
                />
              </div>

              {/* Submit Button and Clear Button */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="shadow-md flex-grow rounded-lg bg-[#fff] py-3 px-4 text-[#7F7FDB] hover:bg-[#ddd] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 flex items-center justify-center"
                >
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
                </button>
                <button
                  type="button"
                  onClick={() => setNationalID("")}
                  className="shadow-md rounded-lg bg-[rgba(255,255,255,0.3)] py-3 px-4 text-white hover:bg-[rgba(255,255,255,0.4)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                >
                  ล้าง
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-xl p-6 shadow-lg text-white">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ffffff]"
                viewBox="0 0 448 512"
                fill="white"
              >
                <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
              </svg>
              <h2 className="text-xl text-shadow-md font-semibold">สถิติข้อมูลนักเรียน</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Total Students */}
              <div className="flex flex-col items-center p-3 bg-white shadow-lg rounded-lg">
                <div className="p-2 rounded-full bg-[rgba(255,127,196,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FF7FC4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-900 font-light opacity-80">
                  จำนวนนักเรียนทั้งหมด
                </p>
                <p className="text-2xl font-bold text-[#FF7FC4]">3827</p>
              </div>

              {/* Male Students */}
              <div className="flex flex-col items-center p-3 bg-white shadow-lg rounded-lg">
                <div className="p-2 rounded-full bg-[rgba(99,179,237,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#63B3ED]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-900 font-light opacity-80">
                  นักเรียนชาย
                </p>
                <p className="text-2xl font-bold text-[#63B3ED]">1595</p>
              </div>

              {/* Female Students */}
              <div className="flex flex-col items-center p-3 bg-white shadow-lg rounded-lg">
                <div className="p-2 rounded-full bg-[rgba(246,135,179,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#F687B3]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-900 font-light opacity-80">
                  นักเรียนหญิง
                </p>
                <p className="text-2xl font-bold text-[#F687B3]">2232</p>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-xl p-6 shadow-lg text-white">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ffffff]"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
              </svg>
              <h2 className="text-xl text-shadow-md font-semibold">วิธีใช้งานระบบ</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-[#F89EBA] text-sm font-medium mr-3 mt-0.5 shrink-0">
                  1
                </div>
                <div className="text-left">
                  <p className="font-medium">ค้นหาข้อมูลนักเรียน</p>
                  <p className="text-sm font-light opacity-80">
                    กรอกเลขประจำตัวประชาชน 13 หลักของนักเรียนในช่องค้นหา
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-[#F89EBA] text-sm font-medium mr-3 mt-0.5 shrink-0">
                  2
                </div>
                <div className="text-left">
                  <p className="font-medium">ดูข้อมูลนักเรียน</p>
                  <p className="text-sm font-light opacity-80">
                    คลิกที่ปุ่ม "ดูรายละเอียด" เพื่อแสดงข้อมูลทั้งหมดของนักเรียน
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-[#F89EBA] text-sm font-medium mr-3 mt-0.5 shrink-0">
                  3
                </div>
                <div className="text-left">
                  <p className="font-medium">ดูสถิติข้อมูลนักเรียน</p>
                  <p className="text-sm font-light opacity-80">
                    เลื่อนลงไปที่ส่วน "สถิติข้อมูลนักเรียน"
                    เพื่อดูจำนวนนักเรียนทั้งหมด
                  </p>
                </div>
              </div>
            </div>
          </div>

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
