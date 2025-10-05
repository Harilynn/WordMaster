// script.js

// Array of words to choose from with progressive hints
const wordsData = [
    { 
        word: "java", 
        hints: [
            "A popular programming language",
            "Object-oriented and platform independent", 
            "Used for enterprise applications",
            "Write once, run anywhere!",
            "Starts with 'J' and has 4 letters",
            "Famous for coffee-related naming!"
        ] 
    },
    { 
        word: "javascript", 
        hints: [
            "The language of the web",
            "Runs in browsers and servers", 
            "Dynamic and interpreted",
            "Powers modern web applications!",
            "Starts with 'J' and has 10 letters",
            "Not related to Java despite the name!"
        ] 
    },
    { 
        word: "python", 
        hints: [
            "Named after a comedy group",
            "Great for data science", 
            "Popular in AI and machine learning",
            "Simple and readable syntax!",
            "Starts with 'P' and has 6 letters",
            "Think of a snake!"
        ] 
    },
    { 
        word: "pascal", 
        hints: [
            "Named after a mathematician",
            "Great for learning programming", 
            "Structured programming language",
            "Used in computer science education!",
            "Starts with 'P' and has 6 letters",
            "Named after Blaise ___!"
        ] 
    },
    { 
        word: "ruby", 
        hints: [
            "A precious gem of programming",
            "Designed for programmer happiness", 
            "Powers many web applications",
            "Elegant and expressive syntax!",
            "Starts with 'R' and has 4 letters",
            "Think of a red gemstone!"
        ] 
    },
    { 
        word: "perl", 
        hints: [
            "Great for text processing",
            "Popular in system administration", 
            "Regular expressions champion",
            "There's more than one way to do it!",
            "Starts with 'P' and has 4 letters",
            "Sounds like a precious object!"
        ] 
    },
    { 
        word: "swift", 
        hints: [
            "Apple's modern language",
            "Used for iOS development", 
            "Fast and safe",
            "Soaring to new heights!",
            "Starts with 'S' and has 5 letters",
            "Think of speed and birds!"
        ] 
    },
    { 
        word: "kotlin", 
        hints: [
            "Modern Android development",
            "Interoperable with Java", 
            "Concise and expressive",
            "Google's preferred language!",
            "Starts with 'K' and has 6 letters",
            "Named after an island near Russia!"
        ] 
    }
];

// Game state variables
let randomIndex = Math.floor(Math.random() * wordsData.length);
let selectedWordData = wordsData[randomIndex];
let selectedWord = selectedWordData.word;
let hints = selectedWordData.hints;
let currentHintIndex = 0;
let guessedlist = [];
let correctGuesses = 0;
let totalAttempts = 0;

console.log("Selected word:", selectedWord);

// Sticker emojis for celebrations
const stickers = ["🎉", "⭐", "✨", "🎊", "🏆", "💎", "🔥", "🚀", "🌟", "💫"];

// Celebration messages for correct guesses
const celebrationMessages = [
    "Great guess! 🎉",
    "Keep going! ⭐", 
    "You're close! ✨",
    "Amazing! 🔥",
    "Almost there! 💎",
    "Fantastic! 🚀",
    "You're doing great! 🌟",
    "Nice work! 🎊",
    "Keep it up! 🏆",
    "Excellent! 💫",
    "So close now! �",
    "You've got this! 💪",
    "Perfect guess! ⚡",
    "Well done! �",
    "Getting closer! 🎪"
];

// Initialize the game
function initializeGame() {
    updateWordDisplay();
    updateHint();
    updateStats();
    updateProgress();
    updateGuessedLetters();
    
    // Hide play again button
    document.getElementById("playAgainContainer").style.display = "none";
}

// Start a new game with a different word
function startNewGame() {
    // Hide play again button with animation
    const playAgainContainer = document.getElementById("playAgainContainer");
    playAgainContainer.style.animation = "slideOutDown 0.3s ease-in";
    
    setTimeout(() => {
        playAgainContainer.style.display = "none";
        
        // Reset all game variables
        let previousWord = selectedWord;
        
        // Get a new random word (make sure it's different from previous)
        do {
            randomIndex = Math.floor(Math.random() * wordsData.length);
            selectedWordData = wordsData[randomIndex];
            selectedWord = selectedWordData.word;
        } while (selectedWord === previousWord && wordsData.length > 1);
        
        hints = selectedWordData.hints;
        currentHintIndex = 0;
        guessedlist = [];
        correctGuesses = 0;
        totalAttempts = 0;
        
        console.log("New word selected:", selectedWord);
        
        // Reset UI elements
        initializeGame();
        
        // Clear input and focus
        const inputElement = document.getElementById("letter-input");
        inputElement.value = "";
        inputElement.focus();
        
        // Add a little celebration for new game
        showNewGameAnimation();
        
    }, 300);
}

// Show animation when starting new game
function showNewGameAnimation() {
    const card = document.querySelector(".card");
    card.style.animation = "newGamePulse 0.6s ease-out";
    
    setTimeout(() => {
        card.style.animation = "";
    }, 600);
}

// Update word display
function updateWordDisplay() {
    let displayWord = "";
    for (let i = 0; i < selectedWord.length; i++) {
        displayWord += "_ ";
    }
    document.getElementById("displayWord").textContent = displayWord;
}

// Update hint with current hint from array - changes with every guess
function updateHint() {
    const hintElement = document.getElementById("hintText");
    
    // Move to next hint regardless of correct/incorrect guess
    if (currentHintIndex < hints.length - 1) {
        currentHintIndex++;
    }
    
    hintElement.textContent = hints[currentHintIndex];
    hintElement.style.animation = "none";
    setTimeout(() => {
        hintElement.style.animation = "pulse 2s infinite";
    }, 10);
}

// Update game statistics
function updateStats() {
    document.getElementById("attempts").textContent = totalAttempts;
    document.getElementById("correctGuesses").textContent = correctGuesses;
}

// Update progress bar
function updateProgress() {
    const totalLetters = new Set(selectedWord).size; // Unique letters
    const guessedUniqueLetters = new Set(guessedlist.filter(letter => selectedWord.includes(letter))).size;
    const progress = Math.round((guessedUniqueLetters / totalLetters) * 100);
    
    document.getElementById("progressFill").style.width = progress + "%";
    document.getElementById("progressText").textContent = progress + "%";
}

// Update guessed letters display
function updateGuessedLetters() {
    const guessedElement = document.getElementById("guessedLetters");
    if (guessedlist.length === 0) {
        guessedElement.textContent = "None yet";
    } else {
        guessedElement.textContent = guessedlist.join(", ").toUpperCase();
    }
}

// Create celebrating pop-up text for correct guesses
function createCelebrationPopup() {
    const stickersContainer = document.getElementById("stickersContainer");
    const popup = document.createElement("div");
    popup.className = "celebration-popup";
    popup.textContent = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
    
    console.log("Creating celebration popup:", popup.textContent);
    
    stickersContainer.appendChild(popup);
    
    // Create icons that scatter from the popup after a short delay
    setTimeout(() => {
        createScatteringIcons(popup, 6); // 6 icons for correct guess
    }, 300);
    
    // Remove popup after animation
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 2500);
}

// Create congratulations pop-up for winning
function createCongratulationsPopup() {
    const stickersContainer = document.getElementById("stickersContainer");
    const popup = document.createElement("div");
    popup.className = "congratulations-popup";
    popup.innerHTML = "🎉 CONGRATULATIONS! 🎉<br><span style='font-size: 1.5rem;'>You guessed it right!</span>";
    
    console.log("Creating congratulations popup");
    
    stickersContainer.appendChild(popup);
    
    // Create more icons that scatter from the winning popup
    setTimeout(() => {
        createScatteringIcons(popup, 12); // 12 icons for winning
    }, 500);
    
    // Remove popup after animation
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 4000);
}
// Create icons that scatter outwards from a popup element
function createScatteringIcons(sourceElement, iconCount = 8) {
    const stickersContainer = document.getElementById("stickersContainer");
    const sourceRect = sourceElement.getBoundingClientRect();
    
    // Get the center of the source popup
    const centerX = sourceRect.left + sourceRect.width / 2;
    const centerY = sourceRect.top + sourceRect.height / 2;
    
    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement("div");
        icon.className = "scattered-icon";
        icon.textContent = stickers[Math.floor(Math.random() * stickers.length)];
        
        // Calculate scatter direction (360 degrees divided by number of icons)
        const angle = (360 / iconCount) * i + (Math.random() - 0.5) * 60; // Add some randomness
        const distance = 150 + Math.random() * 100; // Random distance 150-250px
        
        // Convert angle to radians and calculate end position
        const radian = (angle * Math.PI) / 180;
        const endX = centerX + Math.cos(radian) * distance;
        const endY = centerY + Math.sin(radian) * distance;
        
        // Set initial position at popup center
        icon.style.left = centerX + "px";
        icon.style.top = centerY + "px";
        icon.style.setProperty('--end-x', endX + 'px');
        icon.style.setProperty('--end-y', endY + 'px');
        
        // Add random colors and sizes
        const colors = ['#fbbf24', '#f472b6', '#06d6a0', '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff9f43', '#ee5a52', '#0abde3'];
        icon.style.color = colors[Math.floor(Math.random() * colors.length)];
        icon.style.fontSize = (1.5 + Math.random() * 1) + 'rem'; // 1.5-2.5rem
        
        stickersContainer.appendChild(icon);
        
        // Remove icon after animation
        setTimeout(() => {
            if (icon.parentNode) {
                icon.remove();
            }
        }, 2000);
    }
}

// Enhanced guess letter function
function guessLetter() {
    const inputElement = document.getElementById("letter-input");
    
    // Check empty input
    if (!inputElement.value) {
        showAlert("Empty Input box. Please add input letter", "warning");
        return;
    }
    
    let letter = inputElement.value.toLowerCase();
    
    // Clear the input field
    inputElement.value = "";
    
    // Check if the letter has already been guessed
    if (guessedlist.includes(letter)) {
        showAlert("You have already guessed that letter!", "info");
        return;
    }
    
    // Add the letter to the guessed letters array
    guessedlist.push(letter);
    totalAttempts++;
    
    // Update hint with every guess (regardless of correct/incorrect)
    updateHint();
    
    // Check if letter is correct
    let isCorrect = selectedWord.includes(letter);
    if (isCorrect) {
        correctGuesses++;
        // Celebration will handle icons from popup
    }
    
    // Update the word display based on the guessed letters
    let updatedDisplay = "";
    let allLettersGuessed = true;
    for (let i = 0; i < selectedWord.length; i++) {
        if (guessedlist.includes(selectedWord[i])) {
            updatedDisplay += selectedWord[i].toUpperCase() + " ";
        } else {
            updatedDisplay += "_ ";
            allLettersGuessed = false;
        }
    }
    document.getElementById("displayWord").textContent = updatedDisplay;
    
    // Update all UI elements
    updateStats();
    updateProgress();
    updateGuessedLetters();
    
    // Check if all letters have been guessed
    if (allLettersGuessed) {
        setTimeout(() => {
            createCongratulationsPopup();
            showPlayAgainButton(); // Show play again button after winning
        }, 500);
    } else if (isCorrect) {
        // Only show celebration popup if word is not completed
        createCelebrationPopup();
    }
}

// Show custom alert (you can replace with a more stylish modal)
function showAlert(message, type) {
    // For now using alert, but you can enhance this with custom modals
    alert(message);
}

// Win animation is now handled by congratulations popup scattering

// Show play again button after winning
function showPlayAgainButton() {
    setTimeout(() => {
        const playAgainContainer = document.getElementById("playAgainContainer");
        playAgainContainer.style.display = "block";
        playAgainContainer.style.animation = "slideInUp 0.5s ease-out";
    }, 2000); // Show after 2 seconds
}

// Add enter key support
document.addEventListener("DOMContentLoaded", function() {
    const letterInput = document.getElementById("letter-input");
    
    letterInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            guessLetter();
        }
    });
    
    // Initialize the game when page loads
    initializeGame();
});

// Auto-focus input field
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("letter-input").focus();
});