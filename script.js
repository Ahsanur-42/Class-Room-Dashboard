// Function to load data from localStorage and populate the table
function loadStudentData() {
  const studentData = JSON.parse(localStorage.getItem("students")) || [];
  const studentTableBody = document.getElementById("student-table-body");

  studentTableBody.innerHTML = ""; 

  studentData.forEach((student, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="checkbox" class="student-checkbox" data-index="${index}"></td>
      <td>${student.name}</td>
      <td>${student.score}/100</td>
      <td>${student.submitted}</td>
      <td>${student.grade}</td>
      <td>${student.status}</td>
    `;
    studentTableBody.appendChild(newRow);
  });

  // Add event listeners to checkboxes for showing the remove button when selected
  const checkboxes = document.querySelectorAll(".student-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", toggleRemoveButtonVisibility);
  });

  // Hide the "Remove Selected" button by default
  toggleRemoveButtonVisibility();
}

// Function to toggle visibility of "Remove Selected" button
function toggleRemoveButtonVisibility() {
  const checkboxes = document.querySelectorAll(".student-checkbox");
  const removeButton = document.getElementById("remove-selected-btn");
  const isAnyChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
  removeButton.style.display = isAnyChecked ? "block" : "none"; 
}

// Function to remove selected students
function removeSelectedStudents() {
  const checkboxes = document.querySelectorAll(".student-checkbox:checked");
  const selectedIndexes = Array.from(checkboxes).map((checkbox) =>
    checkbox.getAttribute("data-index")
  );

  const existingData = JSON.parse(localStorage.getItem("students")) || [];
  const updatedData = existingData.filter(
    (_, index) => !selectedIndexes.includes(String(index))
  );

  localStorage.setItem("students", JSON.stringify(updatedData));
  loadStudentData(); 
}

// Event handlers for the Add Student Form
const addStudentBtn = document.getElementById("add-student-btn");
const addStudentForm = document.getElementById("add-student-form");
const cancelBtn = document.getElementById("cancel-btn");

addStudentBtn.addEventListener("click", () => {
  addStudentForm.style.display = "block";
  addStudentBtn.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  addStudentForm.style.display = "none";
  addStudentBtn.style.display = "block";
});

// Function to calculate grade and status based on score
function calculateGradeAndStatus(score) {
  if (score < 40) return { grade: "---", status: "Fail" };
  if (score < 60) return { grade: "Poor", status: "Pass" };
  if (score < 80) return { grade: "Average", status: "Pass" };
  return { grade: "Excellent", status: "Pass" };
}

// Add Student Form submission handler
addStudentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const studentName = document.getElementById("student-name").value;
  const scoreInput = document.getElementById("score");
  const score = parseInt(scoreInput.value);
  const submitted = document.getElementById("submitted").value;

  if (score < 1 || score > 100) {
    alert("Score must be between 1 and 100!");
    scoreInput.focus();
    return;
  }

  const { grade, status } = calculateGradeAndStatus(score);
  const newStudent = { name: studentName, score, submitted, grade, status };

  // Get existing data from localStorage and add the new student
  const existingData = JSON.parse(localStorage.getItem("students")) || [];
  existingData.push(newStudent);
  localStorage.setItem("students", JSON.stringify(existingData));

  // Hide the form and reset the button
  addStudentForm.style.display = "none";
  addStudentBtn.style.display = "block";

  // Reset the form
  addStudentForm.reset();

  // Reload the data to reflect the newly added student
  loadStudentData();
});

// Load data and add event listener for "Remove Selected" button
document.addEventListener("DOMContentLoaded", () => {
  loadStudentData();
  document
    .getElementById("remove-selected-btn")
    .addEventListener("click", removeSelectedStudents);
});

// Get the profile image and the dropdown menu
const profileImg = document.getElementById("profile-img");
const contextMenu = document.getElementById("context-menu");

// Event listener to show the context menu when the profile image is clicked
profileImg.addEventListener("click", function (event) {
  contextMenu.style.display =
    contextMenu.style.display === "block" ? "none" : "block";
});

// Event listener to close the context menu if clicked outside
document.addEventListener("click", function (event) {
  if (
    !profileImg.contains(event.target) &&
    !contextMenu.contains(event.target)
  ) {
    contextMenu.style.display = "none";
  }
});

// Bar Chart Data
const barChartData = {
  labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      label: "Yearly Statistics",
      data: [200, 400, 600, 800, 700, 650, 720, 960],
      backgroundColor: ["#4c6ef5", "#6a82fb", "#74c0fc", "#a5d8ff", "#c5f6fa"],
      borderColor: "#4c6ef5",
      borderWidth: 1,
    },
  ],
};

// Pie Chart Data
const pieChartData = {
  labels: ["In Process", "Completed", "Pending", "Failed"],
  datasets: [
    {
      data: [50, 30, 10, 10],
      backgroundColor: ["#74c0fc", "#4c6ef5", "#ffb3b3", "#ff6666"],
    },
  ],
};

// Chart Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" },
    tooltip: { enabled: true },
  },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true },
  },
};

// General chart configuration function
function createChart(chartType, chartId, chartData, chartOptions) {
  const ctx = document.getElementById(chartId).getContext("2d");
  new Chart(ctx, {
    type: chartType,
    data: chartData,
    options: chartOptions,
  });
}

// Initialize the charts on page load
document.addEventListener("DOMContentLoaded", () => {
  createChart("bar", "barChart", barChartData, chartOptions);
  createChart("pie", "pieChart", pieChartData, chartOptions);
});

// Handle form submissions for notices and messages
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("notice-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const noticeText = document.getElementById("notice-text").value;
    alert(`Notice Posted: ${noticeText}`);
    document.getElementById("notice-text").value = ""; 
  });

  document.getElementById("message-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const messageText = document.getElementById("message-text").value;
    alert(`Message Sent: ${messageText}`);
    document.getElementById("message-text").value = ""; 
  });
});

// Function to toggle "Show All" button visibility
function checkItemCount(container, button) {
  const items = container.children;
  if (items.length > 5) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

// Get elements
const noticesContainer = document.querySelector(".notices-container");
const messagesContainer = document.querySelector(".messages-container");
const showAllNoticesBtn = document.getElementById("show-all-notices");
const showAllMessagesBtn = document.getElementById("show-all-messages");

// Initial check
checkItemCount(noticesContainer, showAllNoticesBtn);
checkItemCount(messagesContainer, showAllMessagesBtn);

// Modal Logic
const modal = document.getElementById("popup-modal");
const closeModalBtn = document.querySelector(".close-btn");

function openModal(title, contentContainer) {
  document.getElementById("modal-title").innerText = title;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  Array.from(contentContainer.children).forEach((item) => {
    const clonedItem = item.cloneNode(true);
    modalBody.appendChild(clonedItem);
  });
  modal.style.display = "flex";
}

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("show-all-notices").addEventListener("click", () => {
  openModal("All Notices", noticesContainer);
});

document.getElementById("show-all-messages").addEventListener("click", () => {
  openModal("All Messages", messagesContainer);
});

// Dynamic Greeting
document.addEventListener("DOMContentLoaded", () => {
  const profileNameElement = document.getElementById("profile-name");
  const greeting = getGreeting();
  const userName = "Ahsanur"; 
  profileNameElement.textContent = `${greeting}, ${userName}!`;

  function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) return "Good Morning";
    if (currentHour >= 12 && currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  }
});
