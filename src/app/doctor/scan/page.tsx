"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import DoctorSidebar from "../sidebar";

export default function ScanPage() {
  const [scannedData, setScannedData] = useState<string>("");
  const [parsedData, setParsedData] = useState<Record<string, any> | null>(
    null
  );
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const qrScanner = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const scannerId = "qr-reader";
    qrScanner.current = new Html5Qrcode(scannerId);

    qrScanner.current
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScannedData(decodedText);

          try {
            const json = JSON.parse(decodedText);
            setParsedData(json);
          } catch (err) {
            setParsedData(null);
            console.error("❌ Invalid QR content:", err);
          }

          qrScanner.current?.stop().catch(console.error);
        },
        (errorMessage) => {
          console.log("Scan error:", errorMessage);
        }
      )
      .catch((err) => {
        console.error("Failed to start QR scanner:", err);
      });

    return () => {
      qrScanner.current?.stop().catch(console.error);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <DoctorSidebar />
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Scan Patient QR Code</h1>

        <div className="bg-white p-6 rounded-lg shadow border max-w-xl space-y-4">
          <div id="qr-reader" ref={scannerRef} className="w-full h-64" />

          {parsedData ? (
            <div className="text-sm text-gray-800">
              ✅ <strong>Patient data imported.</strong>
              <pre className="bg-gray-100 mt-2 p-3 rounded max-h-64 overflow-auto text-xs">
                {JSON.stringify(parsedData, null, 2)}
              </pre>
              {/* ➕ You can now call setX() to populate EHR form using this data */}
            </div>
          ) : scannedData ? (
            <p className="text-red-600 text-sm">❌ Invalid JSON format.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
