const TermsContent = () => (
  <>
    <h2 className='mb-4 text-lg font-bold'>이용약관</h2>
    <p className='mb-4'>
      본 약관은 FestiFriends(이하 ‘회사’)가 제공하는 공연 동행/숙박/교통 매칭
      플랫폼(이하 ‘서비스’)의 이용과 관련하여 회사와 회원 간의 권리와 의무,
      책임사항을 규정함을 목적으로 합니다.
    </p>

    <h3 className='mt-4 mb-2 text-base font-semibold'>제1조 (가입 및 이용)</h3>
    <p className='mb-2'>
      회원은 본 약관에 동의함으로써 서비스 이용 권한을 부여받습니다. 일부 기능은
      본인 인증 또는 리뷰 이력이 있어야 사용 가능합니다.
    </p>

    <h3 className='mt-4 mb-2 text-base font-semibold'>제2조 (금지 행위)</h3>
    <ul className='mb-2 list-inside list-disc space-y-1'>
      <li>타인의 정보를 도용하는 행위</li>
      <li>불쾌감 또는 위협을 주는 대화, 오프라인 비매너 행위</li>
      <li>광고, 홍보 또는 영리 목적의 활동</li>
    </ul>

    <h3 className='mt-4 mb-2 text-base font-semibold'>제3조 (책임의 제한)</h3>
    <p className='mb-2'>
      회사는 사용자 간 매칭에 따른 직접적 행위에 대해 법적 책임을 지지 않습니다.
      단, 신고 및 이용제한 조치를 통해 안전한 플랫폼 유지를 위해 노력합니다.
    </p>

    <h3 className='mt-4 mb-2 text-base font-semibold'>제4조 (약관의 변경)</h3>
    <p className='mb-6'>
      회사는 약관을 개정할 수 있으며, 변경 사항은 서비스 내 공지사항 또는
      이메일을 통해 고지합니다.
    </p>
  </>
);

export default TermsContent;
