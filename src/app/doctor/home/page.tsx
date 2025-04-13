"use client";

import { useRouter } from "next/navigation";
import DoctorSidebar from "../sidebar";

const patientsToday = [
  { name: "John Smith", time: "9:00 AM", reason: "Annual Physical" },
  { name: "Emily Chen", time: "10:30 AM", reason: "Follow-up: Hypertension" },
  { name: "Carlos Rodriguez", time: "1:00 PM", reason: "Lab Results Review" },
  { name: "Aisha Patel", time: "3:15 PM", reason: "New Patient Consultation" },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <DoctorSidebar />
      </div>

      {/* Page content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome Back, Doc</h1>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">
            Today&apos;s Appointments
          </h2>
          <div className="bg-white shadow rounded-lg divide-y">
            {patientsToday.map((patient, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push("/doctor/start")}
              >
                <div>
                  <p className="font-medium text-gray-800">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.reason}</p>
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  {patient.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
