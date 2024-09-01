export const getVisibleItemCount = (container: HTMLElement, items: NodeListOf<Element>) => {
    const containerRect = container.getBoundingClientRect();
    let visibleCount = 0;

    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();

        // Check if the item is within the container's visible bounds
        const isVisible = (
            itemRect.top >= containerRect.top &&
            itemRect.bottom <= containerRect.bottom &&
            itemRect.left >= containerRect.left &&
            itemRect.right <= containerRect.right
        );

        if (isVisible) {
            visibleCount++;
        }
    });

    return visibleCount;
}

export const hasHorizontalOverflow = (element: HTMLElement) => {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}