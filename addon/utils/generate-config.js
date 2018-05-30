export default function generateConfig({
  activePage = 1,
  perPage = 10,
  totalRecords = 70,
} = {}) {
  const active = parseInt(activePage, 10);
  const per = parseInt(perPage, 10);
  const total = parseInt(totalRecords, 10);

  const firstPage = 1;
  const lastPage = Math.ceil(total / per);

  return {
    activePage: active,
    firstPage,
    lastPage,
    nextPage: active < lastPage ? Math.max(active + 1, firstPage) : null,
    perPage: per,
    previousPage: active > firstPage ? Math.min(active - 1, lastPage) : null,
    totalRecords: total,
  };
}
