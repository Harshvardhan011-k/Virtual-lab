var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function createArray() {
    var arrayContainer = document.getElementById("arrayContainer");
    arrayContainer.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
        var element = document.createElement("div");
        element.className = "array-item";
        element.textContent = array[i];
        element.id = "item-" + i;
        arrayContainer.appendChild(element);
    }
}

function startLinearSearch() {
    var target = parseInt(document.getElementById("targetInput").value);
    var status = document.getElementById("status");

    function highlight(index, color) {
        document.getElementById("item-" + index).style.backgroundColor = color;
    }

    function resetHighlights() {
        for (var i = 0; i < array.length; i++) {
            document.getElementById("item-" + i).style.backgroundColor = "#ddd";
        }
    }

    function delay(ms) {
        return new Promise(function(resolve) {
            setTimeout(resolve, ms);
        });
    }

    async function linearSearch() {
        resetHighlights();
        for (var i = 0; i < array.length; i++) {
            highlight(i, "yellow");
            await delay(750);

            if (array[i] === target) {
                highlight(i, "lime");
                status.textContent = "Found " + target + " at index " + i;
                return;
            } else {
                highlight(i, "red");
            }

            await delay(750);
        }

        status.textContent = target + " not present in the array.";
    }

    linearSearch();
}

createArray();