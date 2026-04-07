# Claude Code for Performance Tester
### Guía Clase a Clase — Borrador v0.2

> **Audiencia:** QA/QE con conocimiento básico de testing funcional.
> No se requiere experiencia previa en performance testing ni en IA.
>
> **Filosofía del curso:**
> La IA no reemplaza al tester — **amplifica su criterio**.
> Claude Code automatiza lo repetible. El humano toma las decisiones.
>
> **Problema que resuelve:**
> Los equipos de QA pasan horas diseñando estrategias, escribiendo scripts y
> redactando reportes. Este curso enseña a usar Claude Code + Skills + MCPs
> para comprimir ese ciclo sin sacrificar calidad ni criterio técnico.
>
> **Duración estimada:** 8 módulos · ~90 min por clase · 8 semanas (1 clase/semana) o 4 semanas intensivas

---

## Mapa del Curso

```
Módulo 1 → El Problema y el Stack
Módulo 2 → Claude Code: Configuración y CLAUDE.md como constitución del proyecto
Módulo 3 → JIRA como fuente de la verdad + MCPs (Atlassian + Grafana)
Módulo 4 → Estrategia de Testing desde un ticket (Skill: performance-testing-strategy)
Módulo 5 → Desarrollo de Scripts con k6 (Skill: k6-best-practices)
Módulo 6 → Ejecución + Observabilidad con MCP Grafana
Módulo 7 → Reportes Bimodales → comentar en JIRA (Skill: performance-report-analysis)
Módulo 8 → Proyecto Final: Sprint de Performance Completo
```

---

## Stack del Curso

### Laboratorio de pruebas — Poleras Store
Aplicación e-commerce de 5 microservicios con observabilidad completa.

```
Microservicios:
  users-api    → :3001  (autenticación, JWT)
  products-api → :3002  (catálogo de productos)
  cart-api     → :3003  (carrito de compras)
  orders-api   → :3004  (creación y estado de órdenes)
  payments-api → :3005  (procesamiento de pagos simulado)

Observabilidad (LGTM Stack):
  Grafana      → :3000  (dashboards, datasources)
  Prometheus   → :9090  (métricas, alertas, SLOs)
  Loki         → :3100  (logs estructurados JSON)
  Tempo        → :3200  (trazas distribuidas OTLP)

Instrumentación: OpenTelemetry (auto + manual spans)
Correlación:     TraceID propagado en logs y headers
```

### Repositorio: k6-practice-load
El proyecto de testing integrado con Claude Code que los alumnos usarán como referencia y punto de partida.

```
Herramientas de testing: k6 v1.0
MCPs activos:            Grafana MCP · Atlassian (JIRA) MCP
Skills instalados:       performance-testing-strategy
                         k6-best-practices
                         performance-report-analysis
Tickets JIRA:            DEV-19 (auth) · DEV-20 (products) · DEV-21 (cart)
                         DEV-22 (orders) · DEV-23 (payments) · DEV-24 (e2e)
```

---

## Módulo 1 — El Problema y el Stack
**Objetivo:** El alumno entiende por qué el performance testing falla en la industria y levanta el laboratorio completo.

### Clase 1-A: El gap de los equipos de QA modernos
**El problema real:**
- Los testers saben que el performance importa, pero el ciclo completo (estrategia → script → ejecución → reporte) consume días
- Los reportes técnicos no llegan a product managers porque están llenos de percentiles
- Los scripts se escriben una vez y nunca se actualizan cuando cambia el sistema
- La observabilidad existe pero nadie sabe qué mirar durante un test

**La solución del curso:**
```
ANTES (sin IA):  JIRA ticket → 2 días diseño → 3 días scripts → ejecución → reporte manual
DESPUÉS (con IA): JIRA ticket → Claude Code → scripts en horas → reporte dual automatizado
```

**Conceptos fundamentales:**
- Tipos de prueba: Smoke · Load · Stress · Spike · Soak/Endurance
- Métricas clave: Response Time · Throughput (RPS) · Error Rate · P50/P90/P95/P99
- SLI → SLO → SLA: la cadena de responsabilidad
- La diferencia entre un número y una decisión de negocio

### Clase 1-B: Levantar el laboratorio (Poleras Store)

**Pre-requisitos del alumno:**
- Docker Desktop instalado
- Node.js 18+
- Claude Code instalado (`npm install -g @anthropic-ai/claude-code`)

**Setup:**
```bash
# Clonar el laboratorio
git clone https://github.com/rcampos09/Learning-Performance-Observability-Stack
cd Learning-Performance-Observability-Stack

# Levantar todos los servicios
docker compose up -d

# Verificar health de los 5 microservicios
curl http://localhost:3001/health/live      # users-api
curl http://localhost:3002/health/live      # products-service
curl http://localhost:3003/health/live      # cart-service
curl http://localhost:3004/health/live      # orders-service
curl http://localhost:3005/health/live      # payments-service
```

**Checkpoint visual:**
- Grafana en http://localhost:3000 (admin/admin)
- Dashboards disponibles:
  - RED Metrics (Rate · Errors · Duration)
  - Logs & Error Streams
  - SLO & Error Budget
  - Distributed Tracing & Service Map

**Exploración guiada con Claude Code:**
```
# Primera interacción con Claude Code: explorar el sistema
"Tengo el laboratorio levantado. Lee el docker-compose.yml y
explícame la arquitectura de servicios, sus puertos y cómo se
comunican entre sí."
```

El alumno aprende: Claude Code puede leer archivos del proyecto y construir contexto antes de generar cualquier artefacto.

---

## Módulo 2 — Claude Code: CLAUDE.md como Constitución del Proyecto
**Objetivo:** El alumno configura Claude Code correctamente y entiende que el CLAUDE.md es el documento más importante del proyecto de testing.

### Clase 2-A: ¿Qué es Claude Code y cómo piensa?

**Lo que Claude Code NO es:**
- Un chatbot al que le haces preguntas genéricas
- Un generador de código sin contexto
- Un reemplazo del criterio técnico del tester

**Lo que Claude Code SÍ es:**
- Un colaborador que lee tu proyecto y actúa dentro de él
- Un sistema que puede usar herramientas: leer archivos, ejecutar comandos, llamar MCPs
- Un agente que sigue las instrucciones del CLAUDE.md como reglas del juego

**Instalar Skills del curso:**
```bash
npx skills add rcampos09/performance-testing-skills
```
Skills instalados:
- `performance-testing-strategy` — diseña el plan de testing
- `k6-best-practices` — genera scripts k6 production-ready
- `performance-report-analysis` — produce reportes técnico + negocio

### Clase 2-B: CLAUDE.md — La constitución del proyecto

El CLAUDE.md es el archivo que Claude Code lee en **cada conversación**. Define:
- Qué hace este proyecto y cuál es su objetivo
- Qué convenciones de código y estructura seguir
- Qué herramientas están disponibles y cómo usarlas
- Qué NO debe hacer Claude (prevención de alucinaciones)
- Cómo conectar con sistemas externos (JIRA, Grafana)

**Estructura mínima de un CLAUDE.md para performance testing:**

```markdown
# Performance Testing Project — Poleras Store

## Objetivo
Validar que los 5 microservicios del e-commerce soportan la carga
definida en los tickets JIRA del proyecto DEV antes de cada release.

## Stack
- Herramienta: k6 v1.0
- Target: localhost:3001-3005 (staging)
- MCPs activos: Grafana (localhost:3000) · Atlassian JIRA
- Skills: performance-testing-strategy · k6-best-practices · performance-report-analysis

## Flujo de trabajo obligatorio
1. Leer el ticket JIRA → extraer SLAs, VUs, duración
2. Generar estrategia con el Skill correspondiente
3. Crear/validar script k6 (5-Block Pattern)
4. Ejecutar y recopilar métricas con MCP Grafana
5. Generar reporte bimodal (técnico + negocio)
6. Comentar resultados en el ticket JIRA
7. Commit con Smart Commit referenciando el ticket

## Convenciones de scripts
- Todos los scripts siguen el 5-Block Pattern
- Los datos de prueba van en /data (SharedArray, nunca inline)
- Los resultados van en /results/YYYY-MM-DD_<tipo>_<servicio>/
- Siempre incluir handleSummary con reporte HTML

## Reglas para Claude
- NUNCA hardcodear URLs ni tokens en los scripts
- SIEMPRE consultar el ticket JIRA antes de diseñar el test
- SIEMPRE incluir thresholds que actúen como SLA gates
- Los Skills se invocan explícitamente, no automáticamente
```

**Práctica:** El alumno crea un CLAUDE.md para su proyecto de testing local.

### Clase 2-C: Prevención de alucinaciones — el contrato de calidad

**Problema real:** Claude Code puede generar código que "parece correcto" pero viola los SLAs definidos en JIRA.

**Solución:** El CLAUDE.md define el protocolo de validación:
```markdown
## Validación antes de generar un script
Antes de escribir cualquier script k6:
1. ¿Leíste el ticket JIRA correspondiente?
2. ¿Tienes los SLAs explícitos (P95 target, error rate máximo)?
3. ¿Tienes el perfil de carga (VUs, duración, ramp-up)?
4. ¿Confirmaste que el endpoint está corriendo y accesible?

Si no puedes responder SÍ a las 4 preguntas, pregunta al usuario antes de continuar.
```

---

## Módulo 3 — JIRA como Fuente de la Verdad + MCPs
**Objetivo:** El alumno usa el MCP de Atlassian para leer tickets JIRA y el MCP de Grafana para consultar métricas, sin salir de Claude Code.

### Clase 3-A: ¿Qué es un MCP y por qué cambia el juego?

**MCP (Model Context Protocol):** protocolo que permite a Claude Code conectarse a sistemas externos y usar sus APIs como herramientas nativas.

**Sin MCP:**
```
Tester → abre JIRA en el browser → copia SLAs → pega en Claude → genera script
Tester → abre Grafana → busca dashboard → copia métricas → pega en Claude → genera reporte
```

**Con MCP:**
```
Tester → "Claude, lee el ticket DEV-22 y genera el plan de testing"
Claude → llama JIRA MCP → lee el ticket → extrae SLAs → genera el plan

Tester → "Claude, analiza las métricas del test que acabo de ejecutar"
Claude → llama Grafana MCP → consulta PromQL → obtiene P95, error rate → genera reporte
```

**Configuración del .mcp.json:**
```json
{
  "mcpServers": {
    "grafana": {
      "command": "npx",
      "args": ["mcp-grafana-npx"],
      "env": {
        "GRAFANA_URL": "http://localhost:3000",
        "GRAFANA_SERVICE_ACCOUNT_TOKEN": "${GRAFANA_TOKEN}"
      }
    },
    "atlassian": {
      "type": "http",
      "url": "https://mcp.atlassian.com/v1/mcp",
      "headers": {
        "Authorization": "Bearer ${JIRA_API_TOKEN}"
      }
    }
  }
}
```

### Clase 3-B: MCP Atlassian — JIRA como fuente de la verdad

**Los tickets JIRA DEL CURSO (proyecto DEV — Poleras Store):**

| Ticket | Servicio | Endpoint | SLA P95 | Error Rate | VUs |
|--------|----------|----------|---------|------------|-----|
| DEV-19 | auth | POST /api/auth/login | < 450ms | < 0.5% | 10 |
| DEV-20 | products | GET /api/products | < 300ms | < 0.5% | 15 |
| DEV-21 | cart | POST/GET /api/cart | < 300ms | < 1% | 10 |
| DEV-22 | orders | POST /api/orders | < 500ms | < 0.5% | 8 |
| DEV-23 | payments | POST /api/payments | < 800ms | < 0.1% | 5 |
| DEV-24 | e2e | Flujo completo | todos | todos | 10 |

**Práctica — leer un ticket:**
```
"Claude, lee el ticket JIRA DEV-22 y extrae:
- El endpoint a testear
- Los SLAs definidos (P95 y error rate)
- El perfil de carga (VUs y duración)
- Los criterios de aceptación"
```

Claude usa el MCP de Atlassian para obtener esta información directamente del ticket.

**Smart Commits — cerrar el ciclo:**
Cuando Claude genera el commit, incluye referencias al ticket:
```bash
git commit -m "test(orders): load test DEV-22 - P95 450ms PASS

DEV-22 #comment Load test passed. P95: 380ms (SLA: 500ms). Error rate: 0.1%
DEV-22 #done"
```

### Clase 3-C: MCP Grafana — métricas en tiempo real desde Claude Code

**Capacidades del MCP Grafana:**
```
search_dashboards()         → encuentra dashboards por nombre
query_prometheus(expr)      → ejecuta PromQL directamente
query_loki_logs(logql)      → busca logs con LogQL
get_panel_image(uid, panel) → renderiza panel como imagen para incluir en reportes
```

**Práctica — consultar métricas de un test:**
```
"Durante el test de orders que acabo de ejecutar, consulta en Grafana:
1. El P95 del endpoint POST /api/orders en los últimos 30 minutos
2. El error rate en el mismo período
3. La utilización del connection pool de orders-db"
```

Claude llama al MCP Grafana con PromQL:
```promql
# P95 de orders
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{service="orders-service"}[5m]))

# Error rate
rate(http_requests_total{service="orders-service",status=~"5.."}[5m]) /
rate(http_requests_total{service="orders-service"}[5m])
```

**El poder de la combinación:**
JIRA MCP (qué debería pasar) + Grafana MCP (qué pasó) → Claude genera el reporte automáticamente comparando ambos.

---

## Módulo 4 — Estrategia de Testing desde un Ticket JIRA
**Skill activado:** `performance-testing-strategy`
**Objetivo:** El alumno pasa de un ticket JIRA a un plan de testing ejecutable en una sola conversación con Claude Code.

### Clase 4-A: Las 4 preguntas que el Skill hace siempre

El Skill no genera un plan sin antes recopilar:
1. **Patrón de tráfico:** ¿pico, steady-state, temporada alta?
2. **SLAs definidos:** ¿P95 objetivo, error rate máximo?
3. **Tiempo disponible:** ¿cuánto puede durar la ejecución?
4. **Aislamiento del ambiente:** ¿staging separado de producción?

Estas preguntas no son opcionales — son el contrato de calidad del plan.

### Clase 4-B: Del ticket al plan — flujo completo

**Historia que usaremos en este módulo: DEV-22 (Orders)**

**Prompt de ejemplo:**
```
Tengo el ticket JIRA DEV-22. Lee el ticket con el MCP de Atlassian
y genera una estrategia de performance testing completa para el
servicio de órdenes. Tengo ambiente de staging aislado y 90 minutos
disponibles para ejecutar los tests.
```

**Plan generado por el Skill (estructura esperada):**

```markdown
## Plan de Testing — DEV-22: Orders Service

### Sistema bajo prueba
- Endpoint: POST /api/orders
- Stack: Node.js + PostgreSQL (orders-db)
- SLA: P95 < 500ms, Error Rate < 0.5%

### Secuencia de ejecución (orden obligatorio)
1. Smoke Test     → 2 VU / 1 min    → validar conectividad básica
2. Load Baseline  → 8 VU / 10 min   → comportamiento normal
3. Load Peak      → 8 VU / 20 min   → validar SLA definido en DEV-22
4. Stress Test    → rampa 8→40 VU   → encontrar punto de quiebre

### Criterios de aceptación (tomados del ticket)
- PASS si P95 < 500ms en Load Peak
- PASS si error rate < 0.5% sostenido
- FAIL automático si error rate > 1% en cualquier escenario

### Riesgos identificados
- orders-db comparte servidor con cart-db → riesgo de resource contention
- El endpoint requiere JWT válido → el setup debe autenticar primero
```

**Discusión de clase:** ¿Qué decisiones tomó el Skill? ¿Con cuáles estás de acuerdo? ¿Cambiarías algo?

El alumno aprende que el plan es un punto de partida, no una orden. **El tester valida y ajusta.**

---

## Módulo 5 — Desarrollo de Scripts con k6
**Skill activado:** `k6-best-practices`
**Objetivo:** El alumno genera scripts k6 production-ready usando el 5-Block Pattern y entiende cada decisión de diseño.

### Clase 5-A: El 5-Block Pattern — por qué este orden importa

Cada script k6 bien construido tiene exactamente estos 5 bloques en este orden:

```javascript
// ═══════════════════════════════════════════════════
// BLOQUE 1: OPTIONS — SLA Gates (thresholds)
// Si un threshold falla, el test retorna exit code 1
// ═══════════════════════════════════════════════════
export const options = {
  scenarios: { ... },
  thresholds: {
    'http_req_duration{scenario:load}': ['p(95)<500'],  // DEV-22 SLA
    'http_req_failed': ['rate<0.005'],
  }
};

// ═══════════════════════════════════════════════════
// BLOQUE 2: DATA — SharedArray para datos de prueba
// SharedArray: se carga UNA vez, compartido entre todos los VUs
// NUNCA usar arrays globales normales → OOM con muchos VUs
// ═══════════════════════════════════════════════════
const users = new SharedArray('users', function() {
  return JSON.parse(open('./data/users.json'));
});

// ═══════════════════════════════════════════════════
// BLOQUE 3: SETUP — Se ejecuta UNA sola vez antes del test
// Ideal para: autenticación, seed de datos, validar ambiente
// ═══════════════════════════════════════════════════
export function setup() {
  const res = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify({
    email: users[0].email,
    password: users[0].password
  }), { headers: { 'Content-Type': 'application/json' } });
  return { token: res.json('token') };
}

// ═══════════════════════════════════════════════════
// BLOQUE 4: DEFAULT FUNCTION — Workload por VU
// Think time obligatorio: simula comportamiento humano real
// Sin sleep() → carga artificial que no existe en producción
// ═══════════════════════════════════════════════════
export default function(data) {
  // ... lógica del test
  sleep(Math.random() * 2 + 1); // Think time: 1-3 segundos
}

// ═══════════════════════════════════════════════════
// BLOQUE 5: HANDLE SUMMARY — Reporte al finalizar
// Genera HTML + JSON para el análisis posterior
// ═══════════════════════════════════════════════════
export function handleSummary(data) {
  return {
    'results/summary.html': htmlReport(data),
    'results/summary.json': JSON.stringify(data),
  };
}
```

### Clase 5-B: Los 10 errores que el Skill detecta y corrige

| Error | Consecuencia | Corrección |
|-------|-------------|------------|
| Sin `sleep()` | Carga 10-100x mayor de la real | Agregar think time entre requests |
| URL hardcodeada | Script no portable entre ambientes | Usar `__ENV.BASE_URL` |
| `check()` sin conteo | Fallos silenciosos en reportes | Usar `check()` como boolean, agregar contador |
| Array global (no SharedArray) | OOM con >50 VUs | Migrar a SharedArray |
| `atOnceUsers` en load test | Spike involuntario al inicio | Usar `ramping-vus` |
| Token en el código | Seguridad comprometida | Usar `__ENV.API_TOKEN` |
| Sin thresholds | Test siempre pasa aunque falle el SLA | Agregar thresholds antes de ejecutar |
| Sin `Content-Type` header | 400 errors que parecen errores del sistema | Siempre incluir headers en POST |
| Feeder mode incorrecto | Usuarios se repiten o se agotan | `random` para carga, `sequential` para funcional |
| Sin correlación de sesión | Cada VU crea usuarios duplicados | Generar sessionId único por VU |

### Clase 5-C: Generando el script para DEV-22 (Orders)

**Prompt de ejemplo:**
```
Con base en el plan de testing que generamos para DEV-22, crea el
script k6 completo para el servicio de órdenes. El flujo es:
POST /api/auth/login → POST /api/orders

Datos de prueba en /data/users.json (email, password)
BASE_URL via __ENV.BASE_URL, default: http://localhost:3004
Incluye los 4 escenarios del plan: smoke, baseline, load, stress.
```

**Decisiones clave que el alumno debe entender:**
- ¿Por qué el `setup()` hace login en lugar de cada VU? (eficiencia)
- ¿Por qué los thresholds tienen `{scenario:load}`? (no aplicar SLA al stress test)
- ¿Por qué `gracefulStop: '60s'` en el escenario e2e? (requests en curso al hacer ramp-down)

### Clase 5-D: Ejecutando el script

```bash
# Smoke Test (validar que funciona)
k6 run --env BASE_URL=http://localhost:3004 \
       --env SCENARIO=smoke \
       tests/orders/orders.test.js

# Load Test (validar SLA de DEV-22)
k6 run --env BASE_URL=http://localhost:3004 \
       --env SCENARIO=load \
       --out json=results/$(date +%Y-%m-%d)_load_orders/raw.json \
       tests/orders/orders.test.js
```

**Observar durante la ejecución:** Grafana dashboard RED Metrics en tiempo real.

---

## Módulo 6 — Ejecución + Observabilidad con MCP Grafana
**Objetivo:** El alumno interpreta Prometheus, Tempo y Loki para diagnosticar cuellos de botella durante y después de un test.

### Clase 6-A: El triángulo de observabilidad

```
        MÉTRICAS (Prometheus/Grafana)
        "¿Qué está pasando en números?"
             /              \
            /                \
    TRAZAS (Tempo)    LOGS (Loki)
    "¿Dónde está       "¿Qué dijo
     el tiempo?"        el sistema?"
```

Los tres se correlacionan vía **TraceID** — esa es la ventaja de OpenTelemetry.

### Clase 6-B: Prometheus + Grafana — ¿qué mirar durante el test?

**Dashboard RED Metrics (dashboard ID: ecommerce-apm-v1):**

Los 4 paneles críticos durante un load test:
1. **Request Rate** — ¿el sistema recibe el tráfico que k6 está enviando?
2. **Error Rate** — ¿aparecen errores 5xx al crecer la carga?
3. **P95 Latency** — ¿se mantiene bajo el umbral del SLA?
4. **DB Connection Pool** — ¿se está agotando antes que la CPU?

**Práctica con MCP Grafana:**
```
"Durante el load test de orders que ejecuté hace 10 minutos,
consulta el P95 de POST /api/orders y el uso del connection pool
de orders-db. ¿En qué momento (si alguno) empezó la degradación?"
```

Claude ejecuta:
```promql
# P95 orders endpoint
histogram_quantile(0.95,
  rate(http_request_duration_seconds_bucket{
    service="orders-service",
    method="POST",
    route="/api/orders"
  }[5m])
)

# DB connection pool
pg_stat_activity_count{datname="orders_db"} /
pg_settings_max_connections{datname="orders_db"}
```

### Clase 6-C: Tempo — encontrar el span más lento

**Flujo de diagnóstico:**
1. En Grafana, filter por P99 latency del endpoint con mayor degradación
2. Abre una traza del período de mayor latencia
3. Identifica el span padre (HTTP handler) y los spans hijos
4. Pregunta: ¿cuál span consume el 80%+ del tiempo total?

**Patrones comunes:**
```
orders-service [480ms total]
  ├── auth validation    [12ms]   ← normal
  ├── db: INSERT orders  [420ms]  ← AQUÍ está el problema
  │     └── db: SELECT inventory  [380ms]  ← query sin índice
  └── emit event         [8ms]   ← normal
```

**Práctica:**
```
"Abre la traza más lenta del endpoint /api/orders en los últimos
30 minutos y dime en qué span está el 80% del tiempo total."
```

### Clase 6-D: Loki — correlacionar logs con el trace

Con OpenTelemetry, cada log incluye el `traceId`. Desde Grafana → Explore → Loki:

```logql
# Buscar errores del servicio de orders en el período del test
{service="orders-service"} |= "ERROR" | json | level="ERROR"

# Correlacionar un error específico con su traza
{service="orders-service"} | json | traceId="abc123..."
```

**Práctica:**
```
"Busca en Loki los errores del orders-service durante el stress test
de hace 20 minutos. Para el error más frecuente, dame el traceId
y ábrelo en Tempo."
```

**El checklist de diagnóstico (9 patrones):**

| Patrón | Señal en Grafana | Señal en Tempo | Señal en Loki |
|--------|-----------------|----------------|---------------|
| DB connection pool exhaustion | Pool > 95%, latencia crece bruscamente | Spans DB > 500ms | `connection refused`, `pool timeout` |
| Memory leak | Latencia crece monotónicamente | Spans GC > 100ms | `heap size`, `OOM` |
| CPU saturation | CPU > 90% | Spans de processing largas | — |
| Thread pool exhaustion | Error rate sube, CPU baja | Timeouts en spans | `thread rejected`, `queue full` |
| N+1 query | Latencia crece con carga lineal | Muchos spans DB cortos | queries repetidas |
| Cold start | Spike de latencia al inicio | Setup spans lentos | `initializing` |
| Event loop blocking | Latencia alta, CPU normal | Un solo span largo | `event loop delay` |
| Cascading failure | Error rate en cadena | Spans downstream fallando | `circuit breaker open` |
| Network I/O | Latencia irregular | Spans de red variables | `ECONNRESET` |

---

## Módulo 7 — Reportes Bimodales → Comentar en JIRA
**Skill activado:** `performance-report-analysis`
**Objetivo:** Transformar resultados crudos en dos reportes: uno para el equipo técnico, uno para el negocio. Ambos se adjuntan al ticket JIRA.

### Clase 7-A: El triage de resultados — orden obligatorio

El Skill siempre analiza en este orden:
1. **Errores primero** — si error rate > umbral, todo lo demás es ruido
2. **Throughput** — ¿el sistema alcanzó el RPS que k6 intentó enviar?
3. **P95 vs SLA** — ¿cumple el criterio de aceptación de DEV-XX?
4. **Tendencia temporal** — ¿la latencia crece durante el test? (memory leak signal)
5. **Breakdown por endpoint** — ¿cuál request es el cuello de botella?

### Clase 7-B: El Reporte Técnico

**Audiencia:** Desarrolladores, Arquitectos, DevOps, QA Lead
**Propósito:** Dar evidencia para decidir si el sistema está listo para producción

**Componentes:**
```markdown
## Reporte Técnico — DEV-22: Orders Service
**Fecha:** 2026-04-01 | **Tipo:** Load Test | **Duración:** 20 min

### SLA Compliance
| Métrica | Resultado | SLA | Status |
|---------|-----------|-----|--------|
| P95 Latency | 420ms | < 500ms | ✅ PASS |
| Error Rate | 0.1% | < 0.5% | ✅ PASS |
| Throughput | 8 RPS | target | ✅ OK |

### Findings
| Severidad | Finding | Evidencia |
|-----------|---------|-----------|
| HIGH | P99 = 1800ms (3.6x el SLA) — outliers preocupantes | Trace ID: abc123 |
| MEDIUM | DB pool al 78% bajo carga nominal | Grafana: orders-db pool panel |
| LOW | Cold start de 2.1s en primer request | Log: "service initializing" |

### Diagnóstico
La causa raíz del P99 elevado es una query sin índice en orders-db
(SELECT * FROM inventory WHERE product_id = $1). El plan de ejecución
muestra Seq Scan en lugar de Index Scan.

### Recomendaciones
1. [CRÍTICO] Agregar índice: `CREATE INDEX idx_inventory_product ON inventory(product_id)`
2. [RECOMENDADO] Aumentar pool size de 10 a 25 conexiones
3. [MONITOREAR] Implementar alerting en P99 > 1000ms
```

**Prompt de ejemplo:**
```
Analiza los resultados del load test de orders (DEV-22).
Tengo el JSON de k6 en results/2026-04-01_load_orders/raw.json
y las métricas de Grafana del mismo período.
Genera el reporte técnico completo con triage, findings y diagnóstico.
```

### Clase 7-C: El Reporte de Negocio

**Audiencia:** Product Manager, CTO, Stakeholders no técnicos
**Regla de oro:** Cero percentiles, cero jerga técnica. Todo en términos de experiencia de usuario.

**La traducción que el Skill aplica:**

| Técnico | Negocio |
|---------|---------|
| P95 = 420ms (PASS) | El 95% de los clientes completa su orden en menos de medio segundo |
| P99 = 1800ms (fuera de SLA) | 1 de cada 100 clientes espera casi 2 segundos — riesgo de abandono |
| Error rate 0.1% | 1 de cada 1000 órdenes falla; las demás se procesan correctamente |
| DB pool al 78% | El sistema tiene 22% de capacidad de reserva ante picos inesperados |

**Estructura del reporte de negocio:**
```markdown
## Reporte Ejecutivo — Servicio de Órdenes
**Decisión requerida:** ¿Está listo para el release de esta semana?

### Resultado: CONDITIONAL GO ⚠️

### Resumen para stakeholders
Bajo la carga esperada (comportamiento normal), el 99% de los clientes
completa su orden en menos de medio segundo, cumpliendo el compromiso
de experiencia que el equipo definió.

Sin embargo, 1 de cada 100 clientes está experimentando esperas de
casi 2 segundos, lo cual incrementa el riesgo de abandono de carrito
en un ~15% para ese segmento.

### Condición para GO completo
El equipo de backend puede resolver el problema identificado en 2 horas
(optimización de base de datos). Recomendamos ejecutar el release con
este fix incluido.

### Impacto si se lanza sin el fix
Basado en los datos del test, en un día de tráfico normal estimamos
entre 50-100 usuarios afectados por esperas inaceptables.
```

### Clase 7-D: Cerrar el ciclo — comentar en JIRA con MCP

```
"Toma el reporte técnico y el reporte de negocio que generamos
para DEV-22 y agrégalos como comentario al ticket JIRA. Marca
el ticket como 'In Review' y vincula los hallazgos al ticket
DEV-22-BUG-01 que creamos para el índice faltante."
```

Claude usa el MCP Atlassian:
```
addCommentToJiraIssue(cloudId, "DEV-22", reportContent)
transitionJiraIssue(cloudId, "DEV-22", "In Review")
createIssueLink("DEV-22", "DEV-22-BUG-01", "is blocked by")
```

---

## Módulo 8 — Proyecto Final: Sprint de Performance Completo
**Objetivo:** El alumno ejecuta un sprint de performance testing completo, simulando el flujo real de trabajo de un equipo profesional.

### El Escenario

El equipo de Poleras Store va a lanzar la funcionalidad de **checkout express** en 5 días. El CTO necesita una validación de performance de los 5 servicios antes del release.

Los tickets están en JIRA (DEV-19 a DEV-24). El alumno tiene acceso completo al stack y a Claude Code.

### Sprint de 5 días (estructura del proyecto final)

**Día 1 — Estrategia (2 horas)**
- Leer los 6 tickets JIRA (DEV-19 a DEV-24) usando MCP Atlassian
- Generar el plan de testing para cada servicio
- Identificar riesgos y dependencias entre servicios
- Entregable: Documento de estrategia comentado en cada ticket JIRA

**Día 2 — Scripts (3 horas)**
- Generar los 5 scripts de servicio individual (auth, products, cart, orders, payments)
- Revisar y ajustar cada script antes de ejecutar (el tester valida, no acepta ciegamente)
- Entregable: Scripts en `/tests/` siguiendo el 5-Block Pattern

**Día 3 — Ejecución (2 horas)**
- Ejecutar en secuencia: Smoke → Load → Stress para cada servicio
- Monitorear en tiempo real en Grafana
- Capturar screenshots de paneles clave para el reporte
- Entregable: Resultados en `/results/` con raw.json y HTML report

**Día 4 — Análisis (2 horas)**
- Analizar resultados de todos los servicios
- Usar MCP Grafana para consultar métricas complementarias
- Usar MCP Grafana para obtener imágenes de paneles
- Identificar el servicio más crítico para el release
- Entregable: Reporte técnico por servicio

**Día 5 — Reporte + Decisión (1.5 horas)**
- Generar el reporte de negocio consolidado de los 5 servicios
- Ejecutar el test e2e (DEV-24) — el flujo completo de checkout
- Tomar la decisión: GO / NO-GO / CONDITIONAL GO
- Comentar todos los resultados en los tickets JIRA
- Hacer el commit final con Smart Commits referenciando DEV-19 a DEV-24
- Entregable: Reporte ejecutivo final

### Criterios de evaluación del proyecto final

| Criterio | Peso |
|----------|------|
| El plan de testing está justificado desde los tickets JIRA | 20% |
| Los scripts siguen el 5-Block Pattern sin errores críticos | 25% |
| El diagnóstico de bottlenecks está respaldado por evidencia del stack | 25% |
| El reporte de negocio no contiene jerga técnica y tiene una decisión clara | 20% |
| El ciclo JIRA está cerrado (comentarios + transición de tickets) | 10% |

---

## El Flujo Completo — Cheatsheet del Alumno

```
JIRA Ticket (DEV-XX)
       │
       ▼ [MCP Atlassian: leer SLAs, VUs, duración]
       │
Estrategia de Testing
       │ [Skill: performance-testing-strategy]
       │ ← HUMANO REVISA Y APRUEBA ←
       ▼
Script k6 (5-Block Pattern)
       │ [Skill: k6-best-practices]
       │ ← HUMANO REVISA Y APRUEBA ←
       ▼
Ejecución k6
       │ k6 run --out json=results/...
       │
       ▼ [MIENTRAS EJECUTA]
       │
Observar en Grafana
       │ RED Metrics + Traces + Logs
       │
       ▼ [AL TERMINAR]
       │
Análisis con MCP Grafana
       │ [MCP: query_prometheus() + query_loki_logs()]
       │
       ▼
Reporte Técnico + Reporte de Negocio
       │ [Skill: performance-report-analysis]
       │ ← HUMANO REVISA Y FIRMA ←
       ▼
Comentar en JIRA + Transición de ticket
       │ [MCP Atlassian: addComment() + transition()]
       │
       ▼
Git commit con Smart Commit
       │ "fix(orders): DEV-22 #done"
       ▼
Decisión: GO / NO-GO / CONDITIONAL GO
```

---

## Resumen de Herramientas por Módulo

| Módulo | Herramienta principal | Skills | MCPs |
|--------|----------------------|--------|------|
| 1 | Docker / Poleras Store | — | — |
| 2 | Claude Code + CLAUDE.md | Setup | — |
| 3 | JIRA + Grafana | — | Atlassian + Grafana |
| 4 | Estrategia | performance-testing-strategy | Atlassian |
| 5 | k6 scripts | k6-best-practices | — |
| 6 | Grafana / Tempo / Loki | — | Grafana |
| 7 | Reportes + JIRA | performance-report-analysis | Atlassian + Grafana |
| 8 | Todo el stack | Todos | Todos |

---

## Notas para Refinar

### Decisiones pendientes
- [ ] Definir duración exacta por clase (propuesta: 90 min = 30 teoría + 60 práctica)
- [ ] ¿El curso es sincrónico, asincrónico o mixto?
- [ ] ¿Los alumnos traen su propio JIRA o usamos un board compartido del curso?
- [ ] Definir si el módulo 5 incluye Gatling/Locust como alternativas o se enfoca solo en k6

### Mejoras al laboratorio
- [ ] Verificar que todos los endpoints del flujo e2e están documentados en el README
- [ ] Agregar datos de prueba realistas (usuarios, cards, products) precargados en el lab
- [ ] Crear un dashboard de Grafana específico para los tests del curso (con anotaciones de k6)
- [ ] Documentar cómo resetear la base de datos entre pruebas (teardown de estado)

### Contenido adicional a evaluar
- [ ] Módulo bonus: CI/CD — ejecutar k6 en GitHub Actions y comentar resultados en JIRA automáticamente
- [ ] Módulo bonus: Comparación de runs — detectar regresiones de performance entre versiones
- [ ] Ejercicio de debugging: introducir un bug de performance deliberado (N+1 query) para que los alumnos lo diagnostiquen

### Gaps identificados en el curso actual
- El módulo 6 (observabilidad) es el más denso — considerar dividirlo en dos clases
- Falta un ejercicio de "reverse engineering": dado un reporte, ¿qué test lo generó?
- Los Smart Commits merecen una práctica dedicada — muchos QAs no están familiarizados con git

---

*Borrador v0.2 — Rodrigo Campos — 2026-04-01*
*Revisado con contexto real del laboratorio y del proyecto k6-practice-load*
