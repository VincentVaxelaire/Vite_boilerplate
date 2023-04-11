export function canvas(canvas) {
    const color = ["black", "rgb(23, 98, 128)", "#690c0c"]

    window.addEventListener("navigation", event => {
        const { page } = event.detail;
        if (page === "/") {
            canvas.style.backgroundColor = color[0];
            canvas.style.transition = "background-color 0.5s ease-in-out";
        } else if (page === "/about") {
            canvas.style.backgroundColor = color[1];
            canvas.style.transition = "background-color 0.5s ease-in-out";
        } else if (page === "/contact") {
            canvas.style.backgroundColor = color[2];
            canvas.style.transition = "background-color 0.5s ease-in-out";
        }
    });
}