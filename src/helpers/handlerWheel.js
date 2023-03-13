export function handlerWheel(apiObj, e) {
  const isThouchpad = Math.abs(e.deltaX) !== 0 || Math.abs(e.deltaY) < 15;

  if(isThouchpad) {
    e.stopPropagation();
    return;
  }

  if(e.deltaY < 0) {
    apiObj.scrollNext();
  } else if(e.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
