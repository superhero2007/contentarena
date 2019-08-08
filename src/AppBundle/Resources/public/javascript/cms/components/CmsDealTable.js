import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import Translate from "@components/Translator/Translate";
import CurrencySelector from "../../sell/components/CurrencySelector";
import FileSelector from "../../main/components/FileSelector";

class CmsDealTable extends React.Component {
	constructor(props) {
		super(props);
		const { seasons, rights, territories } = props;
		const listings = [];
		territories.forEach((territory) => {
			listings.push({
				territory,
				company: "",
				seasons,
				currency: "",
				fee: 0,
				attachments: [],
				type: true,
			});
		});

		this.state = {
			loading: false,
			listings,
		};
		props.onSave(listings);
	}

	addFile = (index, response) => {
		const { listings } = this.state;
		const { onSave } = this.props;
		const selected = listings[index];
		const replaced = Object.assign({}, selected, {
			attachments: [{
				file: response.file,
				name: response.name,
			}, ...selected.attachments],
		});
		listings.splice(index, 1, replaced);
		this.setState({ listings });
		onSave(listings);
	};

	removeFile = (index, fileIndex) => {
		const { listings } = this.state;
		const { onSave } = this.props;
		const selected = listings[index];
		selected.attachments.splice(fileIndex, 1);
		listings.splice(index, 1, selected);
		this.setState({ listings });
		onSave(listings);
	};

	updateContent = (index) => {
		const { listings } = this.state;
		const { onSave } = this.props;
		const selected = listings[index];
		if (selected.type) {
			const replaced = selected.seasons.map(element => Object.assign({}, selected, {
				seasons: [element],
				type: false,
			}));
			listings.splice(index, 1, ...replaced);
		} else {
			const selectedList = listings.filter(element => element.territory.id === selected.territory.id);
			const selectedItem = listings.find(element => element.territory.id === selected.territory.id);
			const selectedIndex = listings.indexOf(selectedItem);
			const replaced = Object.assign({}, selected, {
				seasons: selectedList.map(element => element.seasons[0]),
				type: true,
			});
			listings.splice(selectedIndex, selectedList.length, replaced);
		}
		this.setState({ listings });
		onSave(listings);
	};

	updateValue = (index, key, value) => {
		const { listings } = this.state;
		const { onSave } = this.props;
		const selected = listings[index];
		const replaced = Object.assign({}, selected, {
			[key]: value,
		});
		listings.splice(index, 1, replaced);
		this.setState({ listings });
		onSave(listings);
	};

	getTitleColumns = () => [{
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_ID" />,
		id: props => `territory-name-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		accessor: "territory",
		width: 200,
		Cell: props => (
			<span>
				{props.value.name}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_LISTING" />,
		id: props => `company-name-${props.index}`,
		headerClassName: "table-header",
		className: "table-header",
		accessor: "company",
		Cell: props => (
			<input
				type="text"
				defaultValue={props.value}
				onBlur={e => this.updateValue(props.index, "company", e.target.value)}
			/>
		),
	}];

	getDetailColumns = () => [{
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_TERRITORY" />,
		id: props => `season-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 200,
		accessor: "seasons",
		Cell: props => (
			<span>
				{props.value.map(season => season.name).join(", ")}
			</span>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_LICENSE" />,
		id: props => `currency-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center overflow-initial",
		width: 200,
		accessor: "currency",
		Cell: props => (
			<CurrencySelector onClick={value => this.updateValue(props.index, "currency", value)} selected={props.value} key={props.index} />
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_FEE" />,
		id: props => `fee-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 200,
		accessor: "fee",
		Cell: props => (
			<input
				type="text"
				defaultValue={props.value}
				onBlur={e => this.updateValue(props.index, "fee", e.target.value)}
			/>
		),
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_USER" />,
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
	}, {
		Header: () => <Translate i18nKey="CMS_COMMERCIAL_OVERVIEW_TABLE_HEADER_ACTION" />,
		id: props => `split-${props.index}`,
		headerClassName: "table-header",
		className: "table-header justify-content-center",
		width: 200,
		accessor: "type",
		Cell: props => (
			<button className="standard-button" onClick={() => this.updateContent(props.index)}>
				{props.value ? "Split" : "Remove"}
			</button>
		),
	}];

	render() {
		let { listings } = this.state;
		listings = listings.sort((a, b) => a.territory.id - b.territory.id);

		const columns = [...this.getTitleColumns(), ...this.getDetailColumns()];

		return (
			<section className="property-listing-wrapper">
				<ReactTable
					className="ca-table property-listings-table"
					defaultPageSize={30}
					showPageSizeOptions={false}
					showPagination={false}
					minRows={0}
					multiSort={false}
					resizable={false}
					data={listings}
					columns={columns}
				/>
			</section>
		);
	}
}

CmsDealTable.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default CmsDealTable;
