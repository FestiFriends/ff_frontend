'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Toast } from '@/components/common';
import DetailHeader from '@/components/common/DetailHeader/DetailHeader';
import NormalCategorySelector from '@/components/pages/groupDetail/editGroup/NormalCategorySelector';
import NormalDateSelector from '@/components/pages/groupDetail/editGroup/NormalDateSelector';
import NormalDescriptionInput from '@/components/pages/groupDetail/editGroup/NormalDescriptionInput';
import NormalLocationSelector from '@/components/pages/groupDetail/editGroup/NormalLocationSelector';
import NormalParticipantsInput from '@/components/pages/groupDetail/editGroup/NormalParticipantsInput';
import NormalTagInput from '@/components/pages/groupDetail/editGroup/NormalTagInput';
import NormalTitleInput from '@/components/pages/groupDetail/editGroup/NormalTitleInput';
import { GenderLabels } from '@/constants/genderLabels';
import { GroupCategoryLabels } from '@/constants/groupLabels';
import { LocationLabels } from '@/constants/locationLabels';
import { useGetGroupInfo } from '@/hooks/groupHooks/groupHooks';
import { useUpdateGroup } from '@/hooks/groupHooks/groupHooks';
import { DateRange } from '@/types/dateRange';
import { GenderType, LocationType } from '@/types/enums';
import { UpdateGroupApiRequest } from '@/types/group';

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 50;

const labelToKey = (label: string): LocationType | '' => {
  const entry = (
    Object.entries(LocationLabels) as [LocationType, string][]
  ).find(([, lbl]) => lbl === label);
  return entry ? entry[0] : '';
};

const genderLabelToKey = (label: string): GenderType => {
  const entry = Object.entries(GenderLabels).find(([, lbl]) => lbl === label);
  return entry ? (entry[0] as GenderType) : 'ALL';
};

const EditGroupWrapper = () => {
  const params = useParams();
  const groupId = params?.groupId as string;
  const router = useRouter();
  const { data: groupDetail, isPending } = useGetGroupInfo(groupId);
  const { mutateAsync: updateGroup } = useUpdateGroup();

  const [category, setCategory] = useState<
    (typeof GroupCategoryLabels)[keyof typeof GroupCategoryLabels]
  >(GroupCategoryLabels.COMPANION);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [participants, setParticipants] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [message, setMessage] = useState<string | null>(null);

  const originalGender = groupDetail?.data?.gender;
  const originalStartAge = groupDetail?.data?.startAge;
  const originalEndAge = groupDetail?.data?.endAge;

  useEffect(() => {
    if (!groupDetail?.data) return;
    const d = groupDetail.data;

    setCategory(d.category || GroupCategoryLabels.COMPANION);
    setTitle(d.title);
    setDescription(d.description || '');
    setRegion(labelToKey(d.location));
    setDateRange({
      startDate: new Date(d.startDate.slice(0, 10)),
      endDate: new Date(d.endDate.slice(0, 10)),
    });
    setParticipants(d.maxMembers);
    setTags(d.hashtag || []);
  }, [groupDetail]);

  const canSubmit = useMemo(() => {
    if (!groupDetail?.data) return false;
    const isTagsChanged = !(
      Array.isArray(groupDetail?.data?.hashtag)
      && tags.length === groupDetail?.data?.hashtag?.length
      && tags.every((tag, idx) => tag === groupDetail?.data?.hashtag?.[idx])
    );

    return (
      category !== groupDetail?.data?.category
      || title !== groupDetail?.data?.title
      || description !== groupDetail?.data?.description
      || LocationLabels[region as LocationType] !== groupDetail?.data?.location
      || dateRange.startDate?.toISOString().slice(0, 10)
        !== groupDetail?.data?.startDate.slice(0, 10)
      || dateRange.endDate?.toISOString().slice(0, 10)
        !== groupDetail?.data?.endDate.slice(0, 10)
      || (participants !== groupDetail?.data?.maxMembers
        && participants >= groupDetail?.data?.memberCount)
      || isTagsChanged
    );
  }, [
    category,
    title,
    description,
    region,
    dateRange,
    participants,
    tags,
    groupDetail,
  ]);

  const handleSubmit = async () => {
    if (!groupDetail) return;

    const payload = {
      title,
      category: category,
      gender: genderLabelToKey(originalGender as string),
      startAge: originalStartAge!,
      endAge: originalEndAge!,
      location: LocationLabels[region as LocationType],
      startDate: dateRange.startDate!.toISOString().replace('.000', ''),
      endDate: dateRange.endDate!.toISOString().replace('.000', ''),
      maxMembers: participants,
      description,
      hashtag: tags,
    };

    try {
      const res = await updateGroup({
        groupId,
        groupData: payload as UpdateGroupApiRequest,
      });
      if (res.code === 200) {
        router.replace(`/groups/${groupId}`);
      }
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setMessage((error as { message: string }).message);
      } else {
        setMessage('모임 정보 수정 중 오류가 발생했습니다.');
      }
    }
  };

  if (isPending) return <div>로딩 중…</div>;

  return (
    <div className='flex h-screen flex-col'>
      <DetailHeader
        title='모임 정보 수정'
        hasLeftIcon={false}
      />
      <div className='mx-auto scrollbar-hide flex min-h-0 max-w-md flex-1 flex-col gap-[30px] overflow-auto px-4 pt-[68px] pb-[88px]'>
        <div className='flex justify-between'>
          <span className='h-5 w-2/12 text-left text-14_B text-black'>
            공연 이름
          </span>
          <span className='line-clamp-2 w-9/12 overflow-hidden text-right text-16_M break-all text-ellipsis text-gray-950'>
            {groupDetail?.data?.performance?.title}
          </span>
        </div>
        <div>
          <NormalCategorySelector
            value={category}
            onChange={setCategory}
          />
        </div>
        <NormalTitleInput
          value={title}
          onChange={setTitle}
        />
        <NormalDescriptionInput
          value={description}
          onChange={setDescription}
        />
        <NormalLocationSelector
          value={region}
          onChange={setRegion}
          originalValue={labelToKey(groupDetail?.data?.location || '')}
        />
        <NormalDateSelector
          value={dateRange}
          onChange={setDateRange}
        />
        <NormalParticipantsInput
          value={participants}
          onChange={setParticipants}
          min={MIN_PARTICIPANTS}
          max={MAX_PARTICIPANTS}
        />
        <NormalTagInput
          tags={tags}
          onAdd={(tag) => setTags([...tags, tag])}
          onRemove={(tag) => setTags(tags.filter((t) => t !== tag))}
        />
      </div>
      <div className='fixed right-0 bottom-0 left-0 z-20 flex justify-end gap-2.5 bg-white px-4 py-5'>
        <Button
          variant='secondary'
          color='normal'
          onClick={() => router.replace(`/groups/${groupId}`)}
        >
          취소
        </Button>
        <Button
          color={canSubmit ? 'normal' : 'disable'}
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          수정
        </Button>
      </div>
      {message && (
        <Toast
          message={message}
          onClose={() => {}}
        />
      )}
    </div>
  );
};

export default EditGroupWrapper;
