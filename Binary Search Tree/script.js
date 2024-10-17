let tree = null;
const svg = document.getElementById('tree');
const radius = 20;
const nodes = {};
const sleepTime = 1250;
let xOffset = 200;
const outputDiv = document.getElementById('output');

function createTreeNodes(node, x, y, level) {
    if (node) {
        nodes[node.value] = { x, y };
        svg.innerHTML += `<circle cx="${x}" cy="${y}" r="${radius}" id="node${node.value}"></circle>`;
        svg.innerHTML += `<text x="${x}" y="${y + 5}" font-size="16" text-anchor="middle" fill="#fff">${node.value}</text>`;

        createTreeNodes(node.left, x - (xOffset / Math.pow(2, level)), y + 100, level + 1);
        createTreeNodes(node.right, x + (xOffset / Math.pow(2, level)), y + 100, level + 1);
    }
}

function clearTree() {
    svg.innerHTML = '';
    for (let key in nodes) {
        delete nodes[key];
    }
}

function drawTree() {
    clearTree();
    createTreeNodes(tree, 400, 50, 1);
    createEdges();
}

function createEdges() {
    for (const nodeValue in nodes) {
        const { x, y } = nodes[nodeValue];
        const node = getNodeByValue(parseInt(nodeValue));
        if (node && node.left) {
            const leftNode = nodes[node.left.value];
            svg.innerHTML += `<line x1="${x}" y1="${y}" x2="${leftNode.x}" y2="${leftNode.y}" stroke="#333"></line>`;
        }
        if (node && node.right) {
            const rightNode = nodes[node.right.value];
            svg.innerHTML += `<line x1="${x}" y1="${y}" x2="${rightNode.x}" y2="${rightNode.y}" stroke="#333"></line>`;
        }
    }
}

function getNodeByValue(value) {
    return getNodeByValueHelper(tree, value);
}

function getNodeByValueHelper(node, value) {
    if (!node) return null;
    if (node.value === value) return node;
    return getNodeByValueHelper(node.left, value) || getNodeByValueHelper(node.right, value);
}

function highlightNode(node) {
    const circle = document.getElementById(`node${node}`);
    circle.classList.add('highlight');
}

function resetHighlights() {
    const allNodes = svg.querySelectorAll('circle');
    allNodes.forEach(node => {
        node.classList.remove('highlight');
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearOutput() {
    outputDiv.innerHTML = '';
}

function appendToOutput(value) {
    outputDiv.innerHTML += value + ' ';
}

function insertNode(value) {
    const newNode = { value, left: null, right: null };
    if (tree === null) {
        tree = newNode;
    } else {
        insertNodeHelper(tree, newNode);
    }
    drawTree();
}

function insertNodeHelper(node, newNode) {
    if (newNode.value < node.value) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            insertNodeHelper(node.left, newNode);
        }
    } else if (newNode.value > node.value) {
        if (node.right === null) {
            node.right = newNode;
        } else {
            insertNodeHelper(node.right, newNode);
        }
    }
}   


function addNode() {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        insertNode(value);
        document.getElementById('nodeValue').value = '';
    }
}

function removeNode() {
    const value = parseInt(document.getElementById('removeValue').value);
    if (!isNaN(value)) {
        tree = removeNodeHelper(tree, value);
        drawTree();
        document.getElementById('removeValue').value = '';
    }
}

function removeNodeHelper(node, value) {
    if (node === null) {
        return null;
    }
    if (value < node.value) {
        node.left = removeNodeHelper(node.left, value);
    } else if (value > node.value) {
        node.right = removeNodeHelper(node.right, value);
    } else {
        if (node.left === null) {
            return node.right;
        } else if (node.right === null) {
            return node.left;
        }
        let minLargerNode = findMinNode(node.right);
        node.value = minLargerNode.value;
        node.right = removeNodeHelper(node.right, minLargerNode.value);
    }
    return node;
}

function findMinNode(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
}

async function inOrderTraversal(node) {
    if (node) {
        await inOrderTraversal(node.left);
        highlightNode(node.value);
        appendToOutput(node.value);
        await sleep(sleepTime);
        await inOrderTraversal(node.right);
    }
}

function startInOrder() {
    clearOutput();
    resetHighlights();
    sleep(500);
    inOrderTraversal(tree);
}

async function preOrderTraversal(node) {
    if (node) {
        highlightNode(node.value);
        appendToOutput(node.value);
        await sleep(sleepTime);
        await preOrderTraversal(node.left);
        await preOrderTraversal(node.right);
    }
}

function startPreOrder() {
    clearOutput();
    resetHighlights();
    sleep(500);
    preOrderTraversal(tree);
}

async function postOrderTraversal(node) {
    if (node) {
        await postOrderTraversal(node.left);
        await postOrderTraversal(node.right);
        highlightNode(node.value);
        appendToOutput(node.value);
        await sleep(sleepTime);
    }
}

function startPostOrder() {
    clearOutput();
    resetHighlights();
    sleep(500);
    postOrderTraversal(tree);
}

function clearHighlights() {
    clearOutput();
    const highlightedElements = document.querySelectorAll('.highlight');
    
    highlightedElements.forEach(element => {
        element.classList.remove('highlight');
    });
}