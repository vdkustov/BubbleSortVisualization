var isSorting = false;

/*Finish sorting listener*/
function onFinishListener() {
  $(".btn_refresh").show();
  $(".btn_sort").html("Sorted!");
}

$(document).ready(function() {
  let bubSort = new BubbleSort();
  bubSort.init();
  
  $(".btn_sort").click(function() {
    if(!isSorting) {
      $(".block_cursor").attr('class', 'block_cursor block_cursor_sorting');
      $(".btn_refresh").hide();
      $(".btn_sort").html("Sorting...");
      bubSort.sort(onFinishListener);
    }
    isSorting = true;
  });
  
  $(".btn_refresh").click(function() {
    $(".block_cursor").attr('class', 'block_cursor');
    $(".block_cursor").animate({left:"20px"}, 180);
    isSorting = false;
    $(".btn_sort").html("Start sorting");
    $(".block_sort").html("");
    bubSort.init();
  });
});