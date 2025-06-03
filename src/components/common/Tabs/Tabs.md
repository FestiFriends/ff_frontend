# 🏷️ Tabs 컴포넌트

재사용 가능한 공용 탭 UI 컴포넌트입니다.
외부에서 상태를 제어하는 제어형 컴포넌트로, 탭 전환 애니메이션과 콘텐츠 연동이 가능하도록 설계되어 있습니다.

---

## 📦 사용법

```tsx
import Tabs from '@/components/Tabs';

const tabs = ['신청한 모임', '참여중인 모임', '받은 신청서'];
const [selectedTab, setSelectedTab] = useState(tabs[0]);

<Tabs
  tabs={tabs}
  activeTab={selectedTab}
  onTabChange={setSelectedTab}
/>;
{
  selectedTab === '참여중인 모임' && <div>참여 중인 모임 목록</div>;
}
```

## ✨ Props

| 이름          | 타입                    | 필수 | 설명                                                 |
| ------------- | ----------------------- | ---- | ---------------------------------------------------- |
| `tabs`        | `string[]`              | ✅   | 탭에 표시할 문자열 배열                              |
| `activeTab`   | `string`                | ✅   | 현재 선택된 탭                                       |
| `onTabChange` | `(tab: string) => void` | ✅   | 탭 클릭 시 상위 컴포넌트에 선택된 탭을 전달하는 콜백 |

## 🎨 스타일 가이드 (Tailwind CSS 기준)

Tailwind 기반 스타일 적용

선택된 탭에 text-black 강조 스타일

하단 밑줄은 transform: translateX(...)로 이동

transition-transform으로 부드러운 애니메이션 적용

## ✅ 테스트 정보

> 테스트 도구: jest, @testing-library/react

| 테스트 항목                            | 설명                                                             |
| -------------------------------------- | ---------------------------------------------------------------- |
| 탭 목록 렌더링 테스트                  | `tabs` 배열의 각 텍스트가 화면에 표시되는지 검증                 |
| activeTab 스타일 적용 테스트           | 선택된 탭에 `text-black` 클래스가 적용되는지 확인                |
| onTabChange 이벤트 핸들러 테스트       | 탭 클릭 시 전달된 콜백 함수가 정확한 인자와 함께 호출되는지 확인 |
| 콘텐츠 연동 테스트 (`TabsWithContent`) | 탭을 클릭했을 때 실제 해당 콘텐츠가 화면에 렌더링되는지 확인     |

## 🧠 Todo

- 디자인 확정 후 Tailwind 클래스 리팩토링 예정

## 📁 파일 구조

```
/components/Tabs/
  ├── Tabs.tsx
  ├── Tabs.test.tsx
  └── Tabs.md
```
