# AI Agent Instructions — J2EE Project

> This file is the single source of truth for any AI agent (GitHub Copilot, Claude, GPT, Cursor, etc.) working in this repository.
> Read it fully before writing any code, generating any file, or answering any question about this project.

---

## 1. Project Overview

This is a **university J2EE course project** consisting of two independent sub-projects:

| Part       | Technology                        | Root folder  |
|------------|-----------------------------------|--------------|
| Backend    | Spring Boot 4.x · Java 21 · Maven | `backend/`   |
| Frontend   | React Native · Expo · TypeScript  | `frontend/`  |

The backend exposes a REST API consumed by the React Native mobile app.

---

## 2. Tech Stack

### Backend (`backend/`)
- **Language:** Java 21
- **Framework:** Spring Boot 4.x (spring-boot-starter-parent)
- **Build tool:** Maven (use `mvnw` wrapper, never call `mvn` directly)
- **Key dependencies:** Spring Web MVC, Spring Data JPA, Spring Security, Bean Validation, Lombok
- **Package root:** `com.example.backend`

### Frontend (`frontend/`)
- **Language:** TypeScript (strict)
- **Framework:** React Native via Expo (managed workflow)
- **Navigation:** Expo Router (`app/` directory — file-based routing)
- **HTTP client:** custom `http<T>()` wrapper in `lib/http.ts`
- **Theming:** `constants/theme.ts` + `ThemedText` / `ThemedView` components
- **Path alias:** `@/` maps to `frontend/` root (configured in `tsconfig.json`)

---

## 3. Folder Structure Conventions

### Backend
```
backend/src/main/java/com/example/backend/
├── config/          # Spring @Configuration classes (Security, CORS, etc.)
├── controller/      # @RestController classes — one per resource
├── service/         # @Service / business logic — interfaces + implementations
├── repository/      # Spring Data JPA @Repository interfaces
├── entity/          # @Entity (JPA) / domain model classes
├── dto/             # Request & Response DTO records/classes
└── exception/       # Custom exceptions + @ControllerAdvice handler
```

### Frontend
```
frontend/
├── app/             # Expo Router pages — file == route
│   └── (tabs)/      # Bottom-tab group
├── features/        # Feature-based modules
│   └── <feature>/
│       ├── screens/ # Screen components (entry point per route)
│       ├── components/ # Feature-local UI components
│       ├── hooks/   # Feature-local custom hooks
│       └── api/     # Feature-local API call functions
├── components/      # Shared/global UI components
├── hooks/           # Shared custom hooks
├── services/        # Cross-feature API endpoints (keep small)
├── lib/             # Low-level utilities (http.ts, etc.)
├── constants/       # App-wide constants (theme.ts, etc.)
├── config/          # Runtime config (env.ts)
└── types/           # Shared TypeScript types
```

---

## 4. Coding Standards

### General
- Write clean, readable, self-documenting code. Prefer clarity over cleverness.
- Prefer small, single-responsibility functions/classes.
- Delete dead code instead of commenting it out.
- Never hard-code secrets, URLs, or environment-specific values — use config files.

### Java / Spring Boot
- Use **Lombok** (`@Getter`, `@Setter`, `@Builder`, `@RequiredArgsConstructor`, etc.) to reduce boilerplate.
- Prefer **Java Records** for immutable DTOs.
- Use **constructor injection** (via Lombok `@RequiredArgsConstructor`) — never `@Autowired` on fields.
- Annotate DTOs with **Bean Validation** (`@NotNull`, `@NotBlank`, `@Size`, etc.) and use `@Valid` in controllers.
- Controllers must **only** delegate to services — no business logic inside controllers.
- Services must **only** call repositories and other services — no HTTP concerns.
- Return `ResponseEntity<T>` from controller endpoints with appropriate HTTP status codes.
- All exceptions should be handled centrally via a `@RestControllerAdvice` class in `exception/`.
- Entity classes must have `@Entity`, `@Table`, `@Id`, `@GeneratedValue`.
- Follow REST naming: nouns in URL paths (e.g., `/api/users`, `/api/orders/{id}`).

### TypeScript / React Native
- **No `any`** — always use proper types. Create types in `types/index.ts` or co-locate with the feature.
- Use **functional components** with hooks only — no class components.
- Name component files with **kebab-case** (`my-component.tsx`), export the component as **PascalCase**.
- Every screen lives in `features/<feature>/screens/`. Route files under `app/` only re-export the screen.
- API calls for a feature go into `features/<feature>/api/`. Only cross-feature shared calls go in `services/api.ts`.
- Use the `http<T>()` helper from `@/lib/http.ts` for all backend requests — never call `fetch` directly.
- Use `ThemedText` and `ThemedView` from `@/components/` for all text and container rendering (supports light/dark mode).
- Use `StyleSheet.create()` for styles — no inline style objects.
- Prefer `const` over `let`; avoid `var`.

---

## 5. Naming Conventions

| Entity              | Backend (Java)              | Frontend (TypeScript)        |
|---------------------|-----------------------------|------------------------------|
| Files               | `PascalCase.java`           | `kebab-case.tsx / .ts`       |
| Classes             | `PascalCase`                | `PascalCase`                 |
| Interfaces          | `PascalCase` (no `I` prefix)| `PascalCase`                 |
| Methods / functions | `camelCase`                 | `camelCase`                  |
| Variables           | `camelCase`                 | `camelCase`                  |
| Constants           | `UPPER_SNAKE_CASE`          | `UPPER_SNAKE_CASE`           |
| REST endpoints      | `/api/<noun>` plural        | —                            |
| DTO suffix          | `Request` / `Response`      | —                            |

---

## 6. API Contract

- All backend endpoints are prefixed with `/api`.
- The frontend reads `env.apiBaseUrl` from `frontend/config/env.ts` as the base URL.
- JSON is the only accepted content type (`application/json`).
- Error responses must follow this shape:
  ```json
  {
    "timestamp": "ISO-8601",
    "status": 400,
    "error": "Bad Request",
    "message": "Human-readable description",
    "path": "/api/resource"
  }
  ```
- Successful responses wrap data directly (no envelope) for simple resources; use paginated wrappers for lists when needed.

---

## 7. What to Do When Asked to Add a Feature

### Backend checklist
1. Create the `@Entity` class in `entity/`.
2. Create the JPA `@Repository` interface in `repository/`.
3. Create Request/Response DTO records in `dto/`.
4. Create a `@Service` interface + implementation in `service/`.
5. Create a `@RestController` in `controller/`.
6. Register any necessary `@Configuration` (CORS, Security rules) in `config/`.
7. Add a `@RestControllerAdvice` handler for new custom exceptions if needed.

### Frontend checklist
1. Create `features/<feature>/` folder if it doesn't exist.
2. Add API call functions in `features/<feature>/api/<feature>-api.ts`.
3. Add feature-local types inside the feature folder or in `types/index.ts` if shared.
4. Create custom hooks in `features/<feature>/hooks/` for data fetching/state logic.
5. Build the screen component in `features/<feature>/screens/<FeatureName>Screen.tsx`.
6. If a new tab/route is needed, add a file under `app/(tabs)/` that re-exports the screen.

---

## 8. Running the Project

### Backend
```powershell
cd backend
.\mvnw spring-boot:run
```
Default port: **8080**

### Frontend
```powershell
cd frontend
npm install          # first time only
npx expo start       # then press 'a' for Android emulator
```
Ensure AVD named **Medium_Phone** is running in Android Studio before starting Expo.

---

## 9. Things the AI Agent Must Never Do

-  Never use `@Autowired` field injection — use constructor injection.
-  Never put business logic inside a `@RestController`.
-  Never call `fetch()` directly in the frontend — always use `http<T>()`.
-  Never use `any` in TypeScript.
-  Never create inline styles in React Native — use `StyleSheet.create()`.
-  Never hard-code API base URLs — use `env.apiBaseUrl`.
-  Never commit secrets, credentials, or `.env` files.
-  Never modify `mvnw` / `mvnw.cmd` scripts.
-  Never skip Bean Validation on DTO inputs.
-  Never create a class component in React Native.
-  Never use icons anywhere in the UI — no `@expo/vector-icons` or any other icon library.
-  Never add comments to code — write self-documenting code instead.

---

## 10. Preferred Libraries & Tools

| Need                        | Use                                      |
|-----------------------------|------------------------------------------|
| HTTP (frontend)             | `@/lib/http.ts` wrapper                  |
| Navigation                  | Expo Router                              |
| Theming                     | `ThemedText`, `ThemedView`, `theme.ts`   |
| Icons                       | `@expo/vector-icons`                     |
| Java boilerplate            | Lombok                                   |
| Persistence                 | Spring Data JPA                          |
| Validation (backend)        | Jakarta Bean Validation                  |
| Auth                        | Spring Security                          |

---

## 11. Comments & Documentation

- Write **Javadoc** on all public service interface methods.
- Write **JSDoc / TSDoc** on exported functions and hooks that are not self-evident.
- Inline comments should explain *why*, not *what*.
- Do not leave TODO comments in committed code — resolve them or create a task.
