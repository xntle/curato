"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient()

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/doctor/home`,
      },
    })
    if (error) {
      console.error('OAuth error:', error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full text-center space-y-2 border border-1">
        {/* Back Button */}
        <div className="flex justify-start">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-sm text-gray-600"
            onClick={handleGoogleSignIn}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800">Welcome to Curato</h1>
        <p className="text-gray-500">Sign in to continue</p>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </Button>

        <div className="items-top flex space-x-2 mt-8 text-left">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-sm text-gray-600"
            onClick={() => router.push("/login/patient")}
          >
            I&apos;m a patient
          </Button>
        </div>
      </div>
    </div>
  );
}
