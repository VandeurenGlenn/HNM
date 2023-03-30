var xDown = null;                                                        
var yDown = null;
let posX = 0
let posY = 0
function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
  evt.preventDefault()
  console.log(evt);
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
  evt.preventDefault()
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
        } else {
          console.log('swipe')
            /* left swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

const gesturestart = (e) => {
  e.preventDefault();
  startX = e.pageX - posX;
  startY = e.pageY - posY;
  gestureStartRotation = rotation;
}

const gesturechange = (e) => {
  e.preventDefault();
  
  rotation = gestureStartRotation + e.rotation;
  scale = gestureStartScale * e.scale;

  posX = e.pageX - startX;
  posY = e.pageY - startY;
}


window.addEventListener('wheel', (e) => {
  console.log(e);
  e.preventDefault();

  if (e.ctrlKey) {
    scale -= e.deltaY * 0.01;
  } else {
    posX -= e.deltaX * 2;
    posY -= e.deltaY * 2;
  }


}, true);
window.addEventListener('touchstart', handleTouchStart, false);        
window.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('gesturestart', gesturestart, false);        
window.addEventListener('gesturechange', gesturechange, false);
window.addEventListener("gestureend", function (e) {
  e.preventDefault();
}, false);