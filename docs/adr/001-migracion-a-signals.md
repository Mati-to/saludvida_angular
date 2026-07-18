# ADR-001: Migración de Inputs/Outputs y estado a Signals

## Estado
Aceptado — 2026-07-17

## Contexto
El frontend está construido con Angular 20, pero usando el modelo de reactividad "clásico":
`@Input()` / `@Output()` + `EventEmitter` para la comunicación entre componentes, `.subscribe()`
manual a los Observables de los servicios para manejar estado un asíncrono, y `Zone.js`
(`provideZoneChangeDetection`) para la detección de cambios.

Angular viene priorizando desde hace varias versiones un modelo basado en Signals
(`signal()`, `input()`, `output()`, `model()`, `computed()`) como la forma recomendada de
manejar estado y comunicación entre componentes, y es lo que documentan como estándar
actual. Aún cuando la industria pueda seguir usando el modelo clásico para distintos proyectos, 
dado que ya he usado antes este modelo, considero importante también aprender sobre los nuevos 
cambios que se han hecho para esta tecnología. Mantener el proyecto en el patrón anterior lo aleja 
de las prácticas que hoy se esperan en el ecosistema Angular.

## Decisión
Migrar el frontend a Signals de forma incremental, por entidad/módulo (Paciente, Médico,
Especialidad, Cita Médica), en vez de hacer un único cambio masivo sobre todo el código.

- Se reemplazan `@Input()`/`@Output()` + `EventEmitter` por `input()`, `output()` y `model()`
  donde corresponda.
- Se evalúa, componente por componente, reemplazar el `.subscribe()` manual a servicios por
  signals (por ejemplo `toSignal()`), cuando tenga sentido para el caso de uso.
- Cada entidad se migra en su propia rama (`refactor/<entidad>-signals`) con su propio PR,
  empezando por Paciente como piloto para validar el patrón antes de replicarlo en el resto.
- Pasar la app a modo zoneless (`provideZonelessChangeDetection`) queda **fuera de alcance**
  de este ADR. Se evaluará en un ADR separado una vez completada la migración a signals en
  todas las entidades.

## Consecuencias

**Positivas**
- El proyecto queda alineado con las prácticas actuales de Angular.
- Menos boilerplate en la comunicación entre componentes (sin `EventEmitter` explícito).
- Deja la base lista para evaluar zoneless más adelante.
- Migrar por entidad permite validar el patrón en un caso simple (Paciente) antes de
  replicarlo en otras partes del proyecto, y mantiene cada PR más modular y revisable.

**Negativas / riesgos aceptados**
- Durante la migración conviven ambos patrones (clásico y signals) en distintas partes de
  la app. Se acepta como estado transitorio.
- Migrar por entidad implica más ramas y PRs que un cambio único, a cambio de menor riesgo
  por PR.
