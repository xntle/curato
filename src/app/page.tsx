"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Heartbeat from "@/components/ui/heartbeat";
import { Mic, FileText, Share2 } from "lucide-react"; // You can swap these icons out with your own set
export default function Home() {
  const router = useRouter();
  return (
    <main className=" font-sans text-gray-800">
      {/* Hero Section */}
      <section className="h-screen py-24 px-6 flex flex-col justify-center text-center">
        <Heartbeat></Heartbeat>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">curato</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Doctors spend more time on charts than with patients — we fix that
          with smart EHR automation.
        </p>
        <div className="space-x-4 mt-8">
          <Button onClick={() => router.push("/login/patient")}>
            I&apos;m a patient
          </Button>
          <Button onClick={() => router.push("/login/doctors")}>
            I&apos;m a doctor
          </Button>
        </div>
      </section>

      <section className="py-24 px-6 bg-white flex flex-col justify-center text-center min-h-screen">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          From Small Clinics to Big Hospitals
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
          <span className="font-semibold text-blue-700">Doctors</span> spend too
          much time charting and not enough time connecting. Whether you’re a
          solo provider or a full care team,
          <span className="font-semibold text-blue-700"> Curato</span> helps
          shift that balance — giving you time back for what truly matters:{" "}
          <span className="italic">your patients</span>.
        </p>
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          {/* Step 1 */}
          <div className="bg-gray-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <Mic size={48} className="text-blue-600 mb-4" />
            <h4 className="text-lg font-bold mb-2">AI-Powered Transcription</h4>
            <p className="text-sm text-gray-600">
              Record visits and get accurate transcripts automatically—no more
              typing while talking.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <FileText size={48} className="text-purple-600 mb-4" />
            <h4 className="text-lg font-bold mb-2">SOAP Note Generation</h4>
            <p className="text-sm text-gray-600">
              Instantly draft Subjective, Objective, Assessment, and Plan
              notes—streamlined and structured.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <Share2 size={48} className="text-rose-600 mb-4" />
            <h4 className="text-lg font-bold mb-2">Secure Record Sharing</h4>
            <p className="text-sm text-gray-600">
              Patients can share their visit summaries via QR codes or
              links—with full consent.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <svg
            className="mx-auto text-blue-600 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.5l8.66 7.5H3.34L12 4.5zM3 18h18v-2H3v2z" />
          </svg>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-20 px-6 bg-white flex flex-col justify-center text-center h-screen">
        <Heartbeat></Heartbeat>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          We&apos;re here to bring the humanity back to healthcare. One voice,
          one note, one conversation at a time.
        </p>
        <div className="space-x-4 mt-8">
          <p className="mb-2">Start Today</p>
          <Button onClick={() => router.push("/login/patient")}>
            I&apos;m a patient
          </Button>
          <Button onClick={() => router.push("/login/doctors")}>
            I&apos;m a doctor
          </Button>
        </div>
      </section>
    </main>
  );
}
