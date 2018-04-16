import React from 'react';

class SearchCompetition extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            input: "",
            valid : false,
            searching : false,
            searchDone : false,
            results: []
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
                searchDone : true
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

                {this.state.results.length > 0 && <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Competition</th>
                                <th>Country/Category</th>
                                <th>Sport</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.results.map( ( result, index ) => {
                                return <tr key={index}>
                                        <td>{result.name}</td>
                                        <td>{result.sportCategory.name}</td>
                                        <td>{result.sport.name}</td>
                                        <td><button onClick={ () => { this.props.select(result) } }>Select</button></td>
                                    </tr>
                            })}
                        </tbody>
                    </table>
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
