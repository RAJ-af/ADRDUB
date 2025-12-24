import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    try {
      let config = await redis.get('appConfig');
      
      if (!config) {
        const response = await fetch('https://raw.githubusercontent.com/RAJ-af/ADRDUB/main/public/config.json');
        config = await response.json();
        await redis.set('appConfig', JSON.stringify(config));
      } else if (typeof config === 'string') {
        config = JSON.parse(config);
      }
      
      return res.status(200).json(config);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  if (req.method === 'POST') {
    try {
      const { password, config } = req.body;
      
      if (password !== 'admin@123') {
        return res.status(401).json({ error: 'Wrong password' });
      }
      
      await redis.set('appConfig', JSON.stringify(config));
      return res.status(200).json({ success: true });
    }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
