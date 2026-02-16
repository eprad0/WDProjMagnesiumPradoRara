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

        startScreen.classList.add("hidden");
        choiceScreen.classList.remove("hidden");

        battleScreen.classList.remove("hidden");
    });


    // ATTACK BUTTONS
    choiceButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {

            const damage = Math.floor(Math.random() * 100) + 1;

            if (sfxDamage) {
                sfxDamage.currentTime = 0;
                sfxDamage.play();
            }

            shake(bossSprite);

            bossHP = Math.max(0, bossHP - damage);
            bossHPValue.textContent = bossHP;

            storyText.textContent =
                "The Cyclops is hit by the attack. It takes " + damage + " damage.";
            
            if (sfxDamage) {
                sfxDamage.currentTime = 0;
                sfxDamage.play();
            }

            if (bossHP === 0) {
                storyText.textContent = "The Cyclops falls! You win the battle!";
                choiceScreen.classList.add("hidden");
            }
        });
    });

});
