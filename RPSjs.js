        let Score = 0;
        const rock = document.querySelector('.js-rockBtnMove');
        const paper = document.querySelector('.js-paperBtnMove');
        const scissor =document.querySelector('.js-scissorBtnMove');
        const autoPlayBtn = document.querySelector('.js-autoPlayBtnMove');
        const resetBtn =document.querySelector('.js-resetBtnMove');

        let iskor =JSON.parse(localStorage.getItem('tite'))||
        {
        Win:0,
        Lose:0,
        Tie:0
        };
   if (iskor.Win !== 0 || iskor.Lose !== 0 || iskor.Tie !== 0) {
    scoreBoard();
    }
          rock.addEventListener('click',()=>{
                playerVSComputerPickresult("Rock");
          });
          paper.addEventListener('click',()=>{
                playerVSComputerPickresult("Paper");
          });
          scissor.addEventListener('click',()=>{
                playerVSComputerPickresult("Scissor");
          });
          
          autoPlayBtn.addEventListener('click',()=>{
            CallautoPlay();
          });

          document.body.addEventListener('keydown',(event)=>{
            if(event.key==="Enter"){
              CallautoPlay();
            }
          });
      function playerVSComputerPickresult(playerPick) {
        let randomPick = randomNUmberPicked();
        let result;
        ImageChange(randomPick);

        if (playerPick === "Paper") {
          document.getElementById("PlayerPickImage").src = "RPSimage/paper.png";
          if (randomPick === "Paper") {
            result="Tie";
          } else if (randomPick === "Rock") {
            result="Win";
            Score += 1;
          } else if (randomPick === "Scissor") {
            result="Lose";
          }
        } else if (playerPick === "Rock") {
          document.getElementById("PlayerPickImage").src = "RPSimage/theRock.png";
          if (randomPick === "Rock") {
            result="Tie";
          } else if (randomPick === "Scissor") {
            result="Win";
            Score += 1;
          } else if (randomPick === "Paper") {
            result="Lose";
          }
        } else if (playerPick === "Scissor") {
          document.getElementById("PlayerPickImage").src = "RPSimage/scissors.png";
          if (randomPick === "Scissor") {
            result="Tie";
          } else if (randomPick === "Paper") {
            result="Win";
            Score += 1;
          } else if (randomPick === "Rock") {
            result="Lose";
          }
        }

        
        

        //update scoreBoard in object score boeard
        if(result==="Win"){
          iskor.Win++;
          console.log("You Win!");

        }else if(result==="Lose"){
          iskor.Lose++;
          console.log("You Lose!");

        }else{
          iskor.Tie++;
          console.log("Tie");
        }

        localStorage.setItem('tite',JSON.stringify(iskor));
        
        picked(randomPick,playerPick);
        
      }
      function reset(){
        iskor = {
          Win:0,
          Lose:0,
          Tie:0
        }
         localStorage.setItem('tite',JSON.stringify(iskor));
        scoreBoard();
        document.querySelector('.webScore').innerHTML = `Play A Game`;

        setTimeout(() => {
          
        },4000);
      }

      function scoreBoard(){
        console.log(iskor);
        document.querySelector('.webScore').innerHTML = `Win:${iskor.Win} Lose:${iskor.Lose} Tie:${iskor.Tie}`;
      }
      function picked(comp,player) {
        scoreBoard();
        document.getElementById('plyPick').innerHTML 
        =`${player}` ;
        document.getElementById('compPick').innerHTML 
        =`${comp}` ;
      }

      function randomNUmberPicked(){
        let randomNumber = Math.floor(Math.random() * 3 + 1);
        let picked;
        //Random Pick
        if (randomNumber === 1) {
          picked = "Rock";
        } else if (randomNumber === 2) {
          picked = "Paper";
        } else if (randomNumber === 3) {
          picked = "Scissor";
        }
        return picked;
      }

      function ImageChange(picked){
        //changing image of the computer side
        if (picked === "Paper") {
            document.getElementById("CompPickImage").src = "RPSimage/paper.png";
          } else if (picked === "Rock") {
            document.getElementById("CompPickImage").src = "RPSimage/theRock.png";
          } else if (picked === "Scissor") {
            document.getElementById("CompPickImage").src = "RPSimage/scissors.png";
          }
      }

      function CallautoPlay(){// just for eventlistener for keydown and click
        if(autoPlayBtn.textContent.trim()==='Auto Play'){
              autoPlay();
              autoPlayBtn.innerHTML='Stop';
              console.log("Auto Play Started");
        }else{
              autoPlayBtn.textContent='Auto Play';
              console.log("Auto Play Stopped");
        }
      };

      function autoPlay() {
          let playerRandomPick;
           const tt = setInterval(()=>{
            playerRandomPick = randomNUmberPicked();
            if(autoPlayBtn.textContent.trim()==='Stop'){
              playerVSComputerPickresult(playerRandomPick);
            }else{
              clearInterval(tt);
              console.log("Interval has been cleared");
              autoPlayBtn.innerHTML='Auto Play';
            }
            }, 1000);  
      };