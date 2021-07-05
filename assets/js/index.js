function changeHandler(event) {
    var display = document.querySelector('.display');
    if ( this.value === 'list' ) {
        if(display.classList.contains('box')){
            display.classList.remove('box');
        }
        if(!display.classList.contains('list')){
            display.classList.add('list');
        }
    } else if ( this.value === 'box' ) {
        if(display.classList.contains('list')){
            display.classList.remove('list');
        }
        
        if(!display.classList.contains('box')){
            display.classList.add('box');
        }
    }
}

window.addEventListener("load", () => {
    var radios = document.querySelectorAll('input[type=radio][name="display"]');
    
    Array.prototype.forEach.call(radios, function(radio) {
        radio.addEventListener('change', changeHandler);
    });

    // <div onclick="location.href='url'">content</div>
    // $("div").click(function(){
    //     window.location=$(this).find("a").attr("href"); return false;
    //  });
}, false);

window.addEventListener("pageshow", () => {
   var radios = document.querySelectorAll('input[type=radio][name="display"]');
    
   if(radios[0].checked == true){
        changeHandler.bind(radios[0]();
    }
   else if(radios[1].chekced == true){
        changeHandler.bind(radios[1])();
   }
}, false);
