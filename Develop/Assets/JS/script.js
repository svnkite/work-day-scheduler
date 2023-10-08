// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.

document.addEventListener('DOMContentLoaded', function () {
  const currentDayElement = document.getElementById('currentDay');
  const currentDate = dayjs().format('dddd, MMMM D');
  currentDayElement.textContent = currentDate;

  const currentHour = dayjs().hour();

  const timeBlocksContainer = document.getElementById('time-blocks');

  // loop to create time blocks for hours between 9 AM and 5 PM
  for (let hour = 9; hour <= 17; hour++) {
    const timeBlock = document.createElement('div');
    timeBlock.classList.add('row', 'time-blocks');
    if (hour < currentHour) {
      timeBlock.classList.add('past');
    } else if (hour === currentHour) {
      timeBlock.classList.add('present');
    } else {
      timeBlock.classList.add('future');
    }

    console.log(hour, currentHour)

    const timePeriod = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour <= 12 ? hour : hour - 12;

    timeBlock.id = `hour-${hour}`;
    timeBlock.innerHTML = `
      <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${timePeriod}</div>
      <textarea class="col-8 col-md-10 description" rows="3"></textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    `;

    timeBlocksContainer.appendChild(timeBlock);
  }
});


// add a click event listener for save buttons
$('.saveBtn').on('click', function () {
  const timeBlock = $(this).closest('.time-block');
  const timeBlockHour = timeBlock.attr('id').split('-')[1];
  const textarea = timeBlock.find('.description');
  const userInput = textarea.val();

  // save user input in local storage
  localStorage.setItem(`hour-${timeBlockHour}`, userInput);
});
