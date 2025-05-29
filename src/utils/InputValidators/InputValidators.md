# 🧪 InputValidators 유틸

회원가입, 로그인 등의 폼 입력값 유효성을 검사하는 유틸 함수 모음입니다.  
각 함수는 유효하지 않은 경우 에러 메시지(`string`)를 반환하고, 유효할 경우 `undefined`를 반환합니다.

---

## ✨ 제공 함수 목록

### `validateNickname(val: string): string | undefined`

- 2~20자의 한글, 영문, 숫자, 언더스코어(\_)만 허용
- 정규식: `/^[가-힣a-zA-Z0-9_]{2,20}$/`

**예시**

```ts
validateNickname('홍길동'); // undefined
validateNickname('!@#'); // '2~20자 한글/영문/숫자/_만 입력 가능합니다'
```

---

### `validateEmail(val: string): string | undefined`

- 일반적인 이메일 형식 유효성 검사
- 정규식: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**예시**

```ts
validateEmail('abc@example.com'); // undefined
validateEmail('abc@email'); // '이메일 형식이 아닙니다'
```

---

### `validatePassword(val: string): string | undefined`

- 8자 이상, 영문/숫자/특수문자 포함 필수
- 정규식: `/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/`

**예시**

```ts
validatePassword('qwer123!'); // undefined
validatePassword('12345678'); // '8자 이상, 영문/숫자/특수문자를 포함해야 합니다'
```

---

### `validatePasswordConfirm(confirm: string, original: string): string | undefined`

- 비밀번호 확인 입력값이 원래 값과 일치하는지 검사

**예시**

```ts
validatePasswordConfirm('qwer123!', 'qwer123!'); // undefined
validatePasswordConfirm('qwer123!', 'qwer123@'); // '비밀번호가 일치하지 않습니다'
```

---

## ✅ 테스트 정보

> 테스트 도구: `jest`

| 테스트 항목                  | 설명                                                     |
| ---------------------------- | -------------------------------------------------------- |
| 닉네임 유효성 검사           | 2자 미만, 특수문자 포함 등의 경우 에러 메시지 반환 확인  |
| 이메일 형식 검사             | 도메인 누락, @ 미포함 등 잘못된 형식에 대한 처리 확인    |
| 비밀번호 조건 검사           | 숫자 또는 특수문자 누락된 경우 등 에러 반환 여부 확인    |
| 비밀번호 확인 일치 여부 검사 | 원래 비밀번호와 일치하지 않는 경우 에러 메시지 반환 확인 |

---

## 📁 파일 구조

```
/utils
├── InputValidators
│   ├── InputValidators.ts
│   └── InputValidators.test.ts
```
