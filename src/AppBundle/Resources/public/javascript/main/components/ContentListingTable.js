import React, { Component } from "react";
import ReactTable from "react-table";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";
import first from "lodash/first";
import maxBy from "lodash/maxBy";
import minBy from "lodash/minBy";
import { YEAR_FORMAT, REGIONS_ENUMS } from "@constants";
import Moment from "moment/moment";
import { blueCheckIcon, yellowCheckIcon } from "./Icons";

class ContentListingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    getSort = (a, b) => {
      const firstArg = first(a) ? first(a).name : "";
      const secondArg = first(b) ? first(b).name : "";
      return firstArg.length >= secondArg.length ? 1 : -1;
    };

    getHeader = (text, tooltip = "", iconClass = "", sortIcon = false) => (
      <span data-tip={tooltip && tooltip}>
        {text && text}
        {iconClass && <i className={`fa ${iconClass}`} />}
        {sortIcon && <i className="fa fa-sort" />}
      </span>
    );

    getRightCell = (prop, rightEnum) => {
      const right = prop.value.find(item => item.shortLabel === rightEnum);
      return (
        <div>
          {right && <img src={right.exclusive ? yellowCheckIcon : blueCheckIcon} />}
        </div>
      );
    };

    getYear = date => Moment(date).format(YEAR_FORMAT);

    getSeasonCell = (seasons) => {
      if (!seasons) return "-";

      let season = "-";

      if (seasons.length === 1) {
        season = `${this.getYear(first(seasons).startDate)}/${this.getYear(first(seasons).customEndDate)}`;
      } else if (seasons.length === 2) {
        const firstSeason = minBy(seasons, season => this.getYear(season.startDate));
        const secondSeason = first(seasons.filter(item => item.id !== firstSeason.id));
        season = `${this.getYear(firstSeason.startDate)}/${this.getYear(firstSeason.customEndDate)}-${this.getYear(secondSeason.startDate)}/${this.getYear(secondSeason.customEndDate)}`;
      } else if (seasons.length > 2) {
        const firstSeason = minBy(seasons, season => this.getYear(season.startDate));
        const secondSeason = maxBy(seasons, season => this.getYear(season.startDate));
        season = `${this.getYear(firstSeason.startDate)}/${this.getYear(firstSeason.customEndDate)}-${this.getYear(secondSeason.startDate)}/${this.getYear(secondSeason.customEndDate)}`;
      }

      return <span title={season}>{season}</span>;
    };

    getCell = (value, isCountry = false) => {
      const isValueArr = Array.isArray(value);

      if (isValueArr) {
        const cellValue = first(value) ? first(value).name : "-";
        const cellText = isCountry && REGIONS_ENUMS[cellValue] ? REGIONS_ENUMS[cellValue] : cellValue;
        return <span title={cellValue}>{cellText}</span>;
      }

      return <span title={value}>{value}</span>;
    };

    goToSelectedListing = (customId) => {
      const { history } = this.props;
      history.push(`/listing/${customId}`);
    };

    getColumns = () => [{
      Header: () => this.getHeader(this.context.t("MARKETPLACE_TABLE_LISTING_NAME"), "", "", true),
      headerClassName: "table-header-big",
      className: "table-header-big",
      id: "name",
      accessor: "name",
      width: 300,
      sortMethod: (a, b) => (a.length >= b.length ? 1 : -1),
      Cell: props => this.getCell(props.value),
    }, {
      Header: () => this.getHeader(this.context.t("MARKETPLACE_TABLE_SPORT"), "", "", true),
      headerClassName: "table-header-big",
      className: "table-header-big",
      id: "sport",
      accessor: "sports",
      width: 150,
      sortMethod: (a, b) => this.getSort(a, b),
      Cell: props => this.getCell(props.value),
    }, {
      Header: () => this.getHeader(this.context.t("MARKETPLACE_TABLE_COUNTRY"), "", "", true),
      headerClassName: "table-header-big",
      className: "table-header-big",
      id: "country",
      accessor: "sportCategory",
      width: 100,
      sortMethod: (a, b) => this.getSort(a, b),
      Cell: props => this.getCell(props.value, true),
    }, {
      Header: () => this.getHeader(this.context.t("MARKETPLACE_TABLE_COMPETITION"), "", "", true),
      headerClassName: "table-header-big",
      className: "table-header-big",
      id: "competition",
      accessor: "tournament",
      sortMethod: (a, b) => this.getSort(a, b),
      Cell: props => this.getCell(props.value),
    }, {
      Header: () => this.getHeader(this.context.t("MARKETPLACE_TABLE_SEASON_RELEASE"), "", "", true),
      headerClassName: "table-header-big",
      className: "table-header-big",
      id: "seasons",
      accessor: "seasons",
      sortMethod: (a, b) => this.getSort(a, b),
      Cell: props => this.getSeasonCell(props.value),
    }, {
      Header: () => this.getHeader("LT", "Live transmission"),
      id: "LT",
      headerClassName: "table-header-small",
      className: "table-header-small",
      accessor: "rightsPackage",
      Cell: props => this.getRightCell(props, "LT"),
    }, {
      Header: () => this.getHeader("LB", "Live betting"),
      id: "LB",
      headerClassName: "table-header-small",
      className: "table-header-small",
      accessor: "rightsPackage",
      Cell: props => this.getRightCell(props, "LB"),
    }, {
      Header: () => this.getHeader("DT", "Delayed & Archive"),
      id: "DT",
      headerClassName: "table-header-small",
      className: "table-header-small",
      accessor: "rightsPackage",
      Cell: props => this.getRightCell(props, "DT"),
    }, {
      Header: () => this.getHeader("HL", "Highlights"),
      id: "HL",
      headerClassName: "table-header-small",
      className: "table-header-small",
      accessor: "rightsPackage",
      Cell: props => this.getRightCell(props, "HL"),
    }, {
      Header: () => this.getHeader("NA", "News access"),
      id: "NA",
      headerClassName: "table-header-small",
      className: "table-header-small",
      accessor: "rightsPackage",
      Cell: props => this.getRightCell(props, "NA"),
    }, {
      Header: () => this.getHeader("PR", "Program"),
      id: "PR",
      headerClassName: "table-header-small",
      className: "table-header-small",
      accessor: "rightsPackage",
      Cell: props => this.getRightCell(props, "PR"),
    }, {
      Header: () => this.getHeader("", "", "fa-globe", true),
      headerClassName: "table-header-big",
      className: "table-header-big",
      id: "globe",
      accessor: "salesPackages",
      width: 55,
      sortMethod: (a, b) => (a.length >= b.length ? 1 : -1),
      Cell: props => this.getCell(props.value.length),
    }];

    getTrClick = (state, row) => {
      const { customId } = row.original;
      return {
        onClick: e => this.goToSelectedListing(customId),
      };
    };

    render() {
      const { listings } = this.props;
      return (
        <section className="content-listing-table-wrapper">
          <ReactTable
            className="ca-table content-listing-table"
            defaultPageSize={30}
            showPageSizeOptions={false}
            showPagination={false}
            onPageChange={this.onPageChange}
            minRows={0}
            multiSort={false}
            resizable={false}
            data={listings}
            columns={this.getColumns()}
            getTrProps={(state, rowInfo) => this.getTrClick(state, rowInfo)}
          />
          <ReactTooltip place="top" type="dark" effect="solid" />
        </section>
      );
    }
}

ContentListingTable.contextTypes = {
  t: PropTypes.func.isRequired,
};

ContentListingTable.propTypes = {
  listings: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default ContentListingTable;
