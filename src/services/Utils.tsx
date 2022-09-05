export const isInsideElement = (element: HTMLElement,event: MouseEvent): boolean => {
    const elementPointed = document.elementFromPoint(event.clientX, event.clientY);
    return element.contains(elementPointed);
};

export const isIE = () => !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

export const isNaN = (value: unknown): boolean => {
    // eslint-disable-next-line
    return value !== value;
}