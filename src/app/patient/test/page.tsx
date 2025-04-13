"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function EHRPatientName() {
  const supabase = createClientComponentClient();
  const [patientName, setPatientName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientName = async () => {
      const { data, error } = await supabase
        .from("ehr_forms")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching EHR:", error);
      } else if (data && data.length > 0) {
        console.log("✅ EHR fetched:", data[0]);
        setEhrData(data[0]); // access first record safely
      } else {
        console.warn("❗ No EHR record found.");
      }
    };

    fetchPatientName();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Patient Name</h1>
      {error && <p className="text-red-600">{error}</p>}
      {patientName ? (
        <p className="text-lg text-gray-800">👤 {patientName}</p>
      ) : (
        !error && <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}
