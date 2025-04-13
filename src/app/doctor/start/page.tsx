"use client";

import DoctorSidebar from "../sidebar";

export default function StartPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <DoctorSidebar />
      </div>

      {/* Page content */}
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Start Recording</h1>

        {/* Input for simulated transcript or notes */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Patient Conversation
          </label>
          <textarea
            className="w-full h-32 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start typing or paste the conversation here..."
          ></textarea>
        </div>

        {/* Full EHR Form Section */}
        <div className="p-6 bg-white rounded-lg shadow border space-y-6">
          <h2 className="text-xl font-semibold">EHR Form</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input className="p-2 border rounded" placeholder="Patient Name" />
            <input className="p-2 border rounded" placeholder="Lived Name" />
            <input className="p-2 border rounded" placeholder="DOB" />
            <input className="p-2 border rounded" placeholder="Sex" />
            <input
              className="p-2 border rounded"
              placeholder="Appointment Date/Time"
            />
            <input className="p-2 border rounded" placeholder="Physician" />
            <input className="p-2 border rounded" placeholder="Encounter #" />
            <input
              className="p-2 border rounded"
              placeholder="Appointment Reason"
            />
          </div>

          <div className="grid gap-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Chaperone Documentation"
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Vitals & Smoking Status"
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Chief Complaint"
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Allergies"
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Current Medications"
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Problem List/History"
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Physical Exam"
            />

            <div className="p-4 border rounded bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">SOAP Note</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    S - Subjective
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Patient's description of symptoms, concerns, and history."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    O - Objective
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Provider observations, exam findings, and vitals."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    A - Assessment
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Diagnosis or clinical impression."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    P - Plan
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Treatment plan, prescriptions, follow-up, referrals."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
