## Introducing a loading State

A common task in applications is to show a loading indicator. We can use use a boolean stored on the state of `<Main/>`. 

```diff
getInitialState() {
  return {
    numBeers : 10,
    beers: [],
+    loading: true
  }
},
```

Then update our state inside the `loadBeers` method:

```diff
loadBeers (searchTerm = 'hops') {
+  this.setState({ loading: true });

  // Check for beers in local storage
  const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);
  if (localStorageBeers) {
    const localBeers = JSON.parse(localStorageBeers);
    this.setState({ beers: localBeers, loading: false });
    return; // stop before fetch happens!
  }

  fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`).then(data => data.json())
  .then((beers) => {
    console.log(beers);
    // filter for beers with images
    const filteredBeers = beers.data.filter(beer => !!beer.labels);
+    this.setState({ beers: filteredBeers, loading: false });
    // save to local storage in case we search for this again
    localStorage.setItem(`search-${searchTerm}`, JSON.stringify(this.state.beers));
  })
  .catch(err => console.error(err));
},

```

Now in `Results.js` we can first check if the results are loading and display the `<Loader/>` accordingly:

Require it:

```js
import Loader from './Loader';
```

and amend your render:

```diff
render() {
+  if(this.props.loading) {
+    return <Loader message="🍻 Beer run!"/>
+  }

  return (
    <div className="results">
      <div className="beers">
        {this.props.beers.map((details, i) => <Beer details={details} key={i}/>)}
      </div>
    </div>
  )
}
```

Finally, you can update your Loader.js to take the message prop:

```diff
-<h2>Your Message from props goes here</h2>
+<h2>{this.props.message}</h2>
```
