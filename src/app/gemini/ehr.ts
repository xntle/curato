import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

const MODEL_NAME = "gemini-1.5-flash-8b";

const PROMPT = `You are a clinical documentation assistant. Extract structured EHR data from the following patient transcript and return it in JSON format.

Your response should match this structure exactly:

{
  "chaperoneDocumentation": "",
  "vitalsAndSmokingStatus": "",
  "chiefComplaint": "",
  "allergies": "",
  "currentMedications": "",
  "problemListAndHistory": "",
  "physicalExam": "",
  "soapNote": {
    "subjective": "",
    "objective": "",
    "assessment": "",
    "plan": ""
  }
}

Only return valid JSON. Do not include any additional explanation or notes outside the JSON. Fill in fields using only medically relevant details from the transcript. If information is missing, leave the field as an empty string.
`;

export interface EHRData {
  chaperoneDocumentation: string;
  vitalsAndSmokingStatus: string;
  chiefComplaint: string;
  allergies: string;
  currentMedications: string;
  problemListAndHistory: string;
  physicalExam: string;
  soapNote: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
}

export class EHRAutoFill {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: MODEL_NAME });
  }

  async fillEHRForm(transcript: string): Promise<EHRData> {
    try {
      const result = await this.model.generateContent([
        {
          text: `${PROMPT}\n\nTRANSCRIPT:\n${transcript}`,
        },
      ]);

      let jsonText = result.response.text().trim();

      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.replace(/```json|```/g, "").trim();
      }

      const parsed: EHRData = JSON.parse(jsonText);
      return parsed;
    } catch (error) {
      console.error("EHR autofill error:", error);
      throw error;
    }
  }
}
