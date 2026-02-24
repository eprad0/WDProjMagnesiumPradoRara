document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('login-form');
  const username = document.getElementById('username');
  const remember = form.querySelector('input[name="remember"]');
  const toggle = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');

  // Prefill username if previously remembered
  try{
    const saved = localStorage.getItem('rememberedUser');
    if(saved){ username.value = saved; remember.checked = true; }
  }catch(e){/* ignore storage errors */}

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = username.value.trim();
    const pass = document.getElementById('password').value;
    if(!name){ alert('Please enter your username or email.'); username.focus(); return; }
    if(!pass){ alert('Please enter your password.'); document.getElementById('password').focus(); return; }
    // Simple credential handling (demo only: stores plaintext in localStorage)
    try{
      const credKey = 'userCredentials';
      const raw = localStorage.getItem(credKey);
      const creds = raw ? JSON.parse(raw) : {};

      // If username exists, require same password
      if(creds[name]){
        if(creds[name] !== pass){
          alert('Password does not match the existing account for this username.');
          document.getElementById('password').focus();
          return;
        }
        // password matches -> sign in
      } else {
        // new username -> register locally (demo)
        creds[name] = pass;
        localStorage.setItem(credKey, JSON.stringify(creds));
      }

      if(remember.checked) localStorage.setItem('rememberedUser', name);
      else localStorage.removeItem('rememberedUser');
      // mark current signed-in user (used by results history)
      localStorage.setItem('currentUser', name);
    }catch(e){console.warn('storage error', e)}

    alert('Signed in as ' + name + ' (demo)');
  });

  // show/hide password toggle
  if(toggle && passwordInput){
    toggle.addEventListener('click', function(){
      if(passwordInput.type === 'password'){
        passwordInput.type = 'text';
        toggle.textContent = 'Hide';
        toggle.setAttribute('aria-label','Hide password');
      } else {
        passwordInput.type = 'password';
        toggle.textContent = 'Show';
        toggle.setAttribute('aria-label','Show password');
      }
    });
  }
});
