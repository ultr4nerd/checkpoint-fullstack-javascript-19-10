const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const errorParagraph = document.querySelector('#error');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const email = encodeURIComponent(emailInput.value);
  const password = encodeURIComponent(passwordInput.value);
  const body = [`email=${email}`, `password=${password}`].join('&');

  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  const data = await response.json();

  if (data.error) {
    errorParagraph.textContent = data.error;
  } else {
    localStorage.setItem('token', data.token);
    location.href = 'users.html';
  }
});
