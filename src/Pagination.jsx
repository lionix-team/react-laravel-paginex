import React, {Component} from "react";
import PropTypes from 'prop-types';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {},
            paginationData: {},
            nextPageUrl: null,
            prevPageUrl: null,
            currentPage: null
        };
    }

    componentDidMount() {
        this.getProps(this.props);
    }

    UNSAFE_componentWillReceiveProps(props, nextContext) {
        this.getProps(props);
    }

    // Transform props
    getProps = (props) => {
        let defaultProps = Pagination.defaultProps.options;
        let options = this.props.options;
        Object.keys(defaultProps).forEach(function (key) {
            options[key] = props[key] ? props[key] : props['options'][key] ? props['options'][key] : defaultProps[key];
        });
        this.setState({options: options, paginationData: props.data});
    };

    // Check if page is active
    isCurrent = (page) => {
        return this.state.paginationData.current_page === page;
    };

    // Handle pagination buttons click event
    handleClick = (page) => {
        let parameters = {};
        if (this.props.requestParams) {
            parameters = this.props.requestParams;
        }
        parameters.page = page;
        this.props.changePage(parameters);
    };

    // Generate Prev Icon Or Text Buttons
    generateButtonsPrev = () => {
        let options = this.state.options;
        if (options.iconButtons) {
            return <i className={options.prevIconButton}/>
        }
        return options.prevButtonText;
    };

    // Generate Next Icon Or Text Buttons
    generateButtonsNext = () => {
        let options = this.state.options;
        if (options.iconButtons) {
            return <i className={options.nextIconButton}/>
        }
        return options.nextButtonText;
    };

    // Generate pagination buttons
    generatePagination = () => {
        let paginationData = this.state.paginationData;
        let pagination;
        if (Object.keys(paginationData).length) {
            let options = this.state.options;
            let current = paginationData.hasOwnProperty('current_page') ? paginationData.current_page : paginationData.meta.current_page,
                last = paginationData.hasOwnProperty('last_page') ? paginationData.last_page : paginationData.meta.last_page,
                delta = parseInt(options.numbersCountForShow),
                left = current - delta,
                right = current + delta + 1,
                range = [],
                rangeWithDots = [],
                l;
            for (let i = 1; i <= last; i++) {
                if ((i === 1 || i === last) || (i >= left && i < right)) {
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

            let nextPageUrl = paginationData.hasOwnProperty('next_page_url') ? paginationData.next_page_url : paginationData.links.next;
            let prevPageUrl = paginationData.hasOwnProperty('prev_page_url') ? paginationData.prev_page_url : paginationData.links.prev;
            pagination = (
                <ul className={options.containerClass}>
                    {prevPageUrl ?
                        <li className={options.prevButtonClass} onClick={(event) => {
                            event.preventDefault();
                            this.handleClick(current - 1)
                        }}>
                            <a href="" className={options.numberClass}>
                                {this.generateButtonsPrev()}
                            </a>
                        </li> : ""}
                    {rangeWithDots.map((page, index) =>
                        this.generateNumber(page, index)
                    )}
                    {nextPageUrl ?
                        <li className={options.nextButtonClass} onClick={(event) => {
                            event.preventDefault();
                            this.handleClick(current + 1)
                        }}>
                            <a href="" className={options.numberClass}>
                                {this.generateButtonsNext()}
                            </a>
                        </li>
                        : ""}
                </ul>
            );
        }
        return pagination;
    };

    generateNumber(page, index) {
        let options = this.state.options;
        return (
            <li className={this.isCurrent(page) ? options.numberButtonClass + " " + options.activeClass :
                options.numberButtonClass} key={index}>
                <a href="" className={options.numberClass}
                   onClick={(event) => {
                       event.preventDefault();
                       this.handleClick(page === '...' ? index + 1 : page)
                   }}>{page}</a>
            </li>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.generatePagination()}
            </React.Fragment>
        );
    }
}

Pagination.defaultProps = {
    options: {
        containerClass: "pagination",
        iconButtons: true,
        prevButtonClass: "page-item",
        prevButtonText: "Prev",
        prevIconButton: "mdi mdi-chevron-left",
        nextButtonClass: "page-item",
        nextButtonText: "Next",
        nextIconButton: "mdi mdi-chevron-right",
        numberButtonClass: "page-item",
        numberClass: "page-link",
        numbersCountForShow: 2,
        activeClass: 'active'
    },
    data: {}
};

Pagination.propTypes = {
    options: PropTypes.shape({
        containerClass: PropTypes.string,
        iconButtons: PropTypes.bool,
        nextButtonClass: PropTypes.string,
        nextButtonText: PropTypes.string,
        nextIconButton: PropTypes.string,
        prevButtonClass: PropTypes.string,
        prevButtonText: PropTypes.string,
        prevIconButton: PropTypes.string,
        numberButtonClass: PropTypes.string,
        numberClass: PropTypes.string,
        numberCountForShow: PropTypes.number,
        activeClass: PropTypes.string
    }),
    data: PropTypes.object
};
export default Pagination;