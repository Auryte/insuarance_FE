import { Dayjs } from 'dayjs';

const getTime = (date: string) => new Date(date).getTime();

export const getCurrentDate = () => new Date().toISOString();

export const getISODateFormat = (date: Dayjs | null) =>
  date?.isValid() ? date.toISOString() : null;

export const getLatestDate = (d1: string | null, d2: string | null) => {
  if (d1 && d2) {
    return getTime(d1) < getTime(d2) ? d2 : d1;
  }

  return null;
};

export const formatDate = (date: string): string => date.split('T')[0];
