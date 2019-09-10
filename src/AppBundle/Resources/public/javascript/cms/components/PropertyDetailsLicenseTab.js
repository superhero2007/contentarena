import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LICENSE_TAB } from "@constants";
import Translate from "@components/Translator/Translate";
import TermItem from "../../manage/components/TermItem";
import DefinitionItem from "../../manage/components/DefinitionItem";
import Loader from "../../common/components/Loader";
import api from "../../api";

class PropertyDetailsLicenseTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			terms: [],
			definitions: [],
			activeTab: LICENSE_TAB.DEFINITIONS,
		};
	}

	componentDidMount() {
		const { property: { customId: propertyId } } = this.props;
		this.setState({ loading: true });

		Promise.all([ContentArena.Api.getPropertyTerms(propertyId), api.properties.getDefinitions({ propertyId })])
			.then((data) => {
				const terms = data[0].data.map((term) => {
					const items = term.items.map(element => Object.assign({}, element, { restoreValue: element.content }));
					return Object.assign({}, term, { items });
				});
				const definitions = data[1].data.map(element => Object.assign({}, element, { restoreValue: element.content }));
				this.setState({
					terms,
					definitions,
					loading: false,
				});
			})
			.catch(({ response }) => {
				this.setState({
					error: response.data.message,
					loading: false,
				});
			});
	}

	onRemoveDefinition = (index) => {
		const { definitions } = this.state;
		definitions[index].removed = true;
		this.setState({ definitions });
	};

	onRemoveTerm = (termIndex, termItemIndex) => {
		const { terms } = this.state;
		terms[termIndex].items[termItemIndex].removed = true;
		terms[termIndex].items[termItemIndex].content = "";
		this.setState({ terms });
	};

	restoreDefault = () => {
		const { property: { customId: propertyId } } = this.props;
		this.setState({ restoring: true });

		Promise.all([ContentArena.Api.restorePropertyTerms(propertyId), ContentArena.Api.restorePropertyDefinitions(propertyId)])
			.then((data) => {
				const terms = data[0].data.map((term) => {
					const items = term.items.map(element => Object.assign({}, element, { restoreValue: element.content }));
					return Object.assign({}, terms, { items });
				});
				const definitions = data[1].data.map(element => Object.assign({}, element, { restoreValue: element.content }));
				this.setState({
					definitions,
					terms,
					restoring: false,
				});
			})
			.catch(({ response }) => {
				this.setState({
					error: response.data.message,
					restoring: false,
				});
			});
	};

	addDefinition = () => {
		const { definitions } = this.state;
		const definition = {
			name: "",
			content: "",
			custom: true,
			editable: true,
			editing: true,
			edited: false,
			position: definitions.length + 1,
		};

		definitions.push(definition);
		this.setState({ definitions });
	};

	onSaveDefinition = (index, value) => {
		const { definitions } = this.state;
		definitions[index] = Object.assign({}, value, { restoreValue: value.content });
		this.setState({ definitions });
	};

	onSaveTerm = (termIndex, termItemIndex, value) => {
		const { terms } = this.state;
		terms[termIndex].items[termItemIndex] = Object.assign({}, value, { restoreValue: value.content });
		this.setState({ terms });
	};

	onUpdateDefinition = (index, value) => {
		const { definitions } = this.state;
		definitions[index].content = value;
		this.setState({ definitions });
	};

	onUpdateTerm = (termIndex, termItemIndex, value) => {
		const { terms } = this.state;
		terms[termIndex].items[termItemIndex].content = value;
		this.setState({ terms });
	};

	onRestoreDefinition = (index) => {
		const { definitions } = this.state;
		definitions[index].content = definitions[index].restoreValue;
		this.setState({ definitions });
	};

	onRestoreTerm = (termIndex, termItemIndex) => {
		const { terms } = this.state;
		terms[termIndex].items[termItemIndex].content = terms[termIndex].items[termItemIndex].restoreValue;
		this.setState({ terms });
	};

	onUpdateTab = (activeTab) => {
		this.setState({ activeTab });
	};

	render() {
		const {
			loading,
			terms,
			definitions,
			restoring,
			activeTab,
		} = this.state;
		const { property: { customId: propertyId } } = this.props;

		if (loading) return <Loader loading />;
		return (
			<section className="property-license-tab">
				<div className="header body2">
					<Translate i18nKey="TERMS_EDIT_HEADER_TWO" />
				</div>
				<div className="tabs">
					<div
						className={`tab ${activeTab === LICENSE_TAB.DEFINITIONS ? "active" : ""}`}
						onClick={() => this.onUpdateTab(LICENSE_TAB.DEFINITIONS)}
					>
						<div className="text">
							<Translate i18nKey="TERMS_EDIT_TITLE_DEFINITIONS" />
						</div>
					</div>
					<div
						className={`tab ${activeTab === LICENSE_TAB.TERMS ? "active" : ""}`}
						onClick={() => this.onUpdateTab(LICENSE_TAB.TERMS)}
					>
						<div className="text">
							<Translate i18nKey="TERMS_EDIT_TITLE_TERMS" />
						</div>
					</div>
				</div>
				{activeTab === LICENSE_TAB.DEFINITIONS && (
					<div className="content">
						{!restoring && definitions.map((definition, i) => (
							<div key={i}>
								{!definition.removed && (
									<DefinitionItem
										key={i}
										index={i}
										onRemove={() => this.onRemoveDefinition(i)}
										onUpdate={value => this.onUpdateDefinition(i, value)}
										onRestore={() => this.onRestoreDefinition(i)}
										onSave={value => this.onSaveDefinition(i, value)}
										isProperty
										propertyId={propertyId}
										{...definition}
									/>
								)}
							</div>
						))}
					</div>
				)}
				{activeTab === LICENSE_TAB.TERMS && (
					<div className="content">
						{!restoring && terms.map((term, i) => (
							<div key={i}>
								{term.items.map((item, k) => {
									if (item.removed) return undefined;
									return (
										<TermItem
											key={k}
											onRemove={() => this.onRemoveTerm(i, k)}
											onUpdate={value => this.onUpdateTerm(i, k, value)}
											onRestore={() => this.onRestoreTerm(i, k)}
											onSave={value => this.onSaveTerm(i, k, value)}
											{...item}
											termPosition={term.position}
											isProperty
											propertyId={propertyId}
										/>
									);
								})}
							</div>
						))}
					</div>
				)}

				<div className="action">
					<button
						onClick={this.addDefinition}
						className="primary-outline-button add-definition"
					>
						<div className="content">
							+&nbsp;<Translate i18nKey="TERMS_EDIT_BUTTON_ADD_DEFINITIONS" />
						</div>
					</button>
					<div
						onClick={this.restoreDefault}
						disabled={restoring}
						className="secondary-link restore"
					>
						{restoring && <Loader loading xSmall />}
						{!restoring && <i className="icon-reset" />}
						<div className="restore-text">
							<Translate i18nKey="TERMS_EDIT_BUTTON_RESTORE_DEFINITIONS" />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

PropertyDetailsLicenseTab.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	property: state.propertyDetails.property,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PropertyDetailsLicenseTab);
