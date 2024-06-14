document.addEventListener('DOMContentLoaded', function() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
      const loginDiv = document.getElementById('login');
      const registroDiv = document.getElementById('registro');
      if (this.value === 'login') {
        loginDiv.style.display = 'block';
        registroDiv.style.display = 'none';
      } else if (this.value === 'registro') {
        loginDiv.style.display = 'none';
        registroDiv.style.display = 'block';
      }
    });
  });
});