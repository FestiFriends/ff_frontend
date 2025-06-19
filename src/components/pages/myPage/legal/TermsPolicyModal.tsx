import Modal from '@/components/common/Modal/Modal';
import ModalClose from '@/components/common/Modal/ModalClose';
import ModalContent from '@/components/common/Modal/ModalContent';
import PrivacyPolicyContent from './PrivacyPolicyContent';
import TermsContent from './TermsContent';

const TermsPolicyModal = () => (
  <Modal>
    <ModalContent className='max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 text-sm leading-relaxed shadow-xl'>
      <ModalClose />
      <TermsContent />
      <div className='my-6 border-t' />
      <PrivacyPolicyContent />
      <p className='mt-6 text-xs text-gray-500'>
        본 정책은 2025년 6월 1일부터 적용됩니다.
      </p>
    </ModalContent>
  </Modal>
);

export default TermsPolicyModal;
