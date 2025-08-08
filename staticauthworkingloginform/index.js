document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }

  try {
    const response = await fetch('https://os-project-server.vercel.app/auth/existinguser', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem('authToken', data.token);
      window.location.href = 'dashboard.html';
    } 
    else if (response.status === 401) {
      throw new Error('Invalid username or password');
    }
    else {
      throw new Error(data.message || `Login failed (Status: ${response.status})`);
    }

  } catch (error) {
    console.error('Login Error:', error);
    alert(error.message || 'An error occurred during login');
    
    if (confirm('Use demo mode?')) {
      localStorage.setItem('authToken', 'demo-token-' + username);
      window.location.href = 'dashboard.html';
    }
  }
});
