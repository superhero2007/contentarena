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
            <div>
                <div className="step-item-description">
                    Do you want to list competition-based content?
                </div>
                <div>
                    <input type="text"
                           onChange={this.handleInput}
                           placeholder="Enter competition name (e.g. Bundesliga)" />
                    <button disabled={!this.state.valid || this.state.searching} onClick={this.search}>Search</button>
                </div>

                {this.state.searching && <i className="fa fa-cog fa-spin"></i>}

                {this.state.searchDone && this.state.results.length > 0 && <div>
                    {this.state.resultMessage}
                </div>}

                {this.state.results.length > 0 && <div>
                    <ReactTable
                        defaultPageSize={this.state.pageSize}
                        showPageSizeOptions={false}
                        onPageChange={this.onPageChange}
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
                            Cell: props => <button onClick={() =>{ this.props.select(props.original) }}>Select</button>
                        }]}
                    />
                </div>}

                {this.state.searchDone && this.state.results.length === 0 && <div>
                    Your search "{this.state.input}" did not match any products.
                </div>}

                <div>
                    {!this.state.searchDone && <span>Do you want to list content, which is not related to a specific competition?</span>}
                    {this.state.searchDone && this.state.results.length > 0 && <span>Can't find your competition in our list? </span>}
                    {this.state.searchDone && this.state.results.length === 0 && <span>Try another search or create content manually</span>}
                    <button onClick={this.props.close}>Create content manually</button>
                </div>
            </div>
        )
    }
}

export default SearchCompetition;

