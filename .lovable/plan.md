# Excusator3000 — Interfaz completa del flujo

Construir las pantallas visibles y conectarlas en un único recorrido, sin recargas de página. No se toca el motor, los contenidos, los idiomas ni el sistema visual ya existentes.

## Recorrido

```text
Portada → Clasificación → Calibración → Interrogatorio → Deliberación → Veredicto
                                                                 ↑            |
                                                    Aumentar descaro ---------+
                                                    Nuevo caso → Portada
```

## Pantallas

1. **Portada** — titular "Toda gran excusa merece un juicio justo.", subtítulo y ficha de expediente ya escritos, botón "Presentar mi caso".
2. **Clasificación** — las ocho categorías existentes en fichas seleccionables (Trabajo, Estudios, Familia, Cita, Amigos, Ejercicio, Favor, Inconfesable). Continuar se activa al elegir una.
3. **Calibración** — cuatro grupos de opciones: Credibilidad, Drama, Descaro y Relación, más el índice provisional de credibilidad que ya calcula el motor.
4. **Interrogatorio** — una pregunta por pantalla con las preguntas que el contenido asigna a esa categoría (dos o tres según el caso), indicador de paso, y al final un campo de contexto opcional con el aviso ya redactado.
5. **Deliberación** — pausa de unos 2,5 segundos rotando los mensajes de deliberación, y sello "CASO RESUELTO" al terminar. Opción de saltar.
6. **Veredicto** — expediente con: veredicto, excusa autorizada, respuesta si insisten, riesgo de descubrimiento con su estado, punto débil y reparación sugerida. Si el contexto se detecta como dañino, se muestra el aviso de rechazo que ya existe.

## Acciones del veredicto

- **Copiar excusa** — copia el texto y muestra confirmación breve.
- **Aumentar descaro** — mantiene el mismo expediente y sube Prudente → Valiente → Sin retorno, regenerando el veredicto; en el nivel máximo se muestra el aviso existente y el botón queda desactivado.
- **Nuevo caso** — vuelve a la portada con un expediente nuevo.

## Cabecera

Barra fina con el nombre, el subtítulo del despacho, cambio de idioma (ES/EN/PT) y cambio de tema, usando los ganchos ya creados.

## Detalles técnicos

- Una sola ruta (`src/routes/index.tsx`) con una máquina de estados por pasos: `home | category | config | interrogation | deliberation | verdict`. Sin navegación de URL, sin recargas.
- Estado del caso en `useState` con la forma `CaseState` existente; `newCaseId()` al empezar, respuestas acumuladas en `answers`.
- El veredicto se produce con `generateVerdict({ state, locale, audacity })`; "Aumentar descaro" llama de nuevo con `nextAudacity` y actualiza también la configuración del caso.
- Nuevos componentes de presentación bajo `src/components/e3k/` (cabecera, ficha de opción, sello, barra de riesgo, pantallas). Solo Tailwind con los tokens y utilidades ya definidos (`paper-sheet`, `label-meta`, `hairline`, `animate-stamp`, `animate-sheet`).
- Se envuelve la app con `I18nProvider` en `__root.tsx` y se respeta `useReducedMotion` para las animaciones.
- Sin dependencias nuevas, sin sonido, sin compartir, sin backend.
- Metadatos de la página `/` propios en su `head()`.

## Verificación

Recorrido manual con navegador automatizado en 390×844 y 1440×900: portada → categoría → calibración → tres preguntas → deliberación → veredicto → aumentar descaro → nuevo caso, comprobando que no haya errores en consola ni recargas.
