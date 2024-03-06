import Component from '@glimmer/component';
interface PaginationDataSignature {
    Args: {
        currentPage: number;
        itemsPerPage: number;
        pageMargins?: number;
        pageRange?: number;
        totalItems: number;
    };
    Blocks: {
        default: [
            {
                activeItems: number;
                allPages: number[];
                currentPage: number;
                endMarginPages: number[] | null;
                firstActiveItem: number;
                isFirstPage: boolean;
                isLastPage: boolean;
                itemsPerPage: number;
                lastActiveItem: number;
                lastPage: number;
                nextPage: number | null;
                pageMargins: number;
                pageRange: number | null;
                pageRangePages: number[] | null;
                previousPage: number | null;
                shouldShowLowerBreak: boolean;
                shouldShowUpperBreak: boolean;
                startMarginPages: number[] | null;
                totalItems: number;
                totalPages: number;
            }
        ];
    };
}
export default class PaginationData extends Component<PaginationDataSignature> {
    /**
     * Argument getters
     */
    get currentPage(): number;
    get itemsPerPage(): number;
    get pageMargins(): number;
    get pageRange(): number | null;
    get totalItems(): number;
    /**
     * State getters
     */
    get _currentPage(): number;
    get activeItems(): number;
    get allPages(): number[];
    get endMarginPages(): number[] | null;
    get firstActiveItem(): number;
    get isFirstPage(): boolean;
    get isLastPage(): boolean;
    get lastActiveItem(): number;
    get lastPage(): number;
    get nextPage(): number | null;
    get pageMarginsThreshold(): number;
    get pageRangeLowerLimit(): number;
    get pageRangePages(): number[] | null;
    get pageRangeUpperLimit(): number;
    get previousPage(): number | null;
    get shouldShowLowerBreak(): boolean;
    get shouldShowUpperBreak(): boolean;
    get startMarginPages(): number[] | null;
    get totalPages(): number;
}
export {};
//# sourceMappingURL=pagination-data.d.ts.map