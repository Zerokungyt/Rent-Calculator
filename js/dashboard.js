const quarters = {
  Q1:["Jan","Feb","Mar"],
  Q2:["Apr","May","Jun"],
  Q3:["Jul","Aug","Sep"],
  Q4:["Oct","Nov","Dec"]
};

let rentData = JSON.parse(localStorage.getItem("rentData")) || {};

for (let y=2024;y<=2030;y++) year.innerHTML+=`<option>${y}</option>`;
for (let q in quarters) quarter.innerHTML+=`<option>${q}</option>`;

quarter.onchange = () => {
  month.innerHTML="";
  quarters[quarter.value].forEach(m=>month.innerHTML+=`<option>${m}</option>`);
};
quarter.onchange();

function saveData(){
  const y=year.value,q=quarter.value,m=month.value;

  rentData[y] ??= {};
  rentData[y][q] ??= {};

  rentData[y][q][m]={
    waterPrev:+waterPrev.value,
    waterNow:+waterNow.value,
    elecPrev:+elecPrev.value,
    elecNow:+elecNow.value,
    rent:+rent.value
  };

  localStorage.setItem("rentData",JSON.stringify(rentData));
  alert("Saved");
}
