
(function(){
  const $ = (q,ctx=document)=>ctx.querySelector(q);
  const $$ = (q,ctx=document)=>Array.from(ctx.querySelectorAll(q));

 
  const mobileBtn = $('#mobileMenuBtn');
  const mobileMenu = $('#mobileMenu');
  if (mobileBtn) mobileBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));

 
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('text-accent');
  });

 
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => observer.observe(el));

  
  const grid = $('#eventsGrid');
  const searchInput = $('#searchInput');
  const countBadge = $('#countBadge');

  function formatDate(d){
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' });
  }

  function cardHTML(ev){
    return `
      <article class="reveal glass rounded-3xl overflow-hidden border border-white/20 hover:border-accent/50 transition-colors">
        <div class="h-40 md:h-48 w-full bg-cover bg-center" style="background-image:url('${ev.banner}')"></div>
        <div class="p-5 md:p-6">
          <h3 class="text-lg md:text-xl font-semibold">${ev.name}</h3>
          <p class="mt-1 text-white/70">${formatDate(ev.date)} · ${ev.time}</p>
          <p class="mt-1 text-white/70">${ev.venue}</p>
          <p class="mt-3 text-white/80">${ev.short}</p>
          <a href="event-${ev.slug}.html" class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-slate-900 font-semibold hover:translate-y-[-1px] transition-transform">Learn More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </article>
    `;
  }

  function renderList(filter=''){
    if (!grid) return;
    const q = filter.toLowerCase();
    const list = window.EVENTS
      .slice()
      .sort((a,b)=> a.date.localeCompare(b.date))
      .filter(ev => (ev.name + ' ' + ev.venue + ' ' + ev.short).toLowerCase().includes(q));
    grid.innerHTML = list.map(cardHTML).join('');
    if (countBadge) countBadge.textContent = list.length;
 
    $$('.reveal').forEach(el => observer.observe(el));
  }

  if (grid){
    renderList();
    if (searchInput){
      searchInput.addEventListener('input', e => renderList(e.target.value));
    }
  }

 
  const detailRoot = $('#eventDetail');
  if (detailRoot){
    const slug = detailRoot.dataset.slug;
    const ev = window.EVENTS.find(e => e.slug === slug);
    if (ev){
      $('#detailBanner').style.backgroundImage = `url('${ev.banner}')`;
      $('#detailTitle').textContent = ev.name;
      $('#detailMeta').textContent = `${new Date(ev.date).toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'})} • ${ev.time} • ${ev.venue}`;
      $('#detailDesc').textContent = ev.full;
      $('#detailMap').setAttribute('src', ev.mapEmbed);
      $('#rsvpBtn').addEventListener('click', ()=>{
        const modal = $('#rsvpModal');
        modal.classList.remove('hidden');
      });
      $('#closeModal').addEventListener('click', ()=> $('#rsvpModal').classList.add('hidden'));
      $('#rsvpForm').addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = $('#rsvpName').value.trim();
        const email = $('#rsvpEmail').value.trim();
        localStorage.setItem('rsvp:'+slug, JSON.stringify({name, email, ts: Date.now()}));
        $('#rsvpThanks').classList.remove('hidden');
      });
    }
  }
})();
