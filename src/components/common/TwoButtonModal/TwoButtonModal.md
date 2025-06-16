# TwoButtonModal

기존 버튼을 트리거로 사용하는 확인/취소 모달

## 기본 사용법

### 1단계: import

```tsx
import TwoButtonModal, {
  useModalController,
} from '@/components/ui/TwoButtonModal';
```

### 2단계: 모달 컨트롤러 생성

```tsx
const modal = useModalController();
```

### 3단계: 트리거 버튼 + 모달

```tsx
<button onClick={modal.openModal}>모달 열기</button>

<TwoButtonModal
  isOpen={modal.isOpen}
  onModalClose={modal.closeModal}
  title="확인이 필요합니다"
  message="이 작업을 수행하시겠습니까?"
  onConfirm={() => alert('확인!')}
/>
```

## 자주 사용하는 패턴

### 삭제 확인

```tsx
const deleteModal = useModalController();

<button onClick={deleteModal.openModal}>삭제</button>

<TwoButtonModal
  isOpen={deleteModal.isOpen}
  onModalClose={deleteModal.closeModal}
  variant="danger"
  title="삭제 확인"
  message="정말 삭제하시겠습니까?"
  confirmText="삭제"
  onConfirm={handleDelete}
/>
```

### 폼 초기화

```tsx
const resetModal = useModalController();

<Button onClick={resetModal.openModal} variant="secondary">
  초기화
</Button>

<TwoButtonModal
  isOpen={resetModal.isOpen}
  onModalClose={resetModal.closeModal}
  variant="warning"
  title="입력 내용 초기화"
  message="모든 입력 내용이 초기화됩니다. 계속하시겠습니까?"
  confirmText="초기화"
  onConfirm={onReset}
/>
```

### 로그아웃 확인

```tsx
const logoutModal = useModalController();

<button onClick={logoutModal.openModal}>로그아웃</button>

<TwoButtonModal
  isOpen={logoutModal.isOpen}
  onModalClose={logoutModal.closeModal}
  title="로그아웃"
  message="정말 로그아웃 하시겠습니까?"
  onConfirm={() => {
    localStorage.clear();
    window.location.href = '/login';
  }}
/>
```

## Props

### 필수 Props

- `isOpen` - 모달 열림 상태 (boolean)
- `onModalClose` - 모달 닫기 함수 (() => void)
- `title` - 모달 제목 (string)
- `message` - 모달 내용 (string)

### 선택 Props

- `confirmText` - 확인 버튼 텍스트 (기본: "확인")
- `cancelText` - 취소 버튼 텍스트 (기본: "취소")
- `onConfirm` - 확인 버튼 클릭 시 실행 함수
- `onCancel` - 취소 버튼 클릭 시 실행 함수
- `variant` - 스타일 변형 (default | danger | success | warning)

## 스타일 변형

```tsx
// 기본 (파란색)
<TwoButtonModal variant="default" />

// 위험 (빨간색) - 삭제 등
<TwoButtonModal variant="danger" />

// 성공 (초록색) - 저장 등
<TwoButtonModal variant="success" />

// 경고 (노란색) - 초기화 등
<TwoButtonModal variant="warning" />
```

## 여러 모달 사용하기

```tsx
const Component = () => {
  const deleteModal = useModalController();
  const saveModal = useModalController();
  const resetModal = useModalController();

  return (
    <>
      <button onClick={deleteModal.openModal}>삭제</button>
      <button onClick={saveModal.openModal}>저장</button>
      <button onClick={resetModal.openModal}>초기화</button>

      <TwoButtonModal
        isOpen={deleteModal.isOpen}
        onModalClose={deleteModal.closeModal}
        variant='danger'
        title='삭제 확인'
        message='정말 삭제하시겠습니까?'
        onConfirm={handleDelete}
      />

      <TwoButtonModal
        isOpen={saveModal.isOpen}
        onModalClose={saveModal.closeModal}
        variant='success'
        title='저장 확인'
        message='변경사항을 저장하시겠습니까?'
        onConfirm={handleSave}
      />

      <TwoButtonModal
        isOpen={resetModal.isOpen}
        onModalClose={resetModal.closeModal}
        variant='warning'
        title='초기화 확인'
        message='모든 내용이 초기화됩니다.'
        onConfirm={handleReset}
      />
    </>
  );
};
```

## 비동기 작업 처리

```tsx
const handleAsyncConfirm = async () => {
  try {
    await someApiCall();
    alert('작업 완료!');
    // 성공하면 모달 자동 닫힘
  } catch (error) {
    alert('작업 실패!');
    // 에러 발생하면 모달 열린 상태 유지
  }
};

<TwoButtonModal
  onConfirm={handleAsyncConfirm}
  // ...기타 props
/>;
```

## 커스텀 스타일

```tsx
<TwoButtonModal
  styles={{
    modal: 'max-w-lg border-2 border-purple-200',
    header: 'text-purple-900 text-xl',
    confirmButton: 'bg-purple-600 hover:bg-purple-700',
  }}
  // ...기타 props
/>
```

## 주의사항

- `useModalController`는 컴포넌트 최상위에서 호출
- 모달마다 독립적인 `useModalController` 사용
- `onConfirm`에서 에러 발생 시 모달이 자동으로 닫히지 않음 (의도된 동작)
