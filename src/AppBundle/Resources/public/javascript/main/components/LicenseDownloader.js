import React from 'react';
import {pdfIcon} from "./Icons";
import {viewLicense, viewLicenseBid, viewLicenseBundle} from "../actions/utils";

class LicenseDownloader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLicense = () => {
        const {type , id, listingId } = this.props;
        switch (type){
            case "BID":
                viewLicenseBid(id);
                break;
            case "BUNDLE":
                viewLicenseBundle(id, listingId);
                break;
            default:
                viewLicense(id);
        }
    };

    render(){
        const {style={}, iconStyle={height: 23}} = this.props;
        return (
            <div style={{...style,cursor: 'pointer'}}
                 onClick={this.getLicense}>
                <img style={iconStyle} src={pdfIcon}/>
            </div>
        )
    }
}

export default LicenseDownloader;