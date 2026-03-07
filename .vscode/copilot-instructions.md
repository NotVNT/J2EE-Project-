# Copilot Instructions — J2EE Project

---

## Architecture Overview

Two fully independent sub-projects that never share code:

| Sub-project | Root | Port | Stack |
|-------------|------|------|-------|
| Backend REST API | `backend/` | 8080 | Spring Boot 4.0.2 · Java 21 · Maven |
| Mobile app | `frontend/` | — | React Native · Expo 54 · Expo Router v6 |

The frontend calls the backend via `http<T>()` in `lib/http.ts`. Base URL is `env.apiBaseUrl` from `config/env.ts` (defaults to `http://10.0.2.2:8080` for Android emulator).

---

## Backend — Key Facts

- **Package root:** `com.example.backend`
- **No DB driver in `pom.xml` yet** — add H2/MySQL/Postgres dependency before using JPA entities.
- **No `application.properties` datasource config yet** — must add `spring.datasource.*` and `spring.jpa.*` before running with a DB.
- Spring Security is on the classpath; **all endpoints are locked by default** — add a `SecurityFilterChain` bean in `config/` to open routes.
- Run with: `cd backend ; .\mvnw spring-boot:run` (never `mvn`).

### Backend feature checklist (in order)
`entity/` → `repository/` → `dto/` → `service/` (interface + impl) → `controller/` → `config/` (CORS/Security) → `exception/` (if new exceptions needed)

---

## Frontend — Key Facts

- **Expo Router v6 with typed routes** — `router.push('/foo')` only compiles after `app/foo.tsx` exists on disk and Expo regenerates types. Until then use `router.push({ pathname: '/foo' } as never)`.
- **Adding a new top-level route:** create `app/foo.tsx` (thin re-export) AND declare `<Stack.Screen name="foo" />` in `app/_layout.tsx`.
- **Adding a new tab:** create `app/(tabs)/foo.tsx` (thin re-export) AND add `<Tabs.Screen name="foo" ... />` in `app/(tabs)/_layout.tsx`.
- **No tab icons** — the tab layout deliberately sets `tabBarIcon: () => null`. Never add icons.
- Run with: `cd frontend ; npx expo start --android` (AVD named **Medium_Phone** must be running).

### Frontend feature structure
```
features/<feature>/
  api/<feature>-api.ts      ← http<T>() calls only
  hooks/use-<action>.ts     ← state + error + loading
  screens/<Feature>Screen.tsx
```
Route file `app/(tabs)/foo.tsx` or `app/foo.tsx` contains only:
```ts
export { default } from '@/features/<feature>/screens/<Feature>Screen';
```

### ThemedText type variants
`default` | `title` | `defaultSemiBold` | `subtitle` | `link`

### Screen-level color constants
Define palette constants at the top of the screen file (see `features/auth/screens/LoginScreen.tsx`). Do not put colors in `theme.ts` unless they are truly app-wide.

---

## Hard Rules (never break these)

- No `@Autowired` — use `@RequiredArgsConstructor` constructor injection.
- No `fetch()` in frontend — always `http<T>()` from `@/lib/http.ts`.
- No `any` in TypeScript.
- No inline styles — always `StyleSheet.create()`.
- No icon libraries (`@expo/vector-icons` etc.) anywhere in UI code.
- No comments explaining *what* code does — only *why* when non-obvious.
- No business logic in `@RestController` — delegate to `@Service`.
- Route files in `app/` must be thin re-exports only, never contain UI logic.
- No `var` — prefer `const` over `let`.
- No class components in React Native — functional components only.
- No hard-coded API base URLs — always use `env.apiBaseUrl`.
- No secrets, credentials, or `.env` files committed.
- Never modify `mvnw` / `mvnw.cmd` scripts.
- Never skip Bean Validation (`@Valid`) on DTO inputs in controllers.

---

## Naming Conventions

| Entity              | Backend (Java)           | Frontend (TypeScript)   |
|---------------------|--------------------------|-------------------------|
| Files               | `PascalCase.java`        | `kebab-case.tsx / .ts`  |
| Classes             | `PascalCase`             | `PascalCase`            |
| Interfaces          | `PascalCase` (no `I`)    | `PascalCase` (no `I`)   |
| Methods / functions | `camelCase`              | `camelCase`             |
| Constants           | `UPPER_SNAKE_CASE`       | `UPPER_SNAKE_CASE`      |
| REST endpoints      | `/api/<noun>` plural     | —                       |
| DTO suffix          | `Request` / `Response`   | —                       |

---

## Folder Structure

### Backend
```
backend/src/main/java/com/example/backend/
├── config/       # SecurityFilterChain, CORS @Configuration
├── controller/   # @RestController — one per resource, delegates only
├── service/      # interfaces + implementations
├── repository/   # Spring Data JPA interfaces
├── entity/       # @Entity classes
├── dto/          # Java Records for Request/Response
└── exception/    # @RestControllerAdvice + custom exceptions
```

### Frontend
```
frontend/
├── app/              # Expo Router routes (thin re-exports only)
│   └── (tabs)/       # Bottom-tab group
├── features/<feat>/
│   ├── api/          # <feat>-api.ts — http<T>() calls only
│   ├── hooks/        # use-<action>.ts — state + loading + error
│   ├── screens/      # <Feat>Screen.tsx — real UI lives here
│   └── components/   # feature-local components
├── components/       # shared ThemedText, ThemedView, etc.
├── lib/              # http.ts and other low-level utilities
├── constants/        # theme.ts (app-wide only)
├── config/           # env.ts
└── types/            # index.ts — shared TypeScript types
```

---

## Coding Standards

### Java / Spring Boot
- Use Lombok: `@RequiredArgsConstructor`, `@Getter`, `@Builder`, etc.
- Prefer Java Records for DTOs.
- Annotate DTO fields with Bean Validation (`@NotNull`, `@NotBlank`, `@Size`, …) and use `@Valid` in controller params.
- Return `ResponseEntity<T>` with explicit HTTP status codes.
- Entity classes require `@Entity`, `@Table`, `@Id`, `@GeneratedValue`.
- REST path naming: `/api/users`, `/api/orders/{id}` (plural nouns).

### TypeScript / React Native
- Use `ThemedText` and `ThemedView` for all text/container rendering (light/dark mode support).
- Component files: `kebab-case.tsx`, exported name: `PascalCase`.
- Feature-local API calls only in `features/<feat>/api/`. Cross-feature calls go in `services/api.ts`.

---

## API Contract

- All endpoints prefixed `/api`, content type `application/json`.
- Error response shape:
  ```json
  { "timestamp": "ISO-8601", "status": 400, "error": "Bad Request", "message": "...", "path": "/api/..." }
  ```
- Success: data returned directly (no envelope). Lists use paginated wrappers when needed.

---

## Documentation

- Javadoc on all public service interface methods.
- JSDoc/TSDoc on exported hooks and functions that are not self-evident.
- Inline comments explain *why*, never *what*.
