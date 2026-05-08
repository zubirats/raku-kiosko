# CLAUDE.md — Raku Café Ecosystem
**Versión 3.1 — Consolidación completa sesión 2026-04-01**
**Contacto: mau@rakucafe.com**

---

## 1. Contexto del negocio

**Raku Café** — Especialidad de café y cocina japonesa casual
**Ubicación**: Roma Norte, Ciudad de México
**Owner**: Mauricio Zubirats
**General Manager**: Adrián Sacramento Pérez
**Restaurant ID**: `00000000-0000-0000-0000-000000000001`
**Supabase Project**: `xjdxcltobmyiascszizw`

---

## 2. Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React + TypeScript + Tailwind + shadcn/ui |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Build | Vite |
| Hosting | Lovable (preview) → GitHub (source of truth) |
| Agentes | Claude Code — Team Lead + agentes especializados |

**Base44 marcado como LEGACY** — no usar para desarrollo nuevo.

---

## 3. Repositorios

| App | Repo | Estado | Completitud |
|-----|------|--------|-------------|
| POS Principal | `zubirats/raku-taba-pos` | ✅ Activo | ~90% |
| KDS / Cocina | `zubirats/kitchen-command-center` | ✅ Activo | ~88% |
| Command Center | `zubirats/raku-pulse-command` | ✅ Activo | ~80% |
| Table Service | `zubirats/raku-table-service` | ✅ Activo | ~85% |

**Todos los repos** tienen `.claude/CLAUDE.md` sincronizado.
**Ruta local**: `~/raku-lovable/<repo-name>/`

---

## 4. Base de datos Supabase (estado live 2026-04-01)

- **48 tablas** — todas con `restaurant_id` para multi-tenancy
- **31 funciones SQL** documentadas
- **48 triggers** — son SOURCE OF TRUTH de lógica de negocio
- **45 tablas con RLS** (policies tenant_read/insert/update/delete)
- **REPLICA IDENTITY FULL** en 18 tablas para Realtime

### Dominios principales
- `orders`, `order_items`, `order_item_status_log`
- `tables`, `service_timelines`
- `menu_items`, `menu_categories`
- `staff`, `staff_pins`, `shift_logs`
- `loyalty_members`, `loyalty_rewards`, `reward_redemptions`
- `cash_registers`, `cash_register_entries`
- `inventory_items`, `inventory_logs`
- `purchase_orders`, `purchase_order_items`
- `suppliers`, `supplier_catalog`
- `reservations`
- `checklists`, `checklist_templates`

### Seed data confirmado en BD live
- **86 items** de menú
- **26 miembros** de loyalty
- **20 mesas** (Terraza, Barra, Interior)
- **4 rewards** configurados
- **3 PINs** iniciales: Mauricio/1234, Adrián/5678, Staff/0000

---

## 5. Triggers críticos (source of truth)

| Trigger | Tabla | Qué hace |
|---------|-------|----------|
| `trg_auto_clean_table` | `orders` | Orden completada → mesa a "cleaning" |
| `trg_track_service_timeline` | `tables` | Crea/cierra ServiceTimeline al sentar/limpiar |
| `trg_update_inventory_on_receipt` | `purchase_order_items` | Confirmar recibo → actualiza inventory + log + cierra PO |
| `trg_generate_reservation_code` | `reservations` | Auto-genera código RAKU-XXXX |
| `trg_update_tips` | `payments` | Acumula propinas en CashRegister |
| `recalculate_loyalty_on_visit` | `orders` | Recalcula puntos y tier después de cada cobro |
| `update_order_item_status()` | RPC | KDS actualiza status de items con timestamps |
| `update_cash_register_on_payment()` | RPC | Parsea split_parts en pagos mixtos |
| `mark_noshow_reservations()` | scheduled | No-show automático después de 15 min |
| `next_order_number()` | RPC | Número secuencial por día |

---

## 6. Reglas de negocio NO NEGOCIABLES

1. **Loyalty tiers SIEMPRE en español**: bronce / plata / oro / platino
2. **PINs SIEMPRE SHA-256** — nunca plaintext
3. **IVA 16% incluido** en precios mesa / **0% para llevar**
4. **IEPS 26.5% SOLO** para SAPPORO PREMIUM BEER — calculado sobre base imponible (no sobre precio con IVA)
5. **No open self-signup** — solo staff autorizado crea cuentas
6. **`restaurant_id` en EVERY tabla** — multi-tenancy estricto
7. **Triggers son source of truth** — el frontend puede tener inconsistencias menores, la BD las corrige
8. **`VITE_RESTAURANT_ID`** debe estar en `.env` de todos los repos
9. **Puntos loyalty**: 1 punto por cada $1 MXN pagado — el trigger `recalculate_loyalty_on_visit` es source of truth (no el cálculo del frontend)
10. **UX referencias**: Toast y Square — botones grandes, fondo oscuro, colores de urgencia por tiempo

---

## 7. Estado por app — 2026-04-01

### raku-taba-pos (POS Principal)
**Commits relevantes**: `fe095d1`, `9c563c9`, `58e858d`, `b3416d4`

✅ Funcional:
- 8 tabs: Terminal, Floor Plan, KDS, Orders, Menu, Reports, Settings
- PIN auth con numpad Square-style (4 dígitos, shake on error, cooldown 30s)
- Role-based tab filtering (owner ve todo, staff no ve reports/config)
- Auto-logout 30 min inactividad
- Flujo de pago completo con PostPaymentRating
- Canje de rewards en MemberProfileModal
- Asignación automática de curso por categoría
- IEPS correcto sobre base imponible
- RESTAURANT_ID desde `.env`
- Offline handling con detección de conexión

⚠️ Pendiente:
- Split bill creado (`SplitBillDrawer.tsx`) pero no validado en producción
- QR scan loyalty — stub
- Kushki (tarjeta real) — credenciales pendientes
- Impresora de tickets — hardware pendiente

### kitchen-command-center (KDS / Cocina)
**Commits relevantes**: `2b417f9`, `6e70c1d`, `fee8011`, `d0ac5e5`, `d2405c1`, `a0aed0f`

✅ Funcional:
- 10 tabs: Órdenes, Expo, Recetas, Inventario, Compras, Recepción, Prep List, Tareas, Staff, Config
- **Item-level bump**: cada plato en un ticket es tappable individualmente — marca ese item como "ready" en Supabase. LISTO(N) marca todos a la vez
- Optimistic updates instantáneos (sin lag en UI)
- Items tachados/atenuados al marcar listos — permanecen visibles hasta que mesero presiona "Servido"
- Historial de comandas del turno (fetch de `orders` completadas hoy, polling 30s)
- SupplierCatalog, RestockRules, PurchaseApprovals (componentes nuevos)
- Flujo E2E de recepción: PO → items → confirmar → inventory actualizado
- Check-in/check-out de staff con horas trabajadas
- Seed de checklists Raku (apertura/cierre/cambio turno)
- RESTAURANT_ID desde `.env`

⚠️ Pendiente:
- `update_cash_register_on_payment` trigger: bug detectado donde función usa `ORDER BY created_at` pero tabla tiene `opened_at` — SQL corrector generado, pendiente confirmar si se ejecutó
- PIN auth no implementado (solo raku-taba-pos lo tiene)
- Polling 2s → migrar a Supabase Realtime (P3)

### raku-pulse-command (Command Center)
**Commits relevantes**: `12cb46f`, `5c49dfc`

✅ Funcional:
- 4/6 tabs completos
- RESTAURANT_ID desde `.env` (constants.ts)
- Monitoreo de conexión con OfflineBanner y timestamp
- KPIs con tabular-nums
- TanStack Query v5 fix (`event?.query?.state?.status`)

⚠️ Pendiente:
- Staff tab y Config tab — stubs
- PIN auth no implementado
- Polling → Realtime (P3)

### raku-table-service (Customer App)
**Commits relevantes**: `e38a696`, `8644732`

✅ Funcional:
- 85% funcional
- Carrito → "Muestra a tu mesero" (no crea orden directamente)
- Canje rewards con código RAKU-XXXX
- Status badges en MyBill (pendiente/cocina/listo/servido)
- Fallback mesa no encontrada
- Fix loyalty route con `DEFAULT_RESTAURANT_ID`
- Fix `/llamar-mesero` → `/llamar` (ruta correcta)
- RESTAURANT_ID en `.env`

⚠️ Pendiente:
- Canje rewards — flujo completo pendiente de validación
- PIN auth no implementado

---

## 8. Sprint actual — prioridades

| Prioridad | Tarea | Estado | Notas |
|-----------|-------|--------|-------|
| P1 | PIN auth en raku-taba-pos | ✅ COMPLETO | SHA-256, numpad, roles, timeout |
| P2 | RLS producción | Pendiente | Requiere Supabase Auth configurado primero |
| P3 | Polling → Supabase Realtime | Pendiente | Después de auth |
| P4 | Staff + Config tabs Command Center | Pendiente | Stubs |
| P5 | Kushki (tarjeta real) | Pendiente | Credenciales pendientes |
| P6 | Impresora de tickets | Pendiente | Hardware pendiente |
| P7 | Apple Developer ($99/año) | Pendiente | Para Raku Wallet / PassKit |
| P8 | CFDI / facturación electrónica | Pendiente | Requisito legal MX |
| — | **Primer turno real controlado** | Pendiente | 5 mesas, 1 mesero, sin rush |

---

## 9. Arquitectura de agentes

**Team Lead** (Opus) — lee este archivo primero, coordina y delega
**supabase-agent** — migraciones, funciones, triggers, RLS
**frontend-agent** — componentes React, hooks, contextos
**ui-agent** — diseño visual, shadcn/ui, Tailwind
**business-logic-agent** — reglas de negocio, validaciones
**realtime-agent** — subscriptions, polling, websockets
**qa-agent** — auditoría, verificación de builds, regresiones

### Regla de coordinación
Antes de delegar, el Team Lead verifica que los agentes no editen el mismo archivo simultáneamente. Un agente por archivo a la vez.

### Starter prompt para sesión nueva
```
Read .claude/CLAUDE.md. You are the Team Lead of the Raku Café agent team. 
Update me on current state based on this file and continue with the next priority.
Do not ask for clarification on business rules — they are in this file.
```

---

## 10. Decisiones de arquitectura — NO negociables

1. **GitHub es fuente de verdad** — no Lovable. El team edita vía GitHub.
2. **Lovable solo para preview** — no usar para editar código directamente.
3. **Triggers > frontend** — si hay conflicto entre lógica frontend y trigger de BD, el trigger gana.
4. **`.env` con `VITE_RESTAURANT_ID`** — obligatorio en todos los repos.
5. **shadcn/ui + Tailwind** — librería de componentes estándar del ecosistema.
6. **Un chat activo editando a la vez** — para evitar conflictos de Git.
7. **CLAUDE.md se actualiza al final de cada sesión** — es responsabilidad del Team Lead.
8. **Animaciones mínimas en KDS** — solo `active:brightness-75`, sin transitions ni scale.
9. **Triggers son source of truth** (#9) — protegen contra bugs del frontend.
10. **Las 4 apps comparten la misma BD** (#10) — multi-tenancy por `restaurant_id`.

---

## 11. Variables de entorno requeridas (todos los repos)

```env
VITE_SUPABASE_URL=https://xjdxcltobmyiascszizw.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
VITE_RESTAURANT_ID=00000000-0000-0000-0000-000000000001
```

---

## 12. Bugs conocidos — pendientes de confirmar

| Bug | Repo | Estado |
|-----|------|--------|
| `update_cash_register_on_payment`: usa `ORDER BY created_at` pero tabla tiene `opened_at` | BD Supabase | SQL generado, no confirmado si se ejecutó |
| Split bill (`SplitBillDrawer.tsx`) | raku-taba-pos | Creado, no validado en producción |
| `service_timelines.order_id` NOT NULL | BD Supabase | Migración creada, no confirmado si Lovable la procesó |
| CSS `@import` order (Google Fonts) | raku-pulse-command, raku-table-service | Warning cosmético, no breaking |
| Bundle sizes >500kB | Todos | Code-splitting futuro |
