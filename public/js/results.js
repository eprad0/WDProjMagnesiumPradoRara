document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const score = parseInt(params.get("score"), 10);

  const godNameEl = document.getElementById("godName");
  const godDescEl = document.getElementById("godDesc");
  const scoreTextEl = document.getElementById("scoreText");
  const godImgEl = document.getElementById("godImg");

  if (isNaN(score)) {
    godNameEl.textContent = "Unknown";
    godDescEl.textContent = "No score received.";
    return;
  }

  let god = "";
  let desc = "";
  let img = "";

  if (score <= 700) {
    god = "Ares";
    desc = "Bold, competitive, and fearless.";
    img = "../../assets/gods/ares.png";
  }
  else if (score <= 1000) {
    god = "Athena";
    desc = "Wise, strategic, and analytical.";
    img = "../../assets/gods/athena.png";
  }
  else if (score <= 1300) {
    god = "Zeus";
    desc = "Confident, commanding, natural leader.";
    img = "../../assets/gods/zeus.png";
  }
  else {
    god = "Apollo";
    desc = "Creative, expressive, and imaginative.";
    img = "../../assets/gods/apollo.png";
  }

  godNameEl.textContent = god;
  godDescEl.textContent = desc;
  scoreTextEl.textContent = `Score: ${score}`;
  godImgEl.src = img;

  // Save this result to localStorage (history)
  try{
    const key = 'quizResults';
    const currentUser = localStorage.getItem('currentUser') || null;
    const entry = { date: new Date().toISOString(), god, score, user: currentUser };
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift(entry); // newest first
    // keep at most 20 entries
    if(arr.length > 20) arr.length = 20;
    localStorage.setItem(key, JSON.stringify(arr));
  }catch(e){console.warn('Could not save quiz result', e)}

  // History modal handling
  const showBtn = document.getElementById('show-history');
  const modal = document.getElementById('history-modal');
  const closeBtn = document.getElementById('close-history');
  const listEl = document.getElementById('history-list');
  const saveBtn = document.getElementById('save-result');

  function renderHistory(){
    listEl.innerHTML = '';
    try{
      const arr = JSON.parse(localStorage.getItem('quizResults') || '[]');
      if(!arr.length){
        listEl.innerHTML = '<li>No saved results.</li>';
        return;
      }
      for(const it of arr){
        const d = new Date(it.date);
        const li = document.createElement('li');
        const who = it.user ? ` — ${it.user}` : '';
        li.textContent = `${d.toLocaleString()} — ${it.god} (Score: ${it.score})${who}`;
        listEl.appendChild(li);
      }
    }catch(e){ listEl.innerHTML = '<li>Error reading history</li>'; }
  }

  if(showBtn && modal){
    showBtn.addEventListener('click', function(){ renderHistory(); modal.style.display = 'block'; modal.setAttribute('aria-hidden','false'); });
  }
  if(closeBtn && modal){
    closeBtn.addEventListener('click', function(){ modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); });
  }

  // explicit save button (saves shown result regardless of initial auto-save)
  function saveEntry(userOverride){
    try{
      const key = 'quizResults';
      const user = (userOverride !== undefined) ? userOverride : (localStorage.getItem('currentUser') || null);
      const entry = { date: new Date().toISOString(), god, score, user };
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(entry);
      if(arr.length > 20) arr.length = 20;
      localStorage.setItem(key, JSON.stringify(arr));
      alert('Result saved' + (user ? (' for ' + user) : ' (anonymous)'));
    }catch(e){ console.warn('Could not save quiz result', e); alert('Could not save result.'); }
  }

  if(saveBtn){
    saveBtn.addEventListener('click', function(){ saveEntry(); });
  }

});
