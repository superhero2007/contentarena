import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import cn from "classnames";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";

class EmptySalesPackageTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getColumns = () => [
		{
			Header: <Translate i18nKey="SALES_PACKAGE_TABLE_TERRITORY_BUNDLE" />,
			headerClassName: "table-header-big",
			Cell: () => <div />,
		}, {
			Header: <Translate i18nKey="SALES_PACKAGE_TABLE_SALES_METHOD" />,
			headerClassName: "table-header-big",
			width: 300,
			Cell: () => <div />,
		}, {
			Header: <Translate i18nKey="SALES_PACKAGE_TABLE_PRICE_MINIMUM_BID" />,
			headerClassName: "table-header-big",
			width: 400,
			Cell: () => <div />,
		},
	];

	render() {
		const { validation } = this.props;

		return (
			<Fragment>
				<ReactTable
					className={cn("ca-table round-0", { "is-invalid-table": validation })}
					showPageSizeOptions={false}
					noDataText={null}
					showPagination={false}
					minRows={0}
					resizable={false}
					data={[{}, {}]}
					columns={this.getColumns()}
				/>
				{validation
				&&				<p className="bundle-validation-error"><Translate i18nKey="SALES_PACKAGE_TABLE_VALIDATION_MESSAGE" /></p>}
			</Fragment>
		);
	}
}

EmptySalesPackageTable.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	validation: state.validation,
});

export default connect(mapStateToProps, null)(EmptySalesPackageTable);
