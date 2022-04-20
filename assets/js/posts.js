const POST_COUNT = 7
const posts = document.querySelectorAll('.post')
const $postContainer = document.querySelector('.posts')
const $currentPage = document.querySelector('.current-page')
const $totalPage = document.querySelector('.total-page')
const $pagination = document.querySelector('.pagination')
const TOTAL_PAGE_COUNT = Math.ceil(posts.length / POST_COUNT)
$totalPage.textContent = TOTAL_PAGE_COUNT
$currentPage.textContent = '1'

addPostIntoContainer()

$pagination.addEventListener('click', e => {
	if (e.target.matches('.previous')) {
		let currentPage = Number($currentPage.textContent)
		if(currentPage === 1) return
		$currentPage.textContent = currentPage - 1
		addPostIntoContainer()
	}
	else if (e.target.matches('.next')) {
		let currentPage = Number($currentPage.textContent)
		if(currentPage === TOTAL_PAGE_COUNT) return
		$currentPage.textContent = currentPage + 1
		addPostIntoContainer()
	}
})

function addPostIntoContainer() {
	$postContainer.innerHTML = ''
	let initIdx = (Number($currentPage.textContent) - 1) * POST_COUNT
	for(let idx = initIdx; idx < initIdx + POST_COUNT; idx++) {
		if (idx >= posts.length) break
		$postContainer.appendChild(posts[idx])
	}
}