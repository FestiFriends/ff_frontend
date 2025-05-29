export type DefaultSortable = {
  name: string;
  date: string;
  groupCount: number;
};

export const defaultSortMap: Record<
  string,
  <T extends DefaultSortable>(a: T, b: T) => number
> = {
  name: (a, b) => a.name.localeCompare(b.name),
  'date-desc': (a, b) => b.date.localeCompare(a.date),
  'date-asc': (a, b) => a.date.localeCompare(b.date),
  'group-desc': (a, b) => b.groupCount - a.groupCount,
  'group-asc': (a, b) => a.groupCount - b.groupCount,
};
