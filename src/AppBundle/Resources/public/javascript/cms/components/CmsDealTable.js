import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import Translate from "@components/Translator/Translate";
import CmsCurrencyFilter from "@components/Filters/CmsCurrencyFilter";
import TableSeasonList from "@components/Table/TableSeasonList";
import TableTerritoryList from "@components/Table/TableTerritoryList";
import CurrencySelector from "../../sell/components/CurrencySelector";
import FileSelector from "../../main/components/FileSelector";
import { trashIconRed } from "../../main/components/Icons";
import CmsNumberInput from "./CmsNumberInput";
import { getTerritoriesFromListing } from "../helpers/PropertyDetailsHelper";
import InputFee from "./InputFee";

class CmsDealTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			deals: props.deals,
		};
	}

	addFile = (index, response) => {
		const { deals } = this.state;
		const { onSave } = this.props;
		const selected = deals[index];
		const replaced = Object.assign({}, selected, {
			attachments: [{
				file: response.file,
				name: response.name,
			}, ...selected.attachments],
		});
		deals.splice(index, 1, replaced);
		onSave(deals);
	};

	removeFile = (index, fileIndex) => {
		const { deals } = this.state;
		const { onSave } = this.props;
		const selected = deals[index];
		selected.attachments.splice(fileIndex, 1);
		deals.splice(index, 1, selected);
		onSave(deals);
	};

	removeDeal = (index) => {
		const { deals } = this.state;
		const { onSave } = this.props;
		deals.splice(index, 1);
		onSave(deals);
	};

	selectCurrency = (index, value) => {
		setTimeout(() => {
			this.updateValue(index, "currency", value);
		}, 1);
	};

	updateContent = (index) => {
		const { deals } = this.state;
		const { onSave } = this.props;
		const selected = deals[index];
		if (selected.type) {
			const replaced = selected.seasons.map(element => Object.assign({}, selected, {
				seasons: [element],
				type: false,
			}));
			deals.splice(index, 1, ...replaced);
		} else {
			const selectedList = deals.filter(element => element.index === selected.index);
			const selectedItem = deals.find(element => element.index === selected.index);
			const selectedIndex = deals.indexOf(selectedItem);
			const replaced = Object.assign({}, selected, {
				seasons: selectedList.map(element => element.seasons[0]),
				type: true,
			});
			deals.splice(selectedIndex, selectedList.length, replaced);
		}
		onSave(deals);
	};

	handleChange = (index, deal) => {
		const { deals } = this.state;
		deals[index] = { ...deals[index], ...deal };
		this.props.onSave(deals);
	};

	updateValue = (index, key, value) => {
		const { deals } = this.state;
		const { onSave } = this.props;
		deals[index][key] = value;
		onSave(deals);
	};

	handleKeyDown = (index, key, e) => {
		if (e.key === "Enter") {
			this.updateValue(index, key, e.target.value);
		}
	};

	getTitleColumns = () => [{
		Header: () => <Translate i18nKey="CMS_DEALS_OVERVIEW_TABLE_HEADER_TERRITORY" />,
		id: props => `territory-name-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		accessor: "territories",
		width: 200,
		Cell: props => <TableTerritoryList index={props.index} territories={props.value} />,
	}, {
		Header: () => <Translate i18nKey="CMS_DEALS_OVERVIEW_TABLE_HEADER_COMPANY" />,
		id: props => `company-name-${props.index}`,
		headerClassName: "table-header",
		className: "table-header",
		accessor: "buyerCompanyName",
		width: 250,
		Cell: props => (
			<div className="form-group" style={{ marginBottom: 0 }}>
				<div className="input-group">
					<input
						key={`company-${props.index}`}
						type="text"
						className="input-group-text"
						placeholder="Enter company name"
						defaultValue={props.value}
						onKeyDown={e => this.handleKeyDown(props.index, "buyerCompanyName", e)}
						onBlur={e => this.updateValue(props.index, "buyerCompanyName", e.target.value)}
					/>
				</div>
			</div>
		),
	}];

	getDetailColumns = () => [{
		Header: () => <Translate i18nKey="CMS_DEALS_OVERVIEW_TABLE_HEADER_SEASON" />,
		id: props => `season-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center flex-direction-column",
		width: 180,
		accessor: "seasons",
		Cell: props => <TableSeasonList index={props.index} seasons={props.value} limit={3} />,
	}, {
		Header: () => <Translate i18nKey="CMS_DEALS_OVERVIEW_TABLE_HEADER_FEE" />,
		id: props => `fee-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 220,
		accessor: "fee",
		Cell: props => (
			<div className="form-group" style={{ marginBottom: 0 }}>
				<div className="input-group">
					<InputFee
						key={`fee-${props.index}`}
						onKeyDown={e => this.handleKeyDown(props.index, "fee", e)}
						onBlur={value => this.updateValue(props.index, "fee", value)}
						value={props.value}
					/>

				</div>
			</div>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_DEALS_OVERVIEW_TABLE_HEADER_CURRENCY" />,
		id: props => `currency-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center overflow-initial",
		width: 130,
		accessor: "currency",
		Cell: props => (
			<CmsCurrencyFilter
				onChange={currency => this.handleChange(props.index, { currency })}
				value={props.value}
				key={`currency-${props.index}`}
				label={false}
			/>
		),
	},
		/* {
		Header: () => <Translate i18nKey="CMS_DEALS_OVERVIEW_TABLE_HEADER_ATTACHMENTS" />,
		id: props => `attachments-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 200,
		accessor: "attachments",
		Cell: props => (
			<FileSelector
				target="attachments"
				selected={props.value}
				onSelect={file => this.addFile(props.index, file)}
				onRemove={index => this.removeFile(props.index, index)}
				accept={[".pdf"]}
				acceptType={[
					"application/pdf",
				]}
				tmp
			/>
		),
	},
		{
		Header: () => <Translate i18nKey="CMS_DEALS_OVERVIEW_TABLE_HEADER_ACTION" />,
		id: props => `split-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		accessor: "seasons",
		Cell: props => (
			<div className="d-flex">
				{props.value.length > 1 && (
					<button
						className="standard-button"
						onClick={() => this.updateContent(props.index)}
					>
						<Translate i18nKey="CMS_DEALS_TABLE_SPLIT_BUTTON" />
					</button>
				)}
				<img
					className="remove-deal-icon"
					alt="Remove"
					src={trashIconRed}
					onClick={() => this.removeDeal(props.index)}
				/>
			</div>
		),
	} */

	];

	render() {
		let { deals } = this.state;
		deals = deals.sort((a, b) => a.index - b.index);

		const columns = [...this.getTitleColumns(), ...this.getDetailColumns()];

		return (
			<section className="property-listing-wrapper">
				<ReactTable
					className="ca-table property-deals-table"
					defaultPageSize={30}
					showPageSizeOptions={false}
					showPagination={false}
					minRows={0}
					multiSort={false}
					resizable={false}
					data={deals}
					columns={columns}
				/>
			</section>
		);
	}
}

export default CmsDealTable;
