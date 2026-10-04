const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const questions = window.QUESTIONS || [];
const img = n => `assets/images/${n}`;
const item = n => `assets/items/${n}`;
const enemy = n => `assets/enemies/${n}`;
const sprite = n => `assets/sprites_hd/${n}`;
const WORLD_W = 5200;
const GROUND = 82;
const PLAYER_W = 76;
const PLAYER_H = 122;

const phases = [
  {
    name:'Fase 1 · O quarto da Cris', short:'Quarto', emoji:'🛏️', bg:'bedroom.png', kind:'room', range:[0,4],
    story:'Cris percebe que precisa se organizar antes de sair. Prepare a mochila e reúna itens de autocuidado.',
    mission:{stars:2,items:2,questions:4,text:'Colete 2 estrelas, 2 itens de cuidado e responda às 4 perguntas.'},
    reward:{name:'Kit de autocuidado',src:item('pad_pack.png'),text:'Organização e acesso aos itens certos tornam a rotina mais tranquila.'},
    platforms:[{x:520,w:480,top:105},{x:1330,w:430,top:175},{x:2070,w:520,top:115},{x:3160,w:470,top:175},{x:4010,w:500,top:125}],
    obstacles:[{x:980,y:0,w:125,h:105,src:img('backpack.png')},{x:2410,y:0,w:118,h:118,src:img('clock.png')},{x:3850,y:0,w:120,h:104,src:img('backpack.png')}],
    enemies:[],
    collect:[
      {x:740,y:145,w:76,h:76,src:img('star.png'),type:'star',label:'Estrela'},
      {x:1510,y:215,w:88,h:88,src:item('pad_pack.png'),type:'item',label:'Pacote de absorventes'},
      {x:2760,y:45,w:78,h:78,src:item('heart.png'),type:'heart',label:'Coração extra'},
      {x:3380,y:215,w:76,h:76,src:item('star_face.png'),type:'star',label:'Estrela do conhecimento'},
      {x:4240,y:165,w:82,h:82,src:item('underwear.png'),type:'item',label:'Roupa íntima confortável'}
    ],
    questions:[1050,2150,3250,4350], npc:null
  },
  {
    name:'Fase 2 · Escola', short:'Escola', emoji:'🏫', bg:'school.png', kind:'school', range:[4,8],
    story:'Na escola, Cris precisa chegar ao ponto de apoio. O caminho tem plataformas, obstáculos e desafios de conhecimento.',
    mission:{stars:2,items:2,questions:4,text:'Colete 2 estrelas, 2 itens úteis e responda às 4 perguntas.'},
    reward:{name:'Estrela do conhecimento',src:item('star_face.png'),text:'Informação confiável ajuda a transformar dúvidas em autonomia.'},
    platforms:[{x:430,w:430,top:90},{x:1170,w:520,top:160},{x:1950,w:390,top:95},{x:2670,w:500,top:180},{x:3500,w:430,top:110},{x:4260,w:430,top:170}],
    obstacles:[{x:930,y:0,w:120,h:102,src:img('backpack.png')},{x:1880,y:0,w:120,h:120,src:img('clock.png')},{x:3090,y:0,w:145,h:125,src:img('wetfloor.png')}],
    enemies:[],
    collect:[
      {x:610,y:130,w:74,h:74,src:item('star_face.png'),type:'star',label:'Estrela'},
      {x:1380,y:205,w:70,h:92,src:item('water.png'),type:'item',label:'Água'},
      {x:2380,y:55,w:72,h:72,src:item('coin.png'),type:'coin',label:'Moeda bônus'},
      {x:2870,y:225,w:74,h:74,src:img('star.png'),type:'star',label:'Estrela'},
      {x:3740,y:150,w:74,h:74,src:item('pad.png'),type:'item',label:'Absorvente'}
    ],
    questions:[1050,2150,3250,4350],
    npc:{x:4700,y:0,w:142,h:205,src:img('teacher.png'),label:'Professora',tip:'💬 Professora: “Se precisar de apoio ou de ir ao banheiro, peça ajuda. Autocuidado também faz parte da escola.”'}
  },
  {
    name:'Fase 3 · Higiene e autocuidado', short:'Higiene', emoji:'🫧', bg:null, kind:'bath', range:[8,12],
    story:'Agora o desafio é reconhecer hábitos seguros de higiene. Evite poças e germes e reúna os itens corretos.',
    mission:{stars:2,items:3,questions:4,text:'Colete 2 estrelas, 3 itens de higiene e responda às 4 perguntas.'},
    reward:{name:'Coração do autocuidado',src:item('heart.png'),text:'Cuidado íntimo deve ser simples, seguro e livre de vergonha.'},
    platforms:[{x:480,w:430,top:100},{x:1240,w:440,top:165},{x:2020,w:430,top:105},{x:2780,w:470,top:180},{x:3610,w:430,top:115},{x:4290,w:480,top:165}],
    obstacles:[{x:850,y:0,w:180,h:54,src:img('puddle.png')},{x:1670,y:0,w:145,h:128,src:img('wetfloor.png')},{x:3340,y:0,w:125,h:108,src:img('trash.png')}],
    enemies:[
      {x:2240,y:0,w:92,h:92,src:enemy('germ_green.png'),min:2160,max:2520,speed:1.2},
      {x:3020,y:0,w:92,h:92,src:enemy('germ_purple.png'),min:2920,max:3260,speed:1.45},
      {x:3970,y:0,w:96,h:96,src:enemy('germ_red.png'),min:3850,max:4210,speed:1.1}
    ],
    collect:[
      {x:610,y:145,w:76,h:76,src:item('star_face.png'),type:'star',label:'Estrela'},
      {x:1430,y:210,w:84,h:84,src:item('soap.png'),type:'item',label:'Sabonete neutro'},
      {x:1880,y:50,w:76,h:76,src:item('pad.png'),type:'item',label:'Absorvente'},
      {x:2960,y:225,w:74,h:74,src:img('star.png'),type:'star',label:'Estrela'},
      {x:3780,y:155,w:82,h:82,src:item('underwear.png'),type:'item',label:'Calcinha de algodão'}
    ],
    questions:[1050,2150,3250,4350],
    npc:{x:4720,y:0,w:142,h:205,src:img('friend.png'),label:'Amiga da Cris',tip:'💬 Amiga: “Cuidar do corpo não precisa ser complicado. Informação boa ajuda muito!”'}
  },
  {
    name:'Fase 4 · Caminho até a farmácia', short:'Rua', emoji:'🚌', bg:'street.png', kind:'street', range:[12,15],
    story:'Cris segue pela cidade até a farmácia. Atenção aos obstáculos do caminho e às próximas decisões.',
    mission:{stars:2,items:2,questions:3,text:'Colete 2 estrelas, 2 itens importantes e responda às 3 perguntas.'},
    reward:{name:'Autorização preparada',src:item('authorization.png'),text:'Cris já sabe quais documentos serão importantes para a etapa final.'},
    platforms:[{x:510,w:420,top:90},{x:1300,w:450,top:150},{x:2100,w:390,top:90},{x:2900,w:510,top:165},{x:3790,w:450,top:105},{x:4430,w:390,top:155}],
    obstacles:[{x:920,y:0,w:145,h:128,src:img('wetfloor.png')},{x:1760,y:0,w:180,h:54,src:img('puddle.png')},{x:3450,y:0,w:118,h:118,src:img('clock.png')}],
    enemies:[{x:2500,y:0,w:90,h:90,src:enemy('germ_blue.png'),min:2380,max:2700,speed:1.0}],
    collect:[
      {x:690,y:132,w:74,h:74,src:item('star_face.png'),type:'star',label:'Estrela'},
      {x:1480,y:195,w:70,h:92,src:item('water.png'),type:'item',label:'Água'},
      {x:2260,y:48,w:70,h:70,src:item('coin.png'),type:'coin',label:'Moeda bônus'},
      {x:3120,y:210,w:82,h:82,src:item('authorization.png'),type:'item',label:'Autorização'},
      {x:4010,y:150,w:74,h:74,src:img('star.png'),type:'star',label:'Estrela'}
    ],
    questions:[1350,2700,4050], npc:null
  },
  {
    name:'Fase 5 · Farmácia', short:'Farmácia', emoji:'💊', bg:'pharmacy.png', kind:'pharmacy', range:[15,18],
    story:'Chegou a etapa final. Reúna os documentos, responda às perguntas do programa e encontre a atendente.',
    mission:{stars:2,items:3,questions:3,text:'Colete 2 estrelas, 3 itens/documentos e responda às 3 perguntas.'},
    reward:{name:'Kit Dignidade Menstrual',src:item('pad_pack.png'),text:'Missão concluída: informação, acesso e dignidade caminham juntos.'},
    platforms:[{x:520,w:430,top:95},{x:1270,w:430,top:155},{x:2100,w:430,top:100},{x:2860,w:470,top:170},{x:3680,w:450,top:115},{x:4330,w:430,top:165}],
    obstacles:[{x:960,y:0,w:112,h:112,src:img('clock.png')},{x:2560,y:0,w:120,h:103,src:img('backpack.png')}],
    enemies:[],
    collect:[
      {x:650,y:135,w:74,h:74,src:item('star_face.png'),type:'star',label:'Estrela'},
      {x:1480,y:198,w:82,h:82,src:item('authorization.png'),type:'item',label:'Autorização do programa'},
      {x:2260,y:52,w:82,h:82,src:item('health_card.png'),type:'item',label:'Cartão de saúde'},
      {x:3080,y:215,w:82,h:82,src:item('pad_pack.png'),type:'item',label:'Pacote de absorventes'},
      {x:3920,y:155,w:74,h:74,src:img('star.png'),type:'star',label:'Estrela'}
    ],
    questions:[1350,2700,4050],
    npc:{x:4720,y:0,w:142,h:205,src:img('pharmacist.png'),label:'Atendente',tip:'💬 Atendente: “Muito bem! Agora confira sua autorização e seus documentos para concluir a retirada.”'}
  }
];


let st = {
  phase:0, unlocked:0, completed:[], x:120, y:0, vy:0, dir:1, moving:false, lives:3, stars:0, coins:0, score:0,
  sound:true, captions:true, assist:false, paused:false, invincible:0, frame:0, lastFrame:0, answered:new Set(), collected:new Set(),
  phaseEnded:false, npcShown:false, finishHintAt:0
};
let keys = {left:false,right:false};
let audioCtx = null, musicTimer = null, musicStep = 0;

function saveProgress(){
  localStorage.setItem('crisProgressV2', JSON.stringify({
    phase:st.phase, unlocked:st.unlocked, completed:st.completed, lives:st.lives, stars:st.stars, coins:st.coins, score:st.score,
    answered:[...st.answered], collected:[...st.collected]
  }));
  localStorage.setItem('crisSound', st.sound?'1':'0');
  localStorage.setItem('crisA11y', JSON.stringify({captions:st.captions,assist:st.assist,contrast:document.body.classList.contains('high-contrast'),motion:document.body.classList.contains('reduced-motion'),text:$('#textRange')?.value||100}));
}
function restoreProgress(){
  try{
    const raw=JSON.parse(localStorage.getItem('crisProgressV2')||'null');
    if(raw){Object.assign(st,raw);st.answered=new Set(raw.answered||[]);st.collected=new Set(raw.collected||[]);st.completed=raw.completed||[]}
    const sound=localStorage.getItem('crisSound'); if(sound==='0') st.sound=false;
    const a=JSON.parse(localStorage.getItem('crisA11y')||'null');
    if(a){st.captions=a.captions!==false;st.assist=!!a.assist;document.body.classList.toggle('high-contrast',!!a.contrast);document.body.classList.toggle('reduced-motion',!!a.motion);document.body.classList.toggle('assist',!!a.assist);setTimeout(()=>{if($('#textRange')){$('#textRange').value=a.text||100;document.documentElement.style.setProperty('--ui-scale',(a.text||100)/100)}if($('#captionToggle'))$('#captionToggle').checked=st.captions;if($('#assistToggle'))$('#assistToggle').checked=st.assist;if($('#contrastToggle'))$('#contrastToggle').checked=!!a.contrast;if($('#motionToggle'))$('#motionToggle').checked=!!a.motion},0)}
  }catch(e){}
}
function resetGame(){
  Object.assign(st,{phase:0,unlocked:0,completed:[],x:120,y:0,vy:0,dir:1,moving:false,lives:3,stars:0,coins:0,score:0,answered:new Set(),collected:new Set(),phaseEnded:false,npcShown:false});
  localStorage.removeItem('crisProgressV2'); saveProgress(); renderMap(); setHud();
}

function tone(freq=440,dur=.08,type='square',gain=.035){
  if(!st.sound)return;
  try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)(); if(audioCtx.state==='suspended')audioCtx.resume(); const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(audioCtx.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+dur);o.stop(audioCtx.currentTime+dur)}catch(e){}
}
const musicPatterns=[
  [523,659,784,659,587,698,880,698], [587,740,880,740,659,784,988,784], [440,523,659,523,494,587,698,587], [494,622,740,622,554,659,831,659], [523,659,784,988,784,659,587,698]
];
function musicStart(){
  if(!st.sound||musicTimer)return; musicStep=0;
  musicTimer=setInterval(()=>{if(st.paused||isModalOpen())return;const seq=musicPatterns[st.phase]||musicPatterns[0];const n=seq[musicStep%seq.length];tone(n,.11,'square',.010);if(musicStep%4===0)tone(n/2,.16,'triangle',.008);musicStep++},240);
}
function musicStop(){clearInterval(musicTimer);musicTimer=null}
function soundCaption(text){if(!st.captions)return;const el=$('#soundCaption');el.textContent=`♪ ${text}`;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),850)}
function sfx(type){
  const map={jump:[520,.07,'square','.03','pulo'],star:[1046,.11,'sine','.045','estrela coletada'],coin:[740,.09,'sine','.04','moeda coletada'],item:[880,.14,'triangle','.045','item coletado'],heart:[660,.16,'sine','.05','vida extra'],hit:[140,.18,'sawtooth','.04','obstáculo'],correct:[880,.16,'sine','.05','resposta correta'],wrong:[180,.18,'sawtooth','.035','resposta incorreta'],gate:[988,.18,'sine','.05','missão concluída'],victory:[1174,.22,'sine','.05','vitória']};
  const v=map[type];if(!v)return;tone(v[0],v[1],v[2],Number(v[3]));soundCaption(v[4]);
}
function toggleSound(){st.sound=!st.sound;$('#soundBtn').textContent=st.sound?'🔊':'🔇';$('#panelSoundBtn').textContent=st.sound?'Ligado':'Desligado';st.sound?musicStart():musicStop();saveProgress()}

function toast(msg,ms=1900){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._tm);t._tm=setTimeout(()=>t.classList.remove('show'),ms)}
function setHud(){$('#lives').textContent=st.lives;$('#stars').textContent=st.stars;$('#coins').textContent=st.coins;$('#score').textContent=st.score}
function renderMap(){
  const box=$('#journeyMap'); if(!box)return; box.innerHTML='';
  phases.forEach((p,i)=>{const d=document.createElement('div');const done=st.completed.includes(i),current=i===st.phase&&!done,locked=i>st.unlocked;d.className=`map-node ${done?'done':''} ${current?'current':''} ${locked?'locked':''}`;d.innerHTML=`<span class="emoji">${locked?'🔒':done?'✅':p.emoji}</span><span>${p.short}</span>`;box.appendChild(d)});
  $('#startBtn').textContent=st.completed.length===phases.length?'▶️ Rever a jornada':'▶️ Continuar jornada';
}
function isModalOpen(){return $$('.modal:not(.hidden)').length>0}

function addPlatform(p,kind){const d=document.createElement('div');d.className=`platform ${kind||''}`;d.style.left=p.x+'px';d.style.width=p.w+'px';d.style.bottom=(GROUND+p.top-28)+'px';d.dataset.top=p.top;d.dataset.x=p.x;d.dataset.w=p.w;$('#world').appendChild(d)}
function addImageObject(cls,o,idx){const d=document.createElement('div');d.className=cls;d.dataset.idx=idx;d.style.left=o.x+'px';d.style.width=(o.w||90)+'px';d.style.height=(o.h||90)+'px';d.style.bottom=(GROUND+(o.y||0))+'px';const im=document.createElement('img');im.src=o.src;im.alt='';d.appendChild(im);$('#world').appendChild(d);d._x=o.x;d._dir=1;return d}
function addQuestionGate(x,qi){const d=document.createElement('div');d.className='question-gate';d.dataset.qi=qi;d.style.left=x+'px';d.style.bottom=(GROUND+8)+'px';d.innerHTML='<span>?</span>';if(st.answered.has(qi))d.classList.add('done');$('#world').appendChild(d)}

function loadPhase(i,showIntro=true){
  st.phase=Math.max(0,Math.min(phases.length-1,i));st.x=120;st.y=0;st.vy=0;st.phaseEnded=false;st.npcShown=false;keys.left=keys.right=false;
  const p=phases[st.phase],w=$('#world');
  w.querySelectorAll('.platform,.obstacle,.enemy,.collectible,.npc,.question-gate').forEach(e=>e.remove());
  w.className=''; if(p.kind==='bath')w.classList.add('bathroom');
  w.style.backgroundImage=p.bg?`url('${img(p.bg)}')`:''; w.style.backgroundSize=p.bg?'auto 100%':'';w.style.backgroundPosition='left bottom';w.style.backgroundRepeat=p.bg?'repeat-x':'';
  $('#phaseTitle').textContent=p.name;
  p.platforms.forEach(x=>addPlatform(x,p.kind));
  p.obstacles.forEach((o,k)=>addImageObject('obstacle',o,k));
  p.enemies.forEach((o,k)=>addImageObject('enemy',o,k));
  p.collect.forEach((o,k)=>{const id=`p${st.phase}_${k}`;if(!st.collected.has(id)){const el=addImageObject('collectible',o,k);el.dataset.cid=id}else{}});
  const [a,b]=p.range;p.questions.forEach((x,j)=>addQuestionGate(x,a+j));
  if(p.npc){const n=addImageObject('npc',p.npc,0);const lab=document.createElement('div');lab.className='npc-label';lab.textContent=p.npc.label;n.appendChild(lab)}
  $('#player').style.left=st.x+'px';$('#player').style.bottom=(GROUND+st.y)+'px';$('#playerImg').src=sprite('idle_0.png');$('#world').style.transform='translateX(0px)';
  setHud();updateMission();updateProgress();renderMap();saveProgress();musicStop();musicStart();
  if(showIntro)showPhaseIntro(); else toast(p.story,2400);
}
function showPhaseIntro(){const p=phases[st.phase];$('#phaseBadge').textContent=`FASE ${st.phase+1} DE 5`;$('#phaseIntroTitle').textContent=p.name;$('#phaseIntroStory').textContent=p.story;$('#phaseIntroMission').innerHTML=`<strong>🎯 Missão</strong><br>${p.mission.text}`;$('#phaseIntroModal').classList.remove('hidden');setTimeout(()=>$('#phaseIntroStart').focus(),50)}
$('#phaseIntroStart').onclick=()=>{$('#phaseIntroModal').classList.add('hidden');toast('✨ Vá em frente, Cris!',1200)};

function phaseStats(){
  const p=phases[st.phase],[a,b]=p.range;let stars=0,items=0;
  p.collect.forEach((o,k)=>{if(st.collected.has(`p${st.phase}_${k}`)){if(o.type==='star')stars++;if(o.type==='item')items++}});
  let qs=0;for(let i=a;i<b;i++)if(st.answered.has(i))qs++;
  return {stars,items,questions:qs};
}
function missionComplete(){const s=phaseStats(),m=phases[st.phase].mission;return s.stars>=m.stars&&s.items>=m.items&&s.questions>=m.questions}
function updateMission(){
  const p=phases[st.phase],s=phaseStats(),m=p.mission;$('#missionName').textContent='🎯 '+p.short;$('#missionText').textContent=m.text;
  const chips=[[`⭐ ${s.stars}/${m.stars}`,s.stars>=m.stars],[`🎒 ${s.items}/${m.items}`,s.items>=m.items],[`🧠 ${s.questions}/${m.questions}`,s.questions>=m.questions]];
  $('#missionChecks').innerHTML=chips.map(([t,d])=>`<span class="mission-chip ${d?'done':''}">${d?'✓ ':''}${t}</span>`).join('');
  const gate=$('#finishGate');const complete=missionComplete();gate.classList.toggle('locked',!complete);gate.classList.toggle('open',complete);
}
function updateProgress(){const pct=Math.max(0,Math.min(100,(st.x/(WORLD_W-180))*100));$('#phaseProgress').style.width=pct+'%'}

function openQuestion(qi){
  if(st.answered.has(qi))return;const q=questions[qi]; if(!q)return;
  st.qIndex=qi;keys.left=keys.right=false;$('#qTitle').textContent=`Pergunta ${qi+1} de 18`;$('#qText').textContent=q.q;const box=$('#qOptions');box.innerHTML='';
  q.o.forEach((txt,k)=>{const b=document.createElement('button');b.className='option';b.textContent=`${String.fromCharCode(65+k)}) ${txt}`;b.onclick=()=>answerQuestion(k,b);box.appendChild(b)});
  $('#qExplain').classList.add('hidden');$('#qContinue').classList.add('hidden');$('#questionModal').classList.remove('hidden');setTimeout(()=>box.querySelector('button')?.focus(),50)
}
function answerQuestion(k,btn){
  const qi=st.qIndex,q=questions[qi],buttons=$$('#qOptions .option');buttons.forEach(b=>b.disabled=true);buttons[q.c].classList.add('correct');
  st.answered.add(qi);const gate=$(`.question-gate[data-qi="${qi}"]`);if(gate)gate.classList.add('done');
  if(k===q.c){btn.classList.add('correct');st.score+=q.p;st.coins+=2;sfx('correct');toast(`✅ +${q.p} pontos e +2 moedas`)}else{btn.classList.add('wrong');sfx('wrong')}
  $('#qExplain').textContent=(k===q.c?'✅ Correto! ':'💡 Resposta correta: '+String.fromCharCode(65+q.c)+'. ')+q.e;$('#qExplain').classList.remove('hidden');$('#qContinue').classList.remove('hidden');setHud();updateMission();saveProgress();
}
$('#qContinue').onclick=()=>{$('#questionModal').classList.add('hidden');$('#qContinue').classList.add('hidden');if(missionComplete()){sfx('gate');toast('🏁 Missão completa! O portal final foi liberado.',2300)}};

function showPickup(o){
  $('#pickupTitle').textContent=o.label||'Item coletado!';$('#pickupText').textContent=o.type==='star'?'+5 pontos de conhecimento':o.type==='heart'?'Coração extra para a jornada':o.type==='coin'?'+3 moedas':'Item importante para a missão';
  $('#pickupOverlay').classList.remove('hidden');clearTimeout(st._pick);st._pick=setTimeout(()=>$('#pickupOverlay').classList.add('hidden'),900)
}
function collectItems(){
  const p=phases[st.phase],pcx=st.x+PLAYER_W/2,pcy=st.y+PLAYER_H/2;
  $$('.collectible:not(.collected)').forEach(el=>{const idx=+el.dataset.idx,o=p.collect[idx],cx=o.x,cy=(o.y||0)+(o.h||90)/2;if(Math.abs(pcx-cx)<72&&Math.abs(pcy-cy)<105){el.classList.add('collected');const id=el.dataset.cid;st.collected.add(id);if(o.type==='star'){st.stars++;st.score+=5;sfx('star')}else if(o.type==='coin'){st.coins+=3;st.score+=3;sfx('coin')}else if(o.type==='heart'){st.lives=Math.min(5,st.lives+1);st.score+=2;sfx('heart')}else{st.coins+=1;st.score+=4;sfx('item')}showPickup(o);setHud();updateMission();saveProgress();if(missionComplete())setTimeout(()=>{sfx('gate');toast('🏁 Missão completa! O portal final está aberto.',2200)},500)}})
}

function playerRect(){const hitW=st.assist?44:58;return {l:st.x+(PLAYER_W-hitW)/2,r:st.x+(PLAYER_W+hitW)/2,b:st.y+4,t:st.y+PLAYER_H-8}}
function hitObstacle(el,o){const r=playerRect(),l=el._x-o.w/2,rr=el._x+o.w/2,b=o.y||0,t=b+o.h;return r.r>l&&r.l<rr&&r.t>b&&r.b<t}
function damage(){if(Date.now()<st.invincible)return;st.invincible=Date.now()+(st.assist?1800:1250);st.lives--;st.x=Math.max(80,st.x-180);st.vy=4;st.y=Math.max(st.y,10);sfx('hit');if(navigator.vibrate)navigator.vibrate(st.assist?60:120);toast('Ai! Desvie do obstáculo. ❤️ -1');if(st.lives<=0){st.lives=3;st.x=120;st.y=0;toast('💜 Nova chance! Cris recomeça esta fase com 3 corações.',2500)}setHud();saveProgress()}
function updateEnemies(){
  const p=phases[st.phase];$$('.enemy').forEach(el=>{const o=p.enemies[+el.dataset.idx],factor=st.assist?.55:1;el._x+=o.speed*factor*el._dir;if(el._x<o.min||el._x>o.max){el._dir*=-1;el._x=Math.max(o.min,Math.min(o.max,el._x))}el.style.left=el._x+'px';if(hitObstacle(el,{...o,x:el._x}))damage()});
}
function checkStaticCollisions(){const p=phases[st.phase];$$('.obstacle').forEach(el=>{const o=p.obstacles[+el.dataset.idx];el._x=o.x;if(hitObstacle(el,o))damage()})}

function supportAt(x,y){if(y<=1)return 0;const cx=x+PLAYER_W/2;let best=null;for(const p of phases[st.phase].platforms){if(cx>=p.x&&cx<=p.x+p.w&&Math.abs(y-p.top)<=3){best=p.top}}return best}
function landingSurface(x,prevY,nextY){const cx=x+PLAYER_W/2;let best=0;if(prevY>=0&&nextY<=0)best=0;for(const p of phases[st.phase].platforms){if(cx>=p.x&&cx<=p.x+p.w&&prevY>=p.top-2&&nextY<=p.top&&p.top>best)best=p.top}return best}
function doJump(){if(isModalOpen()||st.paused)return;const sup=supportAt(st.x,st.y);if(sup!==null){st.vy=st.assist?15:16;st.y+=1;sfx('jump')}}
function physics(){
  const speed=st.assist?4.8:6.3;let dx=0;if(keys.left)dx-=speed;if(keys.right)dx+=speed;st.moving=dx!==0;
  if(dx){st.dir=dx>0?1:-1;st.x=Math.max(20,Math.min(WORLD_W-150,st.x+dx));$('#playerImg').classList.toggle('flipped',st.dir<0)}
  const supported=supportAt(st.x,st.y)!==null; if(!supported||st.vy>0){const prev=st.y;let next=st.y+st.vy;st.vy-=st.assist?.72:.84;if(st.vy<=0){const land=landingSurface(st.x,prev,next);if(land!==null&&prev>=land-2&&next<=land){next=land;st.vy=0}}st.y=Math.max(0,next)}else st.vy=0;
  $('#player').style.left=Math.round(st.x)+'px';$('#player').style.bottom=Math.round(GROUND+st.y)+'px';updateProgress();
}

function animateSprite(now){
  const im=$('#playerImg');if(document.body.classList.contains('reduced-motion')){im.src=sprite('idle_0.png');return}
  if(st.y>8||st.vy!==0){let frame=0;if(st.vy>12)frame=0;else if(st.vy>7)frame=1;else if(st.vy>2)frame=2;else if(st.vy>-3)frame=3;else if(st.vy>-8)frame=4;else frame=5;im.src=sprite(`jump_${frame}.png`);return}
  if(st.moving&&now-st.lastFrame>(st.assist?145:90)){st.frame=(st.frame+1)%(st.assist?5:6);st.lastFrame=now;if(st.assist)im.src=sprite(`walk_${st.frame}.png`);else{const set=st.phase%2===0?'runA':'runB';im.src=sprite(`${set}_${st.frame}.png`)}}else if(!st.moving)im.src=sprite('idle_0.png')
}

function checkQuestionGates(){
  const p=phases[st.phase],[a]=p.range;for(let j=0;j<p.questions.length;j++){const qi=a+j;if(!st.answered.has(qi)&&st.x+PLAYER_W/2>=p.questions[j]-18){openQuestion(qi);return true}}return false
}
function checkNpc(){const p=phases[st.phase];if(!p.npc||st.npcShown)return;if(st.x>p.npc.x-260){st.npcShown=true;toast(p.npc.tip,3600)}}
function checkFinish(){
  if(st.x<WORLD_W-300)return; if(missionComplete()){showPhaseComplete();return}
  if(Date.now()-st.finishHintAt>1800){st.finishHintAt=Date.now();const s=phaseStats(),m=phases[st.phase].mission;const miss=[];if(s.stars<m.stars)miss.push(`${m.stars-s.stars} estrela(s)`);if(s.items<m.items)miss.push(`${m.items-s.items} item(ns)`);if(s.questions<m.questions)miss.push(`${m.questions-s.questions} pergunta(s)`);toast('🔒 O portal ainda está fechado. Falta: '+miss.join(', ')+'.',2600);st.x=WORLD_W-430}
}
function showPhaseComplete(){
  if(st.phaseEnded)return;st.phaseEnded=true;keys.left=keys.right=false;sfx('gate');if(!st.completed.includes(st.phase))st.completed.push(st.phase);st.unlocked=Math.max(st.unlocked,Math.min(phases.length-1,st.phase+1));const p=phases[st.phase];$('#phaseModalTitle').textContent=`✨ ${p.name} concluída!`;$('#phaseRewardImg').src=p.reward.src;$('#phaseRewardName').textContent=p.reward.name;$('#phaseRewardText').textContent=p.reward.text;$('#phaseSummary').textContent=`Placar: ${st.score} pontos · ${st.stars} estrelas · ${st.coins} moedas · ${st.lives} corações.`;$('#nextPhaseBtn').textContent=st.phase===phases.length-1?'Ver resultado 🏆':'Próxima fase ▶';$('#phaseModal').classList.remove('hidden');saveProgress();renderMap()
}
$('#nextPhaseBtn').onclick=()=>{$('#phaseModal').classList.add('hidden');if(st.phase===phases.length-1)showVictory();else{st.phase++;loadPhase(st.phase,true)}};
function showVictory(){
  musicStop();sfx('victory');
  $('#finalSummary').textContent=`Resultado final: ${st.score} pontos de conhecimento · ${st.stars} estrelas · ${st.coins} moedas. As 18 perguntas foram percorridas ao longo das 5 fases.`;
  $('#victoryModal').classList.remove('hidden');
  const video=$('#finalVideo');
  if(video){video.currentTime=0;video.volume=.9;const play=video.play();if(play&&play.catch)play.catch(()=>{});}
  saveProgress()
}

function camera(){const vw=window.innerWidth;const cam=Math.round(Math.max(0,Math.min(WORLD_W-vw,st.x-vw*.34)));$('#world').style.transform=`translate3d(${-cam}px,0,0)`}
function loop(now){
  if(!$('#game').classList.contains('hidden')&&!st.paused&&!isModalOpen()){
    physics();updateEnemies();checkStaticCollisions();collectItems();checkNpc();if(!checkQuestionGates())checkFinish();camera();animateSprite(now)
  }
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop);

function startGame(){
  $('#startScreen').classList.add('hidden');$('#game').classList.remove('hidden');st.phase=Math.min(st.phase,st.unlocked);loadPhase(st.phase,true);musicStart();setTimeout(()=>$('#rightBtn').focus(),60)
}
function goHome(){saveProgress();musicStop();const video=$('#finalVideo');if(video){video.pause();video.currentTime=0}$('#game').classList.add('hidden');$$('.modal').forEach(m=>m.classList.add('hidden'));$('#startScreen').classList.remove('hidden');renderMap()}
function togglePause(force){
  if($('#game').classList.contains('hidden'))return;const next=typeof force==='boolean'?force:!st.paused;st.paused=next;$('#pauseModal').classList.toggle('hidden',!next);$('#pauseBtn').textContent=next?'▶️':'⏸️';keys.left=keys.right=false;saveProgress()
}

$('#startBtn').onclick=startGame;
$('#newGameBtn').onclick=()=>{resetGame();startGame()};
$('#homeBtn').onclick=goHome;$('#victoryHomeBtn').onclick=()=>{$('#victoryModal').classList.add('hidden');goHome()};
$('#restartBtn').onclick=()=>{$('#victoryModal').classList.add('hidden');resetGame();$('#startScreen').classList.add('hidden');$('#game').classList.remove('hidden');loadPhase(0,true);musicStart()};
$('#pauseBtn').onclick=()=>togglePause();$('#resumeBtn').onclick=()=>togglePause(false);
$('#soundBtn').onclick=toggleSound;$('#panelSoundBtn').onclick=toggleSound;
$('#helpBtn').onclick=()=>$('#helpModal').classList.remove('hidden');$$('.closeHelp').forEach(b=>b.onclick=()=>$('#helpModal').classList.add('hidden'));
$('#a11yBtn').onclick=()=>$('#a11yPanel').classList.toggle('hidden');$('#closeA11y').onclick=()=>{$('#a11yPanel').classList.add('hidden');saveProgress()};
$('#contrastToggle').onchange=e=>{document.body.classList.toggle('high-contrast',e.target.checked);saveProgress()};
$('#motionToggle').onchange=e=>{document.body.classList.toggle('reduced-motion',e.target.checked);saveProgress()};
$('#captionToggle').onchange=e=>{st.captions=e.target.checked;saveProgress()};
$('#assistToggle').onchange=e=>{st.assist=e.target.checked;document.body.classList.toggle('assist',st.assist);toast(st.assist?'♿ Modo assistido ativado: movimento mais lento e colisões mais tolerantes.':'Modo assistido desativado.',2400);saveProgress()};
$('#textRange').oninput=e=>{document.documentElement.style.setProperty('--ui-scale',e.target.value/100);saveProgress()};

function setMove(dir,on){keys[dir]=on}
function bindHold(id,dir){const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();setMove(dir,true)});['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();setMove(dir,false)}))}
bindHold('#leftBtn','left');bindHold('#rightBtn','right');$('#jumpBtn').addEventListener('pointerdown',e=>{e.preventDefault();doJump()});
window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#pauseModal').classList.contains('hidden'))togglePause(false);else if(!isModalOpen())togglePause();return}if(isModalOpen()||st.paused)return;if(['ArrowLeft','a','A'].includes(e.key))keys.left=true;if(['ArrowRight','d','D'].includes(e.key))keys.right=true;if([' ','ArrowUp','w','W'].includes(e.key)){e.preventDefault();doJump()}});
window.addEventListener('keyup',e=>{if(['ArrowLeft','a','A'].includes(e.key))keys.left=false;if(['ArrowRight','d','D'].includes(e.key))keys.right=false});
window.addEventListener('blur',()=>{keys.left=keys.right=false;if(!$('#game').classList.contains('hidden')&&!isModalOpen())togglePause(true)});

restoreProgress();setHud();renderMap();$('#soundBtn').textContent=st.sound?'🔊':'🔇';$('#panelSoundBtn').textContent=st.sound?'Ligado':'Desligado';
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
