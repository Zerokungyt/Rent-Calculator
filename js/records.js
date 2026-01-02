if(sessionStorage.getItem("loggedIn")!=="true") location.href="../index.html";

const QUARTERS = {Q1:["Jan","Feb","Mar"], Q2:["Apr","May","Jun"], Q3:["Jul","Aug","Sep"], Q4:["Oct","Nov","Dec"]};

// ---------------- LocalStorage
function getMonthKey(year, quarter, month){ return `${year}-${quarter}-${month}`; }
function getMonthRecord(year, quarter, month){
  const data = localStorage.getItem(getMonthKey(year, quarter, month));
  return data ? JSON.parse(data) : null;
}
function saveMonthRecord(year, quarter, month, record){
  localStorage.setItem(getMonthKey(year, quarter, month), JSON.stringify(record));
}

// ---------------- Month access control
function isAllowedMonth(year, quarter, month){
  if(year<2025) return false;
  if(year===2025 && QUARTERS[quarter].indexOf(month)<QUARTERS["Q3"].indexOf("Sep")) return false;
  return true;
}

// ---------------- Render Quarters/Months
function renderQuarters(year){
  const container = document.getElementById("quarterContainer");
  container.innerHTML = "";
  ["Q1","Q2","Q3","Q4"].forEach(q=>{
    const months = QUARTERS[q];
    months.forEach(m=>{
      const record = getMonthRecord(year,q,m);
      const status = record?"✅":"❌";
      const btn = document.createElement("button");
      btn.textContent = `${q} - ${m} ${status}`;
      btn.onclick = ()=>{
        if(!isAllowedMonth(year,q,m)){
          alert("ไม่สามารถกรอกได้");
          return;
        }
        openMonthModal(year,q,m);
      };
      container.appendChild(btn);
    });
  });
}

// ---------------- Modal
function openMonthModal(year, quarter, month){
  const modal = document.getElementById("monthModal");
  const container = document.getElementById("monthContainer");
  const record = getMonthRecord(year,quarter,month) || {front:0,back:0,elec:0};

  container.innerHTML = `
    <h2>${month} / ${quarter} / ${year}</h2>
    <label>น้ำหน้า:</label><input id="front" type="number" value="${record.front}" min="0">
    <label>น้ำหลัง:</label><input id="back" type="number" value="${record.back}" min="0">
    <label>ไฟ:</label><input id="elec" type="number" value="${record.elec}" min="0">
    <button onclick="saveMonth('${year}','${quarter}','${month}')">บันทึก</button>
    <button class="backBtn" onclick="closeMonthModal()">Back</button>
  `;
  modal.style.display="flex";
}

function closeMonthModal(){ document.getElementById("monthModal").style.display="none"; }

function saveMonth(year, quarter, month){
  const front = parseInt(document.getElementById("front").value)||0;
  const back  = parseInt(document.getElementById("back").value)||0;
  const elec  = parseInt(document.getElementById("elec").value)||0;
  saveMonthRecord(year,quarter,month,{front,back,elec});
  alert(`บันทึกเรียบร้อย: ${month} / ${quarter} / ${year}`);
  closeMonthModal();
  renderQuarters(year);
}

// ---------------- Dashboard
function goDashboard(){ location.href="../dashboard.html"; }
