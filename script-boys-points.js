// script.js

// Fetch the Excel file and read its contents
fetch('../pointtable_boys.xlsx')
  .then(response => response.arrayBuffer()) // Read file as ArrayBuffer
  .then(data => {
    // Parse the Excel file
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Get data as array of arrays

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
          points: row[5],
          group: row[6],
        };
        
        if (team.group === "Group A") {
          groupA.push(team);
        } else if (team.group === "Group B") {
          groupB.push(team);
        }
      }
    });

    // Sort teams by points (high to low)
    groupA.sort((a, b) => b.points - a.points);
    groupB.sort((a, b) => b.points - a.points);

    // Insert Group A data into the table
    const groupA_tableBody = document.querySelector('#groupA tbody');
    groupA_tableBody.innerHTML = ''; // Clear any previous data
    groupA.forEach(team => {
      const tr = document.createElement('tr');
      Object.values(team).slice(0, 6).forEach(value => { // Skip 'group' value
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      groupA_tableBody.appendChild(tr);
    });

    // Insert Group B data into the table
    const groupB_tableBody = document.querySelector('#groupB tbody');
    groupB_tableBody.innerHTML = ''; // Clear any previous data
    groupB.forEach(team => {
      const tr = document.createElement('tr');
      Object.values(team).slice(0, 6).forEach(value => { // Skip 'group' value
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      groupB_tableBody.appendChild(tr);
    });
  })
