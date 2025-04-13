"use client";

import { useState } from "react";
import PatientSidebar from "../sidebar";
import QRCode from "react-qr-code";

export default function ShareRecordPage() {
  const [consents, setConsents] = useState({
    appointmentInfo: false,
    medicalHistory: false,
    medications: false,
    allergies: false,
    vitals: false,
    testResults: false,
    documents: false,
    communicationPrefs: false,
  });

  const [showQR, setShowQR] = useState(false);

  const handleToggle = (field: keyof typeof consents) => {
    setConsents((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleShareAll = () => {
    const updated = Object.fromEntries(
      Object.keys(consents).map((key) => [key, true])
    );
    setConsents(updated as typeof consents);
  };

  const handleShare = () => {
    setShowQR(true);
  };

  //will be updated with pdf
  const selectedData = Object.fromEntries(
    Object.entries(consents).filter(([value]) => value)
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <PatientSidebar />
      </div>

      {/* Page content */}
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Share Your Records</h1>

        <div className="p-6 bg-white rounded-lg shadow border space-y-4">
          <p className="text-gray-700">
            Select the information you&apos;d like to share with your provider:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["appointmentInfo", "Upcoming Appointments & Visit Reasons"],
              ["medicalHistory", "Problem List / Medical History"],
              ["medications", "Current Medications & Supplements"],
              ["allergies", "Drug & Environmental Allergies"],
              ["vitals", "Recent Vitals (BP, Temp, Weight)"],
              ["testResults", "Lab & Imaging Results"],
              ["documents", "Insurance Info, Referral Letters"],
              ["communicationPrefs", "Language / Accessibility Preferences"],
            ].map(([key, label]) => (
              <label
                key={key}
                className="flex items-center space-x-3 text-gray-800"
              >
                <input
                  type="checkbox"
                  checked={consents[key as keyof typeof consents]}
                  onChange={() => handleToggle(key as keyof typeof consents)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleShareAll}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Select All
            </button>
            <button
              onClick={handleShare}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Share Records
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            ⚠️ <strong>Disclaimer:</strong> By sharing, you agree to send this
            information securely to your healthcare provider. This QR code
            expires in 1 hour.
          </p>
        </div>

        {showQR && (
          <div className="mt-6 bg-white border p-6 rounded-lg shadow w-fit space-y-2">
            <h2 className="text-lg font-semibold">Your Shareable QR Code</h2>
            <QRCode
              value={JSON.stringify(selectedData)}
              size={256}
              className="border p-2 bg-white"
            />
            <p className="text-xs mt-2 text-gray-500">
              Scan this code during your visit to share your health information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
