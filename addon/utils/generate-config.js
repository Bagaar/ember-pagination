export default function generateConfig({
  activePage = 1,
  perPage = 10,
  totalRecords = 70,
} = {}) {
  const firstPage = 1;
  const lastPage = Math.ceil(totalRecords / perPage);

  return {
    activePage,
    firstPage,
    lastPage,
    nextPage: activePage < lastPage ? Math.max(activePage + 1, firstPage) : null,
    perPage,
    previousPage: activePage > firstPage ? Math.min(activePage - 1, lastPage) : null,
    totalRecords,
  };
}
