class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

// LinkedList class
class LinkedList {
    constructor() {
        this.head = null;
    }

    // Add node to the end
    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Display list with optional highlights and arrows
    display(highlight = [], current = null) {
        let currentNode = this.head;
        let result = [];
        while (currentNode) {
            const isHighlighted = highlight.includes(currentNode.value);
            const isCurrent = current === currentNode.value;

            const value = isCurrent
                ? `<span class="box current">${currentNode.value}</span>`
                : isHighlighted
                    ? `<span class="box highlight">${currentNode.value}</span>`
                    : `<span class="box">${currentNode.value}</span>`;

            result.push(value);

            if (currentNode.next) {
                const arrowClass = isCurrent ? 'arrow traverse' : 'arrow';
                result.push(`<span class="${arrowClass}">→</span>`);
            }
            currentNode = currentNode.next;
        }
        return result.join('');
    }
}

// Initialize lists with random inputs
let list1 = new LinkedList();
let list2 = new LinkedList();
let listsInitialized = false;  // To track if lists are initialized already

const generateRandomList = (size, min, max) => {
    let list = [];
    for (let i = 0; i < size; i++) {
        list.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return [...new Set(list)].sort((a, b) => a - b); // Ensure unique and sorted list
};

const initializeLists = () => {
    if (!listsInitialized) {
        list1 = new LinkedList();
        list2 = new LinkedList();
        generateRandomList(4, 1, 50).forEach(val => list1.append(val));
        generateRandomList(4, 1, 50).forEach(val => list2.append(val));
        listsInitialized = true;
    }
};

// Find intersection
function findIntersection(list1, list2) {
    let intersection = [];
    let current1 = list1.head;
    let current2 = list2.head;

    while (current1 && current2) {
        if (current1.value === current2.value) {
            intersection.push(current1.value);
            current1 = current1.next;
            current2 = current2.next;
        } else if (current1.value < current2.value) {
            current1 = current1.next;
        } else {
            current2 = current2.next;
        }
    }
    return intersection;
}

// Update display for list with current traversal state
function updateDisplay(list, highlight = [], current = null) {
    document.getElementById(list === 1 ? 'list1' : 'list2').innerHTML =
        list === 1 ? list1.display(highlight, current) : list2.display(highlight, current);
}

// Traverse both lists and highlight common elements
function traverseLists(list1, list2, intersection) {
    let current1 = list1.head;
    let current2 = list2.head;
    let interval = 1000;

    const traverseStep = () => {
        if (current1 || current2) {
            updateDisplay(1, intersection, current1 ? current1.value : null);
            updateDisplay(2, intersection, current2 ? current2.value : null);

            if (current1) current1 = current1.next;
            if (current2) current2 = current2.next;

            setTimeout(traverseStep, interval);
        } else {
            displayIntersection(intersection);
        }
    };

    traverseStep();
}

// Display intersection
function displayIntersection(intersection) {
    const intersectionText = intersection.length > 0
        ? `Intersection: ${intersection.join(', ')}`
        : 'Intersection: No common elements';
    document.getElementById('intersectionList').textContent = intersectionText;
}

// Set up event listeners
document.getElementById('traversalBtn').addEventListener('click', () => {
    initializeLists();
    const intersection = findIntersection(list1, list2);
    traverseLists(list1, list2, intersection);
});

// Initialize and display lists on page load
initializeLists();
updateDisplay(1);
updateDisplay(2);
