import { redirect } from "next/navigation";

export default function Home() {
  // ใช้ฟังก์ชัน redirect เพื่อเด้งไปหน้า login
  redirect("/homepage");
  return null; // ป้องกันไม่ให้แสดงเนื้อหา
}
