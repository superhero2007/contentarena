import React, { Component } from "react";
import { PropTypes } from "prop-types";
import cn from "classnames";
import { DATE_TIME_FORMAT } from "@constants";
import Select from "react-select";

class Pagination extends Component {
	static propTypes = {
		totalItems: PropTypes.number.isRequired,
		page: PropTypes.number.isRequired,

	};

	constructor(props) {
		super(props);

		this.state = {
			page: props.page || 1,
			pageSize: props.pageSize || 10,
			totalItems: props.totalItems || 10,
			threshold: props.threshold || 5,
			pageSizeOptions: props.pageSizeOptions || [5, 10, 25, 50],
		};
	}

	cancel = () => {
	};

	getTotalPages = () => {
		const {
			pageSize,
			totalItems,
		} = this.state;

		return Math.ceil(totalItems / pageSize);
	};

	getLink = (page) => {
		const {
			url,
		} = this.props;

		return `${url}&page=${page}`;
	};

	onSelectPageSize = (option) => {
		const {
			onSelectPageSize,
		} = this.props;
		this.setState({ pageSize: option.value });
		if (onSelectPageSize) onSelectPageSize(option.value);
	};

	render() {
		const {
			page,
			threshold,
			pageSize,
			pageSizeOptions,
		} = this.state;

		const totalPages = this.getTotalPages();

		return (
			<div className="pagination">
				<div className="pagination-container">
					{totalPages > 0 && (
						<a
							href={this.getLink(page - 1)}
							disabled={page <= 1}
							className={cn("pagination-button", { "disabled-link": page <= 1 })}
						>
							<i className="fa fa-chevron-left" />
							{" "}
							{this.context.t("PAGINATION_PREV")}
						</a>
					)}
					<ul className="pagination-pages">
						{Array.from(Array(totalPages), (e, i) => {
							const pageNumber = i + 1;
							const active = page === pageNumber;

							if (pageNumber < page - threshold || pageNumber > page + threshold) return undefined;

							return (
								<li key={i} className={cn({ "pagination-pages-active": active })}>
									<a
										href={this.getLink(pageNumber)}
										className={cn({ "disabled-link": active, "no-border": page - 1 === pageNumber })}
									>
										{pageNumber}
									</a>
								</li>
							);
						})}
					</ul>
					{totalPages > 0 && (
						<a
							href={this.getLink(page + 1)}
							className={cn("pagination-button", { "disabled-link": page >= totalPages })}
						>
							{this.context.t("PAGINATION_NEXT")}
							{" "}
							<i className="fa fa-chevron-right" />
						</a>
					)}
				</div>
				<div className="pagination-page-size">
					{this.context.t("PAGINATION_PAGE_SIZE")}
					<Select
						name="form-field-name"
						multi={false}
						isClearable={false}
						menuPlacement="auto"
						className="sport-input-filter"
						onChange={this.onSelectPageSize}
						value={pageSize}
						options={pageSizeOptions.map(option => ({ value: option, label: option }))}
					/>
				</div>
			</div>
		);
	}
}

Pagination.contextTypes = {
	t: PropTypes.func.isRequired,
};


export default Pagination;
