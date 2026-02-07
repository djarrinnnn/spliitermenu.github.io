document.querySelectorAll(".split").forEach(link => {
	const text = link.textContent.trim();
	link.textContent = "";

	[...text].forEach((char, i) => {
		const span = document.createElement("span");
		span.textContent = char;
		span.style.transitionDelay = `${40 + i * 30}ms`;
		link.appendChild(span);
	});
});
