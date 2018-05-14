import React from 'react';

class Search extends React.Component {

  handleSubmit (e) {
    e.preventDefault();
    const url = this.refs.search.value.trim();
    this.props.onSearch(url);
  }

  render(){

    return(
      <div className="input-group mb-3">
        <input ref="search" type="search" className="form-control" placeholder="Podcast RSS URL" aria-label="Podcast RSS URL" aria-describedby="basic-addon2" />
        <div className="input-group-append">
          <button onClick={this.handleSubmit.bind(this)} className="btn btn-outline-secondary" type="button">Load Feed</button>
        </div>
      </div>
    )
  }

}

export default Search
