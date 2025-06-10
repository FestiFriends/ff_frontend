import { GroupCard, GroupsApiData } from '@/types/groupCard';

export const transformGroupsApiData = (data: GroupsApiData): GroupCard[] =>
  data.groups.map((group) => ({
    id: group.id,
    performance: {
      id: data.performanceId,
    },
    title: group.title,
    category: group.category,
    gender: group.gender,
    startAge: group.startAge,
    endAge: group.endAge,
    location: group.location,
    startDate: group.startDate,
    endDate: group.endDate,
    memberCount: group.memberCount,
    maxMembers: group.maxMembers,
    description: group.description,
    hashtag: group.hashtag,
    host: {
      hostId: group.host.hostId,
      name: group.host.name,
      rating: group.host.rating,
      profileImage: group.host.profileImage,
    },
    isHost: group.isHost,
  }));
