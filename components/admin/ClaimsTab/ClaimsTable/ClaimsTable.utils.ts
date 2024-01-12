export const countEmptyRows = (page: number, rowsPerPage: number, claimsCount: number): number => {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - claimsCount) : 0;
  return emptyRows;
};
