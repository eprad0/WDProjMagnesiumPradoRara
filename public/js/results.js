document.addEventListener("DOMContentLoaded", () => {

  let attemptSaved = false;

  const params = new URLSearchParams(window.location.search);
  const score = parseInt(params.get("score"), 10);

  const godNameEl = document.getElementById("godName");
  const godDescEl = document.getElementById("godDesc");
  const scoreTextEl = document.getElementById("scoreText");
  const godImgEl = document.getElementById("godImg");

  if (isNaN(score)) {
    godNameEl.textContent = "Unknown";
    godDescEl.textContent = "No score received.";
    scoreTextEl.textContent = "";
    godImgEl.removeAttribute("src");
    godImgEl.style.display = "none";
    return;
  }

  //calculating the score

  const trait1e = document.getElementById("trait1");
  const trait2e = document.getElementById("trait2");
  const trait3e = document.getElementById("trait3");
  const trait4e = document.getElementById("trait4");

  let god = "";
  let desc = "";
  let img = "";
  let t1 = 0, t2 = 0, t3 = 0, t4 = 0;

  if (score >= 3100) {
    god = "Zeus";
    desc = "Confident, commanding, natural leader.";
    img = "../../assets/godsimgs/zeus.png";
    t1 = 4; t2 = 4; t3 = 5; t4 = 2;
  } else if (score >= 2200) {
    god = "Athena";
    desc = "Wise, strategic, and analytical.";
    img = "../../assets/godsimgs/athena.png";
    t1 = 3; t2 = 5; t3 = 4; t4 = 2;
  } else if (score >= 900) {
    god = "Ares";
    desc = "Bold, competitive, and fearless.";
    img = "../../assets/godsimgs/ares.png";
    t1 = 5; t2 = 4; t3 = 2; t4 = 1;
  } else {
    god = "Apollo";
    desc = "Creative, expressive, and imaginative.";
    img = "../../assets/godsimgs/apollo.png";
    t1 = 3; t2 = 4; t3 = 3; t4 = 5;
  }

  function stars(value) {
  let result = "";
  for (let i = 0; i < value; i++) {
    result += "★";
  }
  return result;
}

  godNameEl.textContent = god;
  godDescEl.textContent = desc;
  scoreTextEl.textContent = `Score: ${score}`;
  godImgEl.src = img;

  trait1e.textContent = stars(t1);
  trait2e.textContent = stars(t2);
  trait3e.textContent = stars(t3);
  trait4e.textContent = stars(t4);

  // History modal handling
  const showBtn = document.getElementById('show-history');
  const modal = document.getElementById('history-modal');
  const closeBtn = document.getElementById('close-history');
  const listEl = document.getElementById('history-list');
  const saveBtn = document.getElementById('save-result');

  const filterModal = document.getElementById('filter-modal');
  const editScoreBtn = document.getElementById('edit-score');
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
  const filterUsernameInput = document.getElementById('filter-userName');
  const filterCountP = document.getElementById('filter-count');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const closeFilterBtn = document.getElementById('close-filter-btn');

  let activeFilters = { gods: [], username: '' };

  function getFilteredResults(){
    const rawData = localStorage.getItem('quizResults');
    const allResults = rawData ? JSON.parse(rawData) : [];

    const filtered = allResults.filter(item => {
      const matchesGod = activeFilters.gods.length === 0 || activeFilters.gods.includes(item.god);

      const matchesUser = activeFilters.username === '' || item.user === activeFilters.username;

      return matchesGod && matchesUser;

    });

    return filtered;
  }

    function updateFilterCount(){
      const filtered = getFilteredResults();

      const count = filtered.length;
      
      filterCountP.textContent = `${count} results will be deleted.`;

    };

    function deleteFilteredResults(){
      const rawData = localStorage.getItem('quizResults');
      const List = rawData ? JSON.parse(rawData) : [];

      const filtered = getFilteredResults();

      if (filtered.length === 0){
        alert('No results match the current filters.');
        return;
      }

      const confirmationMessage = `Are you sure you want to delete ${filtered.length} result(s) matching the current filters? This action cannot be undone.`;
      if (!confirm(confirmationMessage)) return;

      const newList = List.filter(item => {
        const isFilteredOut = filtered.some(t => t.date === item.date);
        return !isFilteredOut;
      } );
      localStorage.setItem('quizResults', JSON.stringify(newList));

      renderHistory();
      closeFilterModal();
      resetFilters();
    }

    function resetFilters(){
      activeFilters = { gods: [], username: '' };

      filterCheckboxes.forEach(checkBox => checkBox.checked = false);

      filterUsernameInput.value = '';
      
      updateFilterCount();
    }

    function openFilterModal(){
      filterModal.style.display = 'flex';
      updateFilterCount();
    }

    function closeFilterModal(){
      filterModal.style.display = 'none';
    }


    // event listeners for filter modal

    editScoreBtn.addEventListener('click', openFilterModal);

    closeFilterBtn.addEventListener('click', closeFilterModal);

    resetFilterBtn.addEventListener('click', resetFilters);

    confirmDeleteBtn.addEventListener('click', deleteFilteredResults);
    
    filterCheckboxes.forEach(checkBox => {
      checkBox.addEventListener('change', function(){
        const god = this.value;
        if (this.checked){
          if (!activeFilters.gods.includes(god)) activeFilters.gods.push(god);
        }else{
          activeFilters.gods = activeFilters.gods.filter(g => g !== god);
        }
        updateFilterCount();
      });
    }

    );

    filterUsernameInput.addEventListener('input', () => {
      activeFilters.username = filterUsernameInput.value.trim();

      updateFilterCount();
    })

    function renderHistory(){
    listEl.innerHTML = '';
    try{
      const arr = JSON.parse(localStorage.getItem('quizResults') || '[]');
      if(!arr.length){
        listEl.innerHTML = '<li>No saved results.</li>';
        return;
      }
      for(let i = 0; i < arr.length; i++){
        const it = arr[i];
        const d = new Date(it.date);
        const li = document.createElement('li');
        const who = it.user ? ` — ${it.user}` : '';
        li.innerHTML = `${d.toLocaleString()} — ${it.god} (Score: ${it.score})${who}
        <button onclick="deleteResult(${i})">x</button>`;
        listEl.appendChild(li);
      }
      let totals = {};
      for (let i = 0; i < arr.length; i++) {
        let user = arr[i].user;
        if (!user) continue; 
        if (!totals[user]) {
           totals[user] = { sum: 0, count: 0 };
           }
      totals[user].sum += arr[i].score;
      totals[user].count += 1;}
// display it
      for (let user in totals) {
        let avg = Math.round(totals[user].sum / totals[user].count);
        let li = document.createElement("li");
        li.innerHTML = `${user} — Avg Score: ${avg}`;
        listEl.appendChild(li);
      }
    }catch(e){ listEl.innerHTML = '<li>Error reading history</li>'; }
  }

  if (showBtn && modal){
    showBtn.addEventListener('click', function(){ renderHistory(); modal.style.display = 'block'; modal.setAttribute('aria-hidden','false'); });
  }
  if(closeBtn && modal){
    closeBtn.addEventListener('click', function(){ modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); });
  }

  // delete results
  window.deleteResult = function(index){
  let arr = JSON.parse(localStorage.getItem('quizResults') || '[]');
  arr.splice(index, 1);
  localStorage.setItem('quizResults', JSON.stringify(arr));
  renderHistory();
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

      attemptSaved = true;

      alert('Result saved' + (user ? (' for ' + user) : ' (anonymous)'));
    }catch(e){ console.warn('Could not save quiz result', e); alert('Could not save result.'); }
  }

  window.addEventListener('beforeunload', event => {
    if (!attemptSaved) {
      event.preventDefault();
      event.returnValue = '';

    }
  });

  if(saveBtn){
    saveBtn.addEventListener('click', function(){ saveEntry(); });
  }

});
