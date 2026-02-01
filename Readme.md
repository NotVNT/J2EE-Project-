# Dự án môn J2EE năm 4

Repo gồm 2 phần:

- `backend/`: Spring Boot (Java)
- `frontend/`: React Native dùng **Expo** (TypeScript)

## Chạy React Native (Expo) trên Android Emulator `Medium_Phone`

### 1) Yêu cầu môi trường

- Cài **Node.js** (khuyến nghị LTS)
- Cài **Android Studio** + Android SDK
- Tạo và chạy Android Virtual Device (AVD) tên **Medium_Phone** trong **Device Manager**

Mẹo kiểm tra emulator đã sẵn sàng:

```bat
adb devices
```

Nếu thấy `emulator-xxxx` ở trạng thái `device` là OK.

### 2) Cài dependencies cho frontend

Mở terminal tại thư mục `frontend/`:

```bat
cd frontend
npm install
```

### 3) Chạy app trên emulator

Đảm bảo emulator `Medium_Phone` đang chạy trước.

Chạy Expo dev server:

```bat
cd frontend
npx expo start
```

Sau khi server lên, bấm **a** để mở trên Android emulator.

Hoặc chạy thẳng:

```bat
cd frontend
npx expo start --android
```

### 4) Một số lỗi hay gặp

**a) `adb` không nhận thiết bị**

- Mở Android Studio → Device Manager → Start lại AVD
- Kiểm tra Android SDK đã cài đầy đủ (Platform Tools)

**b) Expo không tìm thấy emulator / không tự cài app**

- Thử đóng/mở lại emulator
- Trong cửa sổ `npx expo start`, bấm `a` lại
- Nếu cần, cài Expo Go trong emulator từ Play Store (tuỳ cấu hình AVD)

**c) Port bị kẹt / metro server lỗi**

```bat
cd frontend
npx expo start -c
```

## Gợi ý: chạy backend (tuỳ chọn)

Mở terminal tại `backend/`:

```bat
cd backend
mvnw spring-boot:run
```

