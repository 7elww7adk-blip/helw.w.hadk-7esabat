window.showToast = function (message, isError = false) {
  const toast = document.getElementById('toast');
  toast.style.display = 'block';
  toast.style.background = isError ? '#b91c1c' : '#111827';
  toast.textContent = message;
  setTimeout(() => toast.style.display = 'none', 2400);
};
