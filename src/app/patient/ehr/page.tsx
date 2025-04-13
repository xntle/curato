"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PatientSidebar from "../sidebar";

export default function PatientEHRPage() {
  const searchParams = useSearchParams();

  const [notes, setNotes] = useState("");

  const appointment = {
    date: searchParams.get("date") || "N/A",
    time: searchParams.get("time") || "N/A",
    provider: searchParams.get("provider") || "N/A",
    location: searchParams.get("location") || "N/A",
    reason: searchParams.get("reason") || "N/A",
  };

  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient()

  const retrieveTranscription = async () => {
    const { data, error } = await supabase
      .from("transcriptions")
      .select("*")
      .order("created_at", { ascending: false }) // newest first
      .limit(1); // just get the top one

    if (error) {
      console.error("Error fetching latest transcription:", error);
    } else if (data && data.length > 0) {
      setTranscript(data[0].transcription_text);
    }
    setLoading(false);
  };

  retrieveTranscription();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <PatientSidebar />
      </div>

      {/* Page content */}
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Appointment Details
        </h1>

        <div className="bg-white rounded-lg shadow border p-6 space-y-4 max-w-2xl">
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="text-lg font-semibold text-gray-700">
              {appointment.date} at {appointment.time}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Provider</p>
            <p className="text-lg font-semibold text-gray-700">
              {appointment.provider}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-lg font-semibold text-gray-700">
              {appointment.location}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Reason</p>
            <p className="text-lg font-semibold text-gray-700">
              {appointment.reason}
            </p>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Doctor’s Notes
            </label>
            <textarea
              className="w-full border rounded p-3 text-sm text-gray-700"
              rows={5}
              placeholder="Notes from the visit..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div>
          <textarea
            
              className="w-full border rounded p-3 text-sm text-gray-700"
              rows={5}
              placeholder="transcription."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            {loading ? (
              <p>Loading transcript...</p>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-2">Transcript</h2>
                <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm whitespace-pre-wrap">
                  {transcript || "No transcript found."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
