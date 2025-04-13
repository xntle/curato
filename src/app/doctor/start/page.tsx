"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import DoctorSidebar from "../sidebar";
import { TranscriptionService } from "@/app/gemini/transcribe";
import { blobToBase64 } from "@/app/gemini/blobToBase64";
import { EHRAutoFill } from "@/app/gemini/ehr";
import jsPDF from "jspdf";
// at the bottom of your EHR form page component:

import { Html5Qrcode } from "html5-qrcode";

export default function StartPage() {
  const [transcript, setTranscript] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [showScanner, setShowScanner] = useState(false);

  const [chaperoneDocumentation, setChaperoneDocumentation] =
    useState<string>("");
  const [vitalsAndSmokingStatus, setVitalsAndSmokingStatus] =
    useState<string>("");
  const [chiefComplaint, setChiefComplaint] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("");
  const [currentMedications, setCurrentMedications] = useState<string>("");
  const [problemListAndHistory, setProblemListAndHistory] =
    useState<string>("");
  const [physicalExam, setPhysicalExam] = useState<string>("");

  const [subjective, setSubjective] = useState<string>("");
  const [objective, setObjective] = useState<string>("");
  const [assessment, setAssessment] = useState<string>("");
  const [plan, setPlan] = useState<string>("");

  const supabase = createClientComponentClient();
  const scannerRef = useRef<Html5Qrcode | null>(null);

  //this should update the database of the patient
  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          try {
            const data = JSON.parse(decodedText);
            if (data && typeof data === "object" && data.chiefComplaint) {
              handleValidQR(data);
            } else {
              console.warn("QR is missing required fields");
            }
          } catch (err) {
            console.error("Invalid QR content", err);
          }
        },
        (errorMessage) => {
          console.log("QR error", errorMessage);
        }
      )
      .catch((err) => {
        console.error("Failed to start QR scanner", err);
      });

    return () => {
      scannerRef.current?.stop().catch(console.warn);
    };
  }, [showScanner]);
  const handleValidQR = (data: {
    chiefComplaint?: string;
    allergies?: string;
    currentMedications?: string;
    problemListAndHistory?: string;
    physicalExam?: string;
    chaperoneDocumentation?: string;
    vitalsAndSmokingStatus?: string;
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
  }) => {
    setChiefComplaint(data.chiefComplaint || "");
    setAllergies(data.allergies || "");
    setCurrentMedications(data.currentMedications || "");
    setProblemListAndHistory(data.problemListAndHistory || "");
    setPhysicalExam(data.physicalExam || "");
    setChaperoneDocumentation(data.chaperoneDocumentation || "");
    setVitalsAndSmokingStatus(data.vitalsAndSmokingStatus || "");
    setSubjective(data.subjective || "");
    setObjective(data.objective || "");
    setAssessment(data.assessment || "");
    setPlan(data.plan || "");

    setShowScanner(false);
  };

  const handleSaveToPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    const addField = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 10, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(value || "-", 180);
      doc.text(splitText, 10, y);
      y += splitText.length * 6 + 4;
    };

    addField("Chaperone Documentation", chaperoneDocumentation);
    addField("Vitals & Smoking Status", vitalsAndSmokingStatus);
    addField("Chief Complaint", chiefComplaint);
    addField("Allergies", allergies);
    addField("Current Medications", currentMedications);
    addField("Problem List / History", problemListAndHistory);
    addField("Physical Exam", physicalExam);

    doc.setFont("helvetica", "bold");
    doc.text("SOAP Note", 10, y);
    y += 8;

    addField("Subjective", subjective);
    addField("Objective", objective);
    addField("Assessment", assessment);
    addField("Plan", plan);

    doc.save("EHR_Form.pdf");
  };

  const handleRecord = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        setAudioBlob(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } else {
      mediaRecorder?.stop(); // optional chaining just in case
      setIsRecording(false);
    }
  };

  const handleTranscribe = async () => {
    if (!audioBlob) return;
    setTranscript("Transcribing...");

    try {
      const base64Audio = await blobToBase64(audioBlob);
      const service = new TranscriptionService();
      const text = await service.transcribeAudio(base64Audio, "audio/webm");
      setTranscript(text);

      await handleSaveTranscription(text);
    } catch (err) {
      setTranscript("Error transcribing audio.");
      console.error(err);
    }
  };

  const handleSaveTranscription = async (text: string) => {
    const { data, error } = await supabase.from("transcriptions").insert([
      {
        provider_id: "6672d8d3-9ae6-46f7-8978-b088eb39ad18",
        patient_id: "ed3ec609-76bb-4ed4-8b93-b47f1385f84a",
        transcription_text: text,
      },
    ]);

    if (error) {
      console.error("Error saving transcription:", error);
    } else {
      console.log("Transcription saved:", data);
    }
  };

  const handleFormFill = async () => {
    if (!transcript) return;

    try {
      const service = new EHRAutoFill();
      const data = await service.fillEHRForm(transcript);
      setChaperoneDocumentation(data.chaperoneDocumentation);
      setVitalsAndSmokingStatus(data.vitalsAndSmokingStatus);
      setChiefComplaint(data.chiefComplaint);
      setAllergies(data.allergies);
      setCurrentMedications(data.currentMedications);
      setProblemListAndHistory(data.problemListAndHistory);
      setPhysicalExam(data.physicalExam);

      setSubjective(data.soapNote.subjective);
      setObjective(data.soapNote.objective);
      setAssessment(data.soapNote.assessment);
      setPlan(data.soapNote.plan);
    } catch (err) {
      console.error("Error autofilling form:", err);
    }
  };

  const handleUpdateEHR = async () => {
    const { error } = await supabase.from("ehr").insert([
      {
        provider_id: "6672d8d3-9ae6-46f7-8978-b088eb39ad18", // update as needed
        patient_id: "ed3ec609-76bb-4ed4-8b93-b47f1385f84a", // update as needed
        chaperone_documentation: chaperoneDocumentation,
        vitals_and_smoking_status: vitalsAndSmokingStatus,
        chief_complaint: chiefComplaint,
        allergies: allergies,
        current_medications: currentMedications,
        problem_list_and_history: problemListAndHistory,
        physical_exam: physicalExam,
        subjective: subjective,
        objective: objective,
        assessment: assessment,
        plan: plan,
        // optionally add appointment metadata like date/time, physician, etc.
      },
    ]);
  
    if (error) {
      console.error("Failed to save EHR:", error);
      alert("Failed to save EHR.");
    } else {
      alert("EHR successfully saved!");
    }
  };

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
            placeholder="Transcript will appear here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleRecord}
              className={`px-4 py-2 rounded text-white ${
                isRecording ? "bg-red-600" : "bg-blue-600"
              }`}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            <button
              onClick={handleTranscribe}
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={!audioBlob}
            >
              Transcribe
            </button>
            <button
              onClick={handleFormFill}
              className="bg-purple-600 text-white px-4 py-2 rounded"
              disabled={!transcript}
            >
              Generate EHR
            </button>
          </div>
        </div>

        {/* Full EHR Form Section */}
        <div className="p-6 bg-white rounded-lg shadow border space-y-6">
          <button
            onClick={() => setShowScanner(true)}
            className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
          >
            Scan QR
          </button>
          <h2 className="text-xl font-semibold">EHR Form</h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Patient Details
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                className="w-full p-2 border rounded"
                placeholder="Patient Name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Lived Name
              </label>
              <input
                className="w-full p-2 border rounded"
                placeholder="Lived Name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Date of Birth
              </label>
              <input className="w-full p-2 border rounded" placeholder="DOB" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Sex</label>
              <input className="w-full p-2 border rounded" placeholder="Sex" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Appointment Date/Time
              </label>
              <input
                className="w-full p-2 border rounded"
                placeholder="Appointment Date/Time"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Physician
              </label>
              <input
                className="w-full p-2 border rounded"
                placeholder="Physician"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Encounter #
              </label>
              <input
                className="w-full p-2 border rounded"
                placeholder="Encounter #"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Appointment Reason
              </label>
              <input
                className="w-full p-2 border rounded"
                placeholder="Appointment Reason"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Chaperone Documentation
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Chaperone Documentation"
                  value={chaperoneDocumentation}
                  onChange={(e) => setChaperoneDocumentation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Vitals & Smoking Status
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Vitals & Smoking Status"
                  value={vitalsAndSmokingStatus}
                  onChange={(e) => setVitalsAndSmokingStatus(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Chief Complaint
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Chief Complaint"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Allergies
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Current Medications
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Current Medications"
                  value={currentMedications}
                  onChange={(e) => setCurrentMedications(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Problem List/History
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Problem List/History"
                  value={problemListAndHistory}
                  onChange={(e) => setProblemListAndHistory(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Physical Exam
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Physical Exam"
                  value={physicalExam}
                  onChange={(e) => setPhysicalExam(e.target.value)}
                />
              </div>
            </div>

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
                    value={subjective}
                    onChange={(e) => setSubjective(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    O - Objective
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Provider observations, exam findings, and vitals."
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    A - Assessment
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Diagnosis or clinical impression."
                    value={assessment}
                    onChange={(e) => setAssessment(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    P - Plan
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Treatment plan, prescriptions, follow-up, referrals."
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveToPDF}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          disabled={!subjective && !assessment && !plan}
        >
          Export
        </button>
        <button
          onClick={handleUpdateEHR}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          disabled={!subjective && !assessment && !plan}
        >
          Save Form
        </button>
      </div>
      {showScanner && (
        <div className="fixed inset-0 border bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Scan Patient QR Code</h2>
            <div id="qr-reader" className="w-full h-64" />
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowScanner(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
