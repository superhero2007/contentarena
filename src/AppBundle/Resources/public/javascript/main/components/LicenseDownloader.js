import React from 'react';
import {PropTypes} from "prop-types";
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
        const {style = {}, iconStyle = {height: 23}, buttonType = false} = this.props;
        return (
            <div style={{...style}}
                 onClick={this.getLicense}
                 title={this.context.t("CL5_LICENSE_AGREEMENT")}>

                {buttonType ? (
                    <div className="ca-btn primary">
                        {this.context.t("License agreement")}
                    </div>
                ) : (
                    <img style={iconStyle} src={pdfIcon}/>
                )}
            </div>
        )
    }
}

LicenseDownloader.contextTypes = {
    t: PropTypes.func.isRequired
};

export default LicenseDownloader;