export default function generateConfig({
  activePage = 1,
  perPage = 10,
  totalRecords = 70,
} = {}) {
  let active = parseInt(activePage, 10);
  let per = parseInt(perPage, 10);
  let total = parseInt(totalRecords, 10);

  let firstPage = 1;
  let lastPage = Math.ceil(total / per);

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
