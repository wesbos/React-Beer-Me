import React from 'react';

class Search extends React.Component{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = this.refs.q.value;
    this.context.router.push(`/search/${searchTerm}`);
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="q" placeholder="Hoppy, Malt, Angry, New..." />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
};


export default Search;
