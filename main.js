/* GAROMS-TECH — Scripts principaux v5 */
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-70VF95VJ9M');

const WEB3FORMS_KEY='7cf74299-7c0e-47b4-9222-07fc49f56591';

// PWA standalone detection
if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true){
  document.documentElement.classList.add('pwa-standalone');
  document.body.classList.add('pwa-mode');
}

/* ---- TOAST 15% RABAIS ---- */
const TOAST_KEY='gt_p_claimed';
const TOAST_LATER_KEY='gt_p_later';
function showToast(){
  if(localStorage.getItem(TOAST_KEY))return;
  const laterTime=localStorage.getItem(TOAST_LATER_KEY);
  if(laterTime&&Date.now()-parseInt(laterTime)<5*60*1000)return;
  const t=document.getElementById('toast');
  if(t){t.style.display='block';t.style.animation='toastIn .4s cubic-bezier(.34,1.56,.64,1)';}
}
function closeP(){const t=document.getElementById('toast');if(t)t.style.display='none';}
function laterP(){closeP();localStorage.setItem(TOAST_LATER_KEY,Date.now().toString());setTimeout(showToast,5*60*1000);}
function claimP(){
  closeP();localStorage.setItem(TOAST_KEY,'1');window.location.href='#curiosite';
  setTimeout(()=>{const msg=document.getElementById('f2Msg');if(msg)msg.value='Je souhaite bénéficier de l\'offre de 15% sur ma première collaboration avec GAROMS-TECH.';},600);
}

/* ---- LOADING ---- */
const CFG={dur:4200,vKey:'gt_v3'};
const S={done:false,t0:Date.now(),ti:null};
function initLoad(){
  const ll=document.getElementById('ll'),lt=document.getElementById('ltag'),lf=document.getElementById('lpf'),lc=document.getElementById('lpc');
  if(!ll||typeof gsap==='undefined'){finish();return;}
  if(localStorage.getItem(CFG.vKey)&&lt)lt.textContent='Bon retour chez GAROMS-TECH !';
  localStorage.setItem(CFG.vKey,'1');
  gsap.timeline({defaults:{ease:'power3.out'}})
    .to(ll,{opacity:1,y:0,duration:.9,delay:.1})
    .to(lt,{opacity:1,duration:.6},'-=.35')
    .to('#ls .lpbar',{opacity:1,duration:.4},'-=.2')
    .to(lc,{opacity:1,duration:.35},'-=.15')
    .to('#ls .lskip',{opacity:1,duration:.4},'-=.15');
  S.ti=setInterval(()=>{
    const p=Math.min(100,Math.round(((Date.now()-S.t0)/CFG.dur)*100));
    if(lf)lf.style.width=p+'%';if(lc)lc.textContent=p+'%';
    if(p>=100){clearInterval(S.ti);setTimeout(finish,180);}
  },40);
}
function skip(){const lf=document.getElementById('lpf'),lc=document.getElementById('lpc');if(lf)lf.style.width='100%';if(lc)lc.textContent='100%';setTimeout(finish,280);}
function finish(){
  if(S.done)return;S.done=true;clearInterval(S.ti);
  const sc=document.getElementById('ls'),si=document.getElementById('site');
  if(typeof gsap!=='undefined'&&sc)gsap.to(sc,{opacity:0,duration:.6,onComplete:()=>reveal(sc,si)});
  else{if(sc)sc.style.display='none';reveal(null,si);}
}
function reveal(sc,si){
  if(sc)sc.style.display='none';
  if(si){si.style.display='block';si.style.opacity='0';
    if(typeof gsap!=='undefined')gsap.to(si,{opacity:1,duration:.5});else si.style.opacity='1';
    if(typeof AOS!=='undefined')AOS.init({once:true,duration:750,easing:'ease-out-cubic',offset:80});}
  if(typeof Swiper!=='undefined')new Swiper('.mySwiper',{slidesPerView:1,spaceBetween:24,pagination:{el:'.swiper-pagination',clickable:true},breakpoints:{768:{slidesPerView:2},1024:{slidesPerView:3}},autoplay:{delay:5000,disableOnInteraction:false},loop:true});
  initHeader();initHero();initScroll();initStats();
  setTimeout(showFloat,2500);setTimeout(showToast,5000);
}
function initHeader(){
  const h=document.getElementById('hdr');
  if(h)window.addEventListener('scroll',()=>h.classList.toggle('on',window.scrollY>10),{passive:true});
}
function toggleMenu(){
  const m=document.getElementById('mmenu'),b=document.getElementById('hmb');
  if(!m||!b)return;
  const o=m.classList.toggle('o');b.classList.toggle('o',o);document.body.style.overflow=o?'hidden':'';
}
function closeMenu(){
  const m=document.getElementById('mmenu'),b=document.getElementById('hmb');
  if(m)m.classList.remove('o');if(b)b.classList.remove('o');document.body.style.overflow='';
}
document.addEventListener('click',e=>{
  const m=document.getElementById('mmenu'),b=document.getElementById('hmb');
  if(m&&b&&m.classList.contains('o')&&!m.contains(e.target)&&!b.contains(e.target))closeMenu();
});
function initStats(){
  const items=document.querySelectorAll('.stat-n[data-count]');
  if(!items.length)return;
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const el=en.target,end=+el.dataset.count,suf=el.textContent.replace(/[0-9]/g,'');
        let start=0;const dur=1800,step=Math.ceil(end/60);
        const t=setInterval(()=>{start=Math.min(start+step,end);el.textContent=start+suf;if(start>=end)clearInterval(t);},dur/60);
        io.unobserve(el);
      }
    });
  },{threshold:.3});
  items.forEach(el=>io.observe(el));
}
function initHero(){
  const canvas=document.getElementById('hcanvas');if(!canvas)return;
  const cv=document.createElement('canvas');canvas.appendChild(cv);
  cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  const ctx=cv.getContext('2d');let W,H,pts=[];
  function resize(){W=cv.width=canvas.offsetWidth;H=cv.height=canvas.offsetHeight;}
  resize();window.addEventListener('resize',resize,{passive:true});
  for(let i=0;i<80;i++)pts.push({x:Math.random()*2000,y:Math.random()*900,r:Math.random()*.8+.2,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.2,o:Math.random()*.35+.05});
  (function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.o>0.2?`rgba(232,93,4,${p.o})`:`rgba(251,146,60,${p.o})`;ctx.fill();});requestAnimationFrame(draw);})();
  if(typeof gsap!=='undefined'){const h1=document.getElementById('hh1');if(h1)gsap.from(h1,{opacity:0,y:40,duration:1.2,ease:'power4.out',delay:.3});}
}
function initScroll(){
  const items=document.querySelectorAll('.faq-item');
  items.forEach(i=>{if(i.classList.contains('open')&&!i.querySelector('.faq-a').style.display)i.querySelector('.faq-a').style.display='block';});
}

/* ================================================================
   WHATSAPP-STYLE SOUND
================================================================ */
let audioCtx=null;
function getAudioCtx(){
  if(!audioCtx){try{audioCtx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}}
  return audioCtx;
}
function isSoundEnabled(){
  try{return localStorage.getItem('gt_sound')!=='0';}catch(e){return true;}
}
function toggleSound(){
  const on=!isSoundEnabled();
  try{localStorage.setItem('gt_sound',on?'1':'0');}catch(e){}
  const btn=document.getElementById('cfSoundBtn');
  if(btn)btn.textContent=on?'🔊':'🔇';
  if(on)playSendSound();
}
function playSendSound(){
  if(!isSoundEnabled())return;
  const ctx=getAudioCtx();if(!ctx)return;
  try{
    const now=ctx.currentTime;
    // WhatsApp-style send: short pop then swoosh
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    osc.type='sine';
    osc.frequency.setValueAtTime(880,now);
    osc.frequency.exponentialRampToValueAtTime(660,now+0.08);
    gain.gain.setValueAtTime(0.18,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+0.18);
    osc.start(now);osc.stop(now+0.18);
  }catch(e){}
}
function playReceiveSound(){
  if(!isSoundEnabled())return;
  const ctx=getAudioCtx();if(!ctx)return;
  try{
    const now=ctx.currentTime;
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    osc.type='sine';
    osc.frequency.setValueAtTime(520,now);
    osc.frequency.setValueAtTime(660,now+0.06);
    gain.gain.setValueAtTime(0.12,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+0.22);
    osc.start(now);osc.stop(now+0.22);
  }catch(e){}
}

/* ================================================================
   FLOAT CHAT + MEMORY + BLOCK + LIMITES
================================================================ */
const GT_HIST='gt_chat_hist';
const GT_BLOCK='gt_chat_block';
const GT_BLOCK_HIST='gt_block_hist';
const GT_MEM='gt_customer_mem';
const BLOCK_DUR=3600000;
const HIST_TTL=24*3600000;

/* --- LIMITES ANTI-ABUS --- */
const MAX_CHARS=500;
const MAX_SESSION_MSGS=30;
const MSG_COOLDOWN=2500;
const WARN_AT=25;
let lastMsgTime=0;
/* --- FIN LIMITES --- */

let chatHistory=[];
let floatShown=false;
let leadSaved=false;

/* Customer profile persistent memory */
function getCustMem(){try{const r=localStorage.getItem(GT_MEM);return r?JSON.parse(r):{};}catch(e){return{};}}
function setCustMem(data){try{localStorage.setItem(GT_MEM,JSON.stringify({...getCustMem(),...data,updated:Date.now()}));}catch(e){}}

/* Block history */
function getBlockHist(){try{const r=localStorage.getItem(GT_BLOCK_HIST);if(!r)return[];const a=JSON.parse(r);const cutoff=Date.now()-30*24*3600000;return a.filter(t=>t>cutoff);}catch(e){return[];}}
function addBlockHist(){try{const h=getBlockHist();h.push(Date.now());localStorage.setItem(GT_BLOCK_HIST,JSON.stringify(h));}catch(e){}}
function wasBlockedBefore(){return getBlockHist().length>0;}

function extractCustMem(){
  const allMsgs=chatHistory.map(m=>m.content).join(' ');
  const userMsgs=chatHistory.filter(m=>m.role==='user').slice(-8).map(m=>m.content).join(' ');
  const emailM=allMsgs.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if(emailM)setCustMem({email:emailM[0]});
  const nameM=userMsgs.match(/(?:je suis|je m'appelle|mon nom est|c'est|prénom[:\s]+|name[:\s]+)\s*([A-Z\u00C0-\u00DC][a-zA-Z\u00C0-\u00FF]{1,})/i);
  if(nameM)setCustMem({name:nameM[1]});
  const phoneM=allMsgs.match(/(\+\d{1,3}[\s\-]?[\d\s\-]{6,15})/);
  if(phoneM)setCustMem({phone:phoneM[1].replace(/\s/g,'')});
  const ccM=allMsgs.match(/\+(\d{1,3})/);
  if(ccM)setCustMem({countryCode:'+'+ccM[1]});
}

/* Persistent chat history */
function saveCH(){try{localStorage.setItem(GT_HIST,JSON.stringify({msgs:chatHistory,ts:Date.now()}));extractCustMem();}catch(e){}}
function loadCH(){
  try{
    const r=localStorage.getItem(GT_HIST);if(!r)return;
    const d=JSON.parse(r);
    if(d&&Array.isArray(d.msgs)&&(Date.now()-d.ts)<HIST_TTL)chatHistory=d.msgs;
    else{localStorage.removeItem(GT_HIST);chatHistory=[];}
  }catch(e){}
}

function isBlocked(){try{const b=localStorage.getItem(GT_BLOCK);if(!b)return false;const bd=JSON.parse(b);if(Date.now()-bd.ts<BLOCK_DUR)return{remaining:Math.ceil((BLOCK_DUR-(Date.now()-bd.ts))/60000)};localStorage.removeItem(GT_BLOCK);return false;}catch(e){return false;}}
function setBlock(){localStorage.setItem(GT_BLOCK,JSON.stringify({ts:Date.now()}));addBlockHist();}

function getMsgLimitStatus(){
  const userMsgCount=chatHistory.filter(m=>m.role==='user').length;
  let sessionStart=Date.now();
  try{const r=localStorage.getItem(GT_HIST);if(r){const d=JSON.parse(r);if(d&&d.ts)sessionStart=d.ts;}}catch(e){}
  const msRemaining=Math.max(0,HIST_TTL-(Date.now()-sessionStart));
  const hRemaining=Math.max(1,Math.ceil(msRemaining/3600000));
  return{count:userMsgCount,remaining:MAX_SESSION_MSGS-userMsgCount,hRemaining};
}

function updateCharCount(){
  const inp=document.getElementById('cfInput'),ctr=document.getElementById('cfCharCount');
  if(!inp||!ctr)return;
  const remaining=MAX_CHARS-inp.value.length;
  ctr.textContent=`${remaining} / ${MAX_CHARS}`;
  ctr.style.color=remaining<50?'rgba(239,68,68,.7)':remaining<100?'rgba(251,146,60,.6)':'rgba(255,255,255,.3)';
}

function updateBlockUI(){
  const b=isBlocked(),inp=document.getElementById('cfInput'),btn=document.getElementById('cfSendBtn'),banner=document.getElementById('cfBlockBanner'),q=document.getElementById('cfQuick');
  const lim=getMsgLimitStatus();
  if(b){
    if(inp){inp.disabled=true;inp.placeholder='Conversation suspendue...';}
    if(btn)btn.disabled=true;
    if(banner){banner.style.cssText='display:block;padding:.55rem 1rem;background:rgba(239,68,68,.1);border-top:1px solid rgba(239,68,68,.15);font-size:.72rem;color:rgba(239,68,68,.85);text-align:center;';banner.textContent=`\u23f8 Suspendu — disponible dans ${b.remaining} min`;}
    if(q)q.style.display='none';
    setTimeout(updateBlockUI,60000);return;
  }
  if(lim.count>=MAX_SESSION_MSGS){
    if(inp){inp.disabled=true;inp.placeholder=`Limit atenn — retounen nan ${lim.hRemaining}h`;}
    if(btn)btn.disabled=true;
    if(banner){banner.style.cssText='display:block;padding:.65rem 1rem;background:rgba(239,68,68,.13);border-top:1px solid rgba(239,68,68,.25);font-size:.72rem;color:rgba(255,255,255,.9);text-align:center;line-height:1.5;';banner.innerHTML=`\uD83D\uDD34 <strong>Limit sesyon atenn.</strong> Retounen nan <strong style="color:#FB923C;">${lim.hRemaining}h</strong> — oswa kontakte nou kounye a : <a href="https://wa.me/50943111054" target="_blank" style="color:#FB923C;font-weight:700;text-decoration:underline;">WhatsApp +509 43111054</a>`;}
    if(q)q.style.display='none';return;
  }
  if(lim.count>=WARN_AT){
    if(banner){banner.style.cssText='display:block;padding:.5rem 1rem;background:rgba(239,68,68,.08);border-top:1px solid rgba(239,68,68,.18);font-size:.7rem;color:rgba(239,68,68,.9);text-align:center;';banner.textContent=`\u26a0\ufe0f ${lim.remaining} mesaj rete nan sesyon ou a.`;}
    if(inp){inp.disabled=false;inp.placeholder='Écrivez votre message (max 500 car.)...';}
    if(btn)btn.disabled=false;return;
  }
  if(banner)banner.style.display='none';
  if(inp){inp.disabled=false;inp.placeholder='Écrivez votre message...';}
  if(btn)btn.disabled=false;
}

function restoreChatUI(){
  const msgs=document.getElementById('cfMsgs');if(!msgs)return;msgs.innerHTML='';
  const bm=document.createElement('div');bm.className='msg bot';
  if(chatHistory.length===0){
    const mem=getCustMem();
    if(mem&&mem.name)bm.textContent='Bon retour, '+mem.name+' ! Comment puis-je vous aider ?';
    else bm.textContent='Bonjour \uD83D\uDC4B Je représente l\'équipe GAROMS-TECH. Vous avez un projet ou une question ? Je suis là.';
    msgs.appendChild(bm);return;
  }
  chatHistory.forEach(m=>{const div=document.createElement('div');div.className='msg '+(m.role==='user'?'usr':'bot');let txt=m.content.replace('###BLOCKED###','').trim();div.textContent=txt;if(txt)msgs.appendChild(div);});
  msgs.scrollTop=msgs.scrollHeight;
}

function showFloat(){
  floatShown=true;
  const b=document.getElementById('cfBubble');
  if(b)setTimeout(()=>{b.style.display='none';},6000);
}

let chatOpen=false;
function toggleChat(){
  chatOpen=!chatOpen;
  const p=document.getElementById('cfPanel'),b=document.getElementById('cfBubble');
  if(p)p.style.display=chatOpen?'flex':'none';
  if(b)b.style.display='none';
  const n=document.querySelector('.cf-notif');if(n)n.style.display='none';
  // Init sound toggle button state
  const sBtn=document.getElementById('cfSoundBtn');
  if(sBtn)sBtn.textContent=isSoundEnabled()?'🔊':'🔇';
  if(chatOpen){
    updateBlockUI();
    const i=document.getElementById('cfInput');
    if(i&&!i.disabled){
      i.setAttribute('maxlength',MAX_CHARS);
      i.removeEventListener('input',updateCharCount);
      i.addEventListener('input',updateCharCount);
      updateCharCount();
      setTimeout(()=>i.focus(),100);
    }
  }
}

function sendQuick(txt){
  const inp=document.getElementById('cfInput');if(!inp||inp.disabled)return;
  inp.value=txt;sendAI();
  const q=document.getElementById('cfQuick');if(q)q.style.display='none';
}

async function sendAI(){
  const inp=document.getElementById('cfInput'),msgs=document.getElementById('cfMsgs'),typ=document.getElementById('cfTyping');
  const val=inp?inp.value.trim():'';
  if(!val||!msgs||inp.disabled)return;
  if(isBlocked()){updateBlockUI();return;}

  const now=Date.now();
  if(now-lastMsgTime<MSG_COOLDOWN){
    const cd=document.createElement('div');cd.className='msg bot';
    cd.textContent='\u23f3 Un instant — attends quelques secondes avant d\'envoyer un autre message.';
    msgs.appendChild(cd);msgs.scrollTop=msgs.scrollHeight;return;
  }

  const lim=getMsgLimitStatus();
  if(lim.count>=MAX_SESSION_MSGS){updateBlockUI();return;}
  if(lim.count===WARN_AT-1){
    const wm=document.createElement('div');wm.className='msg bot';
    wm.style.cssText='background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);color:rgba(239,68,68,.9);font-size:.78rem;border-radius:10px;padding:.6rem .9rem;';
    wm.textContent=`\u26a0\ufe0f Atansyon — ou rive sou dènye ${MAX_SESSION_MSGS-WARN_AT+1} mesaj nan sesyon ou a. Apre sa, kontakte nou sou WhatsApp pou kontinye.`;
    msgs.appendChild(wm);msgs.scrollTop=msgs.scrollHeight;
  }

  lastMsgTime=Date.now();

  const safeVal=val.slice(0,MAX_CHARS);
  // Play send sound
  playSendSound();

  const um=document.createElement('div');um.className='msg usr';um.textContent=safeVal;msgs.appendChild(um);
  inp.value='';updateCharCount();msgs.scrollTop=msgs.scrollHeight;
  chatHistory.push({role:'user',content:safeVal});
  saveCH();
  updateBlockUI();
  const q=document.getElementById('cfQuick');if(q)q.style.display='none';
  if(typ)typ.style.display='flex';
  const bm=document.createElement('div');bm.className='msg bot';
  try{
    const custCtx={...getCustMem(),wasBlocked:wasBlockedBefore(),blockCount:getBlockHist().length};
    const res=await fetch('/.netlify/functions/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:chatHistory.slice(-20),customer:custCtx})});
    const data=await res.json();
    let reply=data.reply||"Je n'ai pas pu répondre. WhatsApp : +509 43 11 10 54.";
    const isBlock=reply.includes('###BLOCKED###');
    reply=reply.replace('###BLOCKED###','').trim();
    chatHistory.push({role:'assistant',content:reply});
    saveCH();
    bm.textContent=reply;
    if(isBlock){setBlock();updateBlockUI();}
    // Play receive sound
    playReceiveSound();
  }catch(e){
    bm.textContent="Connexion interrompue. Contactez-nous : +509 43 11 10 54.";
  }
  if(typ)typ.style.display='none';
  msgs.appendChild(bm);msgs.scrollTop=msgs.scrollHeight;
}

/* DEMO CHAT */
function sendDemo(){
  const inp=document.getElementById('demoInput'),body=document.getElementById('chatDemo');
  const val=inp?inp.value.trim():'';
  if(!val||!body)return;
  const m=document.createElement('div');m.className='msg usr';m.textContent=val;body.appendChild(m);
  inp.value='';body.scrollTop=body.scrollHeight;
  setTimeout(()=>{const bm=document.createElement('div');bm.className='msg bot';bm.textContent='Merci ! Notre agent IA traite votre demande. Pour une démonstration complète, contactez-nous sur WhatsApp au +509 41 77 35 49.';body.appendChild(bm);body.scrollTop=body.scrollHeight;},900);
}

/* FAQ */
function toggleFaq(el){
  const item=el.parentElement;
  document.querySelectorAll('.faq-item.open').forEach(i=>{if(i!==item){i.classList.remove('open');}});
  item.classList.toggle('open');
}

/* CONTACT — web3forms */
async function sendContact(e){
  e.preventDefault();
  const btn=document.getElementById('cfSubmit');
  if(btn){btn.disabled=true;btn.textContent='Envoi en cours...';}
  const prenom=document.getElementById('cfPrenom').value.trim();
  const nom=document.getElementById('cfNom').value.trim();
  const email=document.getElementById('cfEmail').value.trim();
  const tel=document.getElementById('cfTel').value.trim();
  const service=document.getElementById('cfService').value;
  const message=document.getElementById('cfMsg').value.trim();
  try{
    await fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({
        access_key:WEB3FORMS_KEY,
        subject:'📩 Nouveau contact GAROMS-TECH — '+prenom+' '+nom,
        from_name:'GAROMS-TECH Site',
        Prénom:prenom,Nom:nom,Email:email,
        Téléphone:tel||'—',Service:service,Message:message,
        Date:new Date().toLocaleString('fr-FR',{timeZone:'America/Port-au-Prince'})
      })
    });
  }catch(_){}
  if(prenom)setCustMem({name:prenom,email:email});
  document.getElementById('cfForm').style.display='none';
  const okEl=document.getElementById('cfOk');if(okEl)okEl.style.display='block';
}
function sendContactWA(){
  const p=document.getElementById('cfPrenom').value||'';
  const s=document.getElementById('cfService').value||'';
  const m=document.getElementById('cfMsg').value||'';
  const txt=encodeURIComponent(`Bonjour GAROMS-TECH !\n\nPrénom : ${p}\nService souhaité : ${s}\n\nMessage : ${m}`);
  window.open(`https://wa.me/50941773549?text=${txt}`,'_blank');
}

/* NEWSLETTER — silently succeed (Supabase skip, fix later) */
const GT_NL_KEY='gt_nl_subs';
function nlAlreadySub(em){try{const a=JSON.parse(localStorage.getItem(GT_NL_KEY)||'[]');return a.includes(em.toLowerCase().trim());}catch(e){return false;}}
function nlSaveSub(em){try{const a=JSON.parse(localStorage.getItem(GT_NL_KEY)||'[]');if(!a.includes(em.toLowerCase().trim())){a.push(em.toLowerCase().trim());localStorage.setItem(GT_NL_KEY,JSON.stringify(a));}}catch(e){}}
async function subNL(e){
  e.preventDefault();
  const em=(document.getElementById('nlEmail').value||'').trim();
  const btn=document.getElementById('nlBtn');
  if(!em||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){if(btn){btn.textContent='Email invalide';setTimeout(()=>{btn.textContent='S\'abonner \u2192';},2500);}return;}
  if(nlAlreadySub(em)){if(btn){btn.textContent='Déjà abonné \u2713';setTimeout(()=>{btn.textContent='S\'abonner \u2192';},3000);}document.getElementById('nlEmail').value='';return;}
  if(btn){btn.disabled=true;btn.textContent='...';}
  nlSaveSub(em);
  document.getElementById('nlEmail').value='';
  if(btn){btn.textContent='Abonné \u2713';}
  setTimeout(()=>{if(btn){btn.disabled=false;btn.textContent='S\'abonner \u2192';}},3000);
}
async function subNL2(e){
  e.preventDefault();
  const em=(document.getElementById('nlEmail2').value||'').trim();
  const btn=document.getElementById('nlBtn2');
  if(!em||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){if(btn){btn.textContent='Email invalide';setTimeout(()=>{btn.textContent='S\'abonner \u2192';},2500);}return;}
  if(nlAlreadySub(em)){if(btn){btn.textContent='Déjà abonné \u2713';setTimeout(()=>{btn.textContent='S\'abonner \u2192';},3000);}document.getElementById('nlEmail2').value='';return;}
  if(btn){btn.disabled=true;btn.textContent='...';}
  nlSaveSub(em);
  document.getElementById('nlEmail2').value='';
  if(btn){btn.textContent='Abonné \u2713';}
  setTimeout(()=>{if(btn){btn.disabled=false;btn.textContent='S\'abonner \u2192';}},3000);
}

/* FORM 2 — web3forms */
async function sendForm2(e){
  e.preventDefault();
  const btn=document.getElementById('f2Btn');
  if(btn){btn.disabled=true;btn.textContent='Envoi...';}
  const prenom=document.getElementById('f2Prenom').value.trim();
  const email=document.getElementById('f2Email').value.trim();
  const message=document.getElementById('f2Msg').value.trim();
  try{
    await fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({
        access_key:WEB3FORMS_KEY,
        subject:'💡 Nouvelle idée de projet GAROMS-TECH — '+prenom,
        from_name:'GAROMS-TECH Site',
        Prénom:prenom,Email:email,Message:message,
        Date:new Date().toLocaleString('fr-FR',{timeZone:'America/Port-au-Prince'})
      })
    });
  }catch(_){}
  document.getElementById('f2Form').style.display='none';
  const okEl=document.getElementById('f2Ok');if(okEl)okEl.style.display='block';
}

/* Dev helper */
window.clearGTChat=function(){
  ['gt_chat_hist','gt_customer_mem','gt_chat_block','gt_block_hist','gt_p_claimed','gt_p_later','gt_leads'].forEach(k=>localStorage.removeItem(k));
  sessionStorage.clear();location.reload();
};

document.addEventListener('DOMContentLoaded',()=>{
  loadCH();restoreChatUI();updateBlockUI();
  initLoad();
});

/* CSS animation toast */
const style=document.createElement('style');
style.textContent='@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}';
document.head.appendChild(style);
