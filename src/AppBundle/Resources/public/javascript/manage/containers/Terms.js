import React from 'react';
import { connect } from "react-redux";
import { Spinner} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import TermItem from "../components/TermItem";
import cn from "classnames";
import DefinitionItem from "../components/DefinitionItem";

class Terms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            updating: false,
            terms : [],
            definitions: []
        };

    }

    componentDidMount () {
        this.setState({loading:true, loadingDefinitions: true });

        ContentArena.Api.getCompanyTerms().done(terms=>{
            this.setState({
                loading:false,
                terms : terms,
            });
        });

        ContentArena.Api.getCompanyDefinitions().done(definitions=>{
            this.setState({
                loadingDefinitions:false,
                definitions : definitions,
            });
        });

    }

    onUpdateDefinition = (index, content) => {

        let definitions = this.state.definitions;

        definitions[index].content = content;

        this.setState({definitions})
    };

    onUpdateTermItem = (termIndex, termItemIndex, content) => {

        let terms = this.state.terms;

        terms[termIndex].items[termItemIndex].content = content;

        this.setState({terms})
    };

    restoreDefaultTerms = () => {

        this.setState({restoring:true });

        ContentArena.Api.restoreCompanyTerms().done(terms=>{
            this.setState({
                restoring:false,
                terms : terms,
            });
        });
    };

    restoreDefaultDefinitions = () => {

        this.setState({restoringDefinitions:true });

        ContentArena.Api.restoreDefinitions().done(definitions=>{
            this.setState({
                restoringDefinitions:false,
                definitions : definitions,
            });
        });
    };

    updateTerms = () => {

        this.setState({updating:true });

        ContentArena.Api.updateTerms(this.state.terms, this.state.definitions).done(()=>{
            this.setState({
                updating:false
            });
        });
    };

    render () {

        const { history } = this.props;
        const { loading, terms,restoring, updating, definitions, restoringDefinitions } = this.state;

        document.title = "Content Arena - Terms";

        if (loading) return(<Spinner/>);

        return (
            <div className="settings-container terms-edit-container">

                <div className="terms-edit-header">
                    <button
                        onClick={this.restoreDefaultDefinitions}
                        disabled={restoringDefinitions}
                        className="standard-button license-agreement-button"
                    >
                        {this.context.t("TERMS_EDIT_BUTTON_RESTORE_DEFINITIONS")}{restoringDefinitions && <Spinner/>}
                    </button>
                    <button
                        onClick={this.restoreDefaultTerms}
                        disabled={restoring}
                        className="standard-button license-agreement-button"
                    >
                        {this.context.t("TERMS_EDIT_BUTTON_RESTORE")}{restoring && <Spinner/>}
                    </button>

                </div>
                <div className="terms-edit-title">
                    {this.context.t("TERMS_EDIT_TITLE_DEFINITIONS")}
                </div>
                <div className="terms-edit-box">
                    {
                        definitions.map((definition, i) => {
                            return (
                                <div>
                                    <DefinitionItem
                                        onUpdate={content => this.onUpdateDefinition(i, content)}
                                        {...definition}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="terms-edit-title" style={{borderTop: "none"}}>
                    {this.context.t("TERMS_EDIT_TITLE_TERMS")}
                </div>
                <div className="terms-edit-box">
                    {
                        terms.map((term, i) => {
                            return (
                                <div>
                                    { term.items.map((item,k) => {
                                        return <TermItem
                                            onUpdate={content => this.onUpdateTermItem(i,k,content)}
                                            {...item}
                                            termPosition={term.position}
                                        />
                                    }) }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="buttons">
                    <button
                        onClick={this.updateTerms}
                        disabled={updating}
                        className={"standard-button"}>
                        {this.context.t("TERMS_EDIT_BUTTON_UPDATE")}
                    </button>
                </div>
            </div>
        )
    }
}

Terms.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Terms)