document.addEventListener('DOMContentLoaded', () => {
    const coin = document.getElementById('coin');
    const flipBtn = document.getElementById('flip-btn');
    const resetBtn = document.getElementById('reset-btn');
    const headsCountEl = document.getElementById('heads-count');
    const tailsCountEl = document.getElementById('tails-count');
    const resultText = document.getElementById('result-text');

    let heads = 0;
    let tails = 0;
    let isFlipping = false;
    let currentRotation = 0;

    flipBtn.addEventListener('click', () => {
        if (isFlipping) return;
        isFlipping = true;
        flipBtn.disabled = true;
        resultText.classList.remove('highlight');
        
        // Randomly determine result (true = heads, false = tails)
        const isHeads = Math.random() < 0.5;
        
        // Base spins: at least 5 full rotations (5 * 360 = 1800)
        const baseSpins = 5 * 360; 
        
        // Calculate the next rotation absolute value
        let nextRotation = currentRotation + baseSpins;
        
        if (isHeads) {
            // Heads: Final rotation must be a multiple of 360
            nextRotation = Math.ceil(nextRotation / 360) * 360;
        } else {
            // Tails: Final rotation must be an odd multiple of 180
            // i.e. 180, 540, 900, 1260, etc.
            nextRotation = Math.ceil(nextRotation / 360) * 360 + 180;
        }
        
        // Start animation
        coin.style.transition = 'transform 3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        coin.style.transform = `rotateX(${nextRotation}deg)`;
        currentRotation = nextRotation;
        
        resultText.textContent = "Flipping...";
        
        // Wait for animation to finish
        setTimeout(() => {
            if (isHeads) {
                heads++;
                headsCountEl.textContent = heads;
                resultText.textContent = "It's Heads!";
            } else {
                tails++;
                tailsCountEl.textContent = tails;
                resultText.textContent = "It's Tails!";
            }
            
            resultText.classList.add('highlight');
            isFlipping = false;
            flipBtn.disabled = false;
            
        }, 3000); // Matches the CSS transition duration
    });

    resetBtn.addEventListener('click', () => {
        if (isFlipping) return;
        
        heads = 0;
        tails = 0;
        headsCountEl.textContent = heads;
        tailsCountEl.textContent = tails;
        
        resultText.classList.remove('highlight');
        resultText.textContent = "Ready to flip!";
        
        // Reset rotation smoothly to 0
        currentRotation = 0;
        coin.style.transition = 'transform 0.5s ease-out';
        coin.style.transform = `rotateX(${currentRotation}deg)`;
    });
});
