## Our First React Component

Now - we can't just be writing all of our HTML inside of the render method — we need to break things up into their own components. Let's write our first React component. 

In React, everything is a component. You can think of our application as many parts that we piece together to make an application as a whole. 

Let's look at the front page of our app. What are the components we are going to make? 

![](http://wes.io/fcCO/content)

Let's start with a `Header.js` component. In react, since components are sort of like classes that can be reused over and over, it's a standard practice to name your files and components with a capital.

So in a folder named `components`, create `components/Header.js`. 

Now there are a few things we need to create a component:

1. React itself
2. The ability to create Links with react-router - more on this soon

```js
import React from 'react';
import { Link } from 'react-router';
```

Notice that even though we have imported React into `index.js`, we also import it in here. Modules are not global and you _must_ re-import the react library into every point that you need it. 

Then we create our component and store it in a variable. We use `React.createClass` to create the react class. 


<div style="border-left:10px solid #ffc600; padding:20px; background:rgba(0,0,0,0.05);">
	

### **Quick Aside: ES6 extending Classes vs React.createClass()**

React currently has 2 ways to create components:

1. Method: `const Header = React.createClass()`
2. ES6 Classes `class Header extends React.Component`

At the end of the day both ways create a component. That said, learning with **createClass** is significantly easier. While ES6 classes are most likely the way forward with React, they have a number of stumbling blocks that get in the way of learning:

1. ES6 Class Syntax must first be learned
2. No methods are automatically bound leading to a number of binding workarounds with terse syntax
2. Currently JavaScript Classes do not support properties

Issue #1 will soon be a non-issue. For #2 and #3, The Language is evolving to support these things and will evenutally be a non-issue as well. So createClass for now it is!
</div>

Every React component will have multiple methods that live inside it, but the one method that we absolutely need is the `render()` method. This is a pre-defined method that React looks for when it displays the content on our page. 

Let's type this one together to get the hang of the syntax and answer the following questions along the way:

1. Why do we use `const`?
2. What is this `render() {}` business? should it not be `render: function() {}`?
3. Why is there (parens) around everything?

```js
const Header = React.createClass({
  render() {
    return (
      <h1>
        <Link to="/">Beer Me!</Link>
      </h1>
    )
  }
});
```

Finally, since we will need to import this component into other components, we need to **export it** with `export default Header`.

Our final code looks like this:

```js
import React from 'react';
import { Link } from 'react-router';

const Header = React.createClass({
  render() {
    return (
      <h1>
        <Link to="/">Beer Me!</Link>
      </h1>
    )
  }
});

export default Header;

```


### Displaying `<Header/>`

We have now made a Header component. Swap out the `<p>Hello World</p>` with our new Header component in `index.js`. We can use the "tag" `<Header/>` to reference our component:

```js
render(<Header />, document.querySelector('#root'));
```

But you'll see that we get this error:

![](http://wes.io/fcAo/content)

That is because we haven't yet **imported** our component into index.js! 

```js
import Header from './components/Header';
```

Since the component is not part of our `node_modules` directory, we do a relative reference with `./`. Refresh your page and you should now see the title:


![](http://wes.io/fc1Y/content)
