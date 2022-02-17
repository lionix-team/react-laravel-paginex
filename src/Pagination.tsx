import React, { useState, useEffect } from 'react';

type Options = {
  containerClass: string;
  buttonIcons: boolean;
  nextButtonClass: string;
  nextButtonText: string;
  nextButtonIcon: string;
  prevButtonClass: string;
  prevButtonText: string;
  prevButtonIcon: string;
  numberButtonClass: string;
  numberClass: string;
  numbersCountForShow: number;
  activeClass: string;
};

type PaginationType = Partial<Options> & {
  options?: Partial<Options>;
  data: { [key: string]: any };
  requestParams?: any;
  changePage?: (page: unknown) => void;
};

const Pagination: React.FC<PaginationType> = (props) => {
  const {
    data,
    requestParams,
    changePage,
    options: passedOptions,
    ...rest
  } = props;

  const [options, setOptions] = useState<Options>({
    containerClass: 'pagination',
    buttonIcons: false,
    prevButtonClass: 'page-item',
    prevButtonText: 'Prev',
    prevButtonIcon: 'fa fa-chevron-left',
    nextButtonClass: 'page-item',
    nextButtonText: 'Next',
    nextButtonIcon: 'fa fa-chevron-right',
    numberButtonClass: 'page-item',
    numberClass: 'page-link',
    numbersCountForShow: 2,
    activeClass: 'active',
  });

  useEffect(() => {
    setOptions({ ...options, ...passedOptions, ...rest });
  }, [props]);

  // Check if page is active
  const isCurrent = (page: number) => {
    let currentPage = data.meta ? data.meta.current_page : data.current_page;
    return currentPage === page;
  };

  // Handle pagination buttons click event
  const handleClick = (page: number) => {
    let parameters: { page?: number } = {};
    if (requestParams) {
      parameters = requestParams;
    }
    parameters.page = page;
    changePage && changePage(parameters);
  };

  // Generate Prev Icon Or Text Buttons
  const generateButtonsPrev = () => {
    if (options.buttonIcons) {
      return <i className={options.prevButtonIcon} />;
    }
    return options.prevButtonText;
  };

  // Generate Next Icon Or Text Buttons
  const generateButtonsNext = () => {
    if (options.buttonIcons) {
      return <i className={options.nextButtonIcon} />;
    }
    return options.nextButtonText;
  };

  // Generate pagination buttons
  const generatePagination = () => {
    let paginationData = data;
    let pagination;
    if (Object.keys(paginationData).length) {
      let current = paginationData.hasOwnProperty('current_page')
          ? paginationData.current_page
          : paginationData.meta.current_page,
        last = paginationData.hasOwnProperty('last_page')
          ? paginationData.last_page
          : paginationData.meta.last_page,
        delta = options.numbersCountForShow,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;
      for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
          range.push(i);
        }
      }
      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      let nextPageUrl = paginationData.hasOwnProperty('next_page_url')
        ? paginationData.next_page_url
        : paginationData.links.next;
      let prevPageUrl = paginationData.hasOwnProperty('prev_page_url')
        ? paginationData.prev_page_url
        : paginationData.links.prev;
      pagination = (
        <ul className={options.containerClass}>
          {prevPageUrl ? (
            <li
              className={options.prevButtonClass}
              onClick={(event) => {
                event.preventDefault();
                handleClick(current - 1);
              }}
            >
              <a href="" className={options.numberClass}>
                {generateButtonsPrev()}
              </a>
            </li>
          ) : (
            ''
          )}
          {rangeWithDots.map((page, index) => generateNumber(page, index))}
          {nextPageUrl ? (
            <li
              className={options.nextButtonClass}
              onClick={(event) => {
                event.preventDefault();
                handleClick(current + 1);
              }}
            >
              <a href="" className={options.numberClass}>
                {generateButtonsNext()}
              </a>
            </li>
          ) : (
            ''
          )}
        </ul>
      );
    }
    return pagination;
  };

  // Generate pagination numbers
  const generateNumber = (page: any, index: number) => (
    <li
      className={
        isCurrent(page)
          ? options.numberButtonClass + ' ' + options.activeClass
          : options.numberButtonClass
      }
      key={index}
    >
      <a
        href=""
        className={options.numberClass}
        onClick={(event) => {
          event.preventDefault();
          handleClick(page === '...' ? index + 1 : page);
        }}
      >
        {page}
      </a>
    </li>
  );

  return <>{generatePagination()}</>;
};

export default Pagination;
