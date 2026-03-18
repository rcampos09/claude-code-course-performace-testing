# Curso: Performance Testing con Claude Code
### Guía Clase a Clase — Borrador v0.1

> **Audiencia:** QA/QE con conocimiento básico de testing funcional, sin experiencia previa en performance testing.
> **Objetivo final:** El alumno es capaz de recibir una historia de usuario, diseñar y ejecutar pruebas de performance, interpretar métricas con el stack observability y entregar dos reportes: uno técnico y uno de negocio.
> **Duración estimada:** 8 módulos (puede dictarse en 4 semanas intensivas o 8 semanas con una clase por semana)

---

## Mapa del Curso

```
Módulo 1 → Fundamentos y Entorno
Módulo 2 → Claude Code como copiloto de QA
Módulo 3 → Estrategia de Testing (Skill: performance-testing-strategy)
Módulo 4 → Desarrollo de Scripts — k6 (Skill: k6-best-practices)
Módulo 5 → Desarrollo de Scripts — Gatling / Locust (Skills: gatling + locust)
Módulo 6 → Observabilidad: leer el stack (Grafana / Prometheus / Loki / Tempo)
Módulo 7 → Análisis y Reportes (Skill: performance-report-analysis)
Módulo 8 → Proyecto Final — Historia de Usuario Completa
```

---

## Módulo 1 — Fundamentos y Entorno
**Objetivo:** El alumno entiende qué es performance testing y tiene el laboratorio corriendo.

### Clase 1-A: ¿Por qué el performance importa?
- Diferencia entre test funcional y test de performance
- Tipos de prueba: Smoke, Load, Stress, Spike, Soak/Endurance
- Métricas clave: Response Time, Throughput (RPS), Error Rate, P50/P90/P95/P99
- SLA vs SLO vs SLI — el lenguaje de negocio
- **Ejemplo real:** incidente de Black Friday en e-commerce — cómo un test habría evitado el downtime

### Clase 1-B: Levantar el laboratorio
**Stack del laboratorio:**
- Aplicación: E-commerce básico con OpenTelemetry
- Observabilidad: Prometheus · Grafana · Loki · Tempo
- Infraestructura: Docker Compose / Kubernetes (MCP)

**Práctica guiada:**
```bash
# 1. Clonar el repo del laboratorio
git clone https://github.com/rcampos09/Learning-Performance-Observability-Stack

# 2. Levantar con Docker (via MCP Docker en Claude Code)
# El alumno aprende a usar Claude Code con el MCP de Docker
# para introspeccionar contenedores, ver logs, etc.

# 3. Verificar endpoints del e-commerce
curl http://localhost:8080/products
curl http://localhost:8080/health
```

**Checkpoint:** Grafana accesible, e-commerce respondiendo, traces visibles en Tempo.

---

## Módulo 2 — Claude Code como Copiloto de QA
**Objetivo:** El alumno configura Claude Code, instala los Skills y entiende el flujo de trabajo.

### Clase 2-A: Setup de Claude Code
- Instalación de Claude Code
- Configuración del proyecto (CLAUDE.md)
- Concepto de Skills: ¿qué son y cómo se activan?
- Instalar el paquete de skills:
  ```bash
  npx skills add rcampos09/performance-testing-skills
  ```
- Concepto de MCP: Docker MCP y Kubernetes MCP para el laboratorio

### Clase 2-B: El flujo de trabajo del Performance Tester con IA
- Claude Code NO reemplaza al tester, **amplifica** su capacidad
- Flujo completo:
  ```
  Historia de Usuario → Estrategia → Script → Ejecución → Análisis → Reporte
  ```
- Cómo prompt bien en contexto de performance:
  - Dar contexto del sistema (endpoints, SLAs, ambiente)
  - Describir el comportamiento esperado del usuario
  - Indicar restricciones (tiempo de ejecución, ambiente de staging)
- Demo en vivo: el alumno le pide a Claude que le explique el e-commerce del lab

---

## Módulo 3 — Estrategia de Testing
**Skill activado:** `performance-testing-strategy`
**Objetivo:** Dado un requerimiento de negocio, el alumno genera un plan de testing sólido.

### Clase 3-A: Las 4 preguntas clave antes de escribir una línea de código
El Skill hace estas preguntas antes de proponer cualquier plan:
1. ¿Cuáles son los patrones de tráfico esperados? (pico, steady-state, temporada alta)
2. ¿Existen SLAs definidos? (tiempo de respuesta máximo, % error aceptable)
3. ¿Cuánto tiempo de ejecución hay disponible?
4. ¿El ambiente está aislado de producción?

**Ejercicio:** El alumno toma esta historia de usuario y responde las 4 preguntas:

> **Historia de Usuario — HU-001: Checkout de Carrito**
> "Como cliente, quiero poder completar mi compra en menos de 3 segundos
> durante temporada de descuentos, para no abandonar el carrito."
> **Criterio de aceptación de performance:** P95 < 2s, Error Rate < 0.5%, soportar 500 usuarios concurrentes.

### Clase 3-B: Generando el Plan con Claude Code
**Prompt de ejemplo:**
```
Necesito una estrategia de performance testing para el flujo de checkout
de un e-commerce. Los SLAs son: P95 < 2s, Error Rate < 0.5%.
Se esperan 500 usuarios concurrentes en peak. Tengo un ambiente de staging
aislado y 2 horas disponibles para ejecutar pruebas.
```

**Output esperado del Skill:**
- Smoke Test (5 VU, 1 min) → validar que el ambiente funciona
- Load Test baseline (100 VU, 15 min) → comportamiento normal
- Load Test peak (500 VU, 20 min) → validar SLA
- Stress Test (rampa hasta 1000 VU) → encontrar el punto de quiebre
- Secuencia correcta y justificación de cada prueba

**Entregable de clase:** Plan de testing documentado para HU-001.

---

## Módulo 4 — Desarrollo de Scripts con k6
**Skill activado:** `k6-best-practices`
**Objetivo:** El alumno genera scripts k6 production-ready a partir del plan de testing.

### Clase 4-A: Anatomía de un script k6 correcto
Los 5 bloques obligatorios que el Skill siempre genera:
1. **Options** — thresholds que actúan como SLA gates
2. **Data** — SharedArray para datos de prueba (usuarios, productos)
3. **Setup** — preparación del ambiente (login, obtener tokens)
4. **Default function** — workload del VU con think time (`sleep()`)
5. **Teardown** — limpieza post-prueba

**Errores más comunes que el Skill detecta y corrige:**
- Olvidar `sleep()` → crea carga irreal
- URLs hardcodeadas → scripts no portables
- `check()` sin manejo de errores → métricas falsas
- Variables globales en lugar de SharedArray → race conditions

### Clase 4-B: Generando el script para HU-001
**Prompt de ejemplo:**
```
Genera un script k6 para el flujo de checkout del e-commerce del laboratorio.
El flujo es: GET /products → GET /products/{id} → POST /cart → POST /checkout
SLAs: P95 < 2s, Error Rate < 0.5%
Perfiles: Smoke (5 VU / 1min), Load (500 VU / 20min con ramp-up de 2min)
El ambiente corre en localhost:8080. Usar datos de prueba desde CSV.
```

**Script generado — estructura esperada:**
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Bloque 1: Options / SLA Gates
export const options = {
  scenarios: {
    smoke: { ... },
    load: { ... }
  },
  thresholds: {
    'http_req_duration{scenario:load}': ['p(95)<2000'],
    'http_req_failed': ['rate<0.005'],
  }
};

// Bloque 2: Datos de prueba
const users = new SharedArray('users', function() {
  return JSON.parse(open('./data/users.json'));
});

// Bloque 3: Setup
export function setup() { ... }

// Bloque 4: VU Workload
export default function(data) {
  // GET /products
  // GET /products/{id}
  // POST /cart
  // POST /checkout
  sleep(Math.random() * 3 + 1); // Think time realista
}

// Bloque 5: Teardown
export function teardown(data) { ... }
```

### Clase 4-C: Ejecución y primera lectura de resultados
```bash
# Ejecución local
k6 run --out influxdb=http://localhost:8086/k6 checkout_test.js

# Ejecución via MCP Docker en Claude Code
# Claude puede ejecutar el contenedor k6 directamente
```

**Práctica:** El alumno ejecuta el Smoke Test y observa en tiempo real el dashboard de Grafana k6.

---

## Módulo 5 — Desarrollo de Scripts: Gatling y Locust
**Skills activados:** `gatling-best-practices`, `locust-best-practices`
**Objetivo:** El alumno conoce alternativas a k6 y entiende cuándo usar cada herramienta.

### Clase 5-A: ¿Cuándo usar Gatling vs k6 vs Locust?

| Herramienta | Lenguaje | Mejor para | Modelo |
|-------------|----------|------------|--------|
| k6 | JavaScript/TS | CI/CD, simplicidad | Open/Closed |
| Gatling | Java/Kotlin/Scala | Alto volumen, reportes HTML | Open |
| Locust | Python | Flexibilidad, equipos Python | Closed |

### Clase 5-B: Script Gatling para HU-001
**El Skill genera el patrón de 5 bloques:**
1. Protocol (HTTP config)
2. Feeders (datos CSV/JSON)
3. Scenario (cadena de requests con `.pause()`)
4. Injection Profile (ramp-up, steady-state)
5. Assertions (SLA gates)

**Errores críticos que el Skill detecta:**
- `atOnceUsers()` en load tests → no usar para carga sostenida
- Falta de `.pause()` → carga irreal
- Tokens hardcodeados → usar feeders

### Clase 5-C: Script Locust para HU-001
**El Skill genera el patrón de 4 bloques:**
1. Imports + config
2. HttpUser class con `wait_time`
3. CustomLoadShape (opcional, para multi-stage)
4. Comando CLI

**Práctica comparativa:** El alumno ejecuta los tres scripts contra el mismo endpoint y compara los resultados en Grafana.

---

## Módulo 6 — Observabilidad: Leer el Stack
**Objetivo:** El alumno interpreta métricas de Grafana/Prometheus/Loki/Tempo para diagnosticar cuellos de botella.

### Clase 6-A: Prometheus y Grafana — Métricas de infraestructura
**Dashboards clave durante un test:**
- CPU y memoria del servidor e-commerce
- Latencia de base de datos (query duration)
- Connection pool exhaustion
- HTTP error rate por endpoint

**Práctica:** Durante la ejecución del Load Test, el alumno identifica en qué VU count empieza a degradarse el P95.

### Clase 6-B: Tempo — Trazas distribuidas con OpenTelemetry
- ¿Qué es una traza? Span padre → Span hijo
- Cómo el e-commerce instrumenta con OpenTelemetry
- Buscar la traza de un checkout lento: ¿dónde está el tiempo?
  - ¿En el frontend → backend?
  - ¿En el backend → base de datos?
  - ¿En un servicio externo (payment gateway)?

**Práctica:** El alumno toma la petición con mayor latencia del test de stress y la rastrea en Tempo para encontrar el span más lento.

### Clase 6-C: Loki — Logs correlacionados con trazas
- Correlacionar logs con Trace ID (la ventaja de OpenTelemetry)
- Detectar errores en logs durante el pico de carga
- Patrones de log que indican problemas:
  - `connection refused` → DB overload
  - `timeout` → dependency lenta
  - `OOM` → memory leak
  - `circuit breaker open` → cascading failure

**Práctica:** El alumno correlaciona un error del test de stress con el log que lo causó.

### Clase 6-D: El checklist de diagnóstico de cuellos de botella
Patrones que el Skill de análisis diagnostica automáticamente:
1. CPU saturation
2. Memory leak (latencia crece sostenidamente)
3. DB connection pool exhaustion
4. Thread pool exhaustion
5. Network I/O
6. Cold starts
7. Event loop blocking
8. GC pauses
9. Cascading failures

---

## Módulo 7 — Análisis y Reportes
**Skill activado:** `performance-report-analysis`
**Objetivo:** Transformar resultados crudos en decisiones de negocio.

### Clase 7-A: Triage de resultados — el orden correcto
El Skill siempre analiza en este orden (no negociable):
1. **Errores primero** — si hay >1% error rate, todo lo demás es ruido
2. **Throughput** — ¿el sistema alcanzó el RPS esperado?
3. **P95 vs SLA** — ¿cumple el criterio de aceptación?
4. **Tendencia temporal** — ¿la latencia crece con el tiempo? (memory leak signal)
5. **Breakdown por endpoint** — ¿cuál endpoint es el culpable?

### Clase 7-B: El Reporte Técnico
**Audiencia:** Desarrolladores, Arquitectos, DevOps
**Incluye:**
- SLA compliance (PASS/FAIL por threshold)
- Regression delta (comparado con baseline anterior)
- Findings con severidad: CRITICAL / HIGH / MEDIUM / LOW
- Bottleneck diagnosis con evidencia (spans, logs, métricas)
- Recomendaciones técnicas específicas

**Prompt de ejemplo:**
```
Analiza estos resultados del Load Test del checkout:
- P50: 450ms, P90: 1800ms, P95: 2400ms, P99: 5200ms
- Error Rate: 1.2% (principalmente POST /checkout → 503)
- Throughput: 280 RPS (objetivo: 500 RPS)
- Duración: 20 minutos, carga: 500 VU
SLA: P95 < 2000ms, Error Rate < 0.5%

Stack: Node.js + PostgreSQL, observado en Grafana:
- CPU del servicio: 45% (sin saturación)
- DB connection pool: 98% utilización al minuto 8
- Latencia DB queries: P95 escaló de 200ms a 1800ms a los 8 minutos
```

**Output esperado:**
- FAIL en P95 (2400ms > 2000ms SLA)
- FAIL en Error Rate (1.2% > 0.5% SLA)
- Diagnóstico: DB connection pool exhaustion como causa raíz
- Recomendación: aumentar pool size, considerar read replicas

### Clase 7-C: El Reporte de Negocio
**Audiencia:** Product Manager, CTO, Stakeholders no técnicos
**Reglas:**
- Cero percentiles ni jerga técnica
- Todo se traduce a impacto en usuario
- Tiene una recomendación ejecutiva clara (GO / NO-GO / CONDITIONAL GO)

**Ejemplo de traducción:**
```
TÉCNICO: "P95 de 2400ms excede el SLA de 2000ms en un 20%"
NEGOCIO:  "1 de cada 20 clientes experimentó tiempos de espera
           inaceptables durante el pico de carga. Riesgo de abandono
           de carrito estimado en 15-20% si se lanza en temporada alta."
```

**Práctica:** El alumno genera ambos reportes para HU-001 usando el Skill.

---

## Módulo 8 — Proyecto Final: Historia de Usuario Completa
**Objetivo:** Integración end-to-end de todo el curso.

### Historia de Usuario Final — HU-002: Flash Sale
> **Contexto de negocio:** El equipo de marketing planea una venta flash de 2 horas
> donde se espera un pico de tráfico 10x el normal. El CTO necesita saber si
> el sistema puede soportarlo o si es necesario escalar antes del evento.
>
> **Flujo crítico:** Autenticación → Búsqueda de producto → Agregar al carrito → Checkout → Confirmación
>
> **SLAs requeridos por el negocio:**
> - P95 < 3s en todo el flujo
> - Error Rate < 1%
> - Soporte de 2000 usuarios concurrentes en el pico
> - Recovery en < 5 minutos si hay degradación

### Entregables del Proyecto Final

**Paso 1 — Estrategia** (usando Skill performance-testing-strategy)
- Plan documentado con tipos de prueba, perfiles de carga y secuencia
- Justificación de cada decisión

**Paso 2 — Scripts** (usando Skill k6 o Gatling o Locust, a elección del alumno)
- Smoke Test
- Load Test baseline (200 VU)
- Load Test peak (2000 VU con ramp-up)
- Spike Test (0 → 2000 VU en 30 segundos)

**Paso 3 — Ejecución y Observabilidad**
- Screenshots/video de Grafana durante la ejecución
- Al menos 1 traza de Tempo identificando el endpoint más lento
- Al menos 1 correlación de error con Loki

**Paso 4 — Reporte Técnico** (usando Skill performance-report-analysis)
- Análisis completo con triage de resultados
- Diagnóstico de bottleneck con evidencia del stack
- Findings con severidad y recomendaciones

**Paso 5 — Reporte de Negocio**
- Traducción de resultados a impacto de usuario
- Decisión ejecutiva: GO / NO-GO / CONDITIONAL GO para el Flash Sale
- Plan de mitigación si aplica

---

## Resumen de Herramientas por Módulo

| Módulo | Herramienta principal | Claude Code Skill |
|--------|----------------------|-------------------|
| 1 | Docker / Lab | — |
| 2 | Claude Code | Setup |
| 3 | Claude Code | performance-testing-strategy |
| 4 | k6 | k6-best-practices |
| 5 | Gatling / Locust | gatling-best-practices, locust-best-practices |
| 6 | Grafana / Tempo / Loki | MCP Docker/k8s |
| 7 | Claude Code | performance-report-analysis |
| 8 | Todo el stack | Todos |

---

## Flujo Completo Resumido (Cheatsheet del Alumno)

```
1. Recibo HU con criterios de performance
          ↓
2. Claude Code + Skill "strategy" → Plan de testing
          ↓
3. Claude Code + Skill "k6/gatling/locust" → Scripts ejecutables
          ↓
4. Ejecuto via MCP Docker → Scripts corren contra el lab
          ↓
5. Observo en Grafana (métricas) + Tempo (trazas) + Loki (logs)
          ↓
6. Claude Code + Skill "report-analysis" → Reporte técnico
          ↓
7. Claude Code + Skill "report-analysis" → Reporte de negocio
          ↓
8. Decisión GO / NO-GO con evidencia
```

---

## Notas para Refinar

- [ ] Definir duración exacta por clase (60 min? 90 min?)
- [ ] ¿El curso es sincrónico, asincrónico o mixto?
- [ ] Agregar ejercicios intermedios en módulos 6 (observabilidad es denso)
- [ ] Validar si el e-commerce del lab tiene todos los endpoints del flujo de checkout
- [ ] Considerar agregar un módulo de CI/CD: ejecutar k6 en GitHub Actions
- [ ] Evaluar si incluir JMeter para equipos que ya lo usan
- [ ] Definir criterios de evaluación para el proyecto final
- [ ] Crear datos de prueba (CSV de usuarios y productos) para el lab
- [ ] Mejorar el e-commerce con más endpoints para hacer los flujos más realistas

---

*Borrador v0.1 — Rodrigo Campos — 2026-03-17*
