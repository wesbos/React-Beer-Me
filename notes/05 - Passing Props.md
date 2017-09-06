## Passing Props

In React, there are two main ways in which you can provide data to a component — **state** and **props**. We're going to learn about props and later on, state.

Our Header.js file is hard coded with "Beer Me!" — what if we had that data at the Main component and want to pass it down to Header?

**To pass down data to a child component, we use props.**

Props look just like attributes. Let's change our `<Header/>` to take a prop called `siteName`.

To pass the prop, simply pass it like an attribute:

```html
<Header siteName="Beer Me! 🍻" />
```

You can pass any type down - strings, numbers, methods. Anything other than a string will need curly brackets:

Pass down a property:

```html
<Beer beerId={result.beer.id} />
```

Use a function:

```html
<Dog age={calcuateDogYears(5)} />
```

Pass a function

```html
<Dog calcAge={calcuateDogYears} />
```

We will go more in depth on this soon!

### Using Props

Once props are passed _to_ a component, we can use them access them inside that component. If you inspect your `<Header/>` component with react dev tools you should now see that the there is an object inside the component called `props`:

![](http://wes.io/fcPQ/content)

We can access the props inside our render component by using `this.props.siteName`.

```html
<h1>Beer Me!</h1>
```

turns into:

```html
<h1>{this.props.siteName}</h1>
```

A few things to note:

1. Notice how we use `{curly braces}` to access variables inside our JSX?
2. React automatically binds all methods inside the component to the Component itself. What does that mean? In any method (render for this case) `this` refers to `<Header/>`.


## PropTypes

When using components, you don't always know which props you should be using. If a co-worker created the component, how do you know which props it requires? 

PropTypes will check that the necessary data, and the type of data being passed to the component is done correctly. 

So, anytime you use props, your component must have propTypes. 

Let's take `<Header />` in `Header.js` for example. What props do we use there?

```
class Header extends React.Component {
  render() {
    return (
      <h1>{this.props.siteName}</h1>
    );
  }
};
```

`siteName`!

And what type is it? A String!

First we need to import `PropTypes` from the `prop-types` package. 

```
import PropTypes from 'prop-types'
// you can also import just the items you need:
import { string, number } from 'prop-types';
// you may also see an older style React.PropTypes. This is deprecated
import { PropTypes } from 'react';
```


So, we can add propTypes to our component:

```
class Header extends React.Component {
  
  static propTypes = {
    siteName: PropTypes.string.isRequired
  }

  render() {
    return (
      <h1>{this.props.siteName}</h1>
    );
  }
};
```

A few things:
1. We use `static propType =` to set the property on the component. 
2. there is no `,` after the object or method. This is part of ES6 Classes and differs from an object where you must put a `,`
 
This will now error in your console if you:

1) Forget to pass something
2) Pass a number, boolean, function or object. 

More info on all the available propTypes here: 

<https://facebook.github.io/react/docs/reusable-components.html>
