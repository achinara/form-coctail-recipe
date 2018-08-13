//common functions
function getElemByClass(el, cls) {

    var result = [];
    getElems(el, result, cls);

    function getElems(elem, result, cls){

        if( hasClass(elem, cls)){
            result.push(elem);
        }

        for( var i = 0; i < elem.children.length; i++){
            getElems(elem.children[i], result, cls);
        }
        return result;
    }

    if ( result.length === 1){
        return result[0];
    }

    return result;

}

function hasClass(el, cls) {
    for (var c = el.className.split(' '),i=c.length-1; i>=0; i--) {
        if (c[i] === cls) return true;
    }
    return false;
}

function addClass(el, cls) {
    var c = el.className.split(' ');
    for (var i=0; i<c.length; i++) {
        if (c[i] === cls) return;
    }
    c.push(cls);
    el.className = c.join(' ');
}

function removeClass(el, cls) {
    var c = el.className.split(' ');
    for (var i=0; i<c.length; i++) {
        if (c[i] === cls) c.splice(i--, 1);
    }

    el.className = c.join(' ');
}

// part Ingredients > inputs

var btnUp = getElemByClass(document.body, 'up');
var btnDown = getElemByClass(document.body, 'down');

    for( var i = 0; i < btnUp.length; i++){
        btnUp[i].onclick = function(event){
            var  e = event || window.event;
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);

            onUp(this);

            var input = this.parentNode.getElementsByTagName('input')[0];
            removeClass(input, 'placeholder');
            if( hasClass(input, 'tick') ) {
                setPosition(this, '-11px -63px');
            }

        };

        btnDown[i].onclick = function(event){
            var  e = event || window.event;
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);

            onDown(this);

            var input = this.parentNode.getElementsByTagName('input')[0];
            if ( input.value === 0) {
                addClass( input, 'placeholder');
                if( hasClass(input, 'tick') ) {
                    setPosition(this, '-11px -8px');
                }
            }
        }
    }

    function onUp(elem){
        elem.parentNode.getElementsByTagName('input')[0].value++;
    }

    function onDown(elem){
        if( elem.parentNode.querySelector('input').value <= 0 ) {
            elem.parentNode.querySelector('input').value = 0;
        }
        if( elem.parentNode.querySelector('input').value === 0 ) return;
        elem.parentNode.querySelector('input').value--;
    }

if ( document.all && document.querySelector && !document.addEventListener ) {

    var labelsDecor = getElemByClass( document.body, 'chbox');

    for( var i = 0; i < labelsDecor.length; i++){

        labelsDecor[i].getElementsByTagName('input')[0].onclick = function(){
            toggleCheck(this);
        };
    }

    function toggleCheck(elem){
        if( elem.checked ){
            elem.parentNode.children[1].style.backgroundPosition='-38px -388px';
        } else {
            elem.parentNode.children[1].style.backgroundPosition='-4px -422px';
        }
    }

    function createDecorHint(){
        var span = document.createElement('span');
        span.innerHTML='Украшение?';
        span.className ='hint';

        return span;
    }

    var hint = createDecorHint();

    var signHint = getElemByClass( document.getElementById('ingredients'), 'sign-decor');
    signHint.appendChild(hint);

    signHint.onmouseover = function(){
        hint.style.display='block';
    }

    signHint.onmouseout =function(){
        hint.style.display='';
    }
}


// part Description

var placeholder = getElemByClass( document.body, 'placeholder');

for( var i = 0; i < placeholder.length; i++ ) {

    placeholder[i].onfocus = function(){
        if ( hasClass(this, 'placeholder') ) {
            prepareInput(this);
        }
    }

    placeholder[i].onblur = function() {
        if (( this.value === '' ) || ( this.value === 0 ) ) {
            resetInput(this);
            if ( hasClass(this, 'tick') ) {
                setPosition(this, '-11px -8px');
            }

        }
        else
        {
            if ( hasClass(this, 'tick') ) {
                setPosition( this, '-11px -63px');
            }
        }
    }
}

function setPosition( input, value ){

    var parentInput = input.parentNode;

    while( parentInput.tagName !=== 'LI' ){
        parentInput = parentInput.parentNode;
    }

    var txtTitle = getElemByClass(parentInput, 'txt-title');
    txtTitle.style.backgroundPosition = value;
}

function prepareInput(input) {
    removeClass(input, 'placeholder' );
    input.oldValue = input.value;
    input.value = '';
}

function resetInput(input) {
    addClass(input, 'placeholder');
    input.value = ( input.oldValue ) ? input.oldValue : input.value;

}

// part Glasses

var glasses = document.getElementById('glasses').getElementsByTagName('li');
var oldChecked, oldHint, timer,
    oldText = getElemByClass( glasses[0], 'txt-choice').innerHTML,
    newText = 'Выбран';

    for( var i = 0; i < glasses.length; i++){
    glasses[i].onclick = function(){

        toggleTxt(this);
    };

    glasses[i].onmouseover = function(e){
        e = e || window.event;
        showHint(this, e);
    };

    glasses[i].onmouseout = function(e){
        e = e || window.event;
       hideHint(this, e);

    };

    var hintGlass = document.createElement('SPAN');
    hintGlass.className = 'hint';
    hintGlass.innerHTML = glasses[i].getElementsByTagName('img')[0].getAttribute('alt');
    glasses[i].appendChild( hintGlass );
}


function toggleTxt(elem){
    if( oldChecked ){
        oldChecked.className = '';
        oldChecked.querySelector('.txt-choice').innerHTML= oldText;
    }
    elem.className = 'selected';
    elem.querySelector('.txt-choice').innerHTML = newText;
    oldChecked = elem;
}

function showHint(elem, e){

    var span = elem.getElementsByTagName('span')[0];

    if( e.target === span ){

        clearInterval( timer );
        span.style.opacity = '0';
        removeClass(span, 'show');
        return;

    }

    if( hasClass(span,'show')) return;

    var start = new Date;

    clearInterval(timer);

    addClass(span, 'show');

    timer = setInterval( function(){

        var progress = (new Date - start) / 300;

        if ( progress > 1) progress = 1;

        span.style.opacity = progress;

        if( progress === 1 ){
            span.style.opacity = 1;
            clearInterval(timer);
            timer = null;
        }

    }, 30 );
}

function hideHint(elem, e){

    var span = elem.getElementsByTagName('span')[0];

       if(childrenLi(elem, e)) return;
        clearInterval(timer);
        span.style.opacity = '0';
        removeClass(span, 'show');
}

function childrenLi(elem, e){
    fixRelatedTarget(e);
    for( var i = 0; i < elem.children.length; i++){

        if( e.relatedTarget === elem.children[i] ){
            return true;
        }
    }
    return false;
}

function fixRelatedTarget(e) {
  if (!e.relatedTarget) {
    if (e.type === 'mouseover') e.relatedTarget = e.fromElement;
    if (e.type === 'mouseout') e.relatedTarget = e.toElement;
  }
}

function send(){
    alert('Данные отправлены!');
    return false;
}