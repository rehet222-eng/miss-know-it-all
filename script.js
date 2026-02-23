/* ===== Confession Wall ===== */
const confessionForm = document.getElementById('confessionForm');
const confessionsList = document.getElementById('confessionsList');
let confessions=[], likes=[];

if(confessionForm){
  confessionForm.addEventListener('submit', e=>{
    e.preventDefault();
    const text = confessionForm.querySelector('textarea').value;
    confessions.push(text);
    likes.push(0);
    displayConfessions();
    confessionForm.reset();
  });
}

function displayConfessions(){
  confessionsList.innerHTML='';
  confessions.slice().reverse().forEach((c,idx)=>{
    const div=document.createElement('div');
    div.className='card';
    let likeCount = likes[confessions.length-1-idx];
    div.innerHTML=`
      <p id="conf-${idx}"></p>
      <div style="margin-top:0.5rem;">
        <button onclick="likeConfession(${confessions.length-1-idx})">❤️ ${likeCount}</button>
        <button onclick="alert('Thanks for supporting anonymously!')">👍</button>
        <button onclick="alert('💡 Remember self-care!')">💡</button>
      </div>
    `;
    confessionsList.appendChild(div);
    // Typing animation
    let i=0;
    let txt=c;
    let el=document.getElementById(`conf-${idx}`);
    el.textContent='';
    let typing=setInterval(()=>{
      if(i<txt.length){el.textContent+=txt.charAt(i); i++;} else clearInterval(typing);
    },20);
  });
}

function likeConfession(idx){ likes[idx]++; displayConfessions(); }

/* ===== Quiz ===== */
const quizForm=document.getElementById('quizForm');
const quizResult=document.getElementById('quizResult');
const quizTips=document.getElementById('quizTips');
const steps=document.querySelectorAll('.question-step');
const progressBar=document.getElementById('progressBar');

if(steps.length>0){
  steps.forEach((s,i)=>{ if(i!==0) s.style.display='none'; });
}

if(quizForm){
  quizForm.addEventListener('submit', e=>{
    e.preventDefault();
    let score=0;
    const q1=parseInt(quizForm.q1.value);
    const q2=parseInt(quizForm.q2.value);
    score = q1+q2;
    let message='', color='', tip='';
    if(score<=1){ message='You seem to be doing well 😊'; color='green'; tip='Keep practicing mindfulness and maintain healthy routines.'; }
    else if(score==2){ message='Some stress detected, take care! 😐'; color='orange'; tip='Try short breaks, meditation, and sleep hygiene.'; }
    else{ message='High stress detected 😟 Consider reaching out for help.'; color='red'; tip='Contact a counselor or trusted adult; self-care is important!'; }
    quizResult.textContent=message; quizResult.style.color=color;
    quizTips.textContent=tip;
    progressBar.style.width='100%';
  });
}

/* ===== Carousel ===== */
const track=document.querySelector('.carousel-track');
const prevBtn=document.querySelector('.prev');
const nextBtn=document.querySelector('.next');
if(track){
  let index=0;
  const items=document.querySelectorAll('.carousel-track .card');
  const show=1;
  nextBtn.addEventListener('click',()=>{ index++; if(index>=items.length-show) index=0; track.style.transform=`translateX(-${index*260}px)`; });
  prevBtn.addEventListener('click',()=>{ index--; if(index<0) index=items.length-show-1; track.style.transform=`translateX(-${index*260}px)`; });
}

/* ===== Accordion ===== */
const accBtns=document.querySelectorAll('.accordion-btn');
accBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const content=btn.nextElementSibling;
    content.style.display=content.style.display==='block'?'none':'block';
  });
});

/* ===== Copy Number Buttons ===== */
function copyText(text){
  navigator.clipboard.writeText(text).then(()=>alert('Copied to clipboard!'));
}
