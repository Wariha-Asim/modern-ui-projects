document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://os-project-server.vercel.app/auth/newuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Registration successful! Please login.');
      window.location.href = 'index.html';
    } else {
      alert(data.error || 'Registration failed');
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
});