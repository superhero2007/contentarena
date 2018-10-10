import React from 'react';
import {pdfIcon} from "./Icons";
import {viewLicense, viewLicenseBid, viewLicenseBundle, viewLicenseCustom} from "../actions/utils";

class LicenseDownloader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLicense = () => {
        const {type , id, listingId , bundle} = this.props;
        switch (type){
            case "BID":
                viewLicenseBid(id);
                break;
            case "BUNDLE":
                viewLicenseBundle(id, listingId);
                break;
            case "CUSTOM":
                viewLicenseCustom(listingId, bundle);
                break;
            default:
                viewLicense(id);
        }
    };

    render(){
        const {style={}, iconStyle={height: 23}} = this.props;
        return (
            <div style={{...style}}
                 onClick={this.getLicense}>
                <img style={iconStyle} src={pdfIcon}/>
            </div>
        )
    }
}

export default LicenseDownloader;