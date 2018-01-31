import React from "react";
import Results from "./Results";
import Search from "./Search";
import Header from "./Header";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log(`mounting`);
    console.log(this);
    const params = this.props.match.params || {};
    const searchTerm = params.searchTerm || undefined;
    this.loadBeers(searchTerm);
  }

  componentWillReceiveProps(nextProps) {
    console.log("Will receive props!");
    console.log(nextProps);
    this.loadBeers(nextProps.match.params.searchTerm);
  }

  loadBeers = (searchTerm = "hops") => {
    this.setState({ loading: true });

    // Check for beers in local storage
    const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);

    if (localStorageBeers) {
      const localBeers = JSON.parse(localStorageBeers);
      this.setState({ beers: localBeers, loading: false });
      return; // stop before fetch happens!
    }

    fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
      .then(data => data.json())
      .then(data => {
        // filter for beers with images
        const beers = data.data || [];
        const filteredBeers = beers.filter(beer => !!beer.labels);
        this.setState({ beers: filteredBeers, loading: false });
        // save to local storage in case we search for this again
        localStorage.setItem(
          `search-${searchTerm}`,
          JSON.stringify(this.state.beers)
        );
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="wrapper">
        <Header siteName="Beer me!" />
        <Search />
        <Results beers={this.state.beers} loading={this.state.loading} />
      </div>
    );
  }
}

export default Main;
