"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

type Props = {
  onClose: () => void;
  onScanSuccess: (data: Record<string, any>) => void;
};

export default function ScanQRModal({ onClose, onScanSuccess }: Props) {
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const qrScanner = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const scannerId = "qr-reader";
    if (!scannerRef.current) return;

    qrScanner.current = new Html5Qrcode(scannerId);

    qrScanner.current
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          try {
            const json = JSON.parse(decodedText);
            onScanSuccess(json);
            qrScanner.current?.stop().catch(console.error);
            onClose();
          } catch {
            setError("❌ Invalid QR content.");
          }
        },
        (errMsg) => {
          console.log("Scan error:", errMsg);
        }
      )
      .catch((err) => {
        console.error("Failed to start scanner:", err);
        setError("Unable to access camera.");
      });

    return () => {
      qrScanner.current?.stop().catch(console.error);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full">
        <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
        <div id="qr-reader" ref={scannerRef} className="w-full h-64" />
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
