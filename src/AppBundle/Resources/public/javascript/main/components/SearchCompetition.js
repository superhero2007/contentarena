import React from 'react';
import ReactTable from 'react-table';

class SearchCompetition extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            pageSize :20,
            input: "",
            valid : false,
            searching : false,
            searchDone : false,
            results: [],
            resultMessage : ""
        }
    }

    search = () =>{
        let _this = this;

        this.setState({
            searching : true
        });

        ContentArena.Api.searchCompetition(this.state.input).done((results)=>{
            _this.setState({
                results : results,
                searching : false,
                searchDone : true,
            });
            _this.setState({
                resultMessage : _this.getResultMessage(0)
            });
        });

    };

    handleInput = (e) =>{

        let input = e.target.value;

        this.setState((prevState) =>({
            valid : input.length > 2,
            input : input,
            searchDone : ( input.length > 0 ) ? prevState.searchDone : false
        }));
    };

    getResultMessage = (page) => {
        page++;
        let total = this.state.results.length;
        let pageTotal = this.state.pageSize * page;
        let pageQuantity = (page === 1) ? 1 : (this.state.pageSize * (page  - 1)) + 1;

        if ( pageTotal > total ) pageTotal = total;

        return pageQuantity + "-"+pageTotal+" of "+ total +" results for '"+this.state.input+"'";
    };

    onPageChange = (page) => {
        let resultMessage = this.getResultMessage(page);
        this.setState(() =>({
            resultMessage : resultMessage
        }));
    };

    render(){
        return(
            <div className="step-content-container">
                <div className="step-item-description">
                    Do you want to list competition-based content?
                </div>
                <div className={"base-input"}>
                    <label>Competition</label>
                    <input type="text"
                           onChange={this.handleInput}
                           placeholder="Enter competition name (e.g. Bundesliga)" />
                    <button className="standard-button" disabled={!this.state.valid || this.state.searching} onClick={this.search}>Search</button>
                </div>

                {this.state.searching && <div><i className="fa fa-cog fa-spin"/></div>}

                {this.state.searchDone && this.state.results.length > 0 && <div>
                    {this.state.resultMessage}
                </div>}

                {this.state.results.length > 0 && <div>
                    <ReactTable
                        defaultPageSize={this.state.pageSize}
                        showPageSizeOptions={false}
                        onPageChange={this.onPageChange}
                        minRows={0}
                        data={this.state.results}
                        select={this.props.select}
                        columns={[{
                            Header: 'Competition',
                            accessor: 'name' // String-based value accessors!
                        }, {
                            Header: 'Country/Category',
                            accessor: 'sportCategory.name',
                        }, {
                            accessor: 'sport.name', // Required because our accessor is not a string
                            Header: 'Sport',
                        }, {
                            Header: '', // Custom header components!
                            Cell: props => <button className={"blue-button"} onClick={() =>{ this.props.select(props.original) }}>Select</button>
                        }]}
                    />
                </div>}

                <div style={{ display: "inline-flex" }} >
                    {this.state.searchDone && this.state.results.length === 0 && <div>
                        Your search "{this.state.input}" did not match any products.
                    </div>}

                    {!this.state.searchDone &&<div className="step-item-description">
                        Did you not find your competition in the database or not selling a competition?
                    </div>}

                    {this.state.searchDone && this.state.results.length > 0 && <div className="step-item-description">
                        Can't find your competition in our list?
                    </div>}

                    {this.state.searchDone && this.state.results.length === 0 && <div className="step-item-description">
                        Try another search or enter content manually
                    </div>}

                    <button className={"standard-button standard-button-big"} onClick={this.props.close}>Enter content manually</button>
                </div>
            </div>
        )
    }
}

export default SearchCompetition;

