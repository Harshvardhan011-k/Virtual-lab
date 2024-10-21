const collapseBtn = document.getElementById('collapseBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');

collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
let sidebr = document.getElementById("sidebar");
let lastScrollY = window.scrollY;
let isScrolling;

// Hide the sidebar when scrolling
window.addEventListener("scroll", function() {
    // Hide sidebar while scrolling
    sidebar.style.transition = "transform 0.3s ease";
    sidebar.style.transform = "translateX(-100%)"; // Move sidebar off-screen

    // Clear previous timeout
    clearTimeout(isScrolling);

    // Show the sidebar after scrolling stops
    isScrolling = setTimeout(function() {
        sidebar.style.transform = "translateX(0)"; // Move sidebar back on-screen
    }, 300); // Sidebar reappears 300ms after scrolling stops
});
