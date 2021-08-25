console.log('test');


function showMenu() {
   let target = document.getElementsByClassName('menu-wrap')[0];
  
   if (target.classList.contains('open')){
    target.classList.remove('open');
   } else {
    target.classList.add('open');
   }
   
   
}


