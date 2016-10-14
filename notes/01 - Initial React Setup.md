## Env Setup

In order to write React code, we need to have a little tooling in place. 

React is written in ES6 modules. Rather than use a bunch of Script tags and dump them into our code, we use ES6 modules to import and export our components. Much more on this as we go along.

In order to work with modules, we need a few things:

1. **npm** — Used for installing our dependencies - like React!
2. **node.js** — the tooling we use runs on Node.js
3. **Webpack** — one of the most popular bundlers for JavaScript modules. We will be using Webpack behind the scenes with a command line tool called `create-react-app`.
4. **Terminal**  — the bundling of our code happens in the Terminal so you'll need either the OSX terminal app or the Windows PowerShell installed

So, let's head on over to our `beer-me` directory. The `package.json` file already includes the dependencies that we need, so we just need to run `npm install` to fetch and install them.

Our webpack process is setup for using `index.js` as our entry point. Open it up and type:

```js
alert('it works!');
```

## Running our App

To start the app, simply run `npm start`. Webpack (via `create-react-app`) will build the site and open it up in your browser. Since all we have written so far is just a alert, you should see it when the browser opens.

![](http://wes.io/fc6Y/content)

## Hello World in React

Let's get a paragraph tag displayed on the page. 

First we need to import React and something called react-dom which will allow us to display HTML. 

Since both `react` and `react-dom` are both npm packages we we already installed, we can simply require the entire React lib, and then use curly brackets to import just the one `render` method from `react-dom`:

```js
import React from 'react';
import { render } from 'react-dom';
```

Next, we need to render out something. React needs an entry point where it can "mount" itself. If you look at `index.html` you'll see that we have an empty div with the id of `root`.

```
render(<p>Hello World</p>, document.querySelector('#root'));
```

Let's break this down:

1. `render()` is the method we just imported
2. <p>Hello World</p> is the element we wish to render — this is really something called JSX. More on this in a bit! It's important to note thay we don't have to put it in quotes. 
3. document.querySelector('#root') finds the entry point in the DOM

Save and refresh your page, you should see the very basic of getting up and running with React. If you open your dev tools now you should see the React tab which you can now inspect:

![](http://wes.io/fcCv/content)

## CSS

We have two options for using CSS with a React app. 

1. You can load in a `style.css` file all on your own into your index.html and not have React or Webpack play any part of it.
2. You can let Webpack handle importing the CSS for you. The advantages of this is that you _could_ write CSS the directly relates to each component and only have it imported as you need it.

This is a very divisive topic in the web development community so I'll let you make your own decisions here. For us, I'm going to import all our CSS at the top level app. 

In your `index.js`, place this just above your render:

```js
/* Import CSS */
import css from  './style.css';
```

I'm using plain cSS here - but you could use Sass, Less, Post CSS or regular CSS if you'd like. 

However, since this all happens inside the WebPack file with something called _loaders_, we would need to _eject_ from `create-react-app`. More on this later.
