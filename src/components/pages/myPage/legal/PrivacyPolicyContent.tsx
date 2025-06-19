const PrivacyPolicyContent = () => (
  <>
    <h2 className='mb-4 text-lg font-bold'>개인정보처리방침</h2>
    <p className='mb-2'>
      회사는 ‘개인정보 보호법’ 등 관련 법령에 따라 회원의 개인정보를 보호하며,
      본 방침을 통해 수집·이용 목적과 방식을 안내드립니다.
    </p>

    <h3 className='mt-4 mb-2 text-base font-semibold'>1. 수집 항목 및 목적</h3>
    <ul className='mb-2 list-inside list-disc space-y-1'>
      <li>필수: 닉네임, 성별, 연령대 (매칭 시 노출용)</li>
      <li>선택: 프로필 이미지, 한 줄 소개</li>
      <li>기타: 이용 기록, 신고/후기 내역 (서비스 품질 개선용)</li>
    </ul>

    <h3 className='mt-4 mb-2 text-base font-semibold'>2. 보유 및 이용 기간</h3>
    <p className='mb-2'>
      회원 탈퇴 시 모든 정보는 즉시 파기되며, 법령에 따라 보존이 필요한 항목은
      해당 기간 동안 별도 보관됩니다.
    </p>

    <h3 className='mt-4 mb-2 text-base font-semibold'>3. 제3자 제공</h3>
    <p className='mb-2'>
      회사는 회원의 동의 없이는 개인정보를 외부에 제공하지 않습니다.
    </p>

    <h3 className='mt-4 mb-2 text-base font-semibold'>4. 이용자의 권리</h3>
    <p className='mb-2'>
      회원은 자신의 개인정보에 대해 열람, 정정, 삭제를 요청할 수 있으며, 요청은
      고객센터 또는 이메일을 통해 처리됩니다.
    </p>
  </>
);

export default PrivacyPolicyContent;
