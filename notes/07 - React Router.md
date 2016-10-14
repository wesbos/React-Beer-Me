
## Routing with React Router

Our application is going to have three "routes", or urls that a user can hit. 

1. `localhost:3000/` for the home page and default beers
1. `localhost:3000/search/angry` the search results for a specific keyword. In this case `angry`
1. `http://localhost:3000/beer/OUqh1N/Texas-Craft-Brewers-Guild` the single view page for a specific beer - we pass along the beer ID and the beer name in the url.

React is just a view library so it doesn't have routing built in like other frameworks might have. That said, the community has primarily standardized on using [React Router](https://github.com/ReactTraining/react-router)

React router is just a component in itself - it watches for history changes and will render out the correct component for you.

On every page we want to render either the `<Main></Main>` component on the Home page and search page or the `<Single></Single>` on the single beer page.


### Step 1: Import react-router

There are a number of things we need from the `react-router` package. In `index.js`, import the following:

```js
import { BrowserRouter, Match } from 'react-router';
```

### Step 2: Update our index.js Render

In `index.js` we are going to change our out render function to take the router instead of the `<Main>` component. 

Currently it looks like this:

```html
render(<Main />, document.querySelector('#root'));
```

And we will update it to look like this. Let's code it together and talk though each of the parts.

```
const Root = function() {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Main} />
        <Match pattern="/search/:searchTerm" component={Main} />
        <Match pattern="/beer/:beerId/:beerSlug" component={Single} />
      </div>
    </BrowserRouter>
  );
};

render(<Root/>, document.querySelector('#root'));
```

**Finally,** you'll notice we are referencing the `Results` and `Single` components here. Make sure you import them at the top of your document alongside the already imported `Main`:

Our entire `index.js` now looks like:

```html
import React from 'react';
import { render } from 'react-dom';
import Main from './components/Main';
import Single from './components/Single';

import { BrowserRouter, Match } from 'react-router';

/* Import CSS */
import './style.css';

const Root = function() {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Main} />
        <Match pattern="/search/:searchTerm" component={Main} />
        <Match pattern="/beer/:beerId/:beerSlug" component={Single} />
      </div>
    </BrowserRouter>
  );
};

render(<Root/>, document.querySelector('#root'));
```

### Step 3: Try it out

You should be able to go to any of the matching routes:

* <http://localhost:3000/>
* <http://localhost:3000/search/ale>
* <http://localhost:3000/beer/Pyvc7L/Entire-Stout>
