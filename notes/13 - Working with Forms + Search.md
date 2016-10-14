## Working with Forms + Search

The final piece of the puzzle is the search form. Let's start off by creating the markup for it in `Search.js`

```html
<div className="search">
  <form>
    <input type="text" ref="q" placeholder="Hoppy, Malt, Angry, New..."/>
    <input type="submit" value="Search"/>
  </form>
</div>
```

The only thing that may seem out of place here so far is the `ref="q"` — we will reference this in just a second. 

When someone submits that form, we need to:

1. Stop the form from submitting
2. Get the value of the input
3. redirect them to `/search/whatever-they-searched-for`

Let's take these three things and tackle them step by step:

### Stop the form from submitting
How would you normally stop a form from submitting? 

You listen to for the `submit` event and call `preventDefault` on the event!

So, we will modify our form tag: `<form onSubmit={this.handleSubmit}>`

and then create the `handleSubmit` method on our Search component:

```js
handleSubmit(e) {
  // 1. Stop the form from submitting
  e.preventDefault();
  // 2. Get the value of the input
  // 3. redirect them to `/search/whatever-they-searched-
},

```


### Get the value of the input

This is where the `ref="q"` comes in handy. Because we put a ref on the input, we can easily _reference_ that input element with `this.refs.q`. 

So to get the value of that input:

```js
const searchTerm = this.refs.q.value;
```

### redirect them to `/search/whatever-they-searched-for`

The final step is to change the URL. Rather than set the url ourselves, we use one of the methods on the rotuer. In order to access the router we need to expose to the component using something called `context`. 

Context is a third way in which components can pass down data from the parent to the child. Since the Router is our top level component, we can access it many levels deeper, but only if we define the context. 

First, add this to your Search component:

```js
contextTypes: {
  router: React.PropTypes.object.isRequired
}
```

And then use it's `transitionTo` method to update the browser's URL:

```js
this.context.router.transitionTo(`/search/${searchTerm}`);
```


## Updating our Component 

Now when you search for something like `angry`, you should see the URL bar update, but our component doesn't yet know how to perform the search. 

Where does the searching for beers happen? In our `Main.js` file with the `loadBeers()` method!

So the question is, how do we re-run the `loadBeers()` method? 

We need to modify our componetWillMount() to first check if we have a param in the URL.

```js
componentWillMount() {
  console.log(`mounting`);
  const params = this.props.params || {};
  const searchTerm = params.searchTerm || undefined;
  this.loadBeers(searchTerm);
},
```

And with that in place, when someone goes to `/search/angry`. The `<Main/>` `componentWillMount()`

1. Ajax request
2. the loader component will show
3. the state will be updated
4. the new beers will be displayed
