## Say Hello To State

Up until this point, React may just seem like a glorified templating engine. This is the section where you may have an "Ah-Ha!" moment and understand why React shines. 

React components have a concept called **state** where we hold data related to our application. State is the the _source of truth_ for our components and whenever _anything_ in state changes, the application's DOM will update itself. 

If you are coming from a jQuery background, this is the real power of React. Rather than manually update the DOM ourselves when something happens, we simply just update this big object called **state** and react will figure out which parts of the DOM need to be updated! 

We will use state to hold a list of beers, but before we even do that, let's do a simple example together.

We're going to make a simple beer counter - a button, that when clicked, will increment the number of beers you need to buy for a party. Essentially just a button that will increment every time you click it. Very simple, but will illustrate a few core concepts that we will use for this application.

### Step 1: Set Initial State
When a component mounts, we need what is called the initial state — what the data will start with. We can update this state or load in external data in just a second, but for now we need to declare the very first state. 

This is done in the `getInitialState` lifecycle method which can be added to any component. Since our example will have state attached to the `<Main/>` component, we will add it there right above our render method.

Let's start with 10 beer:

```js
getInitialState() {
  return {
    numBeers : 10
  }
},
```

### Step 2: Display The State in JSX
Right below the `<Header...` component, create a button:

```html
<button>{this.state.numBeers} 🍺</button>
```

See how we used `{this.state.numBeers}`? Refresh your page and you should see 

![](http://wes.io/fdFt/content)

### Step 3: Create a method to update that number

Along with the built in methods like `render` and `getInitialState`, we can create our own methods that will handle the updating of state. We will create a method on Main called `incrementBeers`: 


```js
  incrementBeers() {
    // create a new upated state variable
    const beerAmount = this.state.numBeers + 1;
    // set state to that amount
    this.setState({numBeers : beerAmount });
  },
```

Now whenever that method is run, state will be incremented by one. Notice how we are explicitly setting state here and not just `this.state.numBeers++`. 

### Step 4: Hook up that method to the button

Finally, the way we handle clicks and other events in React is through the `onClick` event handler. React has re-implemented all of JavaScripts inline events so they may seem familiar. 

```html
<button onClick={this.incrementBeers}>{this.state.numBeers} 🍺</button>
```

### Step 5: Click away

Go ahead and click that button a few times. When you click it, it triggers `incrementBeers`, which will update state. When state is updated, React knows we are referencing `{this.state.numBeers}` and will update our button for us. 

That there is the key to understanding how react works. You update your data, not your DOM/HTML. 

<!-- New Doc -->

## Updating State with Ajax

Now it's time to pull in a list of beers from our Beer API. 

### Step 1: Initial State
We start by applying an empty array of beers to the initial state. Our `getInitialSate` should now look like this:

```js
getInitialState() {
  return {
    numBeers : 10,
    beers: []
  }
},
```

### Step 2: Fetch JSON
The endpoint we are going to hit is <http://api.react.beer/v2/search?q=hops&type=beer>

Where the `q` param will either be `hops` by default, or something inputted by the user. Since the listing of beers will be attached to the Main component, we can create a new method called `loadBeers()` on that component. 

We will be using the new browser api `fetch()` to go and grab this data. It works very similar to jquery's `$.getJSON()`. 

Again, try not to copy/paste but rather let's work through the following code ourselves:

```js
loadBeers(searchTerm = 'hops') {
  fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
  .then(data => data.json())
  .then((beers) => {
    console.log(beers);
    // filter for beers with images
    const filteredBeers = beers.data.filter(beer => !!beer.labels);
    this.setState({ beers: filteredBeers });
  })
  .catch(err => console.error(err));
},
```

### Step 3: Trigger on load

We need to trigger this `fetchBeers()` method on load. For this, we will use another one of React's lifecycle methods called `componentWillMount()` :

```js
componentWillMount() {
  this.loadBeers();
},
```

Refresh the page and the Ajax request should trigger. If all went well you should see a list of beers in your component's state:

![](http://wes.io/fdR6/content)


## Displaying State with JSX

Now we have data in our state how do we display it? 

We would like to display the results in `Results.js`, but we fetched the beer in `Main.js`. 

**How do we get data from one component to another?** 

We pass it via props.

First, we need to display the `<Results/>` component. We don't always want to show the results component, just on the home page and the search page. 

Now, normally we would just render the component like this:

```html
<Results {...this.state} />
```

**A few things to note here: **

1. `<Results />` is our results component that we make
2. `{...this.state}` take our entire state from `<Main />` and passes it down to `<Results/>`. This is called an Object Spread and is used quite a bit in React.  It's important to note that it's not ideal to pass everything down to children _unless you need it_. If you would like to cherry pick peices of state, we could pass them down like so:
	
	```
	<Results beers={this.state.beers} />
	```

Now that the Results tag makes sense, we have another question to ask ourselves: **how do we get it to only show up on certain pages?**

Well, we can use the `<Match />` component from React Router!

First import it at the top of your `Results.js` file:

```js
import { Match } from 'react-router';
```

Then, we use the `<Match />` tag with a render function. The reason we need a render function here is because we want to pass down custom props. 

```html
<div className="wrapper">
  <Header siteName="Beer me!" />
  <Match exactly pattern="/" render={() => <Results loadBeers={this.loadBeers} {...this.state} />} />
  <Match exactly pattern="/search/:searchTerm" render={() => <Results loadBeers={this.loadBeers} {...this.state} />} />
</div>
```

If you look at the Results component in React dev tools, you'll see that the beers are available under props. Search for a `<Results />` component in dev tools and you'll see 

![](http://wes.io/hkVG/content)

**Why props?** When something is passed down from a parent (`<Main/>`) to a Child (`<Results/>`), it is passed down via props. So we surface it via `this.props.beers` inside the component that receives it.

In `Results.js`, let's see what we are dealing with. Dump your beers with this:

```html
<pre>{JSON.stringify(this.props.beers,null,'  ')}</pre>
```

We can see the data, but we need to loop over all the results and then display them.  Remember this image?

![](http://wes.io/fcCO/content)

JSX does not have any logic to handle the looping over the beers - we need to use a JavaScript map to loop over each one and return yet another component — `<Beer />` for each.

First import the Beer component that will be used to display each of the listed beers:

```js
import Beer from './Beer'
```

Then we loop over each beer and return a beer component. 

```html
<div className="beers">
  {this.props.beers.map((details, i) => <Beer details={details} key={i}/>)}
</div>
```

A few things to note here:

1. `this.props.beers` is an array so we can use map with an ES6 arrow function
2. We pass the each beer result to the `<Beer/>` component via a details prop
3. Each time you have multiple of the same component you need to supply a `key` prop to help React differentiate them in the DOM
