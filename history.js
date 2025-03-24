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
