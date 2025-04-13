"use client";

import { Suspense } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PatientSidebar from "../sidebar";

function PatientEHRPage() {
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(true);

  const [ehr, setEHR] = useState({
    chaperoneDocumentation: "",
    vitalsAndSmokingStatus: "",
    chiefComplaint: "",
    allergies: "",
    currentMedications: "",
    problemListAndHistory: "",
    physicalExam: "",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const appointment = {
    date: searchParams.get("date") || "N/A",
    time: searchParams.get("time") || "N/A",
    provider: searchParams.get("provider") || "N/A",
    location: searchParams.get("location") || "N/A",
    reason: searchParams.get("reason") || "N/A",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [{ data: ehrData }, { data: transcriptData }] = await Promise.all([
        supabase
          .from("ehr_forms")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .single(),
        supabase
          .from("transcriptions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1),
      ]);

      if (ehrData) {
        setEHR({
          chaperoneDocumentation: ehrData.chaperone_documentation || "",
          vitalsAndSmokingStatus: ehrData.vitals_and_smoking_status || "",
          chiefComplaint: ehrData.chief_complaint || "",
          allergies: ehrData.allergies || "",
          currentMedications: ehrData.current_medications || "",
          problemListAndHistory: ehrData.problem_list_history || "",
          physicalExam: ehrData.physical_exam || "",
          subjective: ehrData.subjective || "",
          objective: ehrData.objective || "",
          assessment: ehrData.assessment || "",
          plan: ehrData.plan || "",
        });
      }

      if (transcriptData?.length) {
        setTranscript(transcriptData[0].transcription_text || "");
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <PatientSidebar />
      </div>
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Appointment Details
        </h1>

        <div className="bg-white rounded-lg shadow border p-6 space-y-4 max-w-3xl">
          <section>
            <h2 className="text-lg font-semibold">Transcript</h2>
            <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap text-gray-800">
              {transcript || "No transcript found."}
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Visit Info</h2>
            <p>
              <strong>Date & Time:</strong> {appointment.date} at{" "}
              {appointment.time}
            </p>
            <p>
              <strong>Provider:</strong> {appointment.provider}
            </p>
            <p>
              <strong>Location:</strong> {appointment.location}
            </p>
            <p>
              <strong>Reason:</strong> {appointment.reason}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">EHR Summary</h2>
            {loading ? (
              <p className="text-gray-500">Loading EHR...</p>
            ) : (
              <>
                {Object.entries(ehr).map(([label, value]) => (
                  <div key={label}>
                    <h3 className="text-sm font-medium text-gray-600 capitalize">
                      {label.replace(/([A-Z])/g, " $1")}
                    </h3>
                    <p className="p-3 border rounded bg-gray-50 text-gray-800 whitespace-pre-wrap">
                      {value || "No data found."}
                    </p>
                  </div>
                ))}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default function EHRPage() {
  return (
    <Suspense fallback={<p>Loading appointment details...</p>}>
      <PatientEHRPage />
    </Suspense>
  );
}
