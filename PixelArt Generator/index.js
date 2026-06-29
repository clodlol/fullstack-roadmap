const root = document.documentElement;
const sizePicker = document.getElementById("sizePicker");
const colorPicker = document.getElementById("colorPicker");
const canvas = document.getElementById("canvas");

const defaultColor = "beige";

let mouseDown = false;

window.onmousedown = () => {
  mouseDown = true;
};
window.onmouseup = () => {
  mouseDown = false;
};

updateGrid(sizePicker.value);

sizePicker.onchange = () => {
  console.log(sizePicker.value);
  updateGrid(sizePicker.value);
};

function updateGrid(size) {
  canvas.innerHTML = "";
  root.style.setProperty("--grid-size", size);
  for (let i = 0; i < size * size; ++i) {
    let gridEl = document.createElement("div");
    gridEl.classList.add("canvasGridEl");

    gridEl.onmouseenter = () => {
      if (mouseDown) {
        gridEl.style.backgroundColor = colorPicker.value;
      }
    };

    canvas.append(gridEl);
  }
}

function reset() {
  let gridEls = canvas.children;
  for (let gridEl of gridEls) {
    gridEl.style.backgroundColor = defaultColor;
  }
}
