class Base {
  element;
  constructor(tag = "div", styles = [], caption = "") {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerText = caption;
  }
}

const numberInput = document.getElementById("numberInput");
const holderInput = document.getElementById("holderInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");

const formInputNumber = document.getElementById("formInput-number");
const formInputName = document.getElementById("formInput-name");
const numbersEl = [];
const holderEl = [];
const monthEl = [];
const yearEl = [];
var prev = 0;

const initCharElements = () => {
  for (let i = 0; i < 16; i++) {
    numbersEl.push(new Base("div", ["char", "numberChar"], "#"));
  }
  for (let i = 0; i < 2; i++) {
    monthEl.push(new Base("div", ["char", "monthChar"], "M"));
  }
  for (let i = 0; i < 2; i++) {
    yearEl.push(new Base("div", ["char", "yearChar"], "Y"));
  }

  numbersEl.forEach((el) => {
    numberInput.append(el.element);
  });
  monthEl.forEach((el) => {
    monthInput.append(el.element);
  });
  yearEl.forEach((el) => {
    yearInput.append(el.element);
  });
};

formInputNumber.addEventListener("input", (ev) => {
  if (/^-?\d*$/.test(ev.target.value) === false) {
    formInputNumber.value = formInputNumber.value.slice(0, -(ev.target.value.length - prev));
    return;
  }
  let cursorPos = ev.target.selectionStart;
  let numbers = ev.currentTarget.value.split("");
  let k = cursorPos - 1;
  if (prev > numbers.length) {
    //erase
    k = numbers.length;
    animate(numbersEl[k].element, "move_up");
  } else {
    //inputing
    animate(numbersEl[k].element, "move_down");
    animate(numbersEl[prev].element, "move_down");
  }
  for (let i = 0; i < numbersEl.length; i++) {
    numbersEl[i].element.innerText = numbers[i] ? numbers[i] : "#";
  }
  prev = numbers.length;
});
formInputName.addEventListener("input", (evt) => {
  formInputName.value = formInputName.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
});

const animate = (element, animation = "") => {
  element.style.animation = `0.2s linear 0s alternate ${animation}`;
  element.addEventListener("animationend", (ev) => {
    element.removeAttribute("style");
  });
};

initCharElements();
