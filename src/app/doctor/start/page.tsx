"use client";

import { useState } from "react";
import DoctorSidebar from "../sidebar";
import { TranscriptionService } from "@/app/gemini/transcribe";
import { blobToBase64 } from "@/app/gemini/blobToBase64";
import { EHRAutoFill } from "@/app/gemini/ehr";

export default function StartPage() {
  const [transcript, setTranscript] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chaperoneDocumentation, setChaperoneDocumentation] = useState("");
  const [vitalsAndSmokingStatus, setVitalsAndSmokingStatus] = useState("");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [allergies, setAllergies] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");
  const [problemListAndHistory, setProblemListAndHistory] = useState("");
  const [physicalExam, setPhysicalExam] = useState("");

  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");

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
    } catch (err) {
      setTranscript("❌ Error transcribing audio.");
      console.error(err);
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
      console.error("❌ Error autofilling form:", err);
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
              value={chaperoneDocumentation}
              onChange={(e) => setChaperoneDocumentation(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Vitals & Smoking Status"
              value={vitalsAndSmokingStatus}
              onChange={(e) => setVitalsAndSmokingStatus(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Chief Complaint"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Current Medications"
              value={currentMedications}
              onChange={(e) => setCurrentMedications(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Problem List/History"
              value={problemListAndHistory}
              onChange={(e) => setProblemListAndHistory(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Physical Exam"
              value={physicalExam}
              onChange={(e) => setPhysicalExam(e.target.value)}
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
      </div>
    </div>
  );
}
