requireLogin();

const PRICE = { front:15, back:15, elec:6, rent:6000 };


const yearSelect = document.getElementById("yearSelect");
const quarterSelect = document.getElementById("quarterSelect");

// ฟังก์ชันดึงข้อมูลเดือนจาก record.js
function getRecord(year, quarter, month){
  const data = getMonthRecord(year, quarter, month);
  return data || {front:0, back:0, elec:0};
}

// ฟังก์ชันหาข้อมูลเดือนก่อนของเดือนนั้นๆ
function getPrevMonth(year, quarter, monthIndex){
  if(monthIndex > 0) return getRecord(year, quarter, QUARTERS[quarter][monthIndex-1]);

  // เดือนแรกของไตรมาส → ใช้เดือนสุดท้ายของไตรมาสก่อน
  const quarters = ["Q1","Q2","Q3","Q4"];
  let qIndex = quarters.indexOf(quarter);
  let prevQuarter = qIndex===0 ? "Q4" : quarters[qIndex-1];
  let prevYear = qIndex===0 ? year-1 : year;
  let prevMonth = QUARTERS[prevQuarter][2]; // เดือนสุดท้ายของไตรมาสก่อน
  return getRecord(prevYear, prevQuarter, prevMonth);
}

// คำนวณหน่วย + บาท
function calcMonth(prev, curr){
  return {
    frontPrev: prev.front||0,
    backPrev:  prev.back||0,
    elecPrev:  prev.elec||0,
    frontCurr: curr.front||0,
    backCurr:  curr.back||0,
    elecCurr:  curr.elec||0,
    frontUnits: (curr.front||0)-(prev.front||0),
    backUnits:  (curr.back||0)-(prev.back||0),
    elecUnits:  (curr.elec||0)-(prev.elec||0),
    front: ((curr.front||0)-(prev.front||0))*PRICE.front,
    back:  ((curr.back||0)-(prev.back||0))*PRICE.back,
    elec: ((curr.elec||0)-(prev.elec||0))*PRICE.elec
  };
}

// แสดงใบเสร็จแบบโปร่งใส
function renderCalc(){
  const year = parseInt(yearSelect.value);
  const quarter = quarterSelect.value;
  if(!year || !quarter) return alert("กรุณาเลือกปีและไตรมาส");

  const months = QUARTERS[quarter];
  let totalFront=0, totalBack=0, totalElec=0;

  let html = `<div class="receipt"><h2>ใบเสร็จ: ไตรมาส ${quarter} / ปี ${year}</h2>`;
  html += `<table>
    <tr>
      <th>เดือน</th>
      <th>น้ำหน้า (ปัจจุบัน)</th>
      <th>น้ำหน้า (เดือนก่อน)</th>
      <th>หน่วยน้ำหน้าใช้จริง</th>
      <th>น้ำหลัง (ปัจจุบัน)</th>
      <th>น้ำหลัง (เดือนก่อน)</th>
      <th>หน่วยน้ำหลังใช้จริง</th>
      <th>ไฟ (ปัจจุบัน)</th>
      <th>ไฟ (เดือนก่อน)</th>
      <th>หน่วยไฟใช้จริง</th>
    </tr>`;

  months.forEach((m,i)=>{
    const prevMonth = getPrevMonth(year, quarter, i);
    const currMonth = getRecord(year, quarter, m);
    const r = calcMonth(prevMonth, currMonth);

    totalFront += r.front;
    totalBack  += r.back;
    totalElec  += r.elec;

    html += `<tr>
      <td>${m}</td>
      <td>${r.frontCurr}</td>
      <td>${r.frontPrev}</td>
      <td>${r.frontUnits}</td>
      <td>${r.backCurr}</td>
      <td>${r.backPrev}</td>
      <td>${r.backUnits}</td>
      <td>${r.elecCurr}</td>
      <td>${r.elecPrev}</td>
      <td>${r.elecUnits}</td>
    </tr>`;
  });

  const totalRent = PRICE.rent * months.length;

  html += `</table>`;
  html += `<p class="total">รวม น้ำหน้า: ${totalFront} บาท</p>`;
  html += `<p class="total">รวม น้ำหลัง: ${totalBack} บาท</p>`;
  html += `<p class="total">รวม ไฟ: ${totalElec} บาท</p>`;
  html += `<p class="total">ค่าเช่า: ${totalRent} บาท</p>`;
  html += `<h3 class="total">รวมทั้งหมด: ${totalFront + totalBack + totalElec + totalRent} บาท</h3></div>`;

  const modal = document.getElementById("receiptModal");
  document.getElementById("receiptContent").innerHTML = html;
  modal.classList.add("show"); // เพิ่ม animation
}

// ปิด modal แบบอนิเมชัน
function closeReceipt(){
  const modal = document.getElementById("receiptModal");
  modal.classList.remove("show");
}


// ปิด modal
function closeReceipt(){
  document.getElementById("receiptModal").style.display = "none";
}

function goDashboard(){
  location.href="../dashboard.html";
}
