const searchContainer = document.getElementById('search-container');
const postsContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

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

/**
 * Show posts in the DOM. For each post extracted from the promise of getPosts(), 
 * create an element of post and append it to postsContainer
 */
async function showPosts() {
  const posts = await getPosts();

  // Create the HTML for the post
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    // Append each post to the DOM
    postsContainer.appendChild(postElement);
  });

}

/**
 * Show the loader and fetch more posts.
 */
function showLoading(){
  // Append 'show' class to loader
  loader.classList.add('show');

  setTimeout(()=> {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    },300);
  }, 1000);
}

// Show initial posts
showPosts();

/* Event Listeners */

// Scroll down 
window.addEventListener('scroll', () => {
  // scrollTop - range between 0 to 380 for 4 posts (note may contain decimals)
  // scrollHeight - height of entire document [1413]
  // clientHeight - [1042]
  console.log(document.documentElement.scrollTop);
  // console.log(document.documentElement.scrollHeight);
  // console.log(document.documentElement.clientHeight);
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5){
    console.log('time to load');
    showLoading();
  }
});