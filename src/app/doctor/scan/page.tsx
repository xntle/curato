import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import DoctorSidebar from "../sidebar";

const items = [
  { title: "Home", url: "/doctor", icon: Home },
  { title: "Start", url: "/doctor/start", icon: Home },
  { title: "Scan", url: "/doctor/scan", icon: Search },
];

export default function ScanPage() {
  return (
    <>
      <DoctorSidebar></DoctorSidebar>
    </>
  );
}
