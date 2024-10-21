// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false; // 0 and 1 are not prime
  if (num <= 3) return true; // 2 and 3 are prime

  // Check for factors from 2 to the square root of num
  for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
  }
  return true;
}

// Function to get the next prime number
function getNextPrime(num) {
  let prime = num;
  while (!isPrime(prime)) {
      prime++;
  }
  return prime;
}

// Initialize variables
let tableSize = 4; // Default table size
let hashTable = new Array(tableSize).fill(null).map(() => []); // Initialize hash table
let previousTableSize = tableSize; // Track the previous table size

// Function to insert value into the hash table
function insertIntoHashTable() {
  // Get value and table size from input
  let value = parseInt(document.getElementById('inputValue').value); // Ensure value is numeric
  let newTableSize = parseInt(document.getElementById('inputTableSize').value);

  // Check if both value and table size are valid inputs
  if (isNaN(value) || isNaN(newTableSize) || newTableSize <= 0) {
      alert("Please enter a valid value and table size greater than 0.");
      return;
  }

  // If the table size has changed, adjust the hash table
  if (newTableSize !== previousTableSize) {
      // Adjust to the nearest prime number
      tableSize = getNextPrime(newTableSize);
      
      // Clear the existing hash table and create a new one
      hashTable = new Array(tableSize).fill(null).map(() => []); // Keep hash table size to nearest prime

      // Show alert every time the table size changes
      alert(`The table size has been adjusted to ${tableSize}, which is the nearest prime number.`);
      
      previousTableSize = newTableSize; // Update the previous table size
  }

  // Hash the new value using the modulo method
  let hashIndex = value % tableSize; // Use modulo to determine index

  // Insert the new value at the calculated hashIndex using chaining (array at each index)
  hashTable[hashIndex].push(value);
  
  // Update the display
  displayHashTable();
}

// Function to display the hash table
function displayHashTable() {
  let hashTableElement = document.getElementById('hashTable');
  hashTableElement.innerHTML = '';  // Clear current hash table display
  
  // Display each element in the hash table up to tableSize - 1
  for (let i = 0; i < tableSize; i++) { // Loop only until tableSize - 1
      let chain = hashTable[i];
      let displayText = chain.length > 0 
          ? chain.map(val => `Value: ${val}`).join(' -> ') 
          : 'Empty';
          
      hashTableElement.innerHTML += `<li>Index ${i}: ${displayText}</li>`;
  }
}
