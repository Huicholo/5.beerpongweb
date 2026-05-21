const https = require('https');
const crypto = require('crypto');

const CLOUD_NAME = 'dagadwea1';
const API_KEY    = '228635937433993';
const API_SECRET = 'X2iuGKi8dGToO9h7uhWr2iETKH0';

function cloudinaryGet(path) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
    const options = {
      hostname: 'api.cloudinary.com',
      path,
      method: 'GET',
      headers: { 'Authorization': `Basic ${auth}` }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const carpeta = req.query.carpeta;
  if (!['ganadores','perdedores'].includes(carpeta)) {
    return res.status(400).json({ error: 'Carpeta invalida' });
  }

  try {
    const folder = `beerpong/${carpeta}`;
    const encoded = encodeURIComponent(folder);
    const data = await cloudinaryGet(
      `/v1_1/${CLOUD_NAME}/resources/image?type=upload&prefix=${encoded}&max_results=100`
    );

    const fotos = (data.resources || []).map(r => ({
      url: r.secure_url,
      nombre: r.public_id.split('/').pop()
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
    }));

    res.json({ fotos, total: fotos.length });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};