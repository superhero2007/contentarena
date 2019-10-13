import React from "react";
import Translate from "@components/Translator/Translate";
import ReactTable from "react-table";
import CmsBundleMinimumBid from "../components/CmsBundleMinimumBid";

class BundleList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { bundles, showActions } = this.props;
		const columns = [{
			Header: "Territories",
			accessor: "name",
			headerClassName: "rt-th-name",
			className: "rt-td-name rt-td-rights",
			width: 330,
			Cell: props => (
				<div>
					{props.value}
				</div>
			),
		}, {
			Header: "Sales Method",
			Cell: () => <Translate i18nKey="CHECKOUT_METHOD_BIDDING" />,
			headerClassName: "rt-th-center",
			className: "rt-td-center",
		}, {
			Header: "Minimum Bid",
			headerClassName: "rt-th-center",
			className: "rt-td-center",
			Cell: props => <CmsBundleMinimumBid {...props.original} />,

		}, {
			className: "rt-td-actions",
			Cell: props => (
				<>
					{showActions && (
						<>
							<i className="icon-edit clickable" onClick={() => this.props.onEdit(props.index)} />
							<i className="icon-remove clickable" onClick={() => this.props.onRemove(props.index)} />
						</>
					)}
				</>
			),
			width: 100,
		}];


		return (
			<ReactTable
				data={bundles}
				columns={columns}
				showPageSizeOptions={false}
				showPagination={false}
				resizable={false}
				style={{
					maxHeight: "580px",
				}}
				minRows={0}
				maxWidth={980}
				collapseOnPageChange={false}
				collapseOnDataChange={false}
				defaultPageSize={250}
				className="ca-table bundles-table"
				sorted={[{
					id: "name",
					desc: false,
				}]}
			/>
		);
	}
}

BundleList.defaultProps = {
	showActions: true,
};

export default BundleList;
