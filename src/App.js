import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.itunesSearch = this.itunesSearch.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
        this.state = {
            value: '',
            searchResults:null
        };
    }
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    itunesSearch(e){
        e.preventDefault();
        fetch(`https://itunes.apple.com/search?term=${this.state.value}&media=music&entity=album`).then((result) => {
            return result.json()
        }).then((jsonResult) => {
            console.log(jsonResult);
            let searchResults = [];
            jsonResult.results.forEach((item)=>{
                let temp = {artistName: item.artistName, artworkUrl: item.artworkUrl100, collectionName: item.collectionName, primaryGenreName:item.primaryGenreName };
                searchResults.push(temp);
            })
            this.setState({ searchResults: searchResults });
        })
    }
    getSearchResults(){
        return (<table>
            <thead>
            <tr>
                <th>Cover</th>
                <th>Album</th>
                <th>Artist</th>
                <th>Genre</th>
            </tr>
            </thead>
            <tbody>
            {this.state.searchResults.map((item)=>{
                return (<tr>
                    <td>
                        <img src = {item.artworkUrl} />
                    </td>
                    <td>{item.collectionName}</td>
                    <td>{item.artistName}</td>
                    <td>{item.primaryGenreName}</td>
                </tr>)
            })}
            </tbody>
        </table>)
    }
    render() {
        return (
            <div className="container">
                <div className="searchDiv">
                    <form>
                        <div className="header">Album Search</div><br/>
                        <input placeholder="Enter Artist Name ..." className="searchInput" type="text" name="search" value={this.state.value}
                               onChange = {this.handleChange} /><br/>
                        <button disabled = {this.state.value.length == 0} className="searchButton" type="submit" onClick={this.itunesSearch}>Search</button>
                    </form>
                </div>
                <div style = {this.state.searchResults? {display: 'block'}:{display: 'none'}} className='searchTableDiv'>
                    {this.state.searchResults && this.state.searchResults.length > 0 ?this.getSearchResults():<div className="noSearchResults">No search results found</div>}
                </div>
            </div>
        );
    }
}

export default App;
