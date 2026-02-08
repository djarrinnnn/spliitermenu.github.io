const links = document.querySelectorAll(".split");
const images = document.querySelectorAll(".menu-image");

let selectedTarget = null;

/* Split text animation */
links.forEach(link => {
	const text = link.textContent.trim();
	link.textContent = "";

	[...text].forEach((char, i) => {
		const span = document.createElement("span");
		span.textContent = char;
		span.style.transitionDelay = `${40 + i * 30}ms`;
		link.appendChild(span);
	});
});

/* Click selection */
links.forEach(link => {
	link.addEventListener("click", e => {
		e.preventDefault();

		links.forEach(l => l.classList.remove("selected"));
		link.classList.add("selected");

		selectedTarget = link.dataset.target;
		updateImages(selectedTarget);
	});
});

/* Hover behavior */
links.forEach(link => {
	link.addEventListener("mouseenter", () => {
		updateImages(link.dataset.target);
	});

	link.addEventListener("mouseleave", () => {
		if (selectedTarget) {
			updateImages(selectedTarget);
		} else {
			resetImages();
		}
	});
});

/* Image update */
function updateImages(target) {
	images.forEach((img, index) => {
		img.classList.remove("active", "lift-up", "lift-down");

		if (img.dataset.image === target) {
			img.classList.add("active");

			if ((index + 1) % 2 === 1) {
				img.classList.add("lift-up");
			} else {
				img.classList.add("lift-down");
			}
		}
	});
}

function resetImages() {
	images.forEach(img => {
		img.classList.remove("active", "lift-up", "lift-down");
	});
}
document.addEventListener("mousemove", (e) => {
	const windowHeight = window.innerHeight;
	const mouseY = e.clientY;

	// Normalize between -1 (top) and 1 (bottom)
	const normalized = (mouseY / windowHeight) * 2 - 1;

	const strength = 25; // adjust intensity

	images.forEach((img, index) => {

		// Odd = top images
		if ((index + 1) % 2 === 1) {
			img.style.setProperty("--mouse-y", `${normalized * -strength}px`);
		}
		// Even = bottom images
		else {
			img.style.setProperty("--mouse-y", `${normalized * strength}px`);
		}

	});
});
