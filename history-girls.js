// Function to fetch and read the Excel file
function fetchAndDisplayData() {
    const url = 'history_girls.xlsx'; // Path to your history.xlsx file
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
                    matchDetails += `<p class="winner" style="color: orange; font-style: italic;">Match Drawn</p>`;
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
// Function to get and format Sri Lankan time
function updateSriLankanTime() {
    const now = new Date();
    
    // Convert to Sri Lankan time (UTC+5:30)
    const sriLankanOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const sriLankanTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + sriLankanOffset);
    
    const year = sriLankanTime.getFullYear();
    const month = String(sriLankanTime.getMonth() + 1).padStart(2, '0');
    const day = String(sriLankanTime.getDate()).padStart(2, '0');
    const hours = String(sriLankanTime.getHours()).padStart(2, '0');
    const minutes = String(sriLankanTime.getMinutes()).padStart(2, '0');
    const seconds = String(sriLankanTime.getSeconds()).padStart(2, '0');
    
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes -1}`;
    
    // Update the time display
    const datetimeValue = document.querySelector('.datetime-info .info-value');
    if (datetimeValue) {
        datetimeValue.textContent = formattedTime;
    }
}

// Update time immediately and then every second
updateSriLankanTime();
setInterval(updateSriLankanTime, 1000);