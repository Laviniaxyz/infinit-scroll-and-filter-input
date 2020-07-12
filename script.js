const postsContainer = document.getElementById('post-container');
const loading = document.getElementById('loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

//Fetch posts from API 

async function getPosts() {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
	const data = await res.json()
	return data;
}

//Show posts in DOM 
async function showPosts() {
	const posts = await getPosts();
	
	posts.forEach(post => {
		const postEl = document.createElement('div');
		postEl.classList.add('post');
		postEl.innerHTML = 
		`		<div class="number">${post.id}</div>
					<div class="post-info">
						<h2 class="post-title"> ${post.title}</h2>
						<p class="post-body">${post.body}</p>
					</div>`

		postsContainer.appendChild(postEl);
	})
}
//Show loading & fetch more posts 
function showLoading() {
	loading.classList.add('show-loader');

	setTimeout( () => {
		loading.classList.remove('show-loader');
	}, 1000)

	setTimeout( () => {
		page++; 
		showPosts();
	}, 300)

}
// Filter posts by input 
function filterPosts(e) {
	const term = e.target.value.toLowerCase();
	const posts = document.querySelectorAll('.post');

	posts.forEach(post => {
		const title = post.querySelector('.post-title').innerText.toLowerCase();
		const body = post.querySelector('.post-body').innerText.toLowerCase();
		console.log(title)
		
		if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
			post.style.display = 'flex'
		} else {
			post.style.display ='none'
		}
	})
}

//Show initial posts()
showPosts()

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	if (scrollTop + clientHeight >= scrollHeight -5) {
		showLoading()
	}
})

filter.addEventListener('input', filterPosts);
