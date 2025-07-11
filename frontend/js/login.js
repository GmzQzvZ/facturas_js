document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      alert('Por favor ingresa usuario y contraseña.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok) {
        // alert(`Bienvenido, ${result.usuario}`);
        window.location.href = 'home.html'; // redirige al home
      } else {
        alert(`❌ ${result.error || 'Credenciales inválidas'}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('❌ Error al conectar con el servidor');
    }
  });
});
