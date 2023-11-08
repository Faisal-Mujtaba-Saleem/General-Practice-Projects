let button = document.getElementById("button");
let output = document.getElementById("outputtext");
let input = document.getElementById("userinput");

let number = Math.floor(Math.random() * 100);

button.addEventListener("click", function (e) {
  if (input.value == number) {
    output.innerHTML = `You guessed right, Your number was ${number}`;

    setTimeout(() => {
      let confirmation = confirm('Did you want to Play again this game?');
      confirmation ? location.reload() : undefined;
    }, "1000");
  } else if (input.value > number) {
    output.innerHTML = "You guessed high, try again!";
  }
  else if (input.value < number) {
    output.innerHTML = "You guessed low, Try again";
  }
  input.value = '';
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    console.log(event.key);
    button.click();
  }
})

