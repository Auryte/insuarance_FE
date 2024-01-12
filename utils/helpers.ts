export const sleep = (span?: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, span || 0));
