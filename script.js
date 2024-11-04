document.addEventListener("DOMContentLoaded", function () {
    // Get references to DOM elements
    const form = document.getElementById("form-transaction");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const typeSelect = document.getElementById("type");
    const incomeDisplay = document.getElementById("income");
    const expenseDisplay = document.getElementById("expense");
    const balanceDisplay = document.getElementById("balance");
    const filters = document.querySelectorAll(".filters-class input[type='radio']");
    const transactionListContainer = document.querySelector(".transaction-list-class");

    // Load transactions from localStorage or initialize an empty array
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let editIndex = -1; // Variable to track the index of the transaction being edited

    // Function to update the total income, expenses, and net balance displays
    function updateTotals() {
        const totalIncome = transactions
            .filter(transaction => transaction.type === "income") // Filter for income transactions
            .reduce((sum, transaction) => sum + transaction.amount, 0); // Sum income amounts
        const totalExpense = transactions
            .filter(transaction => transaction.type === "expense") // Filter for expense transactions
            .reduce((sum, transaction) => sum + transaction.amount, 0); // Sum expense amounts
        const netBalance = totalIncome - totalExpense; // Calculate net balance

        // Update the display elements with formatted values
        incomeDisplay.textContent = `₹${totalIncome.toFixed(2)}`;
        expenseDisplay.textContent = `₹${totalExpense.toFixed(2)}`;
        balanceDisplay.textContent = `₹${netBalance.toFixed(2)}`;
    }

    // Function to display transactions based on the selected filter
    function displayTransactions(filter = "all") {
        const tbody = document.getElementById("transaction-tbody");
        tbody.innerHTML = ""; // Clear the table body

        // Filter transactions based on the selected filter
        const filteredTransactions = filter === "all"
            ? transactions
            : transactions.filter(transaction => transaction.type === filter);

        // Populate the table with the filtered transactions
        filteredTransactions.forEach((transaction, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td>₹${transaction.amount.toFixed(2)}</td>
                <td>${transaction.type}</td>
                <td>
                    <button onclick="editTransaction(${index})" class="action-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteTransaction(${index})" class="action-btn">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            row.setAttribute("data-type", transaction.type); // Set data-type attribute for filtering
            row.setAttribute("data-index", index); // Set data-index attribute for reference
            tbody.appendChild(row); // Append the row to the table body
        });

        toggleTransactionListVisibility(); // Toggle the visibility of the transaction list
    }

    // Function to show or hide the transaction list based on whether there are any transactions
    function toggleTransactionListVisibility() {
        if (transactions.length > 0) {
            transactionListContainer.style.display = "block"; // Show the transaction list
        } else {
            transactionListContainer.style.display = "none"; // Hide the transaction list
        }
    }

    // Function to save transactions to localStorage
    function saveTransactions() {
        localStorage.setItem("transactions", JSON.stringify(transactions)); // Store the transactions array
    }

    // Form submit event handler
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const description = descriptionInput.value.trim(); // Get the description input
        const amount = parseFloat(amountInput.value); // Get the amount input and convert to number
        const type = typeSelect.value; // Get the selected transaction type

        // Validate input fields
        if (description === "" || isNaN(amount)) return;

        const transaction = { description, amount, type }; // Create a transaction object

        // Check if we're editing an existing transaction or adding a new one
        if (editIndex === -1) {
            transactions.push(transaction); // Add new transaction
        } else {
            transactions[editIndex] = transaction; // Update existing transaction
            editIndex = -1; // Reset edit index
        }

        saveTransactions(); // Save updated transactions to localStorage
        updateTotals(); // Update the totals displayed
        displayTransactions(getCurrentFilter()); // Refresh the displayed transactions
        clearFormFields(); // Clear the form fields for new input
    });

    // Function to edit a selected transaction
    window.editTransaction = function (index) {
        // Get the filtered transactions based on the current filter
        const filteredTransactions = transactions.filter(transaction => transaction.type === getCurrentFilter() || getCurrentFilter() === "all");
        const transaction = filteredTransactions[index]; // Get the selected transaction
        editIndex = transactions.indexOf(transaction); // Set the edit index to the original transaction's index

        // Populate the form fields with the selected transaction's details
        descriptionInput.value = transaction.description;
        amountInput.value = transaction.amount;
        typeSelect.value = transaction.type;
    };

    // Function to delete a selected transaction
    window.deleteTransaction = function (index) {
        // Get the filtered transactions based on the current filter
        const filteredTransactions = transactions.filter(transaction => transaction.type === getCurrentFilter() || getCurrentFilter() === "all");
        const transaction = filteredTransactions[index]; // Get the selected transaction
        const originalIndex = transactions.indexOf(transaction); // Find the index in the original transactions array

        transactions.splice(originalIndex, 1); // Remove the transaction from the array
        saveTransactions(); // Save the updated transactions to localStorage
        updateTotals(); // Update the totals displayed
        displayTransactions(getCurrentFilter()); // Refresh the displayed transactions
    };

    // Function to get the current filter selected by the user
    function getCurrentFilter() {
        const selectedFilter = document.querySelector(".filters-class input[type='radio']:checked");
        return selectedFilter ? selectedFilter.id.replace("-filter", "") : "all"; // Return the filter type or "all" if none selected
    }

    // Add event listeners to each filter to update displayed transactions on change
    filters.forEach(filter => {
        filter.addEventListener("change", function () {
            displayTransactions(getCurrentFilter()); // Refresh displayed transactions based on the selected filter
        });
    });

    // Reset button event handler
    document.getElementById("reset").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default button behavior
        clearFormFields(); // Clear the form fields
        editIndex = -1; // Reset edit index

        document.getElementById("all-filter").checked = true; // Reset filter to "all"
        displayTransactions("all"); // Refresh the displayed transactions
    });

    // Function to clear all form fields
    function clearFormFields() {
        descriptionInput.value = ""; // Clear description input
        amountInput.value = ""; // Clear amount input
        typeSelect.value = "income"; // Reset type to income
    }

    // Initial calls to set up the application
    updateTotals(); // Update totals on page load
    displayTransactions(); // Display transactions on page load
});
