const fs = require('fs');
const path = require('path');

const VALID_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

module.exports = (req, res) => {
  // CORS para que el fetch del HTML funcione
  res.setHeader('Access-Control-Allow-Origin', '*');

  const carpeta = req.query.carpeta; // ganadores | perdedores | jugadores
  if (!carpeta || !['ganadores', 'perdedores', 'jugadores'].includes(carpeta)) {
    return res.status(400).json({ error: 'Carpeta inválida' });
  }

  const dir = path.join(process.cwd(), 'public', 'photos', carpeta);

  try {
    if (!fs.existsSync(dir)) {
      return res.json({ fotos: [] });
    }

    const archivos = fs.readdirSync(dir).filter(f => {
      const ext = path.extname(f).toLowerCase();
      return VALID_EXT.includes(ext) && !f.startsWith('.');
    });

    const fotos = archivos.map(f => ({
      archivo: f,
      url: `/photos/${carpeta}/${f}`,
      // Nombre legible: quita extensión, reemplaza guiones/guiones bajos por espacios
      nombre: path.basename(f, path.extname(f))
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
    }));

    res.json({ fotos });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};