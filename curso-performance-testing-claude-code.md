# Claude Code for Performance Tester
### Guía Clase a Clase — Borrador v0.4

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
           └─ Alternativas opcionales: Locust (skill: locust-best-practices)
                                       Gatling (skill: gatling-best-practices)
Módulo 6 → Ejecución + Navegar Observabilidad (Grafana: logs, trazas, métricas)
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

### Competencias del módulo
Al completar este módulo serás capaz de:
- Distinguir los 5 tipos de prueba de performance y justificar cuándo usar cada uno
- Explicar la cadena SLI → SLO → SLA con ejemplos concretos de negocio
- Levantar el laboratorio completo (5 servicios + observabilidad) y verificar su estado
- Hacer tu primera interacción productiva con Claude Code sobre el proyecto

### Rúbrica de evaluación

| Nivel | Criterio |
|-------|----------|
| **Básico** | El laboratorio corre y puedes acceder a Grafana con los 4 dashboards disponibles |
| **Competente** | Puedes explicar los 5 tipos de prueba y cuándo aplica cada uno dado un escenario de negocio |
| **Avanzado** | Puedes identificar qué tipo de prueba faltó en un incidente real y por qué lo habría prevenido |

---

### Clase 1-A: El gap de los equipos de QA modernos
> **Al terminar esta clase podrás:** Explicar el ciclo completo de performance testing y traducir métricas técnicas (P95, RPS, error rate) al lenguaje de negocio (SLA, impacto de usuario).

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
> **Al terminar esta clase podrás:** Levantar el stack completo con Docker, verificar los 5 servicios y hacer tu primera consulta a Claude Code sobre la arquitectura del sistema.

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

### Competencias del módulo
Al completar este módulo serás capaz de:
- Instalar Claude Code y los 3 Skills del curso en cualquier proyecto
- Escribir un CLAUDE.md que defina el flujo de trabajo, las convenciones y las reglas de calidad
- Configurar el protocolo de validación para prevenir que Claude genere artefactos sin contexto suficiente
- Distinguir cuándo Claude actúa como herramienta vs cuándo el humano debe tomar la decisión

### Rúbrica de evaluación

| Nivel | Criterio |
|-------|----------|
| **Básico** | Claude Code instalado con los 3 Skills; CLAUDE.md existe en el proyecto |
| **Competente** | El CLAUDE.md define flujo de trabajo obligatorio, convenciones de scripts y reglas para Claude; Claude las sigue sin desviarse |
| **Avanzado** | Puedes escribir un CLAUDE.md para un proyecto que no sea el del curso, adaptando las reglas a un stack tecnológico diferente |

---

### Clase 2-A: ¿Qué es Claude Code y cómo piensa?
> **Al terminar esta clase podrás:** Explicar el modelo mental de Claude Code (no es un chatbot, es un agente que actúa en tu proyecto) e instalar los Skills del curso.

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
> **Al terminar esta clase podrás:** Escribir un CLAUDE.md que defina el objetivo del proyecto, el flujo de trabajo obligatorio y las convenciones de scripts.

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
> **Al terminar esta clase podrás:** Agregar un protocolo de validación al CLAUDE.md que evite que Claude genere scripts sin los 4 datos mínimos necesarios.

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

### Competencias del módulo
Al completar este módulo serás capaz de:
- Configurar el `.mcp.json` con los MCPs de Atlassian y Grafana
- Crear un board de JIRA con tickets estructurados usando Claude Code como asistente
- Leer un ticket JIRA desde Claude Code y extraer SLAs, perfil de carga y criterios de aceptación
- Ejecutar queries de Prometheus y Loki desde Claude Code sin abrir Grafana manualmente

### Rúbrica de evaluación

| Nivel | Criterio |
|-------|----------|
| **Básico** | MCPs configurados; Claude puede leer un ticket JIRA y una métrica de Grafana |
| **Competente** | Claude crea los 6 tickets del proyecto en JIRA y consulta P95 + error rate de un servicio en un solo prompt |
| **Avanzado** | Puedes combinar datos de JIRA (qué debería pasar) con datos de Grafana (qué pasó) en una respuesta integrada de Claude |

---

### Clase 3-A: ¿Qué es un MCP y por qué cambia el juego?
> **Al terminar esta clase podrás:** Explicar qué es MCP, configurar el `.mcp.json` con los dos MCPs del curso y verificar que Claude puede conectarse a ambos sistemas.

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

### Clase 3-B: Setup del JIRA personal del alumno
> **Al terminar esta clase podrás:** Crear tu board JIRA gratuito, generar los 6 tickets del proyecto con Claude Code y leer el primer ticket desde Claude sin abrir el browser.

Cada alumno trabaja con su **propio board de JIRA** usando la capa gratuita de Atlassian.
Esto replica el flujo real de trabajo: cada tester conecta su proyecto personal a Claude Code.

**Paso 1 — Crear cuenta y proyecto JIRA (5 minutos)**
- Ir a https://www.atlassian.com/software/jira/free
- Crear cuenta gratuita y un nuevo proyecto tipo "Scrum"
- Nombrar el proyecto: `PERF` (o el prefijo que el alumno prefiera)

**Paso 2 — Crear la estructura del proyecto vía Claude Code**

En lugar de crear los tickets manualmente, el alumno le pide a Claude que lo haga:

```
"Tengo un proyecto JIRA vacío llamado PERF. Voy a hacer performance
testing del e-commerce Poleras Store que tiene 5 microservicios:
auth (:3001), products (:3002), cart (:3003), orders (:3004), payments (:3005).

Crea en JIRA los tickets de performance testing para cada servicio
con los SLAs apropiados para cada uno, incluyendo el flujo e2e.
Usa los siguientes criterios técnicos como base:
- auth:     P95 < 450ms, error rate < 0.5%, 10 VUs
- products: P95 < 300ms, error rate < 0.5%, 15 VUs
- cart:     P95 < 300ms, error rate < 1%,   10 VUs
- orders:   P95 < 500ms, error rate < 0.5%,  8 VUs
- payments: P95 < 800ms, error rate < 0.1%,  5 VUs
- e2e:      todos los SLAs anteriores,       10 VUs"
```

Claude usa el MCP Atlassian para crear todos los tickets directamente.
El alumno termina con 6 tickets listos en su board personal.

**Por qué esto importa:**
El alumno aprende que Claude Code no solo consume datos del sistema de gestión —
también puede **construir la estructura de trabajo** a partir de requisitos técnicos.
Esta habilidad se transfiere directamente al trabajo real.

**Paso 3 — Conectar el MCP al proyecto personal**

```json
// .mcp.json del alumno (reemplaza CLOUD_ID con el suyo)
{
  "mcpServers": {
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

El Cloud ID y API Token se obtienen desde https://id.atlassian.com/manage-profile/security/api-tokens

**Práctica — leer el primer ticket creado:**
```
"Claude, lee el ticket PERF-1 (auth service) de mi JIRA y
extrae los SLAs, el perfil de carga y los criterios de aceptación
que vamos a usar para diseñar el test."
```

**Smart Commits — cerrar el ciclo:**
Cuando Claude genera el commit, incluye referencias al ticket del alumno:
```bash
git commit -m "test(auth): smoke + load test PERF-1 - P95 380ms PASS

PERF-1 #comment Load test passed. P95: 380ms (SLA: 450ms). Error rate: 0.1%
PERF-1 #done"
```

### Clase 3-C: MCP Grafana — métricas en tiempo real desde Claude Code
> **Al terminar esta clase podrás:** Consultar el P95 y error rate de cualquier servicio del lab desde Claude Code, sin abrir Grafana manualmente.

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

### Competencias del módulo
Al completar este módulo serás capaz de:
- Identificar las 4 preguntas que determinan la calidad de cualquier plan de performance testing
- Generar un plan completo (tipos de prueba, perfiles de carga, secuencia, criterios de aceptación) desde un ticket JIRA
- Evaluar críticamente el plan generado por Claude e identificar ajustes necesarios
- Documentar riesgos y dependencias entre servicios antes de ejecutar

### Rúbrica de evaluación

| Nivel | Criterio |
|-------|----------|
| **Básico** | Claude genera un plan para el ticket dado con al menos 3 tipos de prueba y su secuencia |
| **Competente** | El alumno revisa el plan, identifica al menos un ajuste necesario y lo argumenta técnicamente |
| **Avanzado** | El alumno puede justificar cada decisión del plan (tipo de prueba, VUs, duración) en términos de riesgo de negocio y características del sistema |

---

### Clase 4-A: Las 4 preguntas que el Skill hace siempre
> **Al terminar esta clase podrás:** Responder las 4 preguntas de contexto antes de cualquier plan, y entender por qué cada una es obligatoria.

El Skill no genera un plan sin antes recopilar:
1. **Patrón de tráfico:** ¿pico, steady-state, temporada alta?
2. **SLAs definidos:** ¿P95 objetivo, error rate máximo?
3. **Tiempo disponible:** ¿cuánto puede durar la ejecución?
4. **Aislamiento del ambiente:** ¿staging separado de producción?

Estas preguntas no son opcionales — son el contrato de calidad del plan.

### Clase 4-B: Del ticket al plan — flujo completo
> **Al terminar esta clase podrás:** Generar el plan de testing para DEV-22, cuestionarlo con criterio propio y comentar el plan aprobado directamente en el ticket JIRA.

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

### Competencias del módulo
Al completar este módulo serás capaz de:
- Explicar el propósito de cada uno de los 5 bloques y las consecuencias de omitir alguno
- Identificar los 10 errores críticos más comunes en scripts k6 antes de ejecutarlos
- Generar un script completo desde el plan de testing usando el Skill k6-best-practices
- Ejecutar el script en modo Smoke y Load y correlacionar su salida con Grafana en tiempo real

### Rúbrica de evaluación

| Nivel | Criterio |
|-------|----------|
| **Básico** | Script generado que corre sin errores; tiene thresholds y SharedArray |
| **Competente** | Script sigue el 5-Block Pattern completo; el alumno puede identificar al menos 3 errores en un script de ejemplo antes de ejecutarlo |
| **Avanzado** | El alumno puede revisar el script de un compañero, detectar todos los errores críticos y argumentar por qué cada uno importa en un test de carga real |

---

### Clase 5-A: El 5-Block Pattern — por qué este orden importa
> **Al terminar esta clase podrás:** Leer cualquier script k6 e identificar a qué bloque pertenece cada sección, y qué problema resuelve cada bloque.

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
> **Al terminar esta clase podrás:** Auditar un script k6 e identificar los errores críticos antes de que el Skill lo haga por ti — ese es el nivel de criterio que distingue a un QE senior.

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
> **Al terminar esta clase podrás:** Generar el script completo para el servicio de órdenes y justificar las 3 decisiones de diseño clave del script generado.

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
> **Al terminar esta clase podrás:** Ejecutar el Smoke Test y el Load Test desde la terminal, y observar la correlación entre los VUs de k6 y los paneles de Grafana en tiempo real.

```bash
# Smoke Test (validar que funciona)
k6 run --env BASE_URL=http://localhost:3004 \
       --env SCENARIO=smoke \
       tests/orders/orders.test.js

# Load Test (validar SLA del ticket JIRA)
k6 run --env BASE_URL=http://localhost:3004 \
       --env SCENARIO=load \
       --out json=results/$(date +%Y-%m-%d)_load_orders/raw.json \
       tests/orders/orders.test.js
```

**Observar durante la ejecución:** Grafana dashboard RED Metrics en tiempo real.

---

### Alternativas opcionales al final del módulo

> **Nota para el alumno:** el curso está enfocado en k6, que es la herramienta del laboratorio.
> Si tu stack tecnológico actual usa Locust o Gatling, los Skills del curso te cubren.
> No necesitas aprender k6 para sacar valor del curso — el flujo de trabajo es idéntico.

**Si tu equipo usa Python → Locust (Skill: `locust-best-practices`)**
```
"Tengo el mismo plan de testing para el endpoint /api/orders.
Genera el script en Locust (Python) con el mismo perfil de carga
y los mismos SLAs."
```
El Skill genera el patrón de 4 bloques: imports/config, HttpUser class, CustomLoadShape, CLI command.

**Si tu equipo usa Java/Kotlin → Gatling (Skill: `gatling-best-practices`)**
```
"Genera el mismo test en Gatling (Java). Usa el patrón de 5 bloques:
Protocol, Feeders, Scenario, Injection Profile, Assertions."
```

**Tabla de decisión rápida:**

| Si tu equipo usa... | Herramienta | Skill disponible |
|---------------------|-------------|-----------------|
| JavaScript/TypeScript | k6 | `k6-best-practices` |
| Python | Locust | `locust-best-practices` |
| Java / Kotlin / Scala | Gatling | `gatling-best-practices` |

El flujo posterior (Módulos 6, 7, 8) es idéntico independientemente de la herramienta.

---

## Módulo 6 — Navegando la Observabilidad durante y después del Test
**Objetivo:** El alumno sabe exactamente dónde mirar en Grafana antes, durante y después de un test.
No aprende a crear dashboards — en la industria los dashboards ya existen.
Lo que el tester necesita saber es **cómo navegarlos y qué le están diciendo**.

### Competencias del módulo
Al completar este módulo serás capaz de:
- Verificar el estado del ambiente en menos de 2 minutos antes de ejecutar cualquier test
- Leer los 4 paneles críticos durante la ejecución e identificar señales de alerta
- Navegar Tempo para encontrar el span responsable del 80% de la latencia
- Correlacionar un error en Loki con su traza en Tempo usando el TraceID
- Formular el prompt de análisis integrado para que Claude diagnostique la causa raíz

### Rúbrica de evaluación

| Nivel | Criterio |
|-------|----------|
| **Básico** | Puedes abrir el dashboard RED Metrics, identificar los 4 paneles y detectar si hay error rate > 0 |
| **Competente** | Puedes navegar Tempo y Loki para encontrar el span culpable y el error más frecuente de un test ejecutado |
| **Avanzado** | Puedes formular el diagnóstico de causa raíz con evidencia de los 3 sistemas (métricas + trazas + logs) y asociarlo a uno de los 9 patrones del checklist |

---

> **Contexto real:** La mayoría de las empresas ya tienen Grafana con dashboards de sus servicios.
> Tu trabajo como tester no es construir observabilidad — es saber leerla.
> Claude Code + MCP Grafana te dan la capacidad de hacer preguntas sobre esos dashboards
> sin necesidad de saber PromQL o LogQL de memoria.

### Clase 6-A: El triángulo de observabilidad — la brújula del tester
> **Al terminar esta clase podrás:** Aplicar el flujo de investigación (métricas → logs → trazas) para cualquier problema detectado durante un test.

```
        MÉTRICAS (Prometheus → Grafana)
        "¿Qué está pasando en números?"
        Cuándo: durante y después del test
             /              \
            /                \
    TRAZAS (Tempo)        LOGS (Loki)
    "¿Dónde está          "¿Qué dijo
     el tiempo?"           el sistema?"
    Cuándo: al             Cuándo: cuando
    investigar             hay errores
    latencia alta
```

Los tres se correlacionan vía **TraceID** — esa es la ventaja de OpenTelemetry.
Un log tiene el traceId. Una traza tiene el traceId. Una métrica tiene el timestamp.
Con los tres puedes reconstruir exactamente qué pasó durante el pico de carga.

**El flujo de investigación del tester:**
```
1. Grafana RED dashboard → veo que P95 sube o error rate sube
                ↓
2. ¿Error rate > 0? → Loki → busco los mensajes de error
                ↓
3. ¿Latencia alta? → Tempo → busco la traza más lenta
                ↓
4. Tengo evidencia → Claude analiza y diagnostica la causa raíz
```

### Clase 6-B: Antes del test — validar que el ambiente está sano
> **Al terminar esta clase podrás:** Completar el pre-flight de 2 minutos en Grafana (o con MCP) antes de cualquier ejecución, y reconocer cuándo el ambiente no está en condiciones para un test.

**No ejecutes el test si el ambiente ya está degradado.**
Antes de cada ejecución, 2 minutos en Grafana:

```
Grafana → Dashboards → RED Metrics (ecommerce-apm-v1)

Verificar:
✓ Error rate en 0% (ningún servicio tiene errores en reposo)
✓ Latencia de baseline < 100ms en todos los servicios
✓ DB connection pool < 30% de ocupación
✓ Todos los contenedores en estado healthy
```

**Con MCP Grafana desde Claude Code:**
```
"Antes de ejecutar el load test de orders, verifica el estado
de salud de todos los servicios del e-commerce en Grafana.
¿Hay algún servicio con errores o latencia elevada en este momento?"
```

### Clase 6-C: Durante el test — 4 paneles que importan
> **Al terminar esta clase podrás:** Monitorear en tiempo real e identificar la señal que indica "detener el test" antes de que consuma tiempo y recursos en datos no útiles.

Abre el dashboard RED Metrics **antes de ejecutar k6** y mantén la vista durante todo el test.

**Los 4 paneles que el tester mira en tiempo real:**

```
┌─────────────────────┬─────────────────────┐
│  1. Request Rate    │  2. Error Rate       │
│  "¿Llegó el         │  "¿Hay errores 5xx?" │
│   tráfico?"         │                      │
│                     │  🔴 si sube → STOP   │
│  debe subir con k6  │  ✅ < umbral del SLA │
├─────────────────────┼─────────────────────┤
│  3. P95 Latency     │  4. DB Pool Usage    │
│  "¿Cumple el SLA?"  │  "¿Se va a agotar?" │
│                     │                      │
│  🔴 si supera SLA   │  ⚠️  si > 70%       │
│  ✅ bajo la línea   │  🔴 si > 90%        │
└─────────────────────┴─────────────────────┘
```

**Señal de pausa:** Si el error rate supera el doble del SLA antes de terminar el test,
detén la ejecución y diagnostica antes de continuar. Un test corriendo sobre un sistema
ya degradado no genera datos útiles.

```bash
# Detener k6 manualmente si ves degradación grave
Ctrl + C  →  k6 genera el reporte parcial de todos modos
```

### Clase 6-D: Después del test — navegar Tempo para encontrar el cuello de botella
> **Al terminar esta clase podrás:** Ejecutar una búsqueda TraceQL en Tempo, leer la cascada de spans e identificar cuál span es el responsable de la latencia alta.

> **Regla del 80/20:** El 80% de la latencia total normalmente viene de un único span.
> Tu trabajo es encontrar ese span.

**Cómo navegar a una traza lenta en Grafana:**

```
Grafana → Explore → Datasource: Tempo

TraceQL (el lenguaje de búsqueda):
{ .http.route = "/api/orders" && duration > 400ms }

Esto devuelve trazas del endpoint /api/orders que tardaron más de 400ms.
```

**Leer una traza — lo que verás:**
```
orders-service [480ms total]
  ├── middleware: auth validation    [12ms]   ← normal, < 5% del total
  ├── db: INSERT INTO orders         [420ms]  ← 87% del tiempo total ← AQUÍ
  │     └── db: SELECT FROM inventory [380ms] ← query sin índice
  └── event: order.created           [8ms]   ← normal
```

**Pregunta a hacerse:** ¿El span más largo es una query de DB, una llamada HTTP externa, o procesamiento de la app?
La respuesta determina dónde debe ir el fix.

**Con MCP Grafana:**
```
"Ejecuta una query en Tempo para encontrar las 5 trazas más lentas
del endpoint POST /api/orders en los últimos 30 minutos.
Para la traza más lenta, dime cuál span tiene el mayor tiempo
y qué porcentaje del tiempo total representa."
```

### Clase 6-E: Después del test — Loki para investigar errores
> **Al terminar esta clase podrás:** Buscar errores en Loki con un filtro básico y saltar directamente a la traza del error usando el TraceID en un solo clic.

> **Solo vas a Loki cuando hay errores.**
> Si el error rate fue 0, Loki no te dice nada útil sobre performance.
> Si hay errores, Loki te dice exactamente qué mensaje generó cada uno.

**Navegar Loki en Grafana:**
```
Grafana → Explore → Datasource: Loki

LogQL básico para el tester:
{service="orders-service"} | json | level="ERROR"

Agregar rango de tiempo al período del test para reducir el ruido.
```

**El poder de la correlación TraceID:**
Cada error en Loki incluye el `traceId`. Al hacer clic en ese campo en Grafana,
abre directamente la traza en Tempo. En un solo clic: del mensaje de error → a la traza completa.

```
Log entry:
{
  "level": "ERROR",
  "message": "connection pool exhausted",
  "service": "orders-service",
  "traceId": "abc123def456",    ← clic aquí → abre en Tempo
  "timestamp": "2026-04-01T10:23:45Z"
}
```

**Con MCP Grafana:**
```
"Busca en Loki los errores del orders-service entre las 10:20 y
las 10:45 de hoy (durante el stress test). ¿Cuál fue el error
más frecuente y qué traceId tiene?"
```

### Clase 6-F: La combinación ganadora — Claude analiza todo junto
> **Al terminar esta clase podrás:** Formular el prompt de análisis integrado que le pide a Claude consultar métricas, logs y trazas en paralelo para sintetizar el diagnóstico de causa raíz.

El valor real no está en saber navegar Grafana manualmente —
está en darle ese contexto a Claude Code para que haga el diagnóstico.

**Prompt de análisis integrado:**
```
"Acabo de ejecutar el load test del servicio de orders (PERF-4).
Tengo los resultados de k6 en results/2026-04-01_load_orders/raw.json.

Usa el MCP de Grafana para:
1. Obtener el P95 del endpoint /api/orders en los últimos 30 min
2. Verificar si el DB connection pool tuvo picos de uso
3. Buscar errores en Loki del orders-service en ese período
4. Si hay errores, obtener el traceId del más frecuente y abrirlo en Tempo

Con toda esa información, dime cuál es la causa raíz del problema
más crítico y qué recomendarías corregir primero."
```

Claude hace las 4 queries en paralelo usando MCP Grafana y sintetiza el diagnóstico.
El tester lee el diagnóstico, valida con su criterio, y decide si acepta la recomendación.

**El checklist de diagnóstico — 9 patrones que verás en el laboratorio:**

| Patrón | Señal en Grafana (métricas) | Dónde buscarlo | Síntoma típico en Loki |
|--------|-----------------------------|----------------|------------------------|
| DB connection pool exhaustion | Pool > 90%, latencia crece de golpe | Tempo: spans DB > 400ms | `pool timeout`, `connection refused` |
| Memory leak | Latencia crece lentamente y no baja | Tempo: spans GC periódicos | `heap size increasing`, `OOM` |
| N+1 query | Latencia escala linealmente con VUs | Tempo: muchos spans DB cortos | queries repetidas con mismos params |
| CPU saturation | CPU > 90%, latencia alta y uniforme | Tempo: todos los spans lentos | — |
| Cold start | Spike al inicio, luego se normaliza | Tempo: span de setup largo | `initializing`, `warming up` |
| Event loop blocking | Latencia alta, CPU < 40% | Tempo: un único span largo | `event loop delay` |
| Cascading failure | Error rate en cadena de servicios | Tempo: spans downstream en rojo | `circuit breaker open`, `upstream timeout` |
| Thread pool exhaustion | Error rate sube, CPU baja | Tempo: timeouts antes de empezar | `thread rejected`, `queue full` |
| Network I/O | Latencia irregular, no consistente | Tempo: spans de red variables | `ECONNRESET`, `socket hang up` |

---

## Módulo 7 — Reportes Bimodales → Comentar en JIRA
**Skill activado:** `performance-report-analysis`
**Objetivo:** Transformar resultados crudos en dos reportes: uno para el equipo técnico, uno para el negocio. Ambos se adjuntan al ticket JIRA.

### Competencias del módulo
Al completar este módulo serás capaz de:
- Aplicar el triage de 5 pasos en el orden correcto para no perder tiempo analizando datos irrelevantes
- Generar el reporte técnico con SLA compliance, findings clasificados por severidad y diagnóstico de causa raíz
- Generar el reporte de negocio traduciendo métricas a impacto de usuario sin usar jerga técnica
- Cerrar el ciclo: comentar ambos reportes en JIRA, transicionar el ticket y crear vínculos a bugs encontrados

### Rúbrica de evaluación

| Nivel | Criterio |
|-------|----------|
| **Básico** | Reporte técnico generado con tabla de SLA compliance y al menos 2 findings |
| **Competente** | Reporte de negocio traduce correctamente los resultados a impacto de usuario; la decisión GO/NO-GO/CONDITIONAL GO está justificada; el ticket JIRA está comentado y transicionado |
| **Avanzado** | Ambos reportes están respaldados por evidencia del stack (TraceID, métrica específica, log entry); el diagnóstico identifica la causa raíz y la solución concreta |

---

### Clase 7-A: El triage de resultados — orden obligatorio
> **Al terminar esta clase podrás:** Aplicar los 5 pasos del triage en cualquier resultado de test y detectar en menos de 5 minutos cuál es el problema más crítico.

El Skill siempre analiza en este orden:
1. **Errores primero** — si error rate > umbral, todo lo demás es ruido
2. **Throughput** — ¿el sistema alcanzó el RPS que k6 intentó enviar?
3. **P95 vs SLA** — ¿cumple el criterio de aceptación de DEV-XX?
4. **Tendencia temporal** — ¿la latencia crece durante el test? (memory leak signal)
5. **Breakdown por endpoint** — ¿cuál request es el cuello de botella?

### Clase 7-B: El Reporte Técnico
> **Al terminar esta clase podrás:** Generar el reporte técnico completo con triage, tabla de SLA compliance, findings con severidad y diagnóstico de causa raíz con evidencia del stack.

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
> **Al terminar esta clase podrás:** Traducir cualquier métrica técnica a impacto de usuario y formular una recomendación ejecutiva GO/NO-GO/CONDITIONAL GO con condiciones claras.

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
> **Al terminar esta clase podrás:** Publicar ambos reportes en JIRA, transicionar el ticket y crear vínculos a bugs usando el MCP de Atlassian — sin abrir el browser.

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

### Competencias del módulo
Al completar este módulo serás capaz de:
- Ejecutar el ciclo completo sin guía: JIRA → estrategia → scripts → ejecución → observabilidad → reportes → JIRA
- Integrar todos los Skills y MCPs del curso de forma autónoma en un flujo real de trabajo
- Tomar la decisión GO/NO-GO/CONDITIONAL GO con evidencia y comunicarla a dos audiencias distintas
- Demostrar que el criterio técnico es tuyo y que Claude fue tu herramienta, no tu autor

### Rúbrica de evaluación

| Criterio | Peso | Básico | Competente | Avanzado |
|----------|------|--------|------------|---------|
| Plan de testing justificado desde los tickets JIRA | 20% | Plan generado sin ajustes | Plan ajustado con al menos 1 decisión propia argumentada | Cada decisión del plan está justificada en términos de riesgo de negocio |
| Scripts siguen el 5-Block Pattern sin errores críticos | 25% | Script corre sin errores de sintaxis | 5-Block Pattern completo con thresholds correctos | Sin ninguno de los 10 errores del checklist; el alumno puede defender cada línea |
| Diagnóstico de bottlenecks con evidencia del stack | 25% | Finding identificado con métrica | Finding con evidencia de al menos 2 sistemas | Causa raíz con TraceID + log entry + métrica específica; uno de los 9 patrones nombrado |
| Reporte de negocio sin jerga técnica con decisión clara | 20% | Reporte sin percentiles | Decisión GO/CONDITIONAL/NO-GO con condición | Estimación de impacto de usuario cuantificada y plan de mitigación |
| Ciclo JIRA cerrado | 10% | Comentario publicado | Ticket transicionado + comentario | Bugs vinculados + Smart Commits referenciando todos los tickets |

---

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

## Decisiones de diseño tomadas (v0.3)

| Decisión | Resolución |
|----------|------------|
| Duración de clase | 90 min = ~30 min teoría + ~60 min práctica guiada |
| Herramienta principal | k6 (100% del flujo del curso) |
| Alternativas | Locust y Gatling son opcionales vía Skills al final del módulo 5 |
| JIRA | Cada alumno crea su propio board gratuito; Claude lo estructura vía MCP |
| Observabilidad | Navegación y análisis, no creación de dashboards |
| MCP Grafana | Se usa para análisis post-test y durante el módulo 7 (reportes) |

---

## Notas para Refinar

### Mejoras al laboratorio
- [ ] Verificar que el README del lab documenta todos los endpoints del flujo e2e completo
- [ ] Agregar script de seed de datos (usuarios, cards, products) para el lab inicial
- [ ] Documentar el procedimiento de reset de BD entre pruebas (para no contaminar resultados)
- [ ] Validar que el lab tiene anotaciones de Grafana configuradas para marcar el inicio/fin de los tests de k6

### Contenido adicional a evaluar
- [ ] Módulo bonus: CI/CD — k6 en GitHub Actions + comentar resultados en JIRA automáticamente
- [ ] Módulo bonus: Comparación de runs — detectar regresiones entre versiones (delta de P95)
- [ ] Ejercicio de debugging: introducir un N+1 query deliberado para que los alumnos lo diagnostiquen con Tempo

### Gaps pendientes
- [ ] Los Smart Commits requieren práctica adicional — muchos QAs no están familiarizados con git workflow
- [ ] Agregar ejercicio de "reverse engineering": dado un reporte con findings, reproducir el test que lo generó
- [ ] Documentar el flujo de configuración del JIRA MCP paso a paso (Cloud ID + API Token + .env)

---

*Borrador v0.4 — Rodrigo Campos — 2026-04-01*
*Cambios: objetivo por clase (una línea), competencias + rúbrica de evaluación por módulo (3 niveles: Básico / Competente / Avanzado)*
