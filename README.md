# Raku Kiosko — DEPRECATED

> ⚠️ **Este repositorio está archivado el 2026-05-09.**
>
> El kiosko de autoservicio de Raku Café fue **migrado** a [`raku-table-service`](https://github.com/zubirats/raku-table-service) como un modo más de la app cliente unificada. Una sola app con tres modos por URL.

## ¿Por qué el cambio?

El kiosko se diseñó originalmente como 5ta app del ecosistema, pero `raku-table-service` ya tenía 85% del trabajo (menú, carrito, lealtad, i18n parcial). Mantener dos apps separadas para lo mismo violaba el principio "consolidar antes de expandir". Ahora todo el código del cliente vive en un solo lugar.

## Dónde vive ahora el código

| Antes (este repo) | Ahora |
|---|---|
| `src/pages/Welcome.tsx` | `raku-table-service/src/pages/kiosk/KioskWelcome.tsx` |
| `src/pages/Menu.tsx` | `raku-table-service/src/pages/kiosk/KioskMenu.tsx` |
| `src/pages/Payment.tsx` | `raku-table-service/src/pages/kiosk/KioskPayment.tsx` |
| `src/pages/WhatsAppInput.tsx` | `raku-table-service/src/pages/kiosk/KioskWhatsAppInput.tsx` |
| `src/pages/Confirmation.tsx` | `raku-table-service/src/pages/kiosk/KioskConfirmation.tsx` |
| `src/pages/Closed.tsx` | `raku-table-service/src/pages/kiosk/KioskClosed.tsx` |
| `src/components/CartSheet.tsx` | `raku-table-service/src/components/kiosk/CartSheet.tsx` |
| `src/components/ItemDetailSheet.tsx` | `raku-table-service/src/components/kiosk/ItemDetailSheet.tsx` |
| `src/components/AdminPinZone.tsx` | `raku-table-service/src/components/kiosk/AdminPinZone.tsx` |
| `src/services/payment-service.ts` | `raku-table-service/src/services/payment-service.ts` |
| `src/services/order-service.ts` | `raku-table-service/src/services/order-service.ts` |
| `src/stores/cart-store.ts` | `raku-table-service/src/stores/cart-store.ts` |
| `src/lib/i18n.ts` | `raku-table-service/src/lib/i18n.ts` |
| `src/locales/*.json` | `raku-table-service/src/locales/*.json` |

## Nueva URL

- Antes: `https://raku-kiosko.vercel.app`
- Ahora: la URL del modo kiosko es la ruta `/kiosko` dentro del preview de Raku Table Service en Lovable.

## ¿Y el deploy de Vercel?

El proyecto Vercel `raku-kiosko` quedó en estado deprecated. No se le harán nuevos deploys (el repo no recibe pushes). El dominio `raku-kiosko.vercel.app` sigue accesible apuntando al último deploy histórico, pero no se debe usar en producción.

Si quieres eliminar el proyecto en Vercel:
- Dashboard → Project Settings → Advanced → Delete Project

## Histórico

El código aquí refleja el estado al momento del archivado, incluyendo:
- 6 páginas funcionales (Welcome, Menu, Payment, Confirmation, WhatsAppInput, Closed)
- Mock Kushki swappable a real
- i18n ES/EN/JA
- Diseño iOS HIG calmado (anterior a la dirección B+C híbrido aplicada en table-service)

Para el desarrollo continuado del kiosko, ver [`raku-table-service`](https://github.com/zubirats/raku-table-service).
