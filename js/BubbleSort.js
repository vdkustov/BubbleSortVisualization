"use strict";
class BubbleSort {

  constructor() {
    this.BUBBLES_COUNT = 11;
    this.BUBBLES_SIZE = 70;
    this.SPEED_ANIM = 180;
    this.bubArr = [];
    this.nextLeft = 0;
  }

  init() {
    this.getRandomNumbers;
    this.redrawBubbles;
  }

  get getRandomNumber() {
    return (1 + Math.floor(Math.random() * this.BUBBLES_COUNT));
  }

  /*Generate random different*/
  get getRandomNumbers() {
    this.bubArr = [];
    while(this.bubArr.length < this.BUBBLES_COUNT) {
      var num = this.getRandomNumber;
      if(this.bubArr.indexOf(num) > -1) continue;
      this.bubArr[this.bubArr.length] = num;
    }
  }

  /*Get height and width style for special bubble*/
  getBubbleStyle(pos) {
    var left = this.nextLeft+10;
    this.nextLeft = this.BUBBLES_SIZE+left; //Calculate left position for next bubble
    return "style='left:"+left+"px;'";
  }

  /*Draw new bubbles using updated data*/
  get redrawBubbles() {
    this.nextLeft = 0;
    for(var i=0; i<this.BUBBLES_COUNT; i++) {
      var val = this.bubArr[i];
      var html = "<div class='bubble' "+this.getBubbleStyle(i)+" id='id"+val+"'>";
      html += "<div class='bubble_container'>"+val+"</div></div>";
      $(".block_sort").append(html);
    }
  }

  getBubblePosX(i) {
    return $("#id"+this.bubArr[i]).position().left;
  }

  getBubblePosY(i) {
    return $("#id"+this.bubArr[i]).position().top;
  }

  /*Do animation for swaping bubble positions*/
  swapBubblesPositions(i) {
    var speed = this.SPEED_ANIM;
    let bubArr = this.bubArr;
    var leftBubblePosX = this.getBubblePosX(i-1);
    var rightBubblePosX = this.getBubblePosX(i);
    var leftBubblePosY = this.getBubblePosY(i-1);
    var rightBubblePosY = this.getBubblePosY(i);
    
    $("#id"+bubArr[i]).animate({top:(leftBubblePosY+50)+"px"}, speed);
    $("#id"+bubArr[i]).animate({left:leftBubblePosX+"px"}, speed);
    $("#id"+bubArr[i]).animate({top:(leftBubblePosY)+"px"}, speed);
    
    $("#id"+bubArr[i-1]).animate({top:(rightBubblePosY-50)+"px"}, speed);
    $("#id"+bubArr[i-1]).animate({left:rightBubblePosX+"px"}, speed);
    $("#id"+bubArr[i-1]).animate({top:(rightBubblePosY)+"px"}, speed);
  }

  /*Start Bubble Sort Visualization*/
  sort(onFinishListener) {
    var obj = this;
    var sortedPos = -1; //Last sorted position
    var last = this.BUBBLES_COUNT-1; //Last array position (length)
    var i = last; // Set cursor to last position
    let bubArr = this.bubArr;
  
    var timerId = setInterval(function() {
      var leftBubblePosX = $("#id"+bubArr[i-1]).position().left;
      $(".block_cursor").animate({left:(leftBubblePosX+10)+"px"}, 180);
      //Swap items
      if(bubArr[i] < bubArr[i-1]) {
        let l = bubArr[i-1];
        bubArr[i-1] = bubArr[i];
        bubArr[i] = l;
        obj.swapBubblesPositions(i);
      }
      //Change cursor position
      if((i-2) == sortedPos) {
        sortedPos = i-1;
        i = last;
      } else if((i-1) == sortedPos) {
        sortedPos = i;
      } else {
        i--;
      }
      //Change background of sorted bubble
      $("#id"+bubArr[sortedPos]).addClass("bubble_sorted");
      //Check is all items sorted
      if(sortedPos == last) {
        onFinishListener();
        clearInterval(timerId);
      }
    },600);
  }
}