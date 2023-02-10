// ==UserScript==
// @name         AddGPA
// @namespace    https://congdaotao.tmu.edu.vn/student
// @version      4
// @description  :)
// @author       TMUer Học dốt nên chưa có ny T.T
// @match        https://congdaotao.tmu.edu.vn/login
// @match        https://congdaotao.tmu.edu.vn/student
// @match        https://congdaotao.tmu.edu.vn/student/info
// @match        https://congdaotao.tmu.edu.vn/student/index
// @match        https://congdaotao.tmu.edu.vn/student/studyprograms
// @match        https://congdaotao.tmu.edu.vn/student/schedules
// @match        https://congdaotao.tmu.edu.vn/student/exam
// @match        https://congdaotao.tmu.edu.vn/student/decisions
// @match        https://congdaotao.tmu.edu.vn/student/xemdiemrenluyen
// @match        https://congdaotao.tmu.edu.vn/student/marks
// @match        https://congdaotao.tmu.edu.vn/student/accountfees
// @match        https://congdaotao.tmu.edu.vn/student/ketquadangky
// @match        https://congdaotao.tmu.edu.vn/student/miengiam
// @match        https://congdaotao.tmu.edu.vn/student/hocphantuongduong
// @match        https://congdaotao.tmu.edu.vn/student/graduation
// @match        https://congdaotao.tmu.edu.vn/student/hoctructuyen
// @match        https://congdaotao.tmu.edu.vn/student/registconfirm
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

let newRow2 = table.insertRow(-1);
newRow2.classList.add("MuiTableRow-root", "css-1du9sao-MuiTableRow-root");

let newCell3 = newRow2.insertCell(0);
newCell3.colSpan = 7;
newCell3.textContent = "Made by TMUer Học dốt T.T";
}

function Run() {
  let intervalId = setInterval(function() {
    let table = document.querySelector('table');
    if (table) {
      addscore();
      clearInterval(intervalId);
    }
  }, 200);
}

let runCheckCalled = false;
setInterval(function() {
  if (window.location.href === "https://congdaotao.tmu.edu.vn/student/marks") {
    if (!runCheckCalled) {
      Run();
      runCheckCalled = true;
    }
  } else {
      runCheckCalled = false;
}
}, 200);





