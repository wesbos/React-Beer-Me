## Our Second React Component 

Before we can display that component, we need a wrapper component that will hold all everything.

At the end of the day, our JSX is going to look similar to this:

```html
<Main>
  <Header />
  <Search />
  <Results>
    <Beer />
    <Beer />
    <Beer />
    <Beer />
    <Beer />
  </Results>
</Main>
```

Create a component called `Main.js` in your components directory. 

In that file, we will need to do the same three things we do in every component:

1. Import React
2. Create the component with `React.createClass()`
3. Export your Component

```
import React from 'react';
import Header from './Header';

const Main = React.createClass({
  render() {
    return (
      <div className="wrapper">
        <Header />
      </div>
    )
  }
});

export default Main;
```

Now in `index.js` import Main: `import Main from './components/Main';` and switch out `<Header/>` with `<Main/>`. 

See where we are going with this? We indirectly display the `<Header />` because it's part of `<Main/>`. Take a look at your React dev tools now.
N
![](http://wes.io/fcxb/content)
