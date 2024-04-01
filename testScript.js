let checkboxes = document.querySelectorAll(".chk");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    toggleCheckboxBackground();
  });
});
