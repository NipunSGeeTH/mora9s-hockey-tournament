// Fetch the Excel file and read its contents
fetch('pointtable_boys.xlsx')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("File loaded successfully");
    return response.arrayBuffer();
  })
  .then(data => {
    console.log("Data received:", data.byteLength, "bytes");

    // Parse the Excel file
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Get data as array of arrays

    console.log("Workbook:", workbook);
    console.log("Sheet Name:", sheetName);
    console.log("Raw Data:", rows);

    if (!rows || rows.length === 0) {
      console.error("No data found in the Excel sheet!");
      return;
    }

    // Separate data by group A and B
    const groupA = [];
    const groupB = [];

    rows.forEach((row, index) => {
      if (index > 0) { // Skip the header row
        const team = {
          name: row[0],
          played: row[1],
          won: row[2],
          drawn: row[3],
          lost: row[4],
          goal_scored: row[5],
          goal_conceded: row[6],
          penalty_points: row[7],
          points: row[8],
          group: row[9],
          goal_difference: row[5] - row[6], // Compute goal difference
        };

        if (team.group === "Group A") {
          groupA.push(team);
        } else if (team.group === "Group B") {
          groupB.push(team);
        }
      }
    });

    console.log("Group A Data:", groupA);
    console.log("Group B Data:", groupB);

    // Sorting function
    function sortTeams(teams) {
      teams.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points; // Higher points first
        if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference; // Higher goal difference first
        return b.penalty_points - a.penalty_points; // Higher penalty points first
      });
    }

    // Sort teams in each group
    sortTeams(groupA);
    sortTeams(groupB);

    // Insert Group A data into the table
    const groupA_tableBody = document.querySelector('#groupA tbody');
    if (!groupA_tableBody) {
      console.error("Table #groupA not found in HTML");
      return;
    }
    groupA_tableBody.innerHTML = ''; // Clear previous data
    groupA.forEach(team => {
      const tr = document.createElement('tr');
      [team.name, team.played, team.won, team.drawn, team.lost, team.goal_scored, team.goal_conceded, team.goal_difference, team.penalty_points, team.points].forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      groupA_tableBody.appendChild(tr);
    });

    // Insert Group B data into the table
    const groupB_tableBody = document.querySelector('#groupB tbody');
    if (!groupB_tableBody) {
      console.error("Table #groupB not found in HTML");
      return;
    }
    groupB_tableBody.innerHTML = ''; // Clear previous data
    groupB.forEach(team => {
      const tr = document.createElement('tr');
      [team.name, team.played, team.won, team.drawn, team.lost, team.goal_scored, team.goal_conceded, team.goal_difference, team.penalty_points, team.points].forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      groupB_tableBody.appendChild(tr);
    });

    console.log("Table updated successfully!");

  })
  .catch(error => console.error("Error loading Excel file:", error));
