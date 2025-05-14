// Helper function to format field names for display
export const formatFieldName = (key: string) => {
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