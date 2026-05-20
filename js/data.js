// ============================================================
//  BEERPONG DATA — edita aquí para agregar partidas y fotos
// ============================================================

const JUGADORES = {
  bombon: {
    nombre: "Bombón",
    alias: "El Crack",
    foto: "photos/jugadores/bombon.jpg",
    descripcion: "Tiro preciso, mente fría. Nunca falla cuando más importa.",
    habilidad: "🎯 Sniper",
    victorias: 0,
    color: "#e8b923"
  },
  munpeco: {
    nombre: "Muñpeco",
    alias: "La Leyenda",
    foto: "photos/jugadores/munpeco.jpg",
    descripcion: "Estratega nato. Puede perder 9 tazas y ganar con la última.",
    habilidad: "🔥 Clutch King",
    victorias: 0,
    color: "#3F7CAC"
  }
};

// ─── HISTORIAL DE PARTIDAS ───────────────────────────────────
// ganador: 'nosotros' | 'ellos'
// foto_rival: ruta a la foto (en photos/ganadores o photos/perdedores)
// bombon_tiros / munpeco_tiros: cuántas tazas metió cada quien
const PARTIDAS = [
  {
    id: 1,
    fecha: "2025-01-15",
    rival: "Los Primos",
    ganador: "nosotros",
    bombon_tiros: 5,
    munpeco_tiros: 4,
    foto_rival: "",
    nota: "Primera partida del año 💪"
  },
  {
    id: 2,
    fecha: "2025-02-01",
    rival: "El Güero y su bro",
    ganador: "ellos",
    bombon_tiros: 3,
    munpeco_tiros: 2,
    foto_rival: "",
    nota: "Revancha pendiente"
  },
  {
    id: 3,
    fecha: "2025-02-14",
    rival: "Las Vecinas",
    ganador: "nosotros",
    bombon_tiros: 7,
    munpeco_tiros: 3,
    foto_rival: "",
    nota: "Dominio total 😈"
  },
  {
    id: 4,
    fecha: "2025-03-05",
    rival: "Los de Toluca",
    ganador: "nosotros",
    bombon_tiros: 4,
    munpeco_tiros: 6,
    foto_rival: "",
    nota: "Muñpeco se echó los últimos 3"
  },
  {
    id: 5,
    fecha: "2025-03-20",
    rival: "El Güero y su bro",
    ganador: "nosotros",
    bombon_tiros: 6,
    munpeco_tiros: 4,
    foto_rival: "",
    nota: "¡REVANCHA COBRADA! 🔥"
  },
  {
    id: 6,
    fecha: "2025-04-01",
    rival: "Team Cerveza",
    ganador: "ellos",
    bombon_tiros: 2,
    munpeco_tiros: 3,
    foto_rival: "",
    nota: "Día malo, nos pasó la factura"
  },
  {
    id: 7,
    fecha: "2025-04-18",
    rival: "Los Doctores",
    ganador: "nosotros",
    bombon_tiros: 8,
    munpeco_tiros: 2,
    foto_rival: "",
    nota: "Bombón en modo dios 🎯"
  },
  {
    id: 8,
    fecha: "2025-05-10",
    rival: "Los Doctores",
    ganador: "nosotros",
    bombon_tiros: 5,
    munpeco_tiros: 5,
    foto_rival: "",
    nota: "Equipo perfecto al 50/50"
  }
];

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23052639'/%3E%3Ctext x='50%25' y='42%25' text-anchor='middle' fill='%233F7CAC' font-size='52' font-family='sans-serif'%3E🍺%3C/text%3E%3Ctext x='50%25' y='68%25' text-anchor='middle' fill='%23456B7A' font-size='15' font-family='sans-serif'%3ESin foto aún%3C/text%3E%3C/svg%3E";
const PLACEHOLDER_PLAYER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23052639'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='%233F7CAC' font-size='80' font-family='sans-serif'%3E👤%3C/text%3E%3C/svg%3E";
