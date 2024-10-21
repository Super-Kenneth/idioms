function enforce_maxlength(event) {
  var t = event.target;
  if (t.hasAttribute("maxlength")) {
    t.value = t.value.slice(0, t.getAttribute("maxlength"));
  }
}

document.body.addEventListener("input", enforce_maxlength);

document.getElementById("proceed_btn").addEventListener("click", function () {
  const maxChecked = parseInt(document.getElementById("test_input").value);
  const checkboxes = document.querySelectorAll(
    '#idioms_list input[type="checkbox"]'
  );

  const letterCounts = {};
  "abcdefghijklmnopqrstuvwxyz".split("").forEach((letter) => {
    letterCounts[letter] = 0;
  });

  if (maxChecked >= 1 && maxChecked <= 10) {
    document.getElementById("idioms_container").style.display = "block";
    document.getElementById(
      "idiom_count"
    ).innerText = `(Choose [${maxChecked}] only)`;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.disabled = false;
    });

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const checkedCount = Array.from(checkboxes).filter(
          (checkbox) => checkbox.checked
        ).length;

        if (checkedCount > maxChecked) {
          checkbox.checked = false;
          alert(`You can only check up to ${maxChecked} idioms.`);
        } else {
          updateLetterCounts(
            checkbox.checked,
            checkbox.nextElementSibling.innerText,
            letterCounts
          );
        }
        displayLetterCounts(letterCounts);
      });
    });
  } else {
    alert("Please enter a number between 1 and 10.");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.disabled = true;
    });
  }
});

function updateLetterCounts(isChecked, idiom, letterCounts) {
  const lowerIdiom = idiom.toLowerCase();
  for (const letter of lowerIdiom) {
    if (letterCounts.hasOwnProperty(letter)) {
      letterCounts[letter]++;
    }
  }
}

function displayLetterCounts(letterCounts) {
  for (const letter in letterCounts) {
    document.getElementById(`count_${letter}`).innerText = letterCounts[letter];
  }
}
