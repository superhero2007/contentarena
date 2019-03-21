import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import TermItem from "../components/TermItem";
import DefinitionItem from "../components/DefinitionItem";
import Loader from "../../common/components/Loader";

class Terms extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			updating: false,
			terms: [],
			definitions: [],
			activeTab: 1,
		};
	}

	componentDidMount() {
		this.setState({
			loading: true,
			loadingDefinitions: true,
		});

		ContentArena.Api.getCompanyTerms()
			.done((terms) => {
				this.setState({
					loading: false,
					terms,
				});
			});

		ContentArena.Api.getCompanyDefinitions()
			.done((definitions) => {
				this.setState({
					loadingDefinitions: false,
					definitions,
				});
			});
	}

	onRemoveDefinition = (index) => {
		const { definitions } = this.state;
		definitions[index].removed = true;
		this.setState({ definitions });
		this.updateTerms();
	};

	onRemoveTerm = (termIndex, termItemIndex) => {
		const { terms } = this.state;
		terms[termIndex].items[termItemIndex].removed = true;
		terms[termIndex].items[termItemIndex].content = "";
		this.setState({ terms });
		this.updateTerms();
	};

	restoreDefaultTerms = () => {
		this.setState({ restoring: true });

		ContentArena.Api.restoreCompanyTerms()
			.done((terms) => {
				this.setState({
					restoring: false,
					terms,
				});
			});
	};

	restoreDefaultDefinitions = () => {
		this.setState({ restoringDefinitions: true });

		ContentArena.Api.restoreDefinitions()
			.done((definitions) => {
				this.setState({
					restoringDefinitions: false,
					definitions,
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

	render() {
		const {
			loading,
			terms,
			restoring,
			definitions,
			restoringDefinitions,
			activeTab,
		} = this.state;

		if (loading) return <Loader loading />;

		return (
			<div className="settings-container terms-edit-container">
				<div className="terms-edit-header-title">
					{this.context.t("TERMS_EDIT_HEADER")}
					<div className="subtitle">
						{this.context.t("TERMS_EDIT_HEADER_TWO")}
					</div>
				</div>
				<div className="d-flex justify-content-between align-items-baseline">
					<div className="ca-tabs">
						<div
							className={`tab lg ${activeTab === 1 ? "active" : ""}`}
							onClick={() => this.setState({ activeTab: 1 })}
						>
							{this.context.t("TERMS_EDIT_TITLE_DEFINITIONS")}
						</div>
						<div
							className={`tab lg ${activeTab === 2 ? "active" : ""}`}
							onClick={() => this.setState({ activeTab: 2 })}
						>
							{this.context.t("TERMS_EDIT_TITLE_TERMS")}
						</div>
					</div>
					<div className="terms-edit-header">
						<button
							onClick={this.restoreDefaultDefinitions}
							disabled={restoringDefinitions}
							className="standard-button license-agreement-button terms-restore-button"
						>
							{this.context.t("TERMS_EDIT_BUTTON_RESTORE_DEFINITIONS")}
							{restoringDefinitions && <Loader loading xSmall />}
							{!restoringDefinitions && <div><i className="fa fa-refresh" /></div>}
						</button>
						<button
							onClick={this.restoreDefaultTerms}
							disabled={restoring}
							className="standard-button license-agreement-button terms-restore-button"
						>
							{this.context.t("TERMS_EDIT_BUTTON_RESTORE")}
							{restoring && <Loader loading xSmall />}
							{!restoring && <div><i className="fa fa-refresh" /></div>}
						</button>
					</div>
				</div>
				{activeTab === 1 && (
					<div className="terms-edit-box">
						{!restoringDefinitions && definitions.map((definition, i) => (
							<div>
								{!definition.removed && (
									<DefinitionItem
										key={i}
										index={i}
										onRemove={() => this.onRemoveDefinition(i)}
										{...definition}
									/>
								)}
							</div>
						))}
						<button
							onClick={this.addDefinition}
							className="standard-button terms-add-definition-button"
						>
							{this.context.t("TERMS_EDIT_BUTTON_ADD_DEFINITIONS")}
						</button>
					</div>
				)}
				{activeTab === 2 && (
					<div className="terms-edit-box">
						{!restoring && terms.map((term, i) => (
							<div>
								{term.items.map((item, k) => {
									if (item.removed) return undefined;
									return (
										<TermItem
											onRemove={() => this.onRemoveTerm(i, k)}
											{...item}
											termPosition={term.position}
										/>
									);
								})}
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

Terms.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
)(Terms);
