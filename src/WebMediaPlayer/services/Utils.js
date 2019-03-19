const isInsideElement = (element,event) => {
    const elementPointed = document.elementFromPoint(event.clientX, event.clientY);
    return element.contains(elementPointed);
};

const isIE = () => !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

const isNaN = (value) => {
    // eslint-disable-next-line
    return value !== value;
}


export {isInsideElement, isIE, isNaN}