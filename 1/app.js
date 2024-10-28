const emojis = ['😀', '😂', '😍', '😎', '🤔', '😴', '🥳', '🤯', '😡', '👻', '🎃', '👽'];
const selectedEmojis = [];

const emojiGrid = document.getElementById('emoji-grid');
const checkoutModal = document.getElementById('checkout-modal');
const selectedEmojisContainer = document.getElementById('selected-emojis');
const sliderValueDisplay = document.getElementById('slider-value');

// Create the emoji grid dynamically
emojis.forEach((emoji, index) => {
  const emojiElement = document.createElement('div');
  emojiElement.classList.add('emoji');
  emojiElement.innerHTML = emoji;
  emojiElement.addEventListener('click', () => toggleEmojiSelection(emojiElement, emoji));
  emojiGrid.appendChild(emojiElement);
});

// Toggle emoji selection
function toggleEmojiSelection(element, emoji) {
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    const index = selectedEmojis.indexOf(emoji);
    if (index > -1) {
      selectedEmojis.splice(index, 1);
    }
  } else {
    element.classList.add('selected');
    selectedEmojis.push(emoji);
  }
}

// Handle checkout
function checkout() {
  selectedEmojisContainer.innerHTML = selectedEmojis.join(' ');
  checkoutModal.style.display = 'flex';
}

// Update slider value
function updateSliderValue(value) {
  sliderValueDisplay.textContent = value;
}

// Confirm purchase
function confirmPurchase() {
  const solanaAmount = document.getElementById('solana-amount').value;
  const perEmojiAmount = solanaAmount / selectedEmojis.length;

  alert(`You have allocated ${perEmojiAmount.toFixed(2)} SOL to each emoji.`);
  checkoutModal.style.display = 'none';
}
