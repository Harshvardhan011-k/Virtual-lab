// Node class for linked list
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
    display(highlight = []) {
        let current = this.head;
        let result = [];
        while (current) {
            const value = highlight.includes(current.value) 
                ? `<span class="box highlight">${current.value}</span>`
                : `<span class="box">${current.value}</span>`;
            result.push(value);
            if (current.next) {
                result.push(`<span class="arrow">→</span>`);
            }
            current = current.next;
        }
        return result.join('');
    }
}

// Initialize lists with new inputs
let list1 = new LinkedList();
let list2 = new LinkedList();

const initializeLists = () => {
    [1, 21, 33, 43].forEach(val => list1.append(val));
    [2, 33, 44, 56].forEach(val => list2.append(val));
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

// Update display
function updateDisplay(list, highlight = []) {
    document.getElementById(list === 1 ? 'list1' : 'list2').innerHTML = 
        list === 1 ? list1.display(highlight) : list2.display(highlight);
}

// Simulation control variables
let index1 = 0, index2 = 0;
let interval1, interval2;
let traversalComplete1 = false, traversalComplete2 = false;
let intersection = [];

// Traverse and highlight list1
function playList1() {
    clearInterval(interval1);
    index1 = 0;
    traversalComplete1 = false;
    interval1 = setInterval(() => {
        let node = list1.head;
        for (let i = 0; i < index1; i++) {
            if (node) node = node.next;
        }
        if (node) {
            updateDisplay(1, [node.value]);
            index1++;
        } else {
            clearInterval(interval1);
            traversalComplete1 = true;
            checkComplete();
        }
    }, 2000); // Slowed down to 2 seconds per step
}

// Traverse and highlight list2
function playList2() {
    clearInterval(interval2);
    index2 = 0;
    traversalComplete2 = false;
    interval2 = setInterval(() => {
        let node = list2.head;
        for (let i = 0; i < index2; i++) {
            if (node) node = node.next;
        }
        if (node) {
            updateDisplay(2, [node.value]);
            index2++;
        } else {
            clearInterval(interval2);
            traversalComplete2 = true;
            checkComplete();
        }
    }, 2000); // Slowed down to 2 seconds per step
}

// Pause functions
function pauseList1() { clearInterval(interval1); }
function pauseList2() { clearInterval(interval2); }

// Check if both traversals are complete and find intersection
function checkComplete() {
    if (traversalComplete1 && traversalComplete2) {
        intersection = findIntersection(list1, list2);
        highlightIntersection();
    }
}

// Highlight intersection
function highlightIntersection() {
    const intersectionText = intersection.length > 0 
        ? `Intersection: ${intersection.join(', ')}`
        : 'Intersection: No common elements';
    document.getElementById('intersectionList').textContent = intersectionText;
    updateDisplay(1, intersection);
    updateDisplay(2, intersection);
}

// Set up event listeners
document.getElementById('playBtn1').addEventListener('click', playList1);
document.getElementById('pauseBtn1').addEventListener('click', pauseList1);
document.getElementById('playBtn2').addEventListener('click', playList2);
document.getElementById('pauseBtn2').addEventListener('click', pauseList2);

// Initialize and display lists
initializeLists();
updateDisplay(1, []);
updateDisplay(2, []);
