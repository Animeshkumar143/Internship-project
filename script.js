// Function to load CSV data and populate the table
function loadCSV() {
    // Assuming the CSV file is named "data.csv"
    var csvFile = "salaries.csv";

    // Fetching the CSV file
    fetch(csvFile)
        .then(response => response.text())
        .then(data => {
            // Splitting the CSV data into rows
            var rows = data.split('\n');

            // Looping through each row
            for (var i = 1; i < rows.length; i++) { // starting from 1 to skip header
                // Splitting the row into cells
                var cells = rows[i].split(',');

                // Creating a new row in the table
                var row = document.createElement('tr');

                // Populating the cells of the row
                for (var j = 0; j < cells.length; j++) {
                    var cell = document.createElement('td');
                    cell.textContent = cells[j];
                    row.appendChild(cell);
                }

                // Adding the row to the table
                document.getElementById('table-body').appendChild(row);
            }
        })
        .catch(error => console.error('Error fetching CSV:', error));
}

// Function to sort the table by column index
function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("salary-table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];
            if (isNaN(x.innerHTML) && isNaN(y.innerHTML)) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (Number(x.innerHTML.replace(/[^0-9.-]+/g,"")) > Number(y.innerHTML.replace(/[^0-9.-]+/g,""))) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

// Function to reload the table
function reloadTable() {
    // Clear table body
    document.getElementById('table-body').innerHTML = '';
    // Reload CSV data
    loadCSV();
}

// Call the function to load CSV data when the page loads
window.onload = function() {
    loadCSV();
};
