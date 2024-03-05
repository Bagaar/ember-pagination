// components
import type PaginationData from './components/pagination-data.gts';

export default interface BagaarEmberPaginationRegistry {
  // components
  'pagination-data': typeof PaginationData;
  PaginationData: typeof PaginationData;
}
