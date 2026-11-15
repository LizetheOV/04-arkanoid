# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Idioma

Responde siempre en español en este proyecto (instrucción explícita del usuario). El código, los identificadores y los nombres de archivo mantienen sus convenciones existentes.

## Estado del proyecto

Juego de Arkanoid/Breakout en etapa temprana. Todavía no hay código del juego, sistema de build, manifiesto de paquetes, linter ni tests: solo assets, un helper de sprites y skills de flujo de trabajo. El directorio aún no es un repositorio git (`/spec-impl` lo requiere, así que hay que ejecutar `git init` antes de usarlo).

El README dice que el juego se desarrolla en Python con Pygame, pero el único código existente (`assets/spritesheet.js`) es JavaScript de navegador con Canvas 2D. El stack objetivo no está definido: confírmalo con el usuario (o con el spec) antes de elegir uno y no asumas Pygame.

## Estructura del proyecto

```
.claude/skills/      Skills del proyecto (spec, spec-impl) + README.md con su descripción
assets/              Recursos del juego (spritesheet, sprites en JS, sonidos)
specs/               Specs NN-slug.md y .spec-config.yml (los genera /spec)
CLAUDE.md            Esta guía
README.md            Descripción general (en español)
```

Cuando exista código del juego, colócalo en un directorio propio (p. ej. `src/`) y actualiza esta sección junto con los comandos de ejecución y pruebas.

## Assets (`assets/`)

- `spritesheet-breakout.png`: atlas único de sprites para todo el juego.
- `spritesheet.js`: helper de script plano (sin módulos) que define las coordenadas del atlas y se encarga de cargarlo y dibujarlo:
  - `SPRITES` asocia `paddle`, `ball` y `blocks.<color>` con rectángulos fuente `{sx, sy, sw, sh}`. `EXPLOSION_FRAMES.<color>` guarda 4 frames de animación por color (`EXPLOSION_DURATION = 150`). La explosión `gray` reutiliza los frames de `red`.
  - `loadSpritesheet(cb)` carga el PNG una sola vez, lo copia a un canvas fuera de pantalla y encola los callbacks. La ruta de la imagen está fija y es relativa a la página: `assets/spritesheet-breakout.png`.
  - `drawSprite(ctx, name, x, y, w, h)` acepta `'paddle'`, `'ball'` o `'block_<color>'`; `drawFrame(ctx, frame, x, y, w, h)` dibuja un frame de explosión. Ambas no hacen nada, sin error, hasta que el atlas termina de cargar.
- `sounds/ball-bounce.mp3`, `sounds/break-sound.mp3`: efectos de sonido para rebotes (pala/paredes) y rotura de bloques.

## Flujo de trabajo basado en specs (`.claude/skills/`)

Dos skills invocadas por el usuario (`disable-model-invocation: true`) definen el proceso de desarrollo; el detalle completo está en sus `SKILL.md`:

- `/spec <descripción>`: entrevista al usuario y luego escribe `specs/NN-slug.md` (estado `Draft`) a partir de `.claude/skills/spec/template.md`, y crea `specs/.spec-config.yml`. Nunca escribe código.
- `/spec-impl <NN-slug>`: solo funciona con un spec cuyo estado signifique "Aprobado" (lo cambia la persona, en cualquier idioma). Trabaja en la rama `spec-NN-slug`, implementa el plan paso a paso y se detiene para revisar el diff. Solo hace commits si `AutoCommitSteps: true` en `specs/.spec-config.yml` (un commit `spec-NN-step-MM` por paso) y nunca hace push.

Reglas a respetar: implementa exactamente lo que dice el spec (los cambios van en el spec, no en el código) y respeta el idioma y la redacción de los specs existentes.
