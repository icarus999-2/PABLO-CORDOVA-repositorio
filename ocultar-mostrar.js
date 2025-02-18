document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("ocultarsidebar");
    const sidebar = document.getElementById("sidebarMenu");
    const section = document.getElementById("content");

    toggleButton.addEventListener("click", function () {
    sidebar.classList.toggle("hidden");

// Alterna la clase que expande el contenido y el header
if (sidebar.classList.contains("hidden")) {
section.classList.add("full-width");
} else {
section.classList.remove("full-width");
}
});
});