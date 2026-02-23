document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('login-form');
  const username = document.getElementById('username');
  const remember = form.querySelector('input[name="remember"]');

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

    // Remember preference (demo only - not secure authentication)
    try{
      if(remember.checked) localStorage.setItem('rememberedUser', name);
      else localStorage.removeItem('rememberedUser');
    }catch(e){/* ignore */}

    // TODO: replace with real authentication request
    alert('Signed in as ' + name + ' (demo)');
  });
});
