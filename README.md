# infinite-scroll-microblog
Just a small project to demonstrate infinite scrolling, Fetch API and CSS animations on a microblog.

# Description

Show the functionality of a microblog that has infinite scrolling. It fetches posts from an API.

It will also have a search bar that filters out the posts by the string provided by the user.

Uses fake data from [JSON Placeholder](https://jsonplaceholder.typicode.com/), a free fake API
for testing and prototyping.

# Technologies:

HTML5, CSS3, JavaScript

## Specifications

- [x] Create custom UI
- [x] CSS loader animation
- [x] Fetch and display initial posts from API with `async`,`await` & `Promise`
- [x] Fetch next set of posts via scroll down 
- [x] Infinite scroll down and show loader animation
- [x] Seach & filter for fetched posts via search bar

# How to use

1. Scroll down
2. Read posts

# Instructions to run a local copy

1. Clone this repository and save to a folder on a laptop (or on GitHub click `Code` > `Download Zip`)

2. Go to the directory (folder) where code is stored

3. Open up `index.html` in any browser

# Attribution

Assets such as `bleeter-logo.png` and `clouds.png` found at [Bleeter](https://gta.fandom.com/wiki/Bleeter).

---

## Notes while making this

Going through the [JSON Placeholder Guide](https://jsonplaceholder.typicode.com/guide/)

When we make a request to this URL:

- https://jsonplaceholder.typicode.com/posts

We get an array of JavaScript objects containing posts.

- https://jsonplaceholder.typicode.com/posts/1

```js
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

Will give the first post. And when we add a parameter to the URL that is `?_limit=3`

- https://jsonplaceholder.typicode.com/posts?_limit=3

```js
[
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];
```

We will get the first 3 posts, since we limit the amount of posts we get to 3.

Adding another parameter at the end `&_page=3`

- https://jsonplaceholder.typicode.com/posts?_limit=3&_page=3

```js
[
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    userId: 1,
    id: 8,
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    userId: 1,
    id: 9,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
  },
];
```

We get the 3rd page of posts (see the `id`) limited to 3 posts.

To make use of this:

```js
// limit number of posts, and what page
let limit = 4;
let page = 1;

/**
 * Fetch the posts from the API
 * @returns Promise of data representing the posts
 */
async function getPosts() {
  const response = await 
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  // Returns a promise with that data
  const data = await response.json();

  // data is a promise, so must use async await
  return data;
}
```

## Issues I came across

- [x] Event handler that manages the scrolling and loading posts runs onload of the webpage, the issue was that onload `document.documentElement.scrollTop` would evaluate to roughly ~15 and then 0. So fixed the issue by aborting early in the `loadPosts()` function.

- [x] Also throttled the scrolling eventHandler to prevent it from loading too often, although the `setTimeout` within `showLoading()` function mitigates this bug somewhat, it hacks away at the leaves and does not strike at the root of the bug. So throttling the `loadPosts()` function by having a `throttle` decorator function wrapper have it run not more often than given `ms` time. This is so the scroll down feels responsive to the user, still updates regularly, but not so frequently that it calls `loadPosts()` more than once.

- [x] When user scrolls up right after scrolling down to load posts, multiple calls to `loadPosts()` happen so fixed this issue by keeping track of the maximum `scrollTop` value as `maxScrollTop`. Only one call to `loadPosts()` would occur when current `scrollTop` exceeds `maxScrollTop` and `(scrollTop + clientHeight >= scrollHeight - 5)` check for when the user scrolls near the end of the page.