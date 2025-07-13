import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST allowed');
    return;
  }

  const { username } = req.body || {};
  if (!username) {
    res.status(400).send('No username provided');
    return;
  }

  // Get IP from headers (Vercel sets x-forwarded-for)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const time = new Date().toISOString();

  const message = `User: ${username}\nIP: ${ip}\nTime: ${time}`;
  const webhookUrl = '';

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });
    res.status(200).json({ status: 'Logged' });
  } catch (e) {
    console.error('Webhook error:', e);
    res.status(500).json({ error: 'Webhook failed' });
  }
}
