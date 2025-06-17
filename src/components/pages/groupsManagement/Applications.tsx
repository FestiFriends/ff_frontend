import React from 'react';
import SlideCard from '@/components/common/SlideCard/SlideCard';
import {
  useGetApplications,
  usePatchApplication,
} from '@/hooks/groupsManagementsHooks/groupsManagementsHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { ApplicationGroupInfo } from '@/types/application';
import { ApplicationStatus } from '@/types/enums';
import {
  ApplicationsApiResponse,
  extractGroupInfo,
  formatApplications,
} from '@/utils/formatApplicationData';
import ApplicationComponent from './Application/Application';

const Applications = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useGetApplications();

  const { mutate: patchApplication } = usePatchApplication();

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  if (isPending) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p>로딩 중...</p>
      </div>
    );
  }

  const groups = formatApplications(
    data?.pages[0]?.data as ApplicationsApiResponse
  );

  const handleAcceptClick = (applicationId: string) => {
    patchApplication({ applicationId, status: ApplicationStatus.ACCEPTED });
  };

  const handleRejectClick = (applicationId: string) => {
    patchApplication({ applicationId, status: ApplicationStatus.REJECTED });
  };

  return (
    <div className='flex flex-col items-center gap-5 px-4'>
      {groups?.map((item) => (
        <SlideCard
          key={item.groupId}
          type='application'
          groupInfo={extractGroupInfo(item) as ApplicationGroupInfo}
          content={
            item.applications.length > 0 ? (
              <>
                {item.applications.map((application, index) => (
                  <ApplicationComponent
                    key={application.applicationId}
                    applicationData={application}
                    primaryButtonText='수락'
                    secondaryButtonText='거절'
                    onPrimaryClick={() =>
                      handleAcceptClick(application.applicationId)
                    }
                    onSecondaryClick={() =>
                      handleRejectClick(application.applicationId)
                    }
                    className={
                      index !== item.applications.length - 1
                        ? 'border-b border-gray-200'
                        : ''
                    }
                  />
                ))}
              </>
            ) : (
              <div className='flex items-center justify-center py-3 text-14_body_M text-gray-950'>
                <p>아직 신청자가 없습니다</p>
              </div>
            )
          }
        />
      ))}
      {isFetchingNextPage && <p>로딩 중...</p>}
      <div ref={bottomRef} />
    </div>
  );
};

export default Applications;
