let n1,
  n2,
  op = "";

reset();

function refreshScreen(num) {
  if (op == "") {
    if (num == "." && n1.includes(".")) return;
    n1 += num;
    document.getElementById("screen").value += num;
  } else {
    if (num == "." && n2.includes(".")) return;
    n2 += num;
    document.getElementById("screen").value += num;
  }
}

function operation(operation) {
  if (op == "" && n1 != "") {
    op = operation;
    document.getElementById("screen").value += " " + op + " ";
  }
}

function calculate() {
  if (n1 != "" && n2 != "") {
    let resultado;
    switch (op) {
      case "+":
        resultado = parseFloat(n1) + parseFloat(n2);
        break;

      case "-":
        resultado = parseFloat(n1) - parseFloat(n2);
        break;

      case "x":
        resultado = parseFloat(n1) * parseFloat(n2);
        break;

      case "/":
        resultado = parseFloat(n1) / parseFloat(n2);
        break;

      default:
        break;
    }
    reset();
    document.getElementById("screen").value = resultado;
  }
}

function reset() {
  op = n1 = n2 = "";
  document.getElementById("screen").value = "";
}