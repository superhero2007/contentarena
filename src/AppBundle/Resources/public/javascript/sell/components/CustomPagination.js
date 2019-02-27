import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const defaultButton = props => <button {...props}>{props.children}</button>;

const defaultBackButton = props => (
	<span>
		<i className="fa fa-angle-left" />
		<button {...props}>{props.children}</button>
	</span>
);
const defaultNextButton = props => (
	<span>
		<button {...props}>{props.children}</button>
		<i className="fa fa-angle-right" />
	</span>
);

class CustomPagination extends Component {
	constructor(props) {
		super();

		this.state = {
			visiblePages: this.getVisiblePages(null, props.pages),
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.pages !== nextProps.pages) {
			this.setState({
				visiblePages: this.getVisiblePages(null, nextProps.pages),
			});
		}

		this.changePage(nextProps.page + 1);
	}

	filterPages = (visiblePages, totalPages) => visiblePages.filter(page => page <= totalPages);

	getVisiblePages = (page, total) => {
		if (total < 7) {
			return this.filterPages([1, 2, 3, 4, 5, 6], total);
		}
		if (page % 5 >= 0 && page > 4 && page + 2 < total) {
			return [1, page - 1, page, page + 1, total];
		}
		if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
			return [1, total - 3, total - 2, total - 1, total];
		}
		return [1, 2, 3, 4, 5, total];
	};

	changePage(page) {
		const activePage = this.props.page + 1;

		if (page === activePage) return;
		const visiblePages = this.getVisiblePages(page, this.props.pages);
		this.setState({
			visiblePages: this.filterPages(visiblePages, this.props.pages),
		});

		this.props.onPageChange(page - 1);
	}

	isLast = (page, arr) => page === arr[arr.length - 1];

	isActive = (page, activeP) => page === activeP;

	getPageNumber = (activePage, index, page, array) => {
		const pageNumber = this.isActive(page, activePage) || this.isLast(page, array) ? page : `${page} |`;
		return array[index - 1] + 2 < page ? `...${page}` : pageNumber;
	};

	render() {
		const {
			PageButtonComponent = defaultButton,
			BackButtonComponent = defaultBackButton,
			NextButtonComponent = defaultNextButton,
			backText = this.context.t("CUSTOM_PAGINATION_CL_4_5_PREV_TEXT"),
			nextText = this.context.t("CUSTOM_PAGINATION_CL_4_5_NEXT_TEXT"),
		} = this.props;

		const { visiblePages } = this.state;
		const activePage = this.props.page + 1;

		return (
			<div className="Table-pagination">
				<div className={cn("Table-prevPageWrapper", { active: activePage !== 1 })}>
					<BackButtonComponent
						className="Table-pageButton-back"
						onClick={() => {
							if (activePage === 1) return;
							this.changePage(activePage - 1);
						}}
						disabled={activePage === 1}
					>
						{backText}
					</BackButtonComponent>
				</div>
				<div className="Table-visiblePagesWrapper">
					{visiblePages.map((page, index, array) => (
						<PageButtonComponent
							key={page}
							className={cn("Table-pageButton",
								{ active: activePage === page },
								{ vertical: !this.isLast(page, array) && !this.isActive(page, activePage) })}
							onClick={() => this.changePage(page)}
						>
							{this.getPageNumber(activePage, index, page, array)}
						</PageButtonComponent>
					))}
				</div>
				<div className={cn("Table-nextPageWrapper", { active: activePage !== this.props.pages })}>
					<NextButtonComponent
						className="Table-pageButton-next"
						onClick={() => {
							if (activePage === this.props.pages) return;
							this.changePage(activePage + 1);
						}}
						disabled={activePage === this.props.pages}
					>
						{nextText}
					</NextButtonComponent>
				</div>
			</div>
		);
	}
}

CustomPagination.propTypes = {
	pages: PropTypes.number,
	page: PropTypes.number,
	PageButtonComponent: PropTypes.any,
	PrevButtonComponent: PropTypes.any,
	NextButtonComponent: PropTypes.any,
	onPageChange: PropTypes.func,
	backText: PropTypes.string,
	nextText: PropTypes.string,
};

CustomPagination.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CustomPagination;
