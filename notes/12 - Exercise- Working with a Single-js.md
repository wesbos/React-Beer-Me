## Exercise: Working with a Single.js

When you click on a beer you should see this:

![](http://wes.io/fdWa/content)

We need to transform Single.js to display all the info about that beer. We are going to build Single.js as an exercise where you work with each other. Here are some notes:

1. Your Single.js will have 2 items in state: `beer` and `loading`
2. You will fetch the beer's info in a `loadBeer` method that you create for `Single.js` from `http://api.react.beer/v2/beer/${beerId}`.For example <http://api.react.beer/v2/beer/HMJR8Y>
3. You can access the URL variables (Like `beerId`) in `this.props.params`
4. Display the Loader with the words "Pouring a cold one!" while the Ajax request is working
5. Display at least the Beer name and the Beer description. We will work through the other bits together.

The final output will look like this: 

![](http://wes.io/fdsT/content)
