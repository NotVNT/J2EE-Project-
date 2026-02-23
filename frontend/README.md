# Frontend (Expo + TypeScript)

## Scripts

```bash
cd frontend
npm install
npx expo start --android
```

## Project structure

- `app/`: Expo Router routes (nên giữ mỏng)
- `features/`: code theo module nghiệp vụ (auth, profile, settings, ...)
- `components/`: shared UI components (dùng nhiều nơi)
- `hooks/`, `constants/`: shared hooks/constants
- `lib/`: utilities thuần (http, helpers, storage...)
- `services/`: cross-feature services (nếu có)
- `config/`: env/config
- `types/`: shared types

## Conventions

Xem chi tiết tại: `docs/conventions.md`

### Rule quan trọng

- Route files trong `app/` chỉ map route -> screen, ưu tiên dạng: `export { default } from '@/features/.../screens/...';`
- Màn hình thật nằm trong `features/<feature>/screens/`
- Absolute import qua alias `@/`.
# Frontend (Expo + TypeScript)

## Scripts

```bash
cd frontend
npm install
npx expo start --android
```

## Project structure

- `app/`: Expo Router routes (nên giữ mỏng)
- `features/`: code theo module nghiệp vụ (auth, profile, settings, ...)
- `components/`: shared UI components (dùng nhiều nơi)
- `hooks/`, `constants/`: shared hooks/constants
- `lib/`: utilities thuần (http, helpers, storage...)
- `services/`: cross-feature services (nếu có)
- `config/`: env/config
- `types/`: shared types

## Conventions

Xem chi tiết tại: `docs/conventions.md`

### Rule quan trọng

- Route files trong `app/` chỉ map route -> screen, ưu tiên dạng: `export { default } from '@/features/.../screens/...';`
- Màn hình thật nằm trong `features/<feature>/screens/`
- Absolute import qua alias `@/`.
