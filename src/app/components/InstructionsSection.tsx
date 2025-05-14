"use client";

import { motion } from "framer-motion";
import { InstructionsSectionProps } from "../types/interfaces";

const InstructionsSection = ({}: InstructionsSectionProps) => {
  return (
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
  );
};

export default InstructionsSection;