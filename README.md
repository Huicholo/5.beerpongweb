# 🍺 Beer Pong Stats

Estadísticas oficiales de Beer Pong — **Bombón & Muñpeco**

## Estructura del proyecto

```
5.Beerpongweb/
├── index.html              ← página principal
├── vercel.json             ← configuración de deploy
├── css/
│   └── style.css
├── js/
│   ├── data.js             ← ← ← EDITA AQUÍ (partidas y jugadores)
│   └── app.js
└── photos/
    ├── ganadores/          ← fotos de los que NOS ganaron
    ├── perdedores/         ← fotos de los que noqueamos
    └── jugadores/          ← fotos de Bombón y Muñpeco
```

## Cómo agregar una partida

Abre `js/data.js` y agrega un objeto al array `PARTIDAS`:

```js
{
  id: 9,                          // número único, siguiente en la lista
  fecha: "2025-06-01",            // formato YYYY-MM-DD
  rival: "Los Compadres",         // nombre del rival
  ganador: "nosotros",            // "nosotros" | "ellos"
  bombon_tiros: 5,                // tazas que metió Bombón
  munpeco_tiros: 4,               // tazas que metió Muñpeco
  foto_rival: "photos/perdedores/los-compadres.jpg",  // ruta a la foto
  nota: "Sin piedad 😈"           // comentario opcional
}
```

## Cómo agregar fotos

1. Si **les ganamos** → sube la foto a `photos/perdedores/`
2. Si **nos ganaron** → sube la foto a `photos/ganadores/`
3. Fotos de jugadores → `photos/jugadores/bombon.jpg` y `photos/jugadores/munpeco.jpg`
4. Actualiza el campo `foto_rival` en `data.js` con la ruta correcta

## Deploy en Vercel

El proyecto está conectado a Vercel. Cada `git push` a `main` hace deploy automático.

```bash
git add .
git commit -m "Nueva partida vs Los Compadres"
git push
```

## Features

- 📊 Estadísticas automáticas (win rate, tiros por jugador)
- 🔥 Badge de racha ganadora/perdedora
- 🎉 Confetti automático cuando hay racha ≥ 3 victorias
- 📸 Galerías de fotos con grid automático
- 📋 Historial completo de partidas
- 👤 Perfiles de jugadores con stats individuales
- 📜 Reglamento oficial
- 📱 100% responsive (móvil)
