import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LICENSE_TAB } from "@constants";
import Translate from "@components/Translator/Translate";
import CmsLicenseDefinitionItem from "./CmsLicenseDefinitionItem";
import Loader from "../../common/components/Loader";
import api from "../../api";
import CmsLicenseTermItem from "./CmsLicenseTermItem";

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
					definitions,
					terms,
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

	restoreDefault = () => {
		const { property: { customId: propertyId } } = this.props;
		this.setState({ restoring: true });

		Promise.all([ContentArena.Api.restorePropertyTerms(propertyId), ContentArena.Api.restorePropertyDefinitions(propertyId)])
			.then((data) => {
				const terms = data[0].data.map((term) => {
					const items = term.items.map(element => Object.assign({}, element, { restoreValue: element.content }));
					return Object.assign({}, term, { items });
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
		const definitions = this.state.definitions.slice(0);
		const definition = {
			name: "",
			content: "",
			custom: true,
			editable: true,
			editing: true,
			position: definitions.length + 1,
		};

		definitions.push(definition);
		this.setState({ definitions });
	};

	onRemoveDefinition = (index) => {
		const definitions = this.state.definitions.slice(0);
		const { property: { customId: propertyId } } = this.props;
		const { id } = definitions[index];
		ContentArena.Api.removePropertyDefinition(propertyId, { id })
			.then(() => {
				definitions[index].removed = true;
				this.setState({ definitions });
			});
	};

	onSaveDefinition = (index) => {
		const definitions = this.state.definitions.slice(0);
		const { property: { customId: propertyId } } = this.props;
		const {
			id, position, content, name,
		} = definitions[index];
		const newDefinition = {
			position,
			content,
			name,
			id,
		};

		ContentArena.Api.updatePropertyDefinition(propertyId, newDefinition)
			.then(({ data: response }) => {
				if (response.success) {
					const { definition } = response;
					definitions[index] = Object.assign({}, definition, { restoreValue: definition.content });
					this.setState({ definitions });
				}
			});
	};

	onSaveTerm = (termIndex, termItemIndex) => {
		const terms = this.state.terms.slice(0);
		const { property: { customId: propertyId } } = this.props;
		const {
			id, content,
		} = terms[termIndex].items[termItemIndex];
		const newTerm = {
			content,
			id,
		};
		ContentArena.Api.updatePropertyTerm(propertyId, newTerm)
			.then(({ data: response }) => {
				if (response.success) {
					const { term } = response;
					terms[termIndex].items[termItemIndex] = Object.assign({}, term, { restoreValue: term.content });
					this.setState({ terms });
				}
			});
	};

	onUpdateDefinition = (index, value) => {
		const definitions = this.state.definitions.slice(0);
		definitions[index] = Object.assign({}, definitions[index], value);
		this.setState({ definitions });
	};

	onUpdateTerm = (termIndex, termItemIndex, value) => {
		const terms = this.state.terms.slice(0);
		terms[termIndex].items[termItemIndex] = Object.assign({}, terms[termIndex].items[termItemIndex], value);
		this.setState({ terms });
	};

	onRestoreDefinition = (index) => {
		const definitions = this.state.definitions.slice(0);
		definitions[index].content = definitions[index].restoreValue;
		this.setState({ definitions });
	};

	onRestoreTerm = (termIndex, termItemIndex) => {
		const terms = this.state.terms.slice(0);
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

		if (loading) return <Loader loading />;
		return (
			<section className="property-license-tab">
				<div className="property-license-tab-header body2">
					<Translate i18nKey="TERMS_EDIT_HEADER_TWO" />
				</div>
				<div className="property-license-tab-tabs body2">
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
					<div>
						{!restoring && definitions.map((definition, i) => (
							!definition.removed && (
								<CmsLicenseDefinitionItem
									key={`Definition-${i}`}
									onRemove={() => this.onRemoveDefinition(i)}
									onUpdate={value => this.onUpdateDefinition(i, value)}
									onSave={() => this.onSaveDefinition(i)}
									onRestore={() => this.onRestoreDefinition(i)}
									item={definition}
								/>
							)
						))}
					</div>
				)}
				{activeTab === LICENSE_TAB.TERMS && (
					<div>
						{!restoring && terms.map((term, i) => (
							term.items.map((item, k) => (
								!item.removed && (
									<CmsLicenseTermItem
										key={k}
										onUpdate={value => this.onUpdateTerm(i, k, value)}
										onRestore={() => this.onRestoreTerm(i, k)}
										onSave={() => this.onSaveTerm(i, k)}
										item={item}
										termPosition={term.position}
									/>
								)
							))
						))}
					</div>
				)}

				<div className="property-license-tab-action">
					<button
						onClick={this.addDefinition}
						disabled={restoring}
						className="primary-outline-button add-definition"
					>
						<div className="button-content">
							+&nbsp;<Translate i18nKey="TERMS_EDIT_BUTTON_ADD_DEFINITIONS" />
						</div>
					</button>
					<div
						onClick={this.restoreDefault}
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

export default connect(
	mapStateToProps,
	null,
)(PropertyDetailsLicenseTab);
