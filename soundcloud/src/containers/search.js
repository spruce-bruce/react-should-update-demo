import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.performSearch = this.performSearch.bind(this);
        this.setSearchTerm = this.setSearchTerm.bind(this);
        this.state = {searchTerm : ''};
    }

    performSearch(e) {
        e.preventDefault();
        console.log('do search');
    }

    setSearchTerm(e) {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.performSearch}>
                    <label htmlFor="search">Search</label>
                    <input onChange={this.setSearchTerm} id="search" type="text" value={this.state.searchTerm} />
                </form>
            </div>
        );
    }
}
