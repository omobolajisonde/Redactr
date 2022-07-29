function startApp() {
  const DELAY_SEC = 2000;
  // Creating App Database
  const appDatabase = {};

  // Selecting html elements for validations
  const formButton = document.querySelector(".cta__btn");
  const input1 = document.querySelector(".form__input--1");
  const input2 = document.querySelector(".form__input--2");
  const input3 = document.querySelector(".form__input--3");

  // Validation functions and Button Enablement functions
  let isValidInput1,
    isValidInput2,
    isValidInput3 = true;

  const enableButton = function() {
    if (isValidInput1 && isValidInput2 && isValidInput3)
      formButton.disabled = false;
  };

  const toggleValidInput = (inputNode, isValid) => {
    if (isValid) {
      inputNode.classList.remove("form__field--invalid");
      inputNode.nextElementSibling.style.display = "none";
    };
    if (!isValid) {
      inputNode.classList.add("form__field--invalid");
      inputNode.nextElementSibling.style.display = "block";
    };
  };

  const filterEmptyElements = (array) => {
    return array.filter((elem) => elem);
  };

  const validateInput1 = function(e) {
    const textBody = e.target.value.replaceAll('\n', " ");
    const inputArray = filterEmptyElements(textBody.split(" "));
    if (inputArray.length > 1) {
      isValidInput1 = true;
      enableButton();
    } else {
      isValidInput1 = false;
      formButton.disabled = true;
    }
    toggleValidInput(e.target, isValidInput1);
  };

  const validateInput2 = function(e) {
    const inputArray = filterEmptyElements(e.target.value.split(" "));
    if (inputArray.length >= 1) {
      isValidInput2 = true;
      enableButton();
    } else {
      isValidInput2 = false;
      formButton.disabled = true;
    }
    toggleValidInput(e.target, isValidInput2);
  };

  const validateInput3 = function(e) {
    const inputArray = filterEmptyElements(e.target.value.split(" "));
    if (inputArray.length <= 1) {
      isValidInput3 = true;
      enableButton();
    } else {
      isValidInput3 = false;
      formButton.disabled = true;
    }
    toggleValidInput(e.target, isValidInput3);
  };

  formButton.disabled = true;

  // Events
  input1.addEventListener("input", validateInput1);
  input2.addEventListener("input", validateInput2);
  input3.addEventListener("input", validateInput3);

  // SCRAMBLE FUNCTION
  const scramble = ({
    sentenceToBeScrambled,
    wordsToBeScrambled,
    scrambledSymbol,
  }) => {
    let result = sentenceToBeScrambled;
    let noOfMatchedWords = 0;
    let noOfCharsScrambled = 0;

    for (let word of wordsToBeScrambled) {
      let regexp = new RegExp("\\b" + word + "\\b", "gi");
      if (scrambledSymbol.length > 1)
        result = result.replace(regexp, scrambledSymbol);
      else result = result.replace(regexp, scrambledSymbol.repeat(word.length));
      // Get the no of matched words
      noOfMatchedWords += sentenceToBeScrambled.split(regexp).length - 1;

      // Get the no of characters scrambled
      let charArray = sentenceToBeScrambled.match(regexp);
      if (charArray)
        noOfCharsScrambled += charArray.reduce(
          (tot, elem) => (tot += elem.length),
          0
        );
    }

    // Storing the results into the App Database
    appDatabase.result = result;
    appDatabase.noOfMatchedWords = noOfMatchedWords;
    appDatabase.noOfCharsScrambled = noOfCharsScrambled;
  };

  // DISPLAY RESULTS
  const displayResults = function(dataBase) {
    document.getElementById("result__text").textContent = dataBase.result;
    document.getElementById("result__value").textContent = filterEmptyElements((dataBase.sentenceToBeScrambled.replaceAll("\n", " ")).split(" ")).length;
    document.getElementById("result__value1").textContent = dataBase.timeUsed;
    document.getElementById("result__value2").textContent = dataBase.noOfMatchedWords;
    document.getElementById("result__value3").textContent = dataBase.noOfCharsScrambled;
  }

  // DISPLAY SPINNER
  const toggleSpinner = (showSpinner) => {
    console.log("I ran o");
    const elem = document.getElementById("result__text");
    const spinner = "<span class='loading'></span>";
    if (showSpinner) {
      elem.innerHTML = '';
      elem.innerHTML = spinner;
    } else {
      elem.innerHTML = '';
    }
  }

  formButton.addEventListener("click", function(e) {
    // Preventing Page reload.
    e.preventDefault();

    // Start timer
    const startTime = performance.now();

    // Show Spinner
    toggleSpinner(true);

    // Storing valid inputs into the App Database
    appDatabase.sentenceToBeScrambled = input1.value;
    appDatabase.wordsToBeScrambled = input2.value.split(" ");
    appDatabase.scrambledSymbol = input3.value.trim() || "*";

    // Scrambling, stop timer, hide spinner, update UI
    const simulateDelay = function() {
      // Scramble
      scramble(appDatabase);
      // Hide Spinner
      toggleSpinner(false);
      //  Stop timer
      const stopTime = performance.now();
      appDatabase.timeUsed = `${((stopTime - startTime) / 1000).toFixed(3)}s`;
      // UPDATE UI
      displayResults(appDatabase);
    }
    // Simulate delay
    setTimeout(() => { simulateDelay() }, DELAY_SEC);
  });
}
// ======= DO NOT EDIT ============== //
export default startApp;
  // ======= EEND DO NOT EDIT ========= //

