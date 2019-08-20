import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Translate from "@components/Translator/Translate";
import TermItem from "../../manage/components/TermItem";
import DefinitionItem from "../../manage/components/DefinitionItem";
import Loader from "../../common/components/Loader";

class PropertyDetailsLicenseTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			terms: [],
			definitions: [],
			activeTab: 1,
		};
	}

	componentDidMount() {
		const { property: { customId: propertyId } } = this.props;
		this.setState({
			loading: true,
			loadingDefinitions: true,
		});

		ContentArena.Api.getPropertyTerms(propertyId).then(({ data }) => {
			const terms = data.map((term) => {
				const items = term.items.map(element => Object.assign({}, element, { restoreValue: element.content }));
				return Object.assign({}, term, { items });
			});
			this.setState({
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

		ContentArena.Api.getPropertyDefinitions(propertyId).then(({ data }) => {
			const definitions = data.map(element => Object.assign({}, element, { restoreValue: element.content }));
			this.setState({
				definitions,
				loadingDefinitions: false,
			});
		})
			.catch(({ response }) => {
				this.setState({
					error: response.data.message,
					loadingDefinitions: false,
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

	restoreDefaultTerms = () => {
		const { property: { customId: propertyId } } = this.props;
		this.setState({ restoring: true });

		ContentArena.Api.restorePropertyTerms(propertyId).then(({ data }) => {
			const terms = data.map((term) => {
				const items = term.items.map(element => Object.assign({}, element, { restoreValue: element.content }));
				return Object.assign({}, terms, { items });
			});
			this.setState({
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

	restoreDefaultDefinitions = () => {
		const { property: { customId: propertyId } } = this.props;
		this.setState({ restoringDefinitions: true });

		ContentArena.Api.restorePropertyDefinitions(propertyId).then(({ data }) => {
			const definitions = data.map(element => Object.assign({}, element, { restoreValue: element.content }));
			this.setState({
				definitions,
				restoringDefinitions: false,
			});
		})
			.catch(({ response }) => {
				this.setState({
					error: response.data.message,
					restoringDefinitions: false,
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

	render() {
		const {
			loading,
			terms,
			restoring,
			definitions,
			restoringDefinitions,
			activeTab,
		} = this.state;
		const { property: { customId: propertyId } } = this.props;

		if (loading) return <Loader loading />;
		return (
			<section className="property-license-tab terms-edit-container">
				<div className="terms-edit-header-title">
					<h6 className="subtitle">
						<Translate i18nKey="TERMS_EDIT_HEADER_TWO" />
					</h6>
				</div>
				<div className="d-flex justify-content-between align-items-baseline">
					<div className="ca-tabs">
						<div
							className={`tab lg ${activeTab === 1 ? "active" : ""}`}
							onClick={() => this.setState({ activeTab: 1 })}
						>
							<Translate i18nKey="TERMS_EDIT_TITLE_DEFINITIONS" />
						</div>
						<div
							className={`tab lg ${activeTab === 2 ? "active" : ""}`}
							onClick={() => this.setState({ activeTab: 2 })}
						>
							<Translate i18nKey="TERMS_EDIT_TITLE_TERMS" />
						</div>
					</div>
					<div className="terms-edit-header">
						<button
							onClick={this.restoreDefaultDefinitions}
							disabled={restoringDefinitions}
							className="standard-button license-agreement-button terms-restore-button"
						>
							<Translate i18nKey="TERMS_EDIT_BUTTON_RESTORE_DEFINITIONS" />
							{restoringDefinitions && <Loader loading xSmall />}
							{!restoringDefinitions && <div><i className="fa fa-refresh" /></div>}
						</button>
						<button
							onClick={this.restoreDefaultTerms}
							disabled={restoring}
							className="standard-button license-agreement-button terms-restore-button"
						>
							<Translate i18nKey="TERMS_EDIT_BUTTON_RESTORE" />
							{restoring && <Loader loading xSmall />}
							{!restoring && <div><i className="fa fa-refresh" /></div>}
						</button>
					</div>
				</div>
				{activeTab === 1 && (
					<div className="terms-edit-box">
						{!restoringDefinitions && definitions.map((definition, i) => (
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
						<button
							onClick={this.addDefinition}
							className="standard-button terms-add-definition-button"
						>
							<Translate i18nKey="TERMS_EDIT_BUTTON_ADD_DEFINITIONS" />
						</button>
					</div>
				)}
				{activeTab === 2 && (
					<div className="terms-edit-box">
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
