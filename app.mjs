function startApp() {
  // Creating App Database
  const appDatabase = {};
  //  Variables specific to timer
  let timeCount;
  let hour = 0, min = 0, sec = 0, ds = 0;
  function startStopwatch() {
    const displayFormat = (time, isHour) => {
      if (isHour) return `${time ? (`${time}:`).padStart(3, "0") : ""}`;
      return `${time ? (`${time}`).padStart(2, "0") : "00"}`;
    };
    const timerCountNode = document.querySelector(".timer__count");

    timeCount = setInterval(() => {
      ds++;
      if (ds === 10) {
        sec++;
        ds = 0;
      }
      if (sec === 60) {
        min++;
        sec = 0;
      }
      if (min === 60) {
        hour++;
        min = 0;
      }
      if (hour === 24 && min === 60) {
        hour = 0;
      }
      const timerToBeDisplayed = `${displayFormat(hour,true)}${displayFormat(min)}:${displayFormat(sec)}.${displayFormat(ds)}`;
timerCountNode.textContent = timerToBeDisplayed;
}, 100);
}

function stopStopwatch() {
  console.log(timeCount);
  clearInterval(timeCount);
  appDatabase.timeUsed = {
    hour,
    min,
    sec,
    ds
  }
}
document.getElementById('stop').onclick = () => {
    stopStopwatch();
    console.log(appDatabase);
  }
  // END OF TIMER FEATURE

  // Selecting html elements for validations
  const formButton = document.querySelector(".cta__btn");
  const input1 = document.querySelector(".form__input--1");
  const input2 = document.querySelector(".form__input--2");
  const input3 = document.querySelector(".form__input--3");



  // Validation functions and Button Enablement functions
  let isValidInput1, isValidInput2, isValidInput3 = true;

  const enableButton = function() {
    if (isValidInput1 && isValidInput2 && isValidInput3)
      formButton.disabled = false;
  };

  const validateInput1 = function(e) {
    const inputArray = e.target.value.split(" ");
    if (inputArray.length > 1) {
      isValidInput1 = true;
      enableButton();
    } else formButton.disabled = true;
  };

  const validateInput2 = function(e) {
    const inputArray = e.target.value.split(" ");
    if (inputArray.length >= 1) {
      isValidInput2 = true;
      enableButton();
    } else formButton.disabled = true;
  };

  const validateInput3 = function(e) {
    if (e.target.value.trim().length <= 1) {
      isValidInput3 = true;
      enableButton();
    } else formButton.disabled = true;
  };

  formButton.disabled = true;

  // Events
  input1.addEventListener("change", validateInput1);
  input2.addEventListener("change", validateInput2);
  input3.addEventListener("change", validateInput3);

  formButton.addEventListener("click", function(e) {
    // Preventing Page reload.
    e.preventDefault();

    // Start timer
    startStopwatch()

    // Storing valid inputs into the App Database
    appDatabase.sentenceToBeScrambled = input1.value;
    appDatabase.wordsToBeScrambled = input2.value.split(" ");
    appDatabase.scrambledSymbol = input3.value.trim() || "*" ;

  });

  const scramble = () => {

  }


}
// ======= DO NOT EDIT ============== //
export default startApp;
  // ======= EEND DO NOT EDIT ========= //