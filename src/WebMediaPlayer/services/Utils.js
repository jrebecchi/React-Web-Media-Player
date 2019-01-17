const isInsideElement = (element,event) => {
    const elementPointed = document.elementFromPoint(event.clientX, event.clientY);
    return element.contains(elementPointed);
};

export { isInsideElement }