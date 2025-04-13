"use client";

import PatientSidebar from "../sidebar";

export default function AppointmentsPage() {
  const upcomingAppointments = [
    {
      date: "April 30, 2025",
      time: "10:00 AM",
      provider: "Dr. Emily Carter",
      location: "UC Davis Clinic, Room 204",
      reason: "Follow-up for lab results",
    },
    {
      date: "May 5, 2025",
      time: "2:30 PM",
      provider: "Dr. Michael Nguyen",
      location: "Dermatology Center",
      reason: "Skin rash consultation",
    },
  ];

  const pastAppointments = [
    {
      date: "March 14, 2025",
      time: "2:20 PM",
      provider: "Dr. Eileen Reilly",
      location: "Urgent Care",
      reason: "Rash all over",
    },
    {
      date: "February 20, 2025",
      time: "9:15 AM",
      provider: "Dr. Tom Yamada",
      location: "Primary Care",
      reason: "Annual physical exam",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <PatientSidebar />
      </div>

      {/* Page content */}
      <div className="flex-1 p-6 space-y-8">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome back 👋
          </h1>
          <p className="text-gray-600 text-sm">
            Here’s a quick look at your appointments.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appt, index) => (
              <div
                key={index}
                className="p-4 border rounded-md shadow-sm bg-white space-y-1"
              >
                <p className="text-gray-700 font-medium">
                  {appt.date} at {appt.time}
                </p>
                <p className="text-gray-600">With {appt.provider}</p>
                <p className="text-gray-600">{appt.location}</p>
                <p className="text-gray-500 text-sm">Reason: {appt.reason}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {pastAppointments.map((appt, index) => (
              <div
                key={index}
                className="p-4 border rounded-md shadow-sm bg-gray-50 space-y-1"
              >
                <p className="text-gray-700 font-medium">
                  {appt.date} at {appt.time}
                </p>
                <p className="text-gray-600">With {appt.provider}</p>
                <p className="text-gray-600">{appt.location}</p>
                <p className="text-gray-500 text-sm">Reason: {appt.reason}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
