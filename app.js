const emojiCategories = {
  '500k': ['😀', '😂', '😍', '😎'],
  '100k': ['🤔', '😴', '🥳', '🤯'],
  '50k': ['😡', '👻', '🎃', '👽']
};

const selectedEmojis = [];

// Render emojis for each category
function renderEmojiGrid(category, emojiList) {
  const emojiGrid = document.getElementById(`emoji-grid-${category}`);
  emojiList.forEach((emoji) => {
    const emojiElement = document.createElement('div');
    emojiElement.classList.add('emoji');
    emojiElement.innerHTML = emoji;
    emojiElement.addEventListener('click', () => toggleEmojiSelection(emojiElement, emoji));
    emojiGrid.appendChild(emojiElement);
  });
}

// Initialize emoji grids for each category
renderEmojiGrid('500k', emojiCategories['500k']);
renderEmojiGrid('100k', emojiCategories['100k']);
renderEmojiGrid('50k', emojiCategories['50k']);

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
  const selectedEmojisContainer = document.getElementById('selected-emojis');
  //selectedEmojisContainer.innerHTML = selectedEmojis.join(' ');

  const solanaAmount = document.getElementById('solana-amount').value;
  updateEmojiAllocation(solanaAmount);

  const checkoutModal = document.getElementById('checkout-modal');
  checkoutModal.style.display = 'flex';
}

// Update slider value
function updateSliderValue(value) {
  const sliderValueDisplay = document.getElementById('slider-value');
  sliderValueDisplay.textContent = value;
  updateEmojiAllocation(value);
}

// Update emoji allocation based on total SOL and selected emojis
function updateEmojiAllocation(solanaAmount) {
  const emojiAllocation = document.getElementById('emoji-allocation');
  emojiAllocation.innerHTML = '';

  if (selectedEmojis.length > 0) {
    const perEmojiAmount = 5;
    selectedEmojis.forEach(emoji => {
      const emojiElement = document.createElement('div');
      emojiElement.textContent = `${emoji}: ${perEmojiAmount.toFixed(2)}`;
      emojiAllocation.appendChild(emojiElement);
    });

    // Generate QR code based on total SOL and selected emojis
    generateQRCode(solanaAmount);
  }
}

// Generate QR code for sending SOL
function generateQRCode(amount) {
  const qrCodeContainer = document.getElementById('qr-code-container');
  qrCodeContainer.innerHTML = '';

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example`;
  const qrCodeImage = document.createElement('img');
  qrCodeImage.src = qrCodeUrl;
  qrCodeContainer.appendChild(qrCodeImage);
}

// Confirm purchase
function confirmPurchase() {
  const solanaAmount = document.getElementById('solana-amount').value;
  const perEmojiAmount = solanaAmount / selectedEmojis.length;

  alert(`You have allocated ${perEmojiAmount.toFixed(2)} SOL to each emoji.`);
  const checkoutModal = document.getElementById('checkout-modal');
  checkoutModal.style.display = 'none';
}
