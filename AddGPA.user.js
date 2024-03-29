// ==UserScript==
// @name         AddGPA
// @namespace    https://congdaotao.tmu.edu.vn
// @version      4.5
// @description  :)
// @author       TMUer Học dốt nên chưa có ny T.T
// @match        https://congdaotao.tmu.edu.vn/*
// @grant        none
// @license      MIT
// @updateURL    https://github.com/GatoGatovn/ExportGPA/raw/main/AddGPA.user.js
// @downloadURL  https://github.com/GatoGatovn/ExportGPA/raw/main/AddGPA.user.js
// ==/UserScript==

function addscore() {
  let totalScore = 0;
  let totalCredits = 0;

  document.querySelectorAll('table tbody tr').forEach(row => {
    let cells = row.getElementsByTagName('td');
    if (cells[5] && cells[5].innerText && !isNaN(parseFloat(cells[5].innerText)) && parseFloat(cells[5].innerText) !== 0.0) {
      let scoreValue = parseFloat(cells[5].innerText);
      if (cells[3] && cells[3].innerText && !isNaN(parseInt(cells[3].innerText)) && parseInt(cells[3].innerText) !== 1) {
        let creditsValue = parseInt(cells[3].innerText);
        totalCredits += creditsValue;
        totalScore += scoreValue * creditsValue;
      }
    }
  });

  let averageScore = totalScore / totalCredits;
  let table = document.querySelector('table');
  let newRow = table.insertRow(-1);
  newRow.classList.add("MuiTableRow-root", "css-1du9sao-MuiTableRow-root");

  let newCell1 = newRow.insertCell(0);
  newCell1.colSpan = 4;
  newCell1.textContent = "Tổng số tín chỉ: " + totalCredits;

  let newCell2 = newRow.insertCell(1);
  newCell2.colSpan = 3;
  newCell2.textContent = "Điểm trung bình học tập: " + averageScore.toFixed(4);

  // Calculate minimum credits for GPA 3.2 or higher
  let minimumCreditsForGPA32 = (3.2 * totalCredits - totalScore) / (4 - 3.2);
  // Calculate minimum credits for GPA 3.6 or higher
  let minimumCreditsForGPA36 = (3.6 * totalCredits - totalScore) / (4 - 3.6);

  if (averageScore < 3.2) {
    let newRow3 = table.insertRow(-1);
    newRow3.classList.add("MuiTableRow-root", "css-1du9sao-MuiTableRow-root");

    let newCell3 = newRow3.insertCell(0);
    newCell3.colSpan = 7;
    newCell3.textContent = "Số tín chỉ A cần đạt thêm để GPA >= 3.2 là: " + minimumCreditsForGPA32.toFixed(0);

    let newRow4 = table.insertRow(-1);
    newRow4.classList.add("MuiTableRow-root", "css-1du9sao-MuiTableRow-root");

    let newCell4 = newRow4.insertCell(0);
    newCell4.colSpan = 7;
    newCell4.textContent = "Số tín chỉ A cần đạt thêm để GPA >= 3.6 là: " + minimumCreditsForGPA36.toFixed(0);
  } else if (averageScore >= 3.2 && averageScore < 3.6) {
    let newRow3 = table.insertRow(-1);
    newRow3.classList.add("MuiTableRow-root", "css-1du9sao-MuiTableRow-root");

    let newCell3 = newRow3.insertCell(0);
    newCell3.colSpan = 7;
    newCell3.textContent = "Số tín chỉ A cần đạt thêm để GPA >= 3.6 là: " + minimumCreditsForGPA36.toFixed(0);
  }

  let newRow5 = table.insertRow(-1);
  newRow5.classList.add("MuiTableRow-root", "css-1du9sao-MuiTableRow-root");

  let newCell5 = newRow5.insertCell(0);
  newCell5.colSpan = 7;
  newCell5.textContent = "Made by TMUer Học dốt T.T";
}

let initialLoad = true;

function run() {
  if (window.location.href === "https://congdaotao.tmu.edu.vn/student/marks") {
    const rows = document.querySelectorAll("tr");
    const lastRow = rows[rows.length - 1];

    if (!lastRow.textContent.includes("Made by TMUer Học dốt T.T")) {
      addscore();
      initialLoad = false;
    }
  }
}

function checkPageReload() {
  window.addEventListener("beforeunload", function() {
    initialLoad = true;
  });

  window.addEventListener("load", function() {
    if (!initialLoad) {
      console.log("Page reloaded");
      run();
    }
  });
}

checkPageReload();
setInterval(run, 200);
