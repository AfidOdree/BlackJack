function hit() {
    var request = new XMLHttpRequest()

    request.open('GET', 'https://deckofcardsapi.com/api/deck/'+data.deck_id+'/draw/?count=1', true)
    request.onload = function () {
    try{
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        var img = document.createElement("img");
        img.setAttribute('src', data.cards[0].image);
        img.setAttribute('width', "20%%");
        img.setAttribute('display', "inline-block");
        img.setAttribute('class', "cardImg");
        document.getElementById("cardhold").appendChild(img);
        
        if(data.cards[0].value=="KING" || data.cards[0].value=="QUEEN" || data.cards[0].value=="JACK"){
            playerScore=playerScore+10;

            }
            else if(data.cards[0].value=="ACE"){
                if(playerScore<=10) {playerScore=playerScore+11;}
                else {playerScore=playerScore+1;}
            }
            else{
                playerScore=playerScore+parseInt(data.cards[0].value);
            }
            document.getElementById("dealerScoreTrack").innerHTML=dealerScore+"";
            document.getElementById("playerScoreTrack").innerHTML=playerScore+"";
        if(playerScore>21){
        amount=parseInt(amount)-parseInt(betplaced);
        disableButton();
        document.getElementById("results").innerHTML="You BUST! Dealer WINS!";
        window.setTimeout(popBet, 1000)
        document.getElementById("modalHeader").innerHTML="DEALER WINS! Place your bet!"
        }
        cardCount++;
        
    }
    else {
        console.log('error')
    }
    }
    catch(err){
        hit();
    }
    }
    request.send()
}


function Stand(){
    document.getElementById("results").innerHTML="DEALER'S TURN"
    var request = new XMLHttpRequest()
    request.open('GET', 'https://deckofcardsapi.com/api/deck/'+data.deck_id+'/draw/?count=1', true)
    request.onload = function () {
    try{
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        var img = document.createElement("img");
        img.setAttribute('src', data.cards[0].image);
        img.setAttribute('width', "20%%");
        img.setAttribute('display', "inline-block");
        img.setAttribute('class', "cardImg");
        document.getElementById("dealerHold").appendChild(img);
            if(data.cards[0].value=="KING" || data.cards[0].value=="QUEEN" || data.cards[0].value=="JACK"){
                var value=10;
            dealerScore=dealerScore+10;
            }
            else if(data.cards[0].value=="ACE"){
                if(dealerScore>10 ) dealerScore=dealerScore+1;
                else dealerScore=dealerScore+11;
            }
            else{
                dealerScore=dealerScore+parseInt(data.cards[0].value);
            }
            dealerCardCount++;
        document.getElementById("dealerScoreTrack").innerHTML=dealerScore+"";
        document.getElementById("playerScoreTrack").innerHTML=playerScore+"";
        if(cardCount==2 && playerScore==21 && dealerCardCount==2 && dealerScore<playerScore){
            document.getElementById("results").innerHTML="BLACKJACK! YOU WIN!";
            disableButton();
            amount=parseInt(amount)+(1.5*parseInt(betplaced));
            window.setTimeout(popBet, 1000)
            document.getElementById("modalHeader").innerHTML="BLACKJACK! YOU WIN!"
        }
        else if(cardCount==2 && playerScore==21 && dealerCardCount>2 ){
            document.getElementById("results").innerHTML="BLACKJACK! YOU WIN!";
            disableButton();
            amount=parseInt(amount)+(1.5*parseInt(betplaced));
            window.setTimeout(popBet, 1000)
            document.getElementById("modalHeader").innerHTML="BLACKJACK! YOU WIN!"
        }
        else if(dealerScore>21){
        document.getElementById("results").innerHTML="Dealer BUSTS! You WIN!";
        disableButton();
        amount=parseInt(amount)+parseInt(betplaced);
        window.setTimeout(popBet, 1000)
        document.getElementById("modalHeader").innerHTML="YOU WIN! Place your bet!"
        }
        else if(dealerScore>16 && dealerScore<playerScore){
            document.getElementById("results").innerHTML="You WIN!";
            disableButton();
            amount=parseInt(amount)+parseInt(betplaced);
            window.setTimeout(popBet, 1000)
            document.getElementById("modalHeader").innerHTML="YOU WIN! Place your bet!"
        }
        else if(dealerScore>16 && dealerScore==playerScore){
            document.getElementById("results").innerHTML="DRAW!";
            disableButton();
            window.setTimeout(popBet, 1000)
            document.getElementById("modalHeader").innerHTML="DRAW! Place your bet!"
        }
        else if(dealerScore>16 && dealerScore>playerScore){
            document.getElementById("results").innerHTML="Dealer WINS!";
            disableButton();
            amount=parseInt(amount)-parseInt(betplaced);
            window.setTimeout(popBet, 1000)
            document.getElementById("modalHeader").innerHTML="DEALER WINS! Place your bet!"                  
        }
        else{
            window.setTimeout(Stand, 800);
        }    
    } else {
        console.log('error')
    }
    }
    catch(err){
        Stand();
    }
    }
    request.send()
}