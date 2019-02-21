import React from "react";
import { connect } from "react-redux";
import Moment from "moment/moment";
import { test } from "../actions";
import { StaticSchedules } from "../../sell/components/SellFormItems";
import { PropTypes } from "prop-types";
import { DATE_FORMAT, TIME_FORMAT } from "@constants";

class ContentInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: props.seasons,
    };
    this.baseDir = `${assetsBaseDir}../`;
    this.pdfIcon = `${assetsBaseDir}app/images/pdf.png`;
  }

  componentDidMount() {
    this.loadSchedule();
  }

  componentWillReceiveProps(nextProps) {}

  loadSchedule() {
    const _this = this;
    const { seasons, schedulesBySeason } = this.props;

    seasons.forEach((season, index) => {
      if (!season.schedules && !season.custom) {
        _this.setState({ loadingSchedule: true });
        ContentArena.Api.getSchedule(season.externalId).done((schedules) => {
          _this.setState({ loadingSchedule: false });
          let keys = [];
          if (schedulesBySeason && schedulesBySeason[index]) {
            keys = Object.keys(schedulesBySeason[index]);
            keys.forEach((k) => {
              schedulesBySeason[index][k].matches.forEach((m) => {
                if (m.selected) {
                  schedules[k].matches.get(m.externalId).selected = true;
                }
              });
              schedules[k].selected = true;
            });
          }

          const tempSeasons = _this.state.seasons;
          tempSeasons[index].schedules = schedules;
          if (keys.length > 0) tempSeasons[index].showchedules = true;

          _this.setState({
            seasons: tempSeasons,
          });
        });
      }
    });
  }

  render() {
    const { description, website, attachments } = this.props;
    const { seasons } = this.state;
    return (
      <div style={{ marginTop: 20 }}>

        {/* SEASON/FIXTURES */}
        {
                    seasons && seasons.length > 0 && seasons.map((season, key) => (
                      <div key={`season-${key}`} className="season-details">
                        <div className="season-name">
                          {this.context.t("LISTING_DETAILS_EVENT_TITLE_SEASON")}
                          {" "}
                          {season.name}
                        </div>
                        {(!season.fixtures || season.fixtures.length === 0) && <StaticSchedules season={key} seasons={seasons} />}
                        { season.fixtures && season.fixtures.length > 0
                            && (
                            <div className="schedule">
                              {season.fixtures.map(fixture => (
                                <div className="matchday">
                                  {fixture.name}
                                  {" "}
                                  {Moment(fixture.date).format(`${DATE_FORMAT} ${TIME_FORMAT} [UTC]`)}
                                </div>
                              ))}
                            </div>
                            )}
                      </div>
                    ))
                }

        {/* DESCRIPTIONS */}
        {description && (
        <div className="full-item-box">
          <label>
            {this.context.t("LISTING_DETAILS_EVENT_TITLE_DESCRIPTION")}
          </label>
          <div className="full-item-content">
            {description}
          </div>
        </div>
        )}
      </div>
    );
  }
}

ContentInformation.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onClick: id => dispatch(test(id)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentInformation);
