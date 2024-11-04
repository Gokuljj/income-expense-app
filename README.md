
# Income & Expense Calculator

# Calculator's Deployed Link

[ https://happybudgeting.netlify.app/ ]

The Income & Expense Calculator is a web application designed to help users manage their finances by tracking income and expenses. This simple tool allows users to add, edit, and delete transactions while displaying the total income, total expenses, and the resulting net balance.

## Features
- Track income and expenses in a categorized manner
- Calculate and display total income, total expenses, and the net balance
- Edit and delete transactions
- Filter transactions to view only income, expenses, or both
- Persistent data storage using localStorage

## Technologies Used
- **HTML**: Structure of the web application
- **CSS**: Styling of the web pages
- **JavaScript**: Functionality and interaction

## Setup Instructions

### Clone the Repository
Clone this project repository to your local machine:
```bash
git clone <https://github.com/Gokuljj/income-expense-app>
```


### (Optional) Install Dependencies for Styling
The project uses Font Awesome for icons and Select2 for enhanced dropdown functionality. These libraries are loaded via CDN and should work out of the box.

## How to Use

### Adding a Transaction
1. Enter a description for your transaction (e.g., "Salary" or "Groceries").
2. Enter the transaction amount.
3. Select whether it is an income or expense from the dropdown menu.
4. Click the **Add Entry** button to save the transaction.

### Editing a Transaction
1. In the transaction list, click the **Edit** icon next to the transaction you want to modify.
2. Modify the details in the input fields.
3. Press **Add Entry** again to save the updated information.

### Deleting a Transaction
1. In the transaction list, click the **Delete** icon next to the transaction you want to remove.

### Filtering Transactions
Choose between "All," "Income," or "Expense" filters to view transactions selectively.

### Reset Form
To clear the form fields without saving, click the **Reset** button.

## Data Persistence
All transactions are stored in localStorage, so the data persists even when you refresh or close the browser. To clear all transactions, you will need to manually clear your browser's localStorage or delete each transaction individually.

## License
This project is open-source and available under the MIT License.



Happy budgeting! 💰
