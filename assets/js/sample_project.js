// Get elements
const sudokuCheckbox = document.getElementById('sudokuCheckbox');
const nutritionCheckbox = document.getElementById('NutritionCheckbox');
const input = document.getElementById('userInput');
const button = document.getElementById('submitBtn');
const responseArea = document.getElementById('responseArea');

// Function to clear input and response
function clearFields() {
  input.value = '';
  responseArea.innerHTML = '';
}

// Function to uncheck other checkbox
function handleCheckboxClick(clickedCheckbox, otherCheckbox) {
  clickedCheckbox.addEventListener('change', () => {
    if (clickedCheckbox.checked) {
      otherCheckbox.checked = false;
      clearFields();
    }
  });
}

// checkbox handler
handleCheckboxClick(sudokuCheckbox, nutritionCheckbox);
handleCheckboxClick(nutritionCheckbox, sudokuCheckbox);

// Button click to send API request
button.addEventListener('click', () => {
  responseArea.innerHTML = ''; // clear previous response
  // alert("Button was clicked!"); - Alert box to check if a button is working.
  let url = '';
  let query = input.value.trim();

  if (sudokuCheckbox.checked) {
    if (query === '') {
    responseArea.innerText = 'Difficulty must be one of: easy, medium, hard.';
    return;
  }
    url = `https://api.api-ninjas.com/v1/sudokugenerate?difficulty=${query}`;
  } else if (nutritionCheckbox.checked) {
    url = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;
  } else {
    responseArea.innerText = 'Please select one API option.';
    return;
  }

  // Replace API_KEY with your real api key

  fetch(url, {
    method: 'GET',
    headers: { 'X-Api-Key': 'MNGnE9y7Ud83JuxDMNqsPA==zghn7XpJIGMQ95Qw' }
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        throw new Error(err.error || 'Something went wrong!');
      });
    }
    return response.json();
  })
  .then(data => {
    responseArea.innerHTML = '';
        if (nutritionCheckbox.checked) {
                if (Array.isArray(data) && data.length === 0) {
                  responseArea.innerText = 'No nutritional data found for that input.';
                  return;
                }

                const item = data[0]; // only the first item

                for (let key in item) {
                  responseArea.innerHTML += `<strong>${key}:</strong> ${item[key]}<br>`;
                }

              } else if (sudokuCheckbox.checked) {
                  const puzzle = data.puzzle;

                  if (!puzzle || !Array.isArray(puzzle)) {
                    responseArea.innerHTML = 'No Sudoku puzzle found in the response.';
                    return;
                  }

                  responseArea.innerHTML = `<strong>Sudoku Puzzle:</strong><br><pre>`;
                  puzzle.forEach(row => {
                    responseArea.innerHTML += row.map(cell => cell === null ? '_' : cell).join(' ') + '\n';
                  });
                  responseArea.innerHTML += `</pre>`;
              }
            })
            .catch(error => {
              responseArea.innerText = `Error: ${error.message}`;
            });
        });