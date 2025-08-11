function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function selectAll(type, checked) {
  const checkboxes = document.querySelectorAll(`.${type}-checkbox`);
  checkboxes.forEach(checkbox => {
    checkbox.checked = checked;
  });
  updateSelectedValues(type);
}

function updateSelectedValues(type) {
  const checkboxes = document.querySelectorAll(`.${type}-checkbox`);
  const allCheckbox = document.querySelector(`.${type}-checkbox[value="All"]`);
  const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

  if (allCheckbox && allCheckbox.checked) {
    selectedCheckboxes.forEach(checkbox => (checkbox.checked = true));
    const allNames = Array.from(checkboxes)
      .filter(checkbox => checkbox.value !== 'All')
      .map(checkbox => checkbox.value)
      .join(', ');
    document.getElementById(`${type}Selected`).value = allNames || 'None';
  } else {
    const selectedValues = selectedCheckboxes
      .map(checkbox => checkbox.value)
      .filter(value => value !== 'All')
      .join(', ');
    document.getElementById(`${type}Selected`).value = selectedValues || 'None';
  }
}

function handleCheckboxClick(type, checkbox) {
  const allCheckbox = document.querySelector(`.${type}-checkbox[value="All"]`);
  if (checkbox.value === "All" && checkbox.checked) {
    selectAll(type, true);
  } else if (checkbox.value === "All" && !checkbox.checked) {
    selectAll(type, false);
  } else {
    if (!checkbox.checked && allCheckbox) {
      allCheckbox.checked = false;
    }
    updateSelectedValues(type);
  }
}

document.addEventListener('click', function (event) {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });
});

// Generate the report when the button is clicked
function generateReport() {
  const selectedRecipients = getSelectedValues('recipient');
  const selectedPortfolios = getSelectedValues('portfolio');
  const fromDate = document.getElementById('fromDate').value;
  const toDate = document.getElementById('toDate').value;

  if (selectedRecipients.length === 0 || selectedPortfolios.length === 0) {
    alert('Please select at least one recipient and portfolio');
    return;
  }

  let table = '<table id="dataTable" class="table table-bordered">';
  table += '<thead class="thead-light"><tr><th>Recipient Name</th><th>Portfolio</th><th>From Date</th><th>To Date</th></tr></thead><tbody>';

  selectedRecipients.forEach(recipient => {
    selectedPortfolios.forEach(portfolio => {
      table += `<tr>
                  <td>${recipient}</td>
                  <td>${portfolio}</td>
                  <td>${fromDate}</td>
                  <td>${toDate}</td>
                </tr>`;
    });
  });

  table += '</tbody></table>';
  document.getElementById('reportContent').innerHTML = table;
}

// Helper function to get selected checkbox values
function getSelectedValues(type) {
  const checkboxes = document.querySelectorAll(`.${type}-checkbox`);
  const selectedValues = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked && checkbox.value !== 'All')
    .map(checkbox => checkbox.value);
  return selectedValues;
}

function exportToExcel() {
  // Get the table element
  const table = document.getElementById('dataTable');

  // Create a new workbook
  const wb = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });

  // Get the worksheet
  const ws = wb.Sheets['Sheet1'];

  // Ensure dates are treated as proper date objects for both "From Date" and "To Date"
  Object.keys(ws).forEach(cell => {
    if (!cell.startsWith('!')) { // Ignore meta properties like !ref
      const value = ws[cell].v;

      // Check if the value is a valid date
      if (!isNaN(Date.parse(value))) {
        ws[cell].t = 'd'; // Set cell type to date
        ws[cell].z = 'yyyy-mm-dd'; // Apply date format (e.g., 2022-05-05)
      }
    }
  });

  // Adjust column widths for better visibility (e.g., Name, Portfolio, From Date, To Date)
  ws['!cols'] = [
    { wch: 20 }, // Name
    { wch: 20 }, // Portfolio
    { wch: 15 }, // From Date
    { wch: 15 }  // To Date
  ];

  // Export the workbook
  XLSX.writeFile(wb, 'Report.xlsx');
}



