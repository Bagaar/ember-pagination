# Ember Pagination

[![CI](https://github.com/Bagaar/ember-pagination/workflows/CI/badge.svg)](https://github.com/Bagaar/ember-pagination/actions?query=workflow%3ACI)
[![NPM Version](https://badge.fury.io/js/%40bagaar%2Fember-pagination.svg)](https://badge.fury.io/js/%40bagaar%2Fember-pagination)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Easy customisable pagination component for Ember applications.

## Table of Contents

- [Compatibility](#compatibility)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Maintenance](#maintenance)

## Compatibility

- Ember.js v3.24 or above
- Ember CLI v3.24 or above
- Node.js v14 or above

## Installation

```shell
ember install @bagaar/ember-pagination
```

## Usage

```hbs
<PaginationData
  @currentPage={{5}}
  @itemsPerPage={{10}}
  @pageMargins={{2}}
  @pageRange={{3}}
  @totalItems={{90}}
  as |data|
>
  {{! Build your own pagination component using the provided `data`: }}
  {{! << < 1 2 ... 4 5 6 ... 8 9 > >> }}
  
  {{! The amount of items displayed on the current page. }}
  {{data.activeItems}} {{! 10 }}
  
  {{! An array including all page numbers. }}
  {{data.allPages}} {{! [1, 2, 3, 4, 5, 6, 7, 8, 9] }}
  
  {{! The current page number. }}
  {{data.currentPage}} {{! 5 }}
  
  {{! An array including all end-margin page numbers. }}
  {{data.endMarginPages}} {{! [8, 9] }}
  
  {{! The first item on the current page. }}
  {{data.firstActiveItem}} {{! 41 }}
  
  {{! Boolean indicating whether the first page is active. }}
  {{data.isFirstPage}} {{! false }}
  
  {{! Boolean indicating whether the last page is active. }}
  {{data.isLastPage}} {{! false }}
  
  {{! The amount of items displayed per page. }}
  {{data.itemsPerPage}} {{! 10 }}
  
  {{! The last item on the current page. }}
  {{data.lastActiveItem}} {{! 50 }}
  
  {{! The last page number. }}
  {{data.lastPage}} {{! 9 }}
  
  {{! The next page number. }}
  {{data.nextPage}} {{! 6 }}
  
  {{! The provided page margins. }}
  {{data.pageMargins}} {{! 2 }}
  
  {{! The provided page range. }}
  {{data.pageRange}} {{! 3 }}
  
  {{! An array including all page-range page numbers. }}
  {{data.pageRangePages}} {{! [4, 5, 6] }}
  
  {{! The previous page number. }}
  {{data.previousPage}} {{! 4 }}
  
  {{! Boolean indicating whether the lower break should be displayed. }}
  {{data.shouldShowLowerBreak}} {{! true }}
  
  {{! Boolean indicating whether the upper break should be displayed. }}
  {{data.shouldShowUpperBreak}} {{! true }}
  
  {{! An array including all start-margin page numbers. }}
  {{data.startMarginPages}} {{! [1, 2] }}
  
  {{! The total amount of items. }}
  {{data.totalItems}} {{! 90 }}
  
  {{! The total amount of pages. }}
  {{data.totalPages}} {{! 9 }}
</PaginationData>
```

## Contributing

See the [Contributing](./CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](./LICENSE.md).

## Maintenance

`@bagaar/ember-pagination` is built and maintained by [Bagaar](https://bagaar.be).
