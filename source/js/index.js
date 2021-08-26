console.log('test');


function showMenu(selector1, selector2) {
   let target = document.getElementsByClassName(selector1)[0];
   let closer = document.getElementsByClassName(selector2)[0];
  
   if (target.classList.contains('open')){
    target.classList.remove('open');
    closer.classList.remove('open');
   } else {
    target.classList.add('open');
    closer.classList.add('open');
   }
}

$(document).ready(function(){
    $('.slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
})

