document.addEventListener("DOMContentLoaded", function () {

    const startBtn = document.getElementById("startButton");
    const startScreen = document.getElementById("start-screen");
    const choiceScreen = document.getElementById("choice-screen");
    const storyText = document.getElementById("storyText");

    const nameDisplay = document.getElementById("playerNameDisplay"); // shows name in title
    const nameInput = document.getElementById("playerNameInput");     // input field

    const choiceButtons = document.querySelectorAll(".choice-btn");


    // start button
    startBtn.addEventListener("click", function () {

        const name = nameInput.value.trim();

        if (name === "") {
            alert("Please enter your name before starting.");
            return;
        }

        nameDisplay.textContent = name;

        storyText.textContent = "The Cyclops stands before you, tall and almighty. " + name + ", defeat him.";

        startScreen.classList.add("hidden");
        choiceScreen.classList.remove("hidden");
    });


    // ATTACK BUTTONS
    choiceButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {

            const damage = Math.floor(Math.random() * 100) + 1;

            storyText.textContent =
                "The Cyclops is hit by the attack. It takes " + damage + " damage.";
        });
    });

});
