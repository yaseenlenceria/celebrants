import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
  console.warn('VITE_GEMINI_API_KEY is not set or is using placeholder value. AI features may not work.');
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export interface GenerationResult {
  text: string;
  error?: string;
}

export const generateCeremonyScript = async (
  partner1: string,
  partner2: string,
  tone: string,
  story: string
): Promise<GenerationResult> => {
  try {
    const prompt = `
      You are an expert wedding celebrant with 20 years of experience.
      Write a full wedding ceremony script for ${partner1} and ${partner2}.
      
      Tone: ${tone}
      Key Story Points: ${story}
      
      Structure:
      1. Introduction/Welcome
      2. Their Love Story (weave in the story points)
      3. The Asking/Vows (provide template vows)
      4. Ring Exchange
      5. Pronouncement
      
      Format the output with clear headings and stage directions in italics.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return { text: response.text || "No content generated." };
  } catch (error) {
    console.error("Error generating script:", error);
    return { text: "", error: "Failed to generate script. Please try again." };
  }
};

export const generateSocialPost = async (
  topic: string,
  platform: string,
  vibe: string
): Promise<GenerationResult> => {
  try {
    const prompt = `
      Write a ${vibe} social media post for a professional celebrant to post on ${platform}.
      Topic: ${topic}

      Include:
      1. Catchy Headline/Hook
      2. Engaging Body text (keep it concise for social media)
      3. Call to Action
      4. 5-7 Relevant Hashtags
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return { text: response.text || "No content generated." };
  } catch (error) {
    console.error("Error generating post:", error);
    return { text: "", error: "Failed to generate post. Please try again." };
  }
};

export const generateVows = async (
  partnerName: string,
  partnerForName: string,
  story: string,
  tone: string,
  length: string
): Promise<GenerationResult> => {
  try {
    const prompt = `
      Generate heartfelt wedding vows for ${partnerName} to say to ${partnerForName}.

      Their story: ${story}
      Tone: ${tone}
      Length: ${length}

      Make it personal, emotional, and unique. The vows should:
      1. Be authentic and heartfelt
      2. Include specific details from their story
      3. Match the requested tone (${tone})
      4. Be appropriate length (${length})
      5. Flow naturally when spoken aloud
      6. Include both promises and expressions of love

      Format the vows as a continuous speech that can be read at the altar.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return { text: response.text || "No content generated." };
  } catch (error) {
    console.error("Error generating vows:", error);
    return { text: "", error: "Failed to generate vows. Please try again." };
  }
};

export const generateContract = async (
  serviceType: string,
  celebrantName: string,
  clientName: string,
  serviceDate: string,
  serviceFee: string,
  deposit: string,
  specialTerms: string
): Promise<GenerationResult> => {
  try {
    const prompt = `
      Generate a professional celebrant service contract for ${serviceType}.

      Details:
      - Celebrant: ${celebrantName}
      - Client: ${clientName}
      - Service Date: ${serviceDate}
      - Service Fee: £${serviceFee}
      - Deposit: £${deposit}
      - Special Terms/Conditions: ${specialTerms}

      Include standard terms and conditions for celebrant services in the UK/Ireland, covering:
      1. Service description and scope
      2. Payment terms (deposit and balance)
      3. Cancellation and refund policy
      4. Celebrant responsibilities
      5. Client responsibilities
      6. Force majeure clause
      7. Confidentiality
      8. Liability limitations
      9. Dispute resolution
      10. Any special terms provided

      Make it professional, legally sound, and comprehensive. Format with clear sections and headings.
      Include signature lines at the end for both parties with dates.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return { text: response.text || "No content generated." };
  } catch (error) {
    console.error("Error generating contract:", error);
    return { text: "", error: "Failed to generate contract. Please try again." };
  }
};

export const generateClientReview = async (
  celebrantName: string,
  coupleNames: string,
  venue: string,
  highlights: string,
  tone: string
): Promise<GenerationResult> => {
  try {
    const prompt = `
      You are a copywriter for wedding celebrants. Draft a polished client review/testimonial that a couple would leave.

      Celebrant: ${celebrantName}
      Couple: ${coupleNames}
      Venue or city: ${venue}
      Highlights the couple mentioned: ${highlights}
      Desired tone: ${tone}

      Output 2-3 short paragraphs (120-180 words total) with vivid, specific praise. Include a one-line headline and finish with a 5-star rating line.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return { text: response.text || 'No content generated.' };
  } catch (error) {
    console.error('Error generating review:', error);
    return { text: '', error: 'Failed to generate review. Please try again.' };
  }
};
