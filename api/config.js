// api/config.js
import { Redis } from '@upstash/redis';

export default async function handler(request, response) {
  // CORS setup taaki frontend access kar sake
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // Upstash Connection
  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  // GET Request: Config Read karna
  if (request.method === 'GET') {
    try {
      let config = await redis.get('appConfig');
      if (!config) {
        // Default Config agar Redis khali ho
        config = {
          appName: "ADR Anime",
          heroTitle: "Watch Hindi Dubbed Anime",
          tagline: "Best Quality, No Ads",
          downloadUrl: "#",
          version: "1.0.0",
          telegramChannelUrl: "https://t.me/your_channel",
          features: ["HD Quality", "Fast Servers", "Daily Updates"],
          screenshots: []
        };
        await redis.set('appConfig', config);
      }
      return response.status(200).json(config);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // POST Request: Config Update karna (Admin)
  if (request.method === 'POST') {
    const { password, config } = request.body;
    if (password === 'admin@123') { // Hardcoded password as per history
      await redis.set('appConfig', config);
      return response.status(200).json({ success: true, message: "Config Updated" });
    } else {
      return response.status(401).json({ error: "Unauthorized" });
    }
  }
}
