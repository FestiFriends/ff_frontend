'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useAuth';
import { TwoButtonModal } from '../common';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);
  const router = useRouter();
  const { onLogin } = useLogin();

  return (
    <>
      {isOpen && (
        <TwoButtonModal
          isOpen={isOpen}
          onModalClose={closeModal}
          variant='warning'
          title='로그인'
          message='로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?'
          confirmText='확인'
          cancelText='취소'
          onCancel={() => router.back()}
          onConfirm={onLogin}
        />
      )}
    </>
  );
};

export default LoginModal;
