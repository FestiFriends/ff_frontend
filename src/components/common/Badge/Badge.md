## 📝 Badge 컴포넌트

모임 카테고리, 성별, 상태 등을 시각적으로 표현하기 위한 공통 배지 UI 컴포넌트입니다.
라벨 값에 따라 아이콘이 함께 표시될 수 있으며, Tailwind 클래스로 스타일을 유연하게 제어할 수 있습니다.

---

## 📦 사용법

```tsx
// 모임 종류 배지
import Badge from '@/components/Badge/Badge';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { badgeStyles } from '@/components/Badge/Badge.styles';

<Badge
  label={GroupCategoryLabels[groupData.category]}
  className={badgeStyles.category[groupData.category]}
/>;

// 성별 배지
import Badge from '@/components/Badge/Badge';
import { GenderLabels } from '@/constants/GenderLabels';
import { badgeStyles } from '@/components/Badge/Badge.styles';

<Badge
  label={GenderLabels[groupData.gender]}
  className={badgeStyles.gender[groupData.gender]}
/>;

// 상태 배지, 방장 배지
```

## ✨ Props

| 이름        | 타입     | 필수 여부 | 설명                                                                   |
| ----------- | -------- | --------- | ---------------------------------------------------------------------- |
| `label`     | `string` | ✅        | 배지 내부에 표시될 텍스트입니다. `아이콘 매핑 키`로도 사용됩니다.      |
| `className` | `string` | ✅        | Tailwind CSS 클래스. 텍스트 색상, 배경색, 정렬 등 스타일을 정의합니다. |

## 🧩 주요 렌더링 정보

- 아이콘: label이 모임 카테고리 종류 중 하나일 경우에만 해당 아이콘 렌더링됨

- 텍스트: label로 전달된 문자열이 표시됨(모임 카테고리, 성별, 신청 상태, 방장 유무)

- 스타일: className에 전달된 Tailwind CSS 클래스가 배지에 적용됨

## 🎨 스타일 가이드 (Tailwind CSS 기준)

- 디자인 확정 시 수정 필요

## ✅ 테스트 정보

테스트 도구: jest, @testing-library/react

| 테스트 항목                   | 설명                                                               |
| ----------------------------- | ------------------------------------------------------------------ |
| 텍스트 렌더링 테스트          | label로 전달된 문자열이 화면에 정상적으로 표시되는지 확인          |
| 아이콘 렌더링 테스트 (존재)   | `label`이 아이콘 매핑에 해당될 경우, 아이콘(svg)이 함께 렌더링됨   |
| 아이콘 렌더링 테스트 (비존재) | `label`이 매핑되지 않은 값일 경우, 아이콘이 렌더링되지 않는지 확인 |
| className 스타일 적용 테스트  | 전달된 Tailwind 클래스가 정상적으로 적용되는지 확인                |

---

## 📁 파일 구조

/components/common/Badge
├── Badge.md
├── Badge.styles.ts
└── Badge.test.tsx
├── Badge.tsx
