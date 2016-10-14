# Deploying

To generate a bundle ready for production, simply run `npm build`. This will generate an index.html file and a .js file that contains all your minified code.

# Challenge Exercises

## Stateless Functional Components

Sometimes we have components that _only include a render()_. There are no custom methods, no lifecycle hooks, though they may have propTypes.

If this is the case, we use a simple function that simply returns some JSX.

Let's take out Beer.js component:

```js
const Beer = React.createClass({
  render() {
    const { name, labels, id } = this.props.details;
    const image = labels ? labels.medium : 'null.jpg';

    return (
      <div className="beer">
        <Link to={`/beer/${id}/${slug(name)}`}>
          <h2>{name}</h2>
          <img src={image} alt={name} />
        </Link>
      </div>
    );
  }
});
```

We can convert that to a function that returns some JSX. Notice how we passed in props and replaced `this.props` with just `props`? 

```js
const Beer = function(props) {
  
	const { name, labels, id } = props.details;
	const image = labels ? labels.medium : 'null.jpg';

	return (
	  <div className="beer">
	    <Link to={`/beer/${id}/${slug(name)}`}>
	      <h2>{name}</h2>
	      <img src={image} alt={name} />
	    </Link>
	  </div>
	);
};
```

You'll often also see it written with a one line arrow function with an implicit return.

```js
const Hello = (props) => (
	<div class="hello">
		<h3>Hello {props.name}!</h3>
	</div>
)
```

**Challenge:** Go through 

## Cache Single Beers

Can you update the `Single.js` file to cache the single beer in localStorage? If I visit the same beer page twice, it should fetch it once.

## Modify It - Make it your own

Now that you have a feel for React.js, what else could you build with it? This workshop should give you head start and the only way to continue learning is to build something that you are invested in. 

What can you build? 

* Use your own API to display it's data
* Add a note taking feature to the beers
* Build a shopping cart from scratch
* re-do your WordPress website with the WP API


