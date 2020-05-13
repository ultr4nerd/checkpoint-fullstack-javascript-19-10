const usersList = document.querySelector('#users');
const buttons = document.querySelector('#buttons');

document.addEventListener('DOMContentLoaded', async function (event) {
  const token = localStorage.getItem('token');

  if (token) {
    const response = await fetch('http://localhost:3000/auth/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.error) {
      localStorage.clear('token');
      location.href = 'index.html';
    } else {
      let html = '';

      for (const user of data) {
        html += `<li>${user.email} (${user._id})<li>\n`;
      }
      usersList.innerHTML = html;
      buttons.innerHTML = `
        <button id="logout">Cerrar Sesión</button>
      `;
      document.querySelector('#logout').addEventListener('click', () => {
        localStorage.clear('token');
        location.href = 'index.html';
      });
    }
  } else {
    buttons.innerHTML = `
      <a href="index.html">Iniciar sesión para ver usuarios</a>
    `;
  }
});
