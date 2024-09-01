import { getVisibleItemCount } from "../utils/view.utils";


describe('getVisibleItemCount', () => {
    let container: HTMLElement;
    let items: NodeListOf<Element>;

    beforeEach(() => {
        // Create a container element
        container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.width = '200px';
        container.style.height = '200px';
        container.style.overflow = 'hidden';
        //@ts-ignore
        container.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            bottom: 200,
            right: 200,
            width: 200,
            height: 200
        }));

        // Create items with different bounding rectangles
        //@ts-ignore
        items = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        ] as NodeListOf<Element>;
        //@ts-ignore
        items[0].getBoundingClientRect = jest.fn(() => ({
            top: 50,
            left: 50,
            bottom: 100,
            right: 100,
            width: 50,
            height: 50
        }));
        //@ts-ignore
        items[1].getBoundingClientRect = jest.fn(() => ({
            top: 150,
            left: 150,
            bottom: 250,
            right: 250,
            width: 50,
            height: 50
        }));
        //@ts-ignore
        items[2].getBoundingClientRect = jest.fn(() => ({
            top: 250,
            left: 250,
            bottom: 300,
            right: 300,
            width: 50,
            height: 50
        }));
    });

    test('should count only visible items within the container', () => {
        const visibleCount = getVisibleItemCount(container, items);


        expect(visibleCount).toBe(1);
    });

    test('should return 0 if no items are visible', () => {
        //@ts-ignore
        container.getBoundingClientRect = jest.fn(() => ({
            top: 0,
            left: 0,
            bottom: 100,
            right: 100,
            width: 100,
            height: 100
        }));
        //@ts-ignore
        items[0].getBoundingClientRect = jest.fn(() => ({
            top: 200,
            left: 200,
            bottom: 250,
            right: 250,
            width: 50,
            height: 50
        }));

        const visibleCount = getVisibleItemCount(container, items);

        expect(visibleCount).toBe(0);
    });
});
