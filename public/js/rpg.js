document.addEventListener("DOMContentLoaded", function () {

    const startBtn = document.getElementById("startButton");
    const startScreen = document.getElementById("start-screen");
    const choiceScreen = document.getElementById("choice-screen");
    const storyText = document.getElementById("storyText");

    const nameDisplay = document.getElementById("playerNameDisplay"); 
    const nameInput = document.getElementById("playerNameInput");     

    const choiceButtons = document.querySelectorAll(".choice-btn");

    const battleScreen = document.getElementById("battle-screen");
    const battleTitle = document.getElementById("battleTitle");
    const playerNameLabel = document.getElementById("playerNameLabel");
    const playerHPValue = document.getElementById("playerHPValue");
    const bossHPValue = document.getElementById("bossHPValue");
    const bossSprite = document.getElementById("bossSprite");
    const sfxDamage = document.getElementById("sfxDamage");

    let playerHP = 200;
    let bossHP = 250;

    const shakeStyle = document.createElement("style");
    shakeStyle.textContent = `
        @keyframes rpgShake {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-6px, 0); }
            40% { transform: translate(6px, 0); }
            60% { transform: translate(-6px, 0); }
            80% { transform: translate(6px, 0); }
            100% { transform: translate(0, 0); }
        }
        .rpg-shake {
            animation: rpgShake 0.22s linear 1;
        }
    `;
    document.head.appendChild(shakeStyle);

    function shake(el) {
        if (!el) return;
        el.classList.remove("rpg-shake");
        void el.offsetWidth; // restart animation
        el.classList.add("rpg-shake");
    }


    // start button
    startBtn.addEventListener("click", function () {

        //trimming name and chekcing for one

        const name = nameInput.value.trim();

        if (name === "") {
            alert("Please enter your name before starting.");
            return;
        }

        nameDisplay.textContent = name;

        storyText.textContent = "The Cyclops stands before you, tall and almighty. " + name + ", defeat him.";

        battleTitle.textContent = name + " vs Cyclops";
        playerNameLabel.textContent = name;

        playerHP = 200;
        bossHP = 250;
        playerHPValue.textContent = playerHP;
        bossHPValue.textContent = bossHP;

        //hiding start screen and entering battle

        startScreen.classList.add("hidden");
        choiceScreen.classList.remove("hidden");

        battleScreen.classList.remove("hidden");
    });


    // ATTACK BUTTONS
    choiceButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {

        const choice = btn.dataset.choice;

        // risk system, the more powerful the move, the higher chance/risk it is to take higher damage from the boss

        const moves = {
            "1": { name: "Grab the Cyclops",  min: 15, max: 25, highChance: 0.10 },
            "3": { name: "Swing at him",      min: 25, max: 40, highChance: 0.20 },
            "4": { name: "Flurry of Kicks",   min: 35, max: 55, highChance: 0.35 },
            "2": { name: "Devastating Smash", min: 60, max: 90, highChance: 0.55 }
        };

        const move = moves[choice];

        //calculating amt of damage

        const damage = Math.floor(Math.random() * (move.max - move.min + 1)) + move.min;

        //boss damage animation

        if (sfxDamage) {
            sfxDamage.currentTime = 0;
            sfxDamage.play();
        }

        shake(bossSprite);

        bossHP = Math.max(0, bossHP - damage);
        bossHPValue.textContent = bossHP;

        if (bossHP === 0) {
            storyText.textContent = "The Cyclops falls! You win the battle!";
            choiceScreen.classList.add("hidden");
            return;
        }

        const randomization = Math.random();
        let bossDamage;

        //calculating boss recoil

        if (randomization < move.highChance) {
            bossDamage = Math.floor(Math.random() * (120 - 70 + 1)) + 70;
        } else {
            bossDamage = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        }

        playerHP = Math.max(0, playerHP - bossDamage);
        playerHPValue.textContent = playerHP;

        storyText.textContent =
            move.name + " hits for " + damage + " damage. " +
            "The Cyclops strikes back! You take " + bossDamage + " damage.";

        if (playerHP === 0) {
            storyText.textContent = "You died... Play again?";
            choiceScreen.classList.add("hidden");
        }
    });
});


});
