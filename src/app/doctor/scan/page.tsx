"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import DoctorSidebar from "../sidebar";

export default function ScanPage() {
  const [scannedData, setScannedData] = useState("");
  const [parsedData, setParsedData] = useState<any | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const qrCodeScanner = new Html5Qrcode("qr-reader");

    qrCodeScanner.start(
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
          console.error("❌ Invalid QR content:", err);
        }
        qrCodeScanner.stop().catch(console.error);
      },
      (errorMessage) => {
        // Handle scanning error (optional)
      }
    );

    return () => {
      qrCodeScanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <DoctorSidebar />
      </div>

      {/* Page content */}
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Scan Patient QR Code</h1>

        <div className="bg-white p-6 rounded-lg shadow border max-w-xl space-y-4">
          <div id="qr-reader" ref={scannerRef} className="w-full h-64" />

          {parsedData ? (
            <div className="text-sm text-gray-800">
              ✅ <strong>Patient data imported.</strong>
              <pre className="bg-gray-100 mt-2 p-2 rounded max-h-48 overflow-auto text-xs">
                {JSON.stringify(parsedData, null, 2)}
              </pre>
              {/* 🔄 You can now use setX hooks to populate your EHR form */}
            </div>
          ) : scannedData ? (
            <p className="text-red-600 text-sm">❌ Invalid JSON format.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
