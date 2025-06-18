'use client';

import React, { FormEvent, useRef, useState } from 'react';
import axios from 'axios';
import Toast from '@/components/common/Toast/Toast';

interface AdminCheckProps {
  onAccept: (accept: boolean) => void;
}

const AdminCheck = ({ onAccept }: AdminCheckProps) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef || !inputRef.current) {
      setMessage('비밀번호를 입력해주세요!');
      setShowToast(true);
      return;
    }

    try {
      const response = await axios.post('/admin/verify', {
        password: inputRef.current.value,
      });

      const success = response.data.success;

      if (success) {
        setMessage('인증에 성공하였습니다.');
        onAccept(true);
      } else {
        setMessage('비밀번호가 잘못되엇습니다!');
      }
    } catch {
      setMessage('오류가 발생하였습니다!');
    } finally {
      setShowToast(true);
    }
  };

  return (
    <>
      {showToast && (
        <Toast
          message={message}
          onClose={() => setShowToast(false)}
          className='bottom-4 left-1/2 -translate-x-1/2'
        />
      )}
      <form onSubmit={handleSubmit}>
        <h1>비밀번호를 입력하세요</h1>
        <input
          type='password'
          ref={inputRef}
        />
        <button>확인</button>
      </form>
    </>
  );
};

export default AdminCheck;
