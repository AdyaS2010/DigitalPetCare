// Global Variables
let petStats = {
    happiness: 100,
    hunger: 50,
    energy: 75,
    name: "Your Pet"
};

let petEmojis = ["🐱", "🐶", "🐰", "🐹", "🐨"];
let currentPetIndex = 0;
let coins = 100;
let clicksLeft = 10;

// HOME PAGE FUNCTIONS

// Function 1: Pet interaction with click response and DOM manipulation
function petInteraction() {
    const petElement = document.getElementById('petEmoji');
    const moodElement = document.getElementById('moodDisplay');
    
    if (!petElement) return; // Exit if not on home page
    
    // add a bounce animation
    petElement.classList.add('bounce');
    setTimeout(() => petElement.classList.remove('bounce'), 1000);
    
    // change pet type on click
    currentPetIndex = (currentPetIndex + 1) % petEmojis.length;
    petElement.textContent = petEmojis[currentPetIndex];
    
    // increase happiness slightly
    petStats.happiness = Math.min(100, petStats.happiness + 5);
    updateDisplay();
    
    // display interaction message
    if (moodElement) {
        moodElement.textContent = "Mood: Excited! 🤩 (You clicked me!)";
        setTimeout(() => updateMoodDisplay(), 2000);
    }
}

// Function 2: Pet care actions with conditionals and styling
function feedPet() {
    if (petStats.hunger <= 10) {
        alert("Your pet is already full! 🤤");
        return;
    }
    
    petStats.hunger = Math.max(0, petStats.hunger - 30);
    petStats.happiness = Math.min(100, petStats.happiness + 10);
    
    // Visual Feedback
    const petElement = document.getElementById('petEmoji');
    if (petElement) {
        petElement.style.transform = "scale(1.2)";
        petElement.style.color = "#ff6b6b";
        
        setTimeout(() => {
            petElement.style.transform = "scale(1)";
            petElement.style.color = "inherit";
        }, 500);
    }
    
    updateDisplay();
    const moodElement = document.getElementById('moodDisplay');
    if (moodElement) {
        moodElement.textContent = "Mood: Yummy! 😋 Thanks for the food!";
        setTimeout(() => updateMoodDisplay(), 3000);
    }
}

function playWithPet() {
    if (petStats.energy <= 10) {
        alert("Your pet is too tired to play! Let them rest first 😴");
        return;
    }
    
    petStats.energy = Math.max(0, petStats.energy - 20);
    petStats.happiness = Math.min(100, petStats.happiness + 15);
    petStats.hunger = Math.min(100, petStats.hunger + 10);
    
    updateDisplay();
    const moodElement = document.getElementById('moodDisplay');
    if (moodElement) {
        moodElement.textContent = "Mood: Playful! 🎉 That was fun!";
        setTimeout(() => updateMoodDisplay(), 3000);
    }
}

function restPet() {
    petStats.energy = Math.min(100, petStats.energy + 40);
    petStats.happiness = Math.min(100, petStats.happiness + 5);
    
    const petElement = document.getElementById('petEmoji');
    if (petElement) {
        petElement.style.opacity = "0.7";
        
        setTimeout(() => {
            petElement.style.opacity = "1";
        }, 1500);
    }
    
    updateDisplay();
    const moodElement = document.getElementById('moodDisplay');
    if (moodElement) {
        moodElement.textContent = "Mood: Refreshed! 😌 That was a good nap!";
        setTimeout(() => updateMoodDisplay(), 3000);
    }
}

// Function 3: Live name update with oninput event and variables
function updatePetNameLive() {
    const input = document.getElementById('petNameInput');
    const display = document.getElementById('petNameDisplay');
    
    if (!input || !display) return;
    
    if (input.value.trim() !== "") {
        display.textContent = input.value + " the Pet";
        display.style.color = "#4ecdc4";
        display.style.fontWeight = "bold";
    } else {
        display.textContent = "Your Pet";
        display.style.color = "inherit";
        display.style.fontWeight = "normal";
    }
}

function setPetName() {
    const input = document.getElementById('petNameInput');
    const display = document.getElementById('petNameDisplay');
    
    if (!input) return;
    
    if (input.value.trim() !== "") {
        petStats.name = input.value.trim();
        if (display) {
            display.textContent = petStats.name + " the Pet";
        }
        input.value = "";
        alert("Name set successfully! 🎉");
    } else {
        alert("Please enter a name first! 📝");
    }
}

// SHOP PAGE FUNCTIONS

// Function 1: Color picker with onchange event and visual feedback
function changePetColor() {
    const colorPicker = document.getElementById('colorPicker');
    const petPreview = document.getElementById('petPreview');
    
    if (petPreview && colorPicker) {
        petPreview.style.background = colorPicker.value;
        petPreview.style.transform = "scale(1.1)";
        petPreview.classList.add('pulse');
        
        setTimeout(() => {
            petPreview.style.transform = "scale(1)";
            petPreview.classList.remove('pulse');
        }, 300);
    }
}

// Function 2: Shopping system with conditionals and user interaction
function buyItem(item, cost) {
    if (coins >= cost) {
        coins -= cost;
        updateShopDisplay();
        
        let message = "";
        switch(item) {
            case 'ball':
                message = "🎾 Super Ball purchased! Your pet will be happier when playing!";
                break;
            case 'food':
                message = "🍖 Premium Food purchased! Your pet loves this treat!";
                break;
            case 'bed':
                message = "🛏️ Luxury Bed purchased! Your pet will rest better!";
                break;
        }
        
        // visual feedback --> successful purchase
        const coinDisplay = document.getElementById('coinCount');
        if (coinDisplay) {
            coinDisplay.style.color = "#ff6b6b";
            coinDisplay.style.transform = "scale(1.2)";
            setTimeout(() => {
                coinDisplay.style.color = "inherit";
                coinDisplay.style.transform = "scale(1)";
            }, 500);
        }
        
        alert(message);
    } else {
        alert("💸 Not enough coins! Play the mini-game to earn more!");
    }
}

// Function 3: Mini-game with click events and dynamic updates
function collectCoin() {
    const button = document.getElementById('coinButton');
    const clicksDisplay = document.getElementById('clicksLeft');
    
    if (clicksLeft > 0) {
        coins += 5;
        clicksLeft--;
        
        // visual feedback
        if (button) {
            button.style.transform = "scale(0.8)";
            button.style.background = "linear-gradient(45deg, #32cd32, #90ee90)";
            
            setTimeout(() => {
                button.style.transform = "scale(1)";
                button.style.background = "linear-gradient(45deg, #ffd700, #ffed4e)";
            }, 150);
        }
        
        updateShopDisplay();
        
        if (clicksLeft === 0) {
            setTimeout(() => {
                alert("🎉 Mini-game complete! You earned bonus coins!");
            }, 200);
        }
    }
}

function resetMiniGame() {
    clicksLeft = 10;
    const clicksDisplay = document.getElementById('clicksLeft');
    const button = document.getElementById('coinButton');
    
    if (clicksDisplay) {
        clicksDisplay.textContent = clicksLeft;
        clicksDisplay.style.color = "#4ecdc4";
        clicksDisplay.style.fontWeight = "bold";
    }
    
    if (button) {
        button.style.opacity = "1";
        button.style.cursor = "pointer";
    }
}

// HELPER FUNCTIONS

function updateDisplay() {
    const happinessEl = document.getElementById('happinessValue');
    const hungerEl = document.getElementById('hungerValue');
    const energyEl = document.getElementById('energyValue');
    
    if (happinessEl) happinessEl.textContent = petStats.happiness;
    if (hungerEl) hungerEl.textContent = petStats.hunger;
    if (energyEl) energyEl.textContent = petStats.energy;
}

function updateMoodDisplay() {
    const moodElement = document.getElementById('moodDisplay');
    if (!moodElement) return;
    
    if (petStats.happiness >= 80) {
        moodElement.textContent = "Mood: Very Happy! 😄";
        moodElement.style.borderLeftColor = "#32cd32";
    } else if (petStats.happiness >= 60) {
        moodElement.textContent = "Mood: Happy 😊";
        moodElement.style.borderLeftColor = "#4ecdc4";
    } else if (petStats.happiness >= 40) {
        moodElement.textContent = "Mood: Okay 😐";
        moodElement.style.borderLeftColor = "#ffd700";
    } else if (petStats.happiness >= 20) {
        moodElement.textContent = "Mood: Sad 😢";
        moodElement.style.borderLeftColor = "#ff8c00";
    } else {
        moodElement.textContent = "Mood: Very Sad 😭";
        moodElement.style.borderLeftColor = "#ff6b6b";
    }
}

function updateShopDisplay() {
    const coinDisplay = document.getElementById('coinCount');
    const clicksDisplay = document.getElementById('clicksLeft');
    
    if (coinDisplay) coinDisplay.textContent = coins;
    if (clicksDisplay) clicksDisplay.textContent = clicksLeft;
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    // Initialize home page- if elements exist
    if (document.getElementById('petEmoji')) {
        updateDisplay();
        updateMoodDisplay();
    }
    
    // Initialize shop page- if elements exist
    if (document.getElementById('coinCount')) {
        updateShopDisplay();
    }
    
    // event listeners (better interactivity)
    const petEmoji = document.getElementById('petEmoji');
    if (petEmoji) {
        petEmoji.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        petEmoji.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // keyboard support for mini-game
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && document.getElementById('coinButton')) {
            event.preventDefault();
            collectCoin();
        }
    });
});
