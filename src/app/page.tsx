"use client"; // Add this directive at the top to make it a client component

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Import components
import Header from "@/app/components/Header";
import SearchForm from "@/app/components/SearchForm";
import StudentProfile from "@/app/components/StudentProfile";
import ErrorMessage from "@/app/components/ErrorMessage";
import AnalyticsSection from "@/app/components/AnalyticsSection";
import InstructionsSection from "@/app/components/InstructionsSection";
import Footer from "@/app/components/Footer";

// Import types and utils
import { StudentProfile as StudentProfileType } from "@/app/types/interfaces";
import { formatFieldName } from "@/app/utils/formatters";

// Toast styles
const toastStyle = {
  background: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
  borderRadius: "10px",
  padding: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
};

export default function Page() {
  const [nationalID, setNationalID] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentProfiles, setStudentProfiles] = useState<StudentProfileType[]>([]);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

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

  const clearForm = () => {
    setNationalID("");
    setShowResults(false);
    setError("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen py-8 px-4 overflow-auto">
      {/* Toast Container */}
      <Toaster />
      <div className="max-w-xl mx-auto">
        <div className="space-y-6">
          {/* Logo and Header */}
          <Header />
          
          {/* Search Form */}
          <SearchForm
            nationalID={nationalID}
            loading={loading}
            setNationalID={setNationalID}
            handleSubmit={handleSubmit}
            clearForm={clearForm}
          />
          
          {/* Student Profile Results or Error Message */}
          <AnimatePresence>
            {showResults && studentProfiles.length > 0 && (
              <StudentProfile 
                studentProfiles={studentProfiles} 
                formatFieldName={formatFieldName} 
              />
            )}

            {error && <ErrorMessage error={error} />}
          </AnimatePresence>
          
          {/* Analytics Section */}
          <AnalyticsSection 
            totalStudents={3827} 
            maleStudents={1595} 
            femaleStudents={2232} 
          />
          
          {/* Instructions Section */}
          <InstructionsSection />
          
          {/* Footer */}
          <Footer currentYear={currentYear} />
        </div>
      </div>
    </div>
  );
}