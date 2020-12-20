function doubleDown(){
    var request = new XMLHttpRequest()

        request.open('GET', 'https://deckofcardsapi.com/api/deck/'+data.deck_id+'/draw/?count=1', true)
        request.onload = function () {
        // Begin accessing JSON data here
        var data;
        try{
        data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            var img = document.createElement("img");
            img.setAttribute('src', data.cards[0].image);
            img.setAttribute('width', "20%%");
            img.setAttribute('display', "inline-block");
            img.setAttribute('class', "cardImg");
            document.getElementById("cardhold").appendChild(img);
            
            if(data.cards[0].value=="KING" || data.cards[0].value=="QUEEN" || data.cards[0].value=="JACK"){
                    var value=10;
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
            amount=parseInt(amount)-2*(parseInt(betplaced));
            disableButton();
            document.getElementById("results").innerHTML="You BUST! Dealer WINS!";
            document.getElementById("modalHeader").innerHTML="Dealer WINS! Place your bet!";
            document.getElementById("deal").click();
            }
            else{
                window.setTimeout(doubleDownStand,1000)
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

function doubleDownStand(){
    request = new XMLHttpRequest()
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
                dealerScore=dealerScore+10;
                }
                else if(data.cards[0].value==="ACE"){
                    if(dealerScore>10) dealerScore=dealerScore+1;
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
                document.getElementById("deal").click();
                document.getElementById("modalHeader").innerHTML="BLACKJACK! YOU WIN!"
            }
            else if(cardCount==2 && playerScore==21 && dealerCardCount>2 ){
                document.getElementById("results").innerHTML="BLACKJACK! YOU WIN!";
                disableButton();
                amount=parseInt(amount)+(1.5*parseInt(betplaced));
                document.getElementById("deal").click();
                document.getElementById("modalHeader").innerHTML="BLACKJACK! YOU WIN!"
            }
                else if(dealerScore>21){
            document.getElementById("results").innerHTML="Dealer BUSTS! You WIN!";
            document.getElementById("modalHeader").innerHTML="You WIN! Place your bet!";
            disableButton();
            amount=parseInt(amount)+2*(parseInt(betplaced));
            document.getElementById("deal").click();
            }
            else if(dealerScore>16 && dealerScore<playerScore){
                document.getElementById("results").innerHTML="You WIN!";
                document.getElementById("modalHeader").innerHTML="You WIN! Place your bet!";
                disableButton();
                amount=parseInt(amount)+2*(parseInt(betplaced));
                document.getElementById("deal").click();
            }
            else if(dealerScore>16 && dealerScore===playerScore){
                document.getElementById("results").innerHTML="DRAW!";
                document.getElementById("modalHeader").innerHTML="DRAW! Place your bet!";
                disableButton();
                document.getElementById("deal").click();
            }
            else if(dealerScore>16 && dealerScore>playerScore){
                document.getElementById("results").innerHTML="Dealer WINS!";
                document.getElementById("modalHeader").innerHTML="Dealer WINS! Place your bet!";
                disableButton();
                amount=parseInt(amount)-2*(parseInt(betplaced));
                document.getElementById("deal").click();                       
            }
            else{
                window.setTimeout(doubleDownStand, 500);
            }    
        } else {
            console.log('error')
        }
        }
        catch(err){
            doubleDownStand()
        }
        }
        request.send()
        
}