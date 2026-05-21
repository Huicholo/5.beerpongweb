const crypto = require('crypto');

const USUARIOS = {
  'Bombon': 'Luisma99!',
  'Muneco': 'Media_vaca00'
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;
  if (!body || typeof body === 'string') {
    body = await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => { data += chunk; });
      req.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { resolve({}); } });
    });
  }

  const { folder, publicId, usuario, contrasena } = body || {};

  if (!usuario || !contrasena) return res.status(401).json({ error: 'Credenciales requeridas' });
  if (USUARIOS[usuario] !== contrasena) return res.status(401).json({ error: 'Usuario o contrasena incorrectos' });

  const allowed = ['beerpong/ganadores', 'beerpong/perdedores'];
  if (!allowed.includes(folder)) return res.status(400).json({ error: 'Carpeta invalida' });

  const timestamp = Math.round(Date.now() / 1000);
  const apiSecret = 'X2iuGKi8dGToO9h7uhWr2iETKH0';

  // Sign exactly the params sent to Cloudinary, sorted alphabetically
  const params = { folder, public_id: publicId, timestamp };
  const toSign = Object.keys(params).sort()
    .map(k => `${k}=${params[k]}`)
    .join('&') + apiSecret;

  const signature = crypto.createHash('sha1').update(toSign).digest('hex');

  res.json({ timestamp, signature, apiKey: '228635937433993', cloudName: 'dagadwea1', folder });
};