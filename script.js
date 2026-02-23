// ===== Confession Wall with live typing animation =====
const confessionForm = document.getElementById('confessionForm');
const confessionsList = document.getElementById('confessionsList');
let confessions = [], likes=[];

if(confessionForm){
  confessionForm.addEventListener('submit', e=>{
    e.preventDefault();
    const text=confessionForm.querySelector('textarea').value;
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
    div.innerHTML=`<p id="conf-${idx}"></p><button onclick="likeConfession(${confessions.length-1-idx})">❤️ ${likeCount}</button>`;
    confessionsList.appendChild(div);
    // Typing animation
    let i=0;
    let txt=c;
    let el=document.getElementById(`conf-${idx}`);
    el.textContent='';
    let typing=setInterval(()=>{
      if(i<txt.length){el.textContent+=txt.charAt(i);i++;}
      else{clearInterval(typing);}
    },20);
  });
}

function likeConfession(idx){likes[idx]++;displayConfessions();}

// ===== Quiz multi-step + progress bar =====
const quizForm=document.getElementById('quizForm');
const quizResult=document.getElementById('quizResult');
const steps=document.querySelectorAll('.question-step');
const progressBar=document.getElementById('progressBar');
let currentStep=0;
if(steps.length>0){
  steps.forEach((s,i)=>{if(i!==0)s.style.display='none';});
}

if(quizForm){
  quizForm.addEventListener('submit',e=>{
    e.preventDefault();
    let score=0;
    const q1=parseInt(quizForm.q1.value);
    const q2=parseInt(quizForm.q2.value);
    score=q1+q2;
    let message='',color='';
    if(score<=1){message='You seem to be doing well 😊'; color='green';}
    else if(score==2){message='Some stress detected, take care!'; color='orange';}
    else{message='High stress detected 😟 Consider reaching out for help.'; color='red';}
    quizResult.textContent=message; quizResult.style.color=color;
    progressBar.style.width='100%';
  });

  steps.forEach((step,i)=>{
    step.addEventListener('change',()=>{
      if(i<steps.length-1){step.style.display='none'; steps[i+1].style.display='block'; progressBar.style.width=((i+1)/steps.length*100)+'%';}
    });
  });
}

// ===== Carousel =====
const track=document.querySelector('.carousel-track');
const prevBtn=document.querySelector('.prev');
const nextBtn=document.querySelector('.next');
if(track){
  let index=0;
  const items=document.querySelectorAll('.carousel-track .card');
  const show=1;
  nextBtn.addEventListener('click',()=>{index++; if(index>=items.length-show)index=0; track.style.transform=`translateX(-${index*230}px)`;});
  prevBtn.addEventListener('click',()=>{index--; if(index<0)index=items.length-show-1; track.style.transform=`translateX(-${index*230}px)`;});
}

// ===== Accordion =====
const accBtns=document.querySelectorAll('.accordion-btn');
accBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const content=btn.nextElementSibling;
    content.style.display=content.style.display==='block'?'none':'block';
  });
});
