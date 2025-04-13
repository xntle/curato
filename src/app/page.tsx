"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Heartbeat from "@/components/ui/heartbeat";
export default function Home() {
  const router = useRouter();
  return (
    <main className=" font-sans text-gray-800">
      {/* Hero Section */}
      <section className="h-screen py-24 px-6 flex flex-col justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">curato</h1>
        <p>
          Skip writing ehr We save time for physicians so they can make space
          for patients.
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

      {/* Curato Solution */}
      <section className="py-20 px-6 bg-white flex flex-col justify-center text-center min-h-screen">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          The Curato Solution
        </h2>

        <p className="max-w-3xl mx-auto mb-6 text-lg text-gray-600">
          Curato listens. Curato writes. You care.
        </p>

        <p className="max-w-3xl mx-auto mb-12 text-lg text-gray-600">
          Too much charting. Not enough connection. Curato shifts the
          balance—capturing conversations, generating notes, and giving time
          back to your patients.
        </p>

        <div className="grid gap-10 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="md:flex items-center gap-8 bg-gray-50 rounded-xl shadow-md p-6 text-left">
            <Image
              src="/images/step1-transcription.png"
              alt="AI-Powered Transcription"
              width={300}
              height={200}
              className="rounded-lg mb-4 md:mb-0"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">
                Step 1: AI-Powered Transcription
              </h3>
              <p className="text-gray-600">
                Record patient visits and automatically convert them into
                accurate transcripts using speech recognition technology.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="md:flex items-center gap-8 bg-gray-50 rounded-xl shadow-md p-6 text-left md:flex-row-reverse">
            <Image
              src="/images/step2-soap.png"
              alt="SOAP Note Generation"
              width={300}
              height={200}
              className="rounded-lg mb-4 md:mb-0"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">
                Step 2: SOAP Note Generation
              </h3>
              <p className="text-gray-600">
                Let Curato draft Subjective, Objective, Assessment, and Plan
                notes in seconds, saving hours of documentation work.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="md:flex items-center gap-8 bg-gray-50 rounded-xl shadow-md p-6 text-left">
            <Image
              src="/images/step3-coding.png"
              alt="Coding Suggestions"
              width={300}
              height={200}
              className="rounded-lg mb-4 md:mb-0"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">
                Step 3: Coding Suggestions
              </h3>
              <p className="text-gray-600">
                Get ICD/CPT suggestions generated in real-time based on the
                conversation context, reducing billing errors and speeding up
                compliance.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="md:flex items-center gap-8 bg-gray-50 rounded-xl shadow-md p-6 text-left md:flex-row-reverse">
            <Image
              src="/images/step4-sharing.png"
              alt="Secure Record Sharing"
              width={300}
              height={200}
              className="rounded-lg mb-4 md:mb-0"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">
                Step 4: Secure Record Sharing
              </h3>
              <p className="text-gray-600">
                Patients can instantly share their summaries via QR codes or
                secure links—with full consent and audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Voice, Elevated */}
      <section className="py-20 px-6 flex flex-col justify-center text-center h-screen">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          From small clinics to big hospitals
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Doctors spend too much time charting and not enough time connecting.
          Whether you&apos;re a solo provider or a full care team, Curato helps
          shift that balance — giving you time back for what truly matters: your
          patients.
        </p>
      </section>

      {/* The Mission */}
      <section className="py-20 px-6 bg-white flex flex-col justify-center text-center h-screen">
        <Heartbeat></Heartbeat>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          We&apos;re here to bring the humanity back to healthcare. One voice,
          one note, one conversation at a time.
        </p>
      </section>
    </main>
  );
}
