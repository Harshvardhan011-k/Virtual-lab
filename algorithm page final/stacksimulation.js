let stack = [];
        let MAX = 0;
        let TOP = -1;

        // Function to set the stack size
        function setStackSize() {
            const sizeInput = document.getElementById("stackSizeInput").value;
            if (sizeInput > 0) {
                MAX = parseInt(sizeInput);
                stack = []; // Reset the stack
                TOP = -1; // Reset the TOP
                document.getElementById("stackSizeInput").value = ""; // Clear the input field
                document.getElementById("stackControls").style.display = "block"; // Show stack controls
                renderStack(); // Update the stack display
            } else {
                alert("Please enter a valid stack size.");
            }
        }

        // Function to push element to the stack
        function pushElement() {
            const input = document.getElementById("stackInput").value;
            if (TOP === MAX - 1) {
                alert("Overflow! Stack is full");
            } else if (input !== "") {
                stack.push(input); // Push the element to the stack
                TOP++; // Increment TOP
                document.getElementById("stackInput").value = ""; // Clear the input field
                renderStack(); // Update the stack display
            }
        }

        // Function to pop element from the stack
        function popElement() {
            if (TOP >= 0) {
                stack.pop(); // Remove the top element
                TOP--; // Decrement TOP
                renderStack(); // Update the stack display
            } else {
                alert("Underflow! Stack is empty!");
            }
        }

        // Function to display the stack
        function renderStack() {
            const stackContainer = document.getElementById("stackContainer");
            stackContainer.innerHTML = ""; // Clear the stack container

            // Add each element as a div
            stack.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("stack-item");
                div.textContent = item;
                stackContainer.appendChild(div);
            });
        }
