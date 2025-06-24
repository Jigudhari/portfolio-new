document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
    menu.classList.add(
      "flex-col", "absolute", "top-16", "left-0", "w-full", "bg-white", "p-4", "space-y-2", "shadow-md"
    );
  });
});
