## Say Hello to JSX

JSX is the templating language we write in order to create HTML or DOM fragments. It's not technically JavaScript, but Babel and Webpack are able to convert it from the nice syntax that we know and understand into the JavaScript equivalent of `React.createElelement`.

Writing JSX is very similar to JavaScript except for a few items.

### Self Closing Elements

Elements **must** close. This isn't an issue for most tags:

```html
<h1>Beer Me!</h1>
```

But self-closing elements like `input` and `img` need to have the closing `/` in them:

```html
<img src="dog.jpg" > <!-- BAD! -->
<img src="dog.jpg" /> <!-- Good! -->

<input type="text" > <!-- BAD! -->
<input type="text" /> <!-- Good! -->
```

### Must return only one element

React expects you to only return one element. You can have as many child elements as you wish, but only one top level element.

So, if I needed to return the following HTML. You'll get an error saying ` Adjacent JSX elements must be wrapped in an enclosing tag (8:6)`.

```html
<h3>Beer Name</h3>
<p>Beer Description goes here</p>
```

An easy fix is to wrap it in a div:

```html
<div>
  <h3>Beer Name</h3>
  <p>Beer Description goes here</p>
</div>
```

### Comments

Comments are a little weird in JSX, since we are _technically_ writing JavaScript, we need to use JavaScript comments, but inside JSX curly braces.

So a comment in JSX looks like

```html
<div>
  {/* Comment here */ }
  <h3>Beer Name</h3>
  <p>Beer Description goes here</p>
</div>
```

Another gotcha is that you may not have a comment at the top level, for the same reason we can only return one element:

```html
{/* Comment cannot go here */ }
<div>
  <h3>Beer Name</h3>
  <p>Beer Description goes here</p>
</div>
```

### className instead of class

Because `class` is a reserved word in JavaScript, you must use className instead. 

```html
<p class="cool">Hello</p>
```

is now

```html
<p className="cool">Hello</p>
```

If you use Emmet, your expansions will be automatically updated for you. 
