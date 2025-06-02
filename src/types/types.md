# API 응답 타입 정의 가이드

공통 응답 형식을 사용하여 API 응답 타입을 일관되게 정의합니다. 이를 통해 클라이언트에서 예측 가능한 방식으로 응답을 처리할 수 있습니다.

## 기본 응답 타입

```ts
export interface ApiResponse<T = unknown> {
  code: number; // 응답 코드 (e.g., 200, 401, 500 등)
  message: string; // 응답 메시지
  data?: T; // 응답 데이터 (없을 수 있음)
}
```

- T는 실제 응답 데이터의 타입을 제네릭으로 지정합니다.
- data는 선택적(optional) 필드입니다.

## 사용 방법

1. 먼저 data 필드에 담길 응답의 구조를 interface로 정의합니다.
2. 그런 다음 `ApiResponse<T>` 제네릭의 T에 정의한 interface를 넣어 타입을 생성합니다.

## 실제 응답 타입 정의 예시

### 1. 카카오 로그인 응답

```ts
import { ApiResponse } from './api';

export interface KakaoLoginData {
  accessToken: string;
  isNewUser: boolean;
}

export type KakaoLoginResponse = ApiResponse<KakaoLoginData>;
```

- accessToken: 로그인 성공 시 발급된 액세스 토큰
- isNewUser: 최초 로그인 여부 (true일 경우 회원가입 처리 필요)

### 2. 토큰 갱신 응답

```ts
export interface TokenRefreshData {
  accessToken: string;
}

export type TokenRefreshResponse = ApiResponse<TokenRefreshData>;
```

- accessToken: 새로 발급된 액세스 토큰

## 응답 예시 (JSON)

### 성공 응답

```json
{
  "code": 200,
  "message": "로그인 성공",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "isNewUser": false
  }
}
```

### 실패 응답

```json
{
  "code": 401,
  "message": "인증 실패"
}
```

## 참고 사항

- 모든 API 응답은 반드시 `ApiResponse<T>` 형식을 따라야 합니다.
- 실패 시에도 code와 message는 반드시 포함되어야 하며, data는 생략될 수 있습니다.
