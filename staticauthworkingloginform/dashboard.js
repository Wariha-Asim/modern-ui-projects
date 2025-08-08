document.addEventListener('DOMContentLoaded', function() {
  const welcomeMessage = document.getElementById('welcomeMessage');
  const logoutBtn = document.getElementById('logoutBtn');
  
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const decodedToken = jwt_decode(token);
    
    if (decodedToken.username) {
      welcomeMessage.textContent = `Welcome, ${decodedToken.username}!`;
    } else if (decodedToken.email) {
      const username = decodedToken.email.split('@')[0];
      welcomeMessage.textContent = `Welcome, ${username}!`;
    } else {
      welcomeMessage.textContent = 'Welcome back!';
    }

    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('authToken');
      window.location.href = 'index.html';
    });

    setTimeout(function() {
      localStorage.removeItem('authToken');
      window.location.href = 'index.html';
    }, 3600000);
  } catch (error) {
    console.error('Token Error:', error);
    localStorage.removeItem('authToken');
    alert('Session expired. Please login again.');
    window.location.href = 'index.html';
  }
});
