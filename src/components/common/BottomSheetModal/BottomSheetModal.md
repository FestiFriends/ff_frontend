# BottomSheet 컴포넌트

화면 하단에서 올라오는 모바일 친화적인 모달 컴포넌트입니다. Modal 컴포넌트를 기반으로 구축되어 안정적인 상태 관리를 제공합니다.

---

## 주요 기능

- 하단에서 슬라이드 업되는 부드러운 애니메이션
- 3가지 높이 옵션 (`half`, `full`, `auto`)
- 상단 핸들과 헤더 커스터마이징
- 백드롭 클릭 제어
- 스크롤 지원

---

## 컴포넌트 구조

### `<BottomSheetModal />`

| Props                  | 타입                         | 기본값   | 설명                            |
| ---------------------- | ---------------------------- | -------- | ------------------------------- |
| `trigger`              | `React.ReactNode`            | -        | Bottom Sheet를 여는 트리거 요소 |
| `children`             | `React.ReactNode`            | -        | 내부 컨텐츠                     |
| `title`                | `string` (선택)              | -        | 헤더 제목                       |
| `height`               | `'half' \| 'full' \| 'auto'` | `'half'` | 높이 설정                       |
| `className`            | `string`                     | `''`     | 추가 CSS 클래스                 |
| `disableBackdropClose` | `boolean`                    | `false`  | 배경 클릭으로 닫기 비활성화     |
| `hasHandle`            | `boolean`                    | `true`   | 상단 핸들 표시 여부             |
| `hasClose`             | `boolean`                    | `true`   | 헤더 닫기 버튼 표시 여부        |

---

## 높이 옵션

- **`half`**: 뷰포트의 50% (기본값)
- **`full`**: 뷰포트의 90%
- **`auto`**: 컨텐츠에 따라 자동 조절 (최대 80vh)

---

## 사용 예시

### 기본 사용법

```tsx
<BottomSheetModal
  trigger={<button>메뉴 열기</button>}
  title='설정'
>
  <div className='p-6'>
    <p>Bottom Sheet 컨텐츠입니다.</p>
  </div>
</BottomSheetModal>
```

### 높이별 사용 예시

```tsx
{
  /* 간단한 옵션 선택 */
}
<BottomSheetModal
  trigger={<button>옵션 선택</button>}
  height='half'
  title='옵션을 선택하세요'
>
  <div className='space-y-3 p-4'>
    <button className='w-full p-3 text-left'>옵션 1</button>
    <button className='w-full p-3 text-left'>옵션 2</button>
  </div>
</BottomSheetModal>;

{
  /* 상세 폼 */
}
<BottomSheetModal
  trigger={<button>프로필 편집</button>}
  height='full'
  title='프로필 편집'
>
  <form className='space-y-4 p-6'>
    <input
      placeholder='이름'
      className='w-full rounded border p-3'
    />
    <input
      placeholder='이메일'
      className='w-full rounded border p-3'
    />
    <button className='w-full rounded bg-blue-500 p-3 text-white'>
      저장하기
    </button>
  </form>
</BottomSheetModal>;

{
  /* 알림 메시지 */
}
<BottomSheetModal
  trigger={<button>알림 보기</button>}
  height='auto'
>
  <div className='p-6'>
    <h3 className='mb-2 font-bold'>새로운 알림</h3>
    <p>메시지가 도착했습니다.</p>
  </div>
</BottomSheetModal>;
```

### 고급 설정

```tsx
{
  /* 배경 클릭 비활성화 */
}
<BottomSheetModal
  trigger={<button>중요한 작업</button>}
  disableBackdropClose={true}
  hasHandle={false}
  hasClose={false}
>
  <div className='p-6 text-center'>
    <p>처리 중입니다...</p>
  </div>
</BottomSheetModal>;
```

---

## 스타일링

`className` prop으로 커스터마이징 가능:

```tsx
<BottomSheetModal
  className="bg-gray-900 text-white"
  // 다크 모드
/>

<BottomSheetModal
  className="bg-gradient-to-t from-blue-50 to-white"
  // 그라데이션 배경
/>
```
