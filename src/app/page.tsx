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
        icon: '🔍',
        iconTheme: {
          primary: '#7F7FDB',
          secondary: '#FFFFFF',
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
        icon: '⚠️',
        iconTheme: {
          primary: '#FF4B4B',
          secondary: '#FFFFFF',
        },
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="text-center max-w-xl w-full">
        {/* Toast Container */}
        <Toaster />

        {/* Logo */}
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
        <div className="mt-6 space-y-4">
          {/* National ID Input */}
          <div>
            <label className="block text-sm text-shadow-smfont-medium text-white mb-2 text-left">
              เลขบัตรประชาชน
            </label>
            <input
              type="text"
              value={nationalID}
              onChange={handleInputChange}
              placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
              className="relative w-full cursor-default rounded-lg bg-[rgba(255,255,255,0.25)] backdrop-blur-sm border border-[#F89EBA)] py-3 px-4 text-left text-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="shadow-md w-full mt-4 rounded-lg bg-[#fff] py-3 px-4 text-[#7F7FDB] hover:bg-[#ddd] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
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
        </div>

        {/* MIT License Copyright */}
        <div className="mt-12 text-xs font-light text-white opacity-50">
          <p>สงวนลิขสิทธิ์ <Link href="https://github.com/Pathumlnw" target="_blank" rel="noopener noreferrer" className="hover:underline hover:opacity-80">Pathumlnw</Link> © {currentYear}</p>
        </div>
      </div>
    </div>
  );
}
