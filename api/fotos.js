const fs   = require('fs');
const path = require('path');
const VALID = ['.jpg','.jpeg','.png','.webp','.gif'];

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const carpeta = req.query.carpeta;
  const allowed = ['ganadores','perdedores','jugadores','fondos'];
  if (!carpeta || !allowed.includes(carpeta)) {
    return res.status(400).json({ error: 'Carpeta invalida' });
  }

  const dir = path.join(process.cwd(), 'public', 'photos', carpeta);

  try {
    if (!fs.existsSync(dir)) return res.json({ fotos: [] });

    const archivos = fs.readdirSync(dir).filter(f => {
      const ext = path.extname(f).toLowerCase();
      return VALID.includes(ext) && !f.startsWith('.');
    }).sort();

    const fotos = archivos.map(f => ({
      archivo: f,
      url: `/photos/${carpeta}/${f}`,
      nombre: path.basename(f, path.extname(f))
        .replace(/[-_\d]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, c => c.toUpperCase())
    }));

    res.json({ fotos, total: fotos.length });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};