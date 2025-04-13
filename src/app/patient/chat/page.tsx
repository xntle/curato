"use client";

import { useState } from "react";
import PatientSidebar from "../sidebar";

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Placeholder AI response (replace with actual API call)
    const aiResponse = {
      role: "ai" as const,
      text: `You asked: "${input}". I'm here to help!`,
    };
    setMessages((prev) => [...prev, aiResponse]);

    setInput("");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <PatientSidebar />
      </div>

      {/* Page content */}
      <div className="flex-1 flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold">Chat with Curato Assistant</h1>

        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg border p-4 space-y-4">
          {messages.length === 0 && (
            <div className="mb-4">
              <h1 className="text-xl">Have a question? Ask away</h1>
              <h2 className="text-md font-semibold text-gray-700 mb-2">
                Suggestions:
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "When is my next appointment?",
                  "Can I reschedule my visit?",
                  "What did the doctor say during my last visit?",
                  "What are my current medications?",
                  "Can you summarize my last checkup?",
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(suggestion)}
                    className="bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full border border-gray-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-lg p-3 rounded-lg ${
                msg.role === "user"
                  ? "ml-auto bg-blue-100 text-right"
                  : "mr-auto bg-white border"
              }`}
            >
              <p className="text-sm text-gray-800">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
