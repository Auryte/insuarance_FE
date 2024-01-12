export const saveInLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const getFromLocalStorage = (key: string): string | null | undefined => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return !data ? null : JSON.parse(data);
  }
};
