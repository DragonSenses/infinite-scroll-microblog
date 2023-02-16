# infinite-scroll-microblog
Just a small project to demonstrate infinite scrolling on a microblog

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
- [x] Fetch initial posts from API and display
- [ ] Fetch next set of posts via scroll down 
- [ ] Infinite scroll down and show loader animation
- [ ] Seach & filter for fetched posts via search bar

# How to use

1. Scroll down
2. Read posts

# Instructions to run a local copy

1. Clone this repository and save to a folder on a laptop (or on GitHub click `Code` > `Download Zip`)

2. Go to the directory (folder) where code is stored

3. Open up `index.html` in any browser

# Attribution

Assets such as `bleeter-log.png` and `clouds.png` found at https://gta.fandom.com/wiki/Bleeter

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
