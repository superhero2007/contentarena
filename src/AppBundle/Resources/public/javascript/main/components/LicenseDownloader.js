import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  viewLicense, viewLicenseBid, viewLicenseBundle, viewLicenseCustom,
} from "../actions/utils";

class LicenseDownloader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    getLicense = () => {
      const {
        type, id, listingId, bundle,
      } = this.props;
      switch (type) {
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

    render() {
      return (
        <div onClick={this.getLicense} title={this.context.t("CL5_LICENSE_AGREEMENT")} className="license-agreement-button">
          <i className="fa fa-file-pdf-o" />
          {this.context.t("License agreement")}
        </div>
      );
    }
}

LicenseDownloader.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default LicenseDownloader;
