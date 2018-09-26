import React from 'react';

import SellButtons from "../containers/SellButtons";
import SellFormSteps from "../containers/SellFormSteps";
import SellFormStep1 from "../containers/SellFormStep1";
import SellFormStep2 from "../containers/SellFormStep2";
import SellFormStep3 from "../containers/SellFormStep3";
import SellFormStep4 from "../containers/SellFormStep4";
import ReviewAndSign from "../containers/ReviewAndSign";
import Selector from "../../main/components/Selector";
import { connect } from "react-redux";
import store from '../../main/store';
import ReactTooltip from 'react-tooltip';
import {updateProfile} from "../../main/actions/userActions";

class SellForm extends React.Component {
    constructor(props) {
        super(props);

        let content = (props.content.initialized) ? props.content : JSON.parse(props.newListing);


        if ( content === null ) props.history.push("/managelistings");
        content.jurisdiction = {
            label: content.company.country.name,
            value: content.company.country.name
        };

        if (content.userCanNotView) props.history.push("/managelistings");

        content = ContentArena.Utils.contentParserFromServer(content);

        if (props.match && props.match.params.step ) {

            content.step = (props.match.params.step === "sign") ? 5 : Number(props.match.params.step);
        }

        this.state = {
            content : content,
            showSearch : props.match.params.customId === "new"
        };

        store.subscribe((a) => {
            //console.log(store.getState());
        });
    }

    componentDidMount = () =>{
        this.props.contentListingInit( this.state.content );
    } ;

    render() {
        const {history} = this.props;

        document.title = "Content Arena - Create Listing";

        return (
            <div className="manager-content">
                <Selector style={{zIndex: 100}}/>
                <SellFormSteps history={history} />
                <SellFormStep1 history={history} showSearch={this.state.showSearch} />
                <SellFormStep2 packages={this.props.packages} />
                <SellFormStep3 packages={this.props.packages} />
                <SellFormStep4 packages={this.props.packages} />
                <ReviewAndSign history={history} />
                <SellButtons history={history}/>
                <ReactTooltip html={true} />
            </div>
        );
    }
}

const mapStateToProps = ( state, ownProps) => {
    return ownProps;
};

const mapDispatchToProps = dispatch => {
    return {
        contentListingInit : (content) => dispatch({
            type : 'CONTENT_INIT',
            content: content
        }),
        updateProfile : profile =>dispatch(updateProfile(profile)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SellForm)





