# 🎮 Tetris - Hack Club Summer Project

¡Un juego de Tetris completamente funcional creado para [Hack Club Summer](https://summer.hackclub.com/)! 

## 🏕️ Sobre el Proyecto

Este proyecto fue desarrollado durante Hack Club Summer, combinando el clásico juego de Tetris con tecnologías web modernas. Incluye todas las características que esperas de un Tetris completo, además de música de fondo y efectos de sonido generados programáticamente.

## ✨ Características

### 🎯 Funcionalidades del Juego
- **Tetrominos completos**: Los 7 tipos de piezas clásicas (I, O, T, S, Z, J, L)
- **Rotación y movimiento fluido**: Controles responsivos con wall-kick
- **Sistema de puntuación**: Puntos basados en líneas completadas y nivel
- **Sistema de niveles**: Velocidad que aumenta cada 10 líneas
- **Hold/Guardar pieza**: Guarda una pieza para usar después
- **Pieza fantasma**: Muestra dónde caerá la pieza actual
- **Caída rápida (Hard Drop)**: Espacio para caída instantánea

### 🎵 Audio y Efectos
- **Música de fondo**: Tema de Tetris (Korobeiniki) generado con Web Audio API
- **Efectos de sonido**: Sonidos para movimientos, rotaciones, líneas completadas
- **Control de audio**: Botón para silenciar/activar audio
- **Visualizador de música**: Barras animadas que responden a la música

### 🎨 Interfaz y UX
- **Diseño responsive**: Se adapta a dispositivos móviles y desktop
- **Tema moderno**: Gradientes y efectos visuales con Tailwind CSS
- **Animaciones fluidas**: Transiciones suaves y efectos de partículas
- **Controles intuitivos**: Teclado y botones en pantalla

## 🚀 Comenzar

Primero, instala las dependencias:

```bash
npm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el juego.

## 🎮 Controles

| Acción | Teclado | Descripción |
|--------|---------|-------------|
| Mover izquierda | ← o A | Mueve la pieza hacia la izquierda |
| Mover derecha | → o D | Mueve la pieza hacia la derecha |
| Bajar | ↓ o S | Acelera la caída de la pieza |
| Rotar | ↑ o W | Rota la pieza en sentido horario |
| Caída rápida | Espacio | Deja caer la pieza instantáneamente |
| Guardar pieza | C | Guarda la pieza actual para usar después |
| Pausar | P o Esc | Pausa/reanuda el juego |
| Reiniciar | R | Reinicia el juego |

## 🛠️ Tecnologías Utilizadas

- **[Next.js 15](https://nextjs.org/)**: Framework de React con App Router
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS utility-first
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)**: Para música y efectos de sonido
- **React Hooks**: Para gestión de estado y efectos

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
├── components/            
│   ├── Board.tsx          # Tablero principal del juego
│   ├── GameControls.tsx   # Controles y botones
│   ├── GameStats.tsx      # Estadísticas del juego
│   ├── MusicVisualizer.tsx # Visualizador de audio
│   ├── PiecePreview.tsx   # Vista previa de piezas
│   └── TetrisGame.tsx     # Componente principal
├── hooks/
│   ├── useTetris.ts       # Lógica principal del juego
│   └── useTetrisAudio.ts  # Gestión de audio
├── types/
│   └── tetris.ts          # Tipos de TypeScript
└── utils/
    └── tetris.ts          # Utilidades del juego
```

## 🏆 Puntuación

- **Single (1 línea)**: 40 × (nivel + 1)
- **Double (2 líneas)**: 100 × (nivel + 1)  
- **Triple (3 líneas)**: 300 × (nivel + 1)
- **Tetris (4 líneas)**: 1200 × (nivel + 1)
- **Hard Drop**: +2 puntos por celda caída

## 🎯 Características Futuras

- [ ] Modo multijugador
- [ ] Tablas de puntuación globales
- [ ] Más temas musicales
- [ ] Efectos de partículas mejorados
- [ ] Modos de juego alternativos
- [ ] Soporte para gamepads

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto es parte del aprendizaje en Hack Club Summer.

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **[Hack Club](https://hackclub.com/)** por crear un espacio increíble para aprender programación
- **Hack Club Summer** por la inspiración y comunidad
- La comunidad de desarrolladores que mantiene las herramientas open source que usamos

---

**¡Hecho con ❤️ para Hack Club Summer!** 🏕️

¿Tienes preguntas? ¡Únete a la comunidad de [Hack Club](https://hackclub.com/) y comparte tu proyecto!
