(()=>{
  const btn=document.querySelector('.menu-btn'), nav=document.querySelector('.mobile-nav');
  if(btn&&nav){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn.setAttribute('aria-expanded','false')}));}
  const rail=document.querySelector('.contact-rail'), toggle=document.querySelector('.rail-toggle');
  if(rail&&toggle){toggle.addEventListener('click',()=>rail.classList.toggle('collapsed'));}
  const form=document.querySelector('[data-contact-form]');
  if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const to=form.dataset.email||'';const subject=encodeURIComponent('Website enquiry - '+(d.get('matter')||'Legal matter'));const body=encodeURIComponent(`Name: ${d.get('name')||''}\nPhone: ${d.get('phone')||''}\nEmail: ${d.get('email')||''}\n\n${d.get('message')||''}`);window.location.href=`mailto:${to}?subject=${subject}&body=${body}`;});}
})();
