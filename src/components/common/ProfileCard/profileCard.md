# 🧾 ProfileCard 컴포넌트

사용자 프로필 정보를 보여주는 카드형 컴포넌트입니다.  
로딩, 에러, 정상 상태에 따라 UI가 자동으로 분기되며, 재사용이 쉽도록 설계되었습니다.

---

## 📁 파일 구조

- `src/components/ProfileCard/`

  - `ProfileCard.tsx`: 상태 분기 컨테이너 (로딩/에러/성공)
  - `ProfileCardUi.tsx`: 실제 프로필 UI 렌더링
  - `ProfileCardSkeleton.tsx`: 로딩 또는 에러 시 표시되는 스켈레톤 뷰
  - `ProfileCard.test.tsx`: 유닛 테스트
  - `profileCard.md`: 문서 파일 (이 파일)

- `src/types/profile.ts`: `ProfileData` 타입 정의
- `src/mocks/handlers/profileHandlers.ts`: API 목 핸들러 (MSW 사용 시)

---

## 🧩 사용법

```tsx
import ProfileCard from '@/components/ProfileCard/ProfileCard';

<ProfileCard
  profile={userProfileData}
  isLoading={false}
  error={null}
  onEditClick={() => console.log('프로필 수정')}
/>;
```

---

## ⚙️ Props

### `ProfileCard`

| 이름          | 타입                  | 설명                                           |
| ------------- | --------------------- | ---------------------------------------------- |
| `profile`     | `ProfileData`         | 사용자 프로필 정보                             |
| `isLoading`   | `boolean`             | 로딩 상태 여부                                 |
| `error`       | `string \| undefined` | 에러 메시지 (있을 경우 스켈레톤 + 메시지 표시) |
| `onEditClick` | `() => void`          | 프로필 수정 버튼 클릭 시 실행될 핸들러         |

> `profile`이 없거나 `error`가 존재하면 `ProfileCardSkeleton`이 렌더링됩니다.

---

### `ProfileData` 타입 정의 (src/types/profile.ts)

```ts
// Gender는 src/types/enums.ts에서 정의된 enum입니다.
export interface ProfileData {
  profileImageUrl?: string;
  nickname: string;
  gender: Gender;
  rating: number;
  description?: string;
  sns?: string;
  tags?: string[];
  isMyProfile?: boolean;
}
```

---

## 🖼️ 렌더링 UI 예시

- 닉네임 및 성별 아이콘
- 별점 표시
- 프로필 이미지
- 자기소개 및 SNS 링크
- 태그 리스트
- 본인일 경우 "프로필 수정" 버튼

---

## 🔐 예외 처리 및 기본값

- `description`이 없으면 기본 문구 출력:
  이 사용자는 아직 자기소개를 작성하지 않았어요.

- `sns`, `tags`가 공백이거나 존재하지 않으면 미출력
- `tags`는 내부적으로 필터링 (`trim().length > 0`) 후 렌더링
- `error`가 없을 경우 기본 에러 메시지:
  존재하지 않는 유저입니다.

---

## 🧪 테스트 (src/components/ProfileCard/ProfileCard.test.tsx)

다음 시나리오들을 포함한 Jest 기반 유닛 테스트를 제공합니다:

- ✅ 로딩 상태 → 스켈레톤 렌더링
- ✅ 에러 메시지 → 스켈레톤 + 메시지 출력
- ✅ 정상 프로필 렌더링
- ✅ `onEditClick` 핸들링
- ✅ `tags`, `sns`, `description` 조건부 렌더링 여부
- ✅ `filteredTags`에 대한 공백 필터링 처리 확인

---

## 🧪 MSW 테스트용 목 핸들러

- 위치: `src/mocks/handlers/profileHandlers.ts`
- 실제 API 없이 테스트 시, 사용자 프로필 API를 모킹하기 위해 사용됩니다.

---

## ✅ 작성자 노트

해당 컴포넌트는 다양한 프로필 화면(내 프로필, 유저 프로필 등)에 재사용 가능하도록 분리되어 있으며, UI와 로직이 명확히 나뉘어 테스트 및 유지보수가 용이합니다.
