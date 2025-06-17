'use client';

import { useState } from 'react';
import Toast from '@/components/common/Toast/Toast';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { GroupInfo as GroupInfoType } from '@/types/group';
import { ToastContent } from '@/types/toastContent';
import GroupInfoCard from './GroupInfoCard/GroupInfoCard';
import GroupModal from './GroupModal/GroupModal';

interface GroupInfoProps {
  groupInfo: GroupInfoType;
}

const GroupInfo = ({ groupInfo }: GroupInfoProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedin);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState<ToastContent>({
    message: '',
    type: 'default',
  });
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => {
    if (!isLoggedIn) {
      setToastContent({ message: '로그인이 필요합니다!', type: 'error' });
      setShowToast(true);
      return;
    }

    setIsOpen(true);
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastContent.message}
          type={toastContent.type}
          onClose={() => setShowToast(false)}
        />
      )}

      <GroupInfoCard
        groupInfo={groupInfo}
        handleButtonClick={onOpenModal}
      />

      {/* 모임 신청/탈퇴 모달 */}
      <GroupModal
        groupId={groupInfo.id}
        isMember={groupInfo.isMember}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setShowToast={setShowToast}
        setToastContent={setToastContent}
      />
    </>
  );
};

export default GroupInfo;
