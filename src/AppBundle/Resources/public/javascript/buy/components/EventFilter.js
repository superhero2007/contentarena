import React from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import {updateEvent, updateSport} from "../actions/filterActions";

class EventFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sports:[]
        };

        this.searchIcon = assetsBaseDir + "app/images/search.png";
    }

    componentDidMount () {
        if ( ContentArena.Data.Countries.length === 0) {
            ContentArena.Api.getActiveSports().done( (sports ) => {
                ContentArena.Data.ActiveSports = sports;
                this.setState({sports});
            });
        } else {
            this.setState({sports: ContentArena.Data.ActiveSports});
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    getOptions = () => {
        const {filter = [], available} = this.props;
        const {sports} = this.state;

        let countries = sports.filter(s=>s.name).map((i,k)=>({value : i.name , label : i.name }));

        return [...[{value: null, label: 'All sports'}], ...countries];
    };

    showTab = (tab) => {
        this.setState({tab});
    };

    selectSport = (e) => {

        this.props.selectSport(e);
    };

    handleFilter = () => {
        this.updateEvent();
        const {onFilter} = this.props;
        onFilter();
    }

    updateEvent = (e) => {
        this.props.updateEvent(this.refs.search_field.value);
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleFilter()
        }
    }

    render() {
        const {sport, event} = this.props;
        return (
            <div className="box">
                <div className="title">Event</div>
                <div className="content">

                    <div style={{
                        position: 'relative',
                        display: 'flex'
                    }}>
                        <img style={{
                            position: 'absolute',
                            width: 20,
                            height: 20,
                            cursor: 'pointer',
                            margin: '15px 15px'
                        }}
                         src={this.searchIcon}
                         onClick={this.handleFilter}
                        />
                        <input
                            style={{
                                padding: '15px 15px 15px 40px',
                                flex: 1
                            }}
                            defaultValue={event}
                            onKeyPress={this.handleKeyPress}
                            ref="search_field"
                            type="text" id="inputSearch" name="event" placeholder="Search"/>
                    </div>

                    <Select
                        name="form-field-name"
                        multi={false}
                        className="sport-input-filter"
                        onChange={this.selectSport}
                        value={sport}
                        options={this.getOptions()} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.filter
};

const mapDispatchToProps = dispatch => {
    return {
        onClick: id => dispatch(test(id)),
        selectSport : sport =>dispatch(updateSport(sport)),
        updateEvent : event => dispatch(updateEvent(event))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilter)