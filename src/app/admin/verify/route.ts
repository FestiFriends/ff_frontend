import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { password } = await req.json();

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  console.log(ADMIN_PASSWORD);

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, message: '비밀번호가 설정되어 있지 않습니다.' },
      { status: 500 }
    );
  }

  const isValid = password === ADMIN_PASSWORD;

  return NextResponse.json({ success: isValid }, { status: 200 });
};
