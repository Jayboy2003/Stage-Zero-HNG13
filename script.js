// script.js
const timeEl = document.querySelector('[data-testid="test-user-time"]');
if (timeEl) {
  const updateTime = () => {
    timeEl.textContent = Date.now().toString();
  };
  updateTime();
  setInterval(updateTime, 1000);
}
