import React from 'react';
import { connect } from "react-redux";
import { Spinner} from "../../main/components/Icons";
import {PropTypes} from "prop-types";
import cn from "classnames";

const TermItem = ({position, content, termPosition, editable}) => (
    <div className="terms-edit-item">
        <div className={cn("terms-edit-item-content", {"terms-edit-item-disabled" : !editable })}>
            <strong>{termPosition}.{position}</strong> {content}
        </div>
        <div className="terms-edit-item-actions" >

        </div>

    </div>
);

class Terms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            terms : [],
        };

    }

    componentDidMount () {
        this.setState({loading:true });

        ContentArena.Api.getCompanyTerms().done(terms=>{
            this.setState({
                loading:false,
                terms : terms,
            });
        });

    }


    render () {

        const { history } = this.props;
        const { loading, terms } = this.state;

        document.title = "Content Arena - Terms";

        if (loading) return(<Spinner/>);

        return (
            <div className="settings-container terms-edit-container">
                <div className={"setting"}>

                    {
                        terms.map(term => {
                            return (
                                <div>
                                    { term.items.map(item => <TermItem {...item} termPosition={term.position}/>) }
                                </div>
                            )
                        })
                    }


                    <div className={"buttons"}>
                        <div>
                            <button
                                onClick={this.saveUser}
                                className={"standard-button"}>
                                Save
                            </button>
                        </div>
                    </div>
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