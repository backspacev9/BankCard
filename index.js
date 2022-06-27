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
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");

const formInputNumber = document.getElementById("formInput-number");
const formInputName = document.getElementById("formInput-name");

const currentYear = new Date().getFullYear();
const numbersEl = [];
let holderEl = [];
const monthEl = [];
const yearEl = [];
let prevNumbers = 0;
let prevHolders = 0;

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

  for (i = 1; i <= 12; i++) {
    let month = i.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    let option = new Base("option", [], month);
    option.element.setAttribute("value", month);
    monthSelect.append(option.element);
  }
  for (i = 2015; i <= currentYear; i++) {
    let option = new Base("option", [], i);
    option.element.setAttribute("value", i);
    yearSelect.append(option.element);
  }
};

formInputNumber.addEventListener("input", (ev) => {
  if (/^-?\d*$/.test(ev.target.value) === false) {
    formInputNumber.value = formInputNumber.value.slice(0, -(ev.target.value.length - prevNumbers));
    return;
  }
  let cursorPos = ev.target.selectionStart;
  let numbers = ev.currentTarget.value.split("");
  let k = cursorPos - 1;
  if (prevNumbers > numbers.length) {
    //erase
    k = numbers.length;
    animate(numbersEl[k].element, "move_up");
  } else {
    //inputing
    animate(numbersEl[k].element, "move_down");
    animate(numbersEl[prevNumbers].element, "move_down");
  }
  for (let i = 0; i < numbersEl.length; i++) {
    numbersEl[i].element.innerText = numbers[i] ? numbers[i] : "#";
  }
  prevNumbers = numbers.length;
  //formInputName.value = formInputName.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
});
formInputName.addEventListener("input", (ev) => {
  if (/^[a-zA-Z ]+$/.test(ev.target.value) === false && ev.target.value) {
    formInputName.value = formInputName.value.slice(0, -(ev.target.value.length - prevHolders));
    return;
  }
  let cursorPos = ev.target.selectionStart;
  let chars = ev.target.value.split("");
  holderInput.innerHTML = "";
  holderEl = chars.map((el) => new Base("div", ["char", "holderChar"], el).element);
  if (prevHolders < chars.length) animate(holderEl[cursorPos - 1], "tilt_rigth");
  holderEl.forEach((el) => {
    holderInput.append(el);
  });
  prevHolders = chars.length;
});

const animate = (element, animation = "") => {
  element.style.animation = `0.2s linear 0s alternate ${animation}`;
  element.addEventListener("animationend", (ev) => {
    element.removeAttribute("style");
  });
};

initCharElements();
