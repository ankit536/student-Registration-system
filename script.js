// empty array to hold student data
let studentData = [];
let editDataIndex = -1;

const stdForm = document.getElementById("stdForm");
stdForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addUpdateStudentData();
});

// save data into localStorage
function saveData() {
  localStorage.setItem("studentData", JSON.stringify(studentData));
}
function loadData() {
  let storedData = localStorage.getItem("studentData");
  if (storedData) {
    studentData = JSON.parse(storedData);
    showData();
  }
}
// add or update student data
function addUpdateStudentData() {
  const stdId = document.getElementById("stdId").value;
  const stdName = document.getElementById("stdName").value;
  const stdMail = document.getElementById("stdMail").value;
  const stdNum = document.getElementById("stdNum").value;

  // Check for duplicates
  const duplicate = studentData.some((std) => {
    return (
      std.stdId === stdId || std.stdMail === stdMail || std.stdNum === stdNum
    );
  });

  // Alert if duplicate data found and not in edit mode
  if (duplicate && editDataIndex === -1) {
    alert("Student ID, Email, or Contact Number already exists.");
    return;
  }

  // Check if all form input values are present

  if (stdId && stdName && stdMail && stdNum) {
    let studentDataObj = {
      stdId: stdId,
      stdName: stdName,
      stdMail: stdMail,
      stdNum: stdNum,
    };
    if (editDataIndex == -1) {
      studentData.push(studentDataObj);
    } else {
      studentData[editDataIndex] = studentDataObj;
      editDataIndex = -1;
    }
    // Reset Form
    stdForm.reset();
    saveData();
    showData();
  }
}

// Display student Data
function showData() {
  const dataSectionTable = document.getElementById("dataSectionTable");
  dataSectionTable.innerHTML = "";

  // Show Message if no data found
  if (studentData.length === 0) {
    dataSectionTable.classList.add("dataSectionError");
    dataSectionTable.innerHTML = "No Data Found";
  } else {
    dataSectionTable.classList.remove("dataSectionError");

    // create table if does not exists
    let table = document.getElementById("dataTable");
    if (!table) {
      table = document.createElement("table");
      table.setAttribute("id", "dataTable");
      table.innerHTML = `<thead>
                        <tr>
                            <td>Student Id</td>
                            <td>Student Name</td>
                            <td>Email Id</td>
                            <td>Contact No.</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody></tbody>`;
      dataSectionTable.appendChild(table);
    }

    let tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";

    studentData.forEach((std, index) => {
      let tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td>${std.stdId}</td>
        <td>${std.stdName}</td>
        <td>${std.stdMail}</td>
        <td>${std.stdNum}</td>
        <td>
        <button onclick="editStudentData(${index})" id='editBtn'>Edit</button>
        <button onclick="deleteStudentData(${index})" id='dltBtn'>Delete</button>
        </td>`;
      tableBody.appendChild(tableRow);
    });
  }
}

// delete student data
function deleteStudentData(index) {
  studentData.splice(index, 1);
  saveData();
  showData();
}

// edit student data
function editStudentData(index) {
  const editdata = studentData[index];
  document.getElementById("stdId").value = editdata.stdId;
  document.getElementById("stdName").value = editdata.stdName;
  document.getElementById("stdMail").value = editdata.stdMail;
  document.getElementById("stdNum").value = editdata.stdNum;
  editDataIndex = index;
}

// Load data from localStorage when the page loads
loadData();
