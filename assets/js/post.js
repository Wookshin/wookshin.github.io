const arrowUp = document.querySelector(".arrow-up");
arrowUp.classList.add("visible");

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView(".top-navigation");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

const tags = document.querySelectorAll('h1, h2')
const tocItems = []
const toc = document.querySelector('.document-toc')
const tocHeader = document.querySelector('.document-toc-header')
const tocList = document.querySelector('.document-toc-list')
var focusedIdx = -1

tags.forEach((tag, idx) => {
	if (tag.tagName === 'H1') {
		tocHeader.textContent = tags[0].textContent
		tocHeader.dataset.idx = idx
		tag.dataset.idx = idx
		tocItems.push(tocHeader)
	}
	else {
		let li = document.createElement('li')
		li.classList.add('toc-list-item')
		li.textContent = tag.textContent
		li.dataset.idx = idx
		tocList.appendChild(li)
		tag.dataset.idx = idx
		tocItems.push(li)
	}
}) 

toc.addEventListener('click', e => {
	let idx = e.target.dataset?.idx
	if (idx !== -1) {
		tags[idx].scrollIntoView({ behavior: "smooth", block: "center" })
	}
})


const callback = (entries) => {
    entries.forEach(entry => { 
		if (entry.intersectionRatio <= 0) return
		let idx = entry.target.dataset.idx
		
		if (!entry.isIntersecting && entry.boundingClientRect.y > 100) {
			idx -= 1
		}
		
		tocItems[focusedIdx]?.classList.remove('focus')
		tocItems[idx].classList.add('focus')
		focusedIdx = idx
    })
}

const options = {
  threshold: 1.0
}

const observer = new IntersectionObserver(callback, options);

tags.forEach(tag => observer.observe(tag))