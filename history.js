// Function to fetch and read the Excel file
function fetchAndDisplayData() {
    const url = 'history.xlsx'; // Path to your history.xlsx file
    const matchHistoryContainer = document.getElementById('match-history');

    // Fetch the file
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => {
            // Parse the Excel file
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Access the first sheet

            // Convert sheet to JSON (array of rows)
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Reverse the array so that older matches appear first
            jsonData.reverse();

            // Populate the match history with each match
            jsonData.forEach(row => {
                const matchBlock = document.createElement('div');
                matchBlock.classList.add('match-block');

                // Basic match info
                let matchDetails = `
                    <h3>Match: ${row['Team 1']} vs ${row['Team 2']}</h3>
                    <p class="score">Score: ${row['Score']}</p>
                `;

                // Show winner only if not draw
                if (row['Winner'] && row['Winner'].toLowerCase() !== 'draw') {
                    matchDetails += `<p class="winner">Winner: ${row['Winner']}</p>`;
                } else {
                    matchDetails += `<p class="winner" style="color: orange; font-style: italic;">Match Draw</p>`;
                }

                matchBlock.innerHTML = matchDetails;
                matchHistoryContainer.appendChild(matchBlock);
            });
        })
        .catch(error => console.error('Error reading Excel file:', error));
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayData);


// Function to get and format the last update time (1 minute ago)
function getLastUpdateTime() {
    const now = new Date();
    // Set time to 1 minute ago
    now.setMinutes(now.getMinutes() - 1);
    
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to update the last update time display
function updateLastUpdateTime() {
    const datetimeValue = document.querySelector('.datetime-info .info-value');
    if (datetimeValue) {
        datetimeValue.textContent = getLastUpdateTime();
    }
}

// Function to fetch and display data
function fetchAndDisplayData() {
    const url = 'history.xlsx';
    const matchHistoryContainer = document.getElementById('match-history');

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            jsonData.reverse();

            matchHistoryContainer.innerHTML = ''; // Clear existing content

            jsonData.forEach(row => {
                const matchBlock = document.createElement('div');
                matchBlock.classList.add('match-block');

                let matchDetails = `
                    <h3>Match: ${row['Team 1']} vs ${row['Team 2']}</h3>
                    <p class="score">Score: ${row['Score']}</p>
                `;

                if (row['Winner'] && row['Winner'].toLowerCase() !== 'draw') {
                    matchDetails += `<p class="winner">Winner: ${row['Winner']}</p>`;
                } else {
                    matchDetails += `<p class="winner" style="color: orange; font-style: italic;">Match Draw</p>`;
                }

                matchBlock.innerHTML = matchDetails;
                matchHistoryContainer.appendChild(matchBlock);
            });

            // Update the last update time after successfully loading data
            updateLastUpdateTime();
        })
        .catch(error => {
            console.error('Error reading Excel file:', error);
            matchHistoryContainer.innerHTML = `
                <div class="error-message">
                    Error loading match history. Please try again later.
                </div>
            `;
        });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayData);