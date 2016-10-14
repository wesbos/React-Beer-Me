## Caching Beers in LocalStorage

You may notice that everytime we go back to the main page we need to re-load all the beers with our Ajax endpoint - and this is pretty slow. 

We can store the beer data in localStorage and when someone searches for "hops" or "ale", we will first check to see if we have the results in localStorage.

In `Main.js`, above let's update our `loadBeers()` method

```diff
loadBeers(searchTerm = 'hops') {
  this.<mark>setState({loading: true});</mark>

+  // Check for beers in local storage
+  const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);
+  if (localStorageBeers) {
+    const localBeers = JSON.parse(localStorageBeers);
+    this.setState({ beers: localBeers, loading: false });
+    return; // stop before fetch happens!
+  }

  fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`).then(data => data.json())
  .then((beers) => {
    console.log(beers);
    // filter for beers with images
    this.state.beers = beers.data.filter(beer => !!beer.labels);
    this.setState({beers : this.state.beers, loading:false });
+    // save to local storage in case we search for this again
+    localStorage.setItem(`search-${searchTerm}`, JSON.stringify(this.state.beers));
  })
  .catch(err => console.log(err))
```
