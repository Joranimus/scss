// function showMenu(selector1, selector2) {
//    let target = document.getElementsByClassName(selector1)[0];
//    let closer = document.getElementsByClassName(selector2)[0];
//    let bottomLine = document.getElementsByClassName('bottom-line')[0]
   
//    console.log(target.classList.item(0));
   
//     /*if ($("." + target.classList.item(0)).is(":visible")){
//       $("." + target.classList.item(0)).hide();
//       $("." + closer.classList.item(0)).hide();
//       $("." + bottomLine.classList.item(0)).hide();
//     } else {
//       $("." + target.classList.item(0)).show();
//       $("." + closer.classList.item(0)).show();
//       $("." + bottomLine.classList.item(0)).show();
//     }*/

//     if (target.classList.contains('open')){
//     target.classList.remove('open');
//     closer.classList.remove('open');
//     bottomLine.classList.remove('open');
//    } else {
//     target.classList.add('open');
//     closer.classList.add('open');
//     bottomLine.classList.add('open');
//    }
// }

// function showtest(){
//   let test = document.getElementsByClassName("test")[0]
  
  
//   console.log(test.classList.item(0));
//   $("." + test.classList.item(0)).hide();
// } 

$(document).ready(function(){
    $('.slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
        autoplaySpeed: 2000,
      });
      // $(document).on('click','.trigger', function(){
      //   let target = $(body).find('.'+$(this).data('asd'));
      //   target.addClass('asdasd')
      // })
    $('#nav-trigger').on('click', function(){
      $('.menu-wrap').addClass('open');
      $('.bottom-line').addClass('open');
    });
    $('.menu-wrap__closer').on('click', function(){
      $('.menu-wrap').removeClass('open');
      $('.bottom-line').removeClass('open');
    });
    $(document).on('click','.menu-asdasd',function(){

    })
})

// function showtest(){

//   let test = document.getElementsByClassName("test")[0]
//   console.log(test.classList.item(0));
//   $("." + test.classList.item(0)).hide();
// } 

