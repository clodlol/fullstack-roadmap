const root = document.documentElement;
const sizePicker = document.getElementById("sizePicker");
const colorPicker = document.getElementById("colorPicker");
const canvas = document.getElementById("canvas");

const defaultColor = "#FFFAF3";

let mouseDown = false;

window.onmousedown = () => {
  mouseDown = true;
};
window.onmouseup = () => {
  mouseDown = false;
};

updateGrid(sizePicker.value);

sizePicker.onchange = () => {
  updateGrid(sizePicker.value);
};

function updateGrid(size) {
  canvas.innerHTML = "";
  root.style.setProperty("--grid-size", size);
  for (let i = 0; i < size * size; ++i) {
    let gridEl = document.createElement("div");
    gridEl.dataset.filled = "false";
    gridEl.classList.add("canvasGridEl");

    gridEl.onclick = () => {
      gridEl.dataset.filled = "true";
      gridEl.style.backgroundColor = colorPicker.value;
    };
    gridEl.onmouseenter = () => {
      if (mouseDown) {
        gridEl.dataset.filled = "true";
        gridEl.style.backgroundColor = colorPicker.value;
      }
    };

    canvas.append(gridEl);
  }
}

function reset() {
  let gridEls = canvas.children;
  for (let gridEl of gridEls) {
    gridEl.dataset.filled = "false";
    gridEl.style.backgroundColor = defaultColor;
  }
}

function download() {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = sizePicker.value;
  exportCanvas.height = sizePicker.value;

  const ctx = exportCanvas.getContext("2d");
  let counter = 0;
  for (let gridEl of canvas.children) {
    if (gridEl.dataset.filled == "false") {
      counter++;
      continue;
    }
    let c = window.getComputedStyle(gridEl).backgroundColor;
    ctx.fillStyle = c;
    ctx.fillRect(counter % sizePicker.value, counter / sizePicker.value, 1, 1);
    counter++;
  }

  const dataURL = exportCanvas.toDataURL("image/png");
  const downloadLink = document.createElement("a");
  downloadLink.href = dataURL;
  downloadLink.download = "pixel-art.png";
  downloadLink.click();
}
