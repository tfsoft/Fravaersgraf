// Rediger disse variabler hvis MaCom ændre layout
var tblName = "s_m_Content_Content_fravaertbl";
var kol1 = 1; // Navn
var kol2 = 2; // Fysisk fravær (alm fravær)
var kol3 = 8; // Skriftlig fravær

// Initialiser variabler
var inputData = document.getElementById(tblName).rows;
var antal = inputData.length - 4;
var plotData = new Array(antal);

// Load tabel ind i Arrays
for(i = 0; i < antal; i++) {
  cell = inputData[i+3].cells;

  a = "";
  txt = cell[kol1].innerText.split(" ");
  N = txt.length;
  if(N > 0) {
    a = txt[0];
    if(N > 1) {
      for(j = 1; j < N-1; j++) {
        a += " " + txt[j].charAt(0) + ".";
      }
      a += " " + txt[N-1];
    }
  }
  

  x = parseFloat(cell[kol2].innerText.replace(",", "."));

  y = parseFloat(cell[kol3].innerText.replace(",", "."));

  plotData[i] = [x, y, a];
}

// Return plotData
plotData;