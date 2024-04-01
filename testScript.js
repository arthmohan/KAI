let checkboxes = document.querySelectorAll(".chk");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    toggleCheckboxBackground();
  });
});

let radios= document.querySelectorAll(".radio");
radios.forEach((radio) => {
  radio.addEventListener("change", function () {
    toggleRadioBackground();
  });
});