const postsContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
const search = document.getElementById('search');

// The time in milliseconds for the loader to disappear while fetching posts
const loadingTime = 700; 

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

  // Delay time for loader to disappear
  setTimeout(()=> {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    },50);
  }, loadingTime);
}

// Show initial posts
showPosts();

let maxScrollTop = 0;
/**
 * Event handler for when the user scrolls down near the end of the page,
 * it loads the posts while showing the loader animation. 
 */
function loadPosts(){
  // scrollTop - range between 0 to 380 for 4 posts (note may contain decimals)
  // scrollHeight - height of entire document [1413]
  // clientHeight - [1042]
  // console.log(document.documentElement.scrollHeight);
  // console.log(document.documentElement.clientHeight);
  console.log(document.documentElement.scrollTop);

  /* Issue is that onload of page, more posts are loaded immediately when 
  scrollTop first evaluates to around ~15. Abort early so that onload this
  bug is prevented. */
  if(document.documentElement.scrollTop < 20) {
    return;
  }

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if ( (scrollTop > maxScrollTop) 
    && (scrollTop + clientHeight >= scrollHeight - 5)){
    console.log('time to load');
    maxScrollTop = scrollTop;
    showLoading();
  }
}

/**
 * Decorator wrapper that throttles the passed in function with a given delay. 
 * When a function is called multiple times, it passes the call to f at maximum
 * once per ms milliseconds. Throttle runs it not more often than given ms time
 * For regular updates that shouldn't be very often.
 * 
 * 1. During the first call, the wrapper just runs func and sets the cooldown 
 * state (isThrottled = true)
 * 2. In this state all calls are memorized in savedArgs/savedthis. Both the 
 * context and arguments are equally important and should be memorized. Need
 * them simultaneously to reproduce the call. 
 * 3. After ms milliseconds pass, setTimeout triggers. The cooldown state is
 * removed (isThrottled = false) and, if we had ignored calls, wrapper is 
 * executed with the last memorized arguments and context. 
 * @param {function} func the function to wrap
 * @param {number} ms the amount of milliseconds to throttle function by
 */
function throttle(func, ms){
  
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
/* Decorator will forward the call loadPosts() at maximum once per 100ms */

/* Throttle the loadPosts, to run at not more often than time: 100ms */
const loadPosts100 = throttle(loadPosts, 100);

/**
 * Filter the posts in the DOM by the input search term.
 * @param {Event} event the event object to filter target value with
 */
function filterPosts(event){
  // Capture the search term from the input
  const term = event.target.value.toLowerCase();

  /* Get the nodeList of posts */
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    // Find matching searching terms in both title and body
    if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
      // Show the posts
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

/* Event Listeners */
// On scroll down 
window.addEventListener('scroll', loadPosts100);

// On input text in search bar
search.addEventListener('input', filterPosts);