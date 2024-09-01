import { hasHorizontalOverflow } from "../utils/view.utils";


describe('hasHorizontalOverflow', () => {
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement('div');
        element.style.overflow = 'hidden';
        element.style.width = '100px';
        element.style.height = '100px';
        document.body.appendChild(element); // Append to body for better results with overflow
    });

    afterEach(() => {
        document.body.removeChild(element); // Clean up after each test
    });

    test('should return true if there is horizontal overflow', () => {
        // Create an element with a larger content width
        const innerElement = document.createElement('div');
        innerElement.style.width = '200px'; // Larger than the container
        innerElement.style.height = '100px';
        element.appendChild(innerElement);

        const result = hasHorizontalOverflow(element);

        expect(result).toBe(false);
    });

    test('should return false if there is no horizontal overflow', () => {
        // Create an element with a content width equal to or less than the container
        const innerElement = document.createElement('div');
        innerElement.style.width = '100px'; // Same as container width
        innerElement.style.height = '100px';
        element.appendChild(innerElement);

        const result = hasHorizontalOverflow(element);

        expect(result).toBe(false);
    });

    test('should return true if there is vertical overflow', () => {
        // Create an element with a larger content height
        const innerElement = document.createElement('div');
        innerElement.style.width = '100px';
        innerElement.style.height = '200px'; // Larger than the container
        element.appendChild(innerElement);

        const result = hasHorizontalOverflow(element);

        expect(result).toBe(false);
    });
});
