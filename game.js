var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
function newSequence(){
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}
$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    //console.log(userClickedPattern);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(index){
    if(gamePattern[index]===userClickedPattern[index]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            userClickedPattern=[];
            setTimeout(function(){
                newSequence();
            },1000);
        }
        
    }
    else{
        playSound("wrong");
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    

}
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed")
    },100)
}
var started=false;
$(document).keydown(function(event){
    if(started===false){
        started=true;
        newSequence();
    }
})
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}


