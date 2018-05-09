import React from 'react';

class Search extends React.Component {

  handleSubmit (e) {
    e.preventDefault();
    const url = this.refs.search.value.trim();
    this.props.onSearch(url);
  }

  render(){

    return(
      <div className="search">
      <input ref="search" type="search" placeholder="Podcast RSS URL" />
      <button onClick={this.handleSubmit.bind(this)}>Go</button>
      </div>
    )
  }

}

export default Search
