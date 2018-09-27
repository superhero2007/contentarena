import React from 'react';
import {connect} from "react-redux";
import {test} from "../actions";
import SalesPackages from "./SalesPackages";
import {PropTypes} from "prop-types";
import {StaticSchedules} from "../../sell/components/SellFormItems";
import Moment from "moment/moment";

class CommercialTerms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seasons: props.seasons
        };
        this.baseDir = assetsBaseDir + "../";
        this.pdfIcon = assetsBaseDir + "app/images/pdf.png";
        this.noInfoText = "No information available";
    }

    componentDidMount() {
        this.loadSchedule();
    }

    loadSchedule() {

        let _this = this;
        const {seasons, schedulesBySeason} = this.props;

        seasons.forEach((season, index) => {
            if (!season.schedules && !season.custom) {
                _this.setState({loadingSchedule: true});
                ContentArena.Api.getSchedule(season.externalId).done((schedules) => {
                    _this.setState({loadingSchedule: false});
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

                    let tempSeasons = _this.state.seasons;
                    tempSeasons[index].schedules = schedules;
                    if (keys.length > 0) tempSeasons[index].showchedules = true;

                    _this.setState({
                        seasons: tempSeasons
                    });

                });
            }
        });
    }

    render() {
        const {
            salesPackages,
            onSelectPackage,
            programDescription,
            profile,
            customId,
            userCanNotBuy,
            bundlesWithActivity,
            bundlesSold,
            website,
            attachments,
            description,
            programDetails
        } = this.props;
        const {seasons} = this.state;
        return (
            <div>

                {description && !programDetails && (
                    <div className="txt">
                        {description}
                    </div>
                )}

                {programDetails && programDetails}

                {(website || (attachments && attachments.length > 0)) && (
                    <div className="additional-items">
                        {website && (
                            <div className="item">
                                <i className="fa fa-link icon"/>
                                <div className="cap">
                                    {this.context.t("LISTING_DETAILS_EVENT_TITLE_WEBSITE")}
                                </div>
                                <div className="d-flex">
                                    <b>
                                        {website && website.map(website => {
                                            return <a href={ContentArena.Utils.getWebsiteURl(website)}>{website}</a>
                                        })}
                                    </b>
                                </div>
                            </div>
                        )}

                        {attachments && attachments.length > 0 && (
                            <div className="item">
                                <i className="fa fa-folder-open-o icon"/>
                                <div className="cap">
                                    {this.context.t("LISTING_DETAILS_EVENT_TITLE_ATTACHMENTS")}
                                </div>
                                <div className="d-flex">
                                    <b>
                                        {attachments.map(a => (
                                            <div>
                                                <a download={a.name} target="_blank" href={this.baseDir + a.file}>
                                                    <img style={{margin: '-2px 5px 0 0'}} src={this.pdfIcon}/>
                                                    {a.name}
                                                </a>
                                            </div>
                                        ))}
                                    </b>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/*SEASON/FIXTURES*/}
                {seasons && seasons.length > 0 && (
                    <div>
                        {seasons.map((season, key) => (
                            season.fixtures && season.fixtures.length > 0 && (
                                <div key={"season-" + key} className="season-details">
                                    <div className="title">
                                        {this.context.t("LISTING_DETAILS_EVENT_TITLE_SEASON")} {season.name}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                        {season.fixtures.map(fixture => (
                                            <div className="row-container" style={{width: '45%'}}>
                                                <div className="name">
                                                    {fixture.name}
                                                </div>
                                                <div className="actions">
                                                    <div className="item">
                                                        <i className="fa fa-calendar icon" /> {Moment(fixture.date).format('DD/MM/YYYY')}
                                                    </div>
                                                    <div className="item">
                                                        <i className="fa fa-clock-o icon" /> {Moment(fixture.date).format('HH:mm')}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}


                <div className="title">
                    Territories
                </div>

                <SalesPackages
                    listingId={customId}
                    userCanNotBuy={userCanNotBuy}
                    profile={profile}
                    onSelectPackage={onSelectPackage}
                    bundlesWithActivity={bundlesWithActivity}
                    bundlesSold={bundlesSold}
                    salesPackages={salesPackages}
                />
            </div>
        );
    }
}

CommercialTerms.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommercialTerms)