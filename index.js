let text = "Ты действительно готов увидеть нечто невероятно ужасное ? Не боишься ? Не говори, что я тебя не предупреждал...";
const audio = document.querySelector(`#player`);
audio.play();
let i=0;
speed =180;


function beginning(){

   if (i<text.length){
       
       document.querySelector(`.par`).textContent+=text.charAt(i);
       i++;
       setTimeout(beginning, speed);   
   }
   
}

beginning();

  function weiter (){

    let pic = document.createElement(`img`);
    pic.src = "./assets/header_harry-potter.png";
    pic.classList.add("pic");
    document.querySelector(`.header`).appendChild(pic);
    setTimeout(buttonDelay, 25000  );

     
}

weiter();

function buttonDelay(){
    document.querySelector(`.btn`).style.display ="block";
}

  

