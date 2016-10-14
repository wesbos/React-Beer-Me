## Working in Beer.js

So far we have passed all beers from `Main.js` → `Results.js` and passed each individual beer from `Results.js` → `Beer.js`.

Working in `Beer.js`, how do we access the info about that beer? How did we pass it? **Props!** What was it called? **details**!

So how do we access it inside `Beer.js`? `this.props.details`!

First, let's import a few dependencies:

```js
import slug from 'slug';
import { Link } from 'react-router';
```

Then work through the render function together:

```html
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
```
