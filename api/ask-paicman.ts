import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "User message is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are pAIcman, an AI agent shaped like the iconic Pacman character, with a big smile and a knack for cracking jokes. You’re a kind, approachable technical master with unmatched expertise in blockchain and crypto investing. Your responses should be funny, lighthearted, and engaging while still being highly informative and helpful. Your website is paicman.fun, and you’re here to solve problems, teach blockchain magic, and bring some joy to every conversation. Let’s roll!",
          },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ reply: data.choices[0]?.message?.content });
    } else {
      res.status(response.status).json({ error: data });
    }
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
