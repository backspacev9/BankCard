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
const cwInput = document.getElementById("cwInput");

const card = document.getElementById("card");

const formInputNumber = document.getElementById("formInput-number");
const formInputName = document.getElementById("formInput-name");
const FormCwInput = document.getElementById("form-cwInput");

const currentYear = new Date().getFullYear();
const EXAMPLE_HOLDER = "Example holder card".split("");
const numbersEl = [];
let holderEl = EXAMPLE_HOLDER.map((el) => new Base("div", ["char", "holderChar"], el));
const monthEl = new Base("div", ["char", "monthChar"], "MM");
const yearEl = new Base("div", ["char", "yearChar"], "YY");
let prevNumbers = 0;
let prevHolders = 0;
let prevCW = 0;
const initCharElements = () => {
  for (let i = 0; i < 16; i++) {
    numbersEl.push(new Base("div", ["char", "numberChar"], "#"));
  }
  numbersEl.forEach((el) => {
    numberInput.append(el.element);
  });

  holderEl.forEach((el) => {
    holderInput.append(el.element);
  });

  monthInput.append(monthEl.element);
  yearInput.append(yearEl.element);

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
  if (chars.length === 0) {
    holderEl = EXAMPLE_HOLDER.map((el) => new Base("div", ["char", "holderChar"], el).element);
  }
  holderEl.forEach((el) => {
    holderInput.append(el);
  });
  prevHolders = chars.length;
});

monthSelect.addEventListener("input", (ev) => {
  animate(monthEl.element, "move_up");
  monthEl.element.innerText = ev.target.value;
});
yearSelect.addEventListener("input", (ev) => {
  animate(yearEl.element, "move_up");
  yearEl.element.innerText = ev.target.value.slice(0, 2);
});

FormCwInput.addEventListener("input", (ev) => {
  if (/^-?\d*$/.test(ev.target.value) === false) {
    FormCwInput.value = formInputNumber.value.slice(0, -(ev.target.value.length - prevCW));
    return;
  }

  cwInput.value = ev.target.value.replace(/\d/g, "*");

  prevCW = ev.target.value.length;
});
FormCwInput.addEventListener("focus", () => {
  card.classList.toggle("flip");
});
FormCwInput.addEventListener("blur", () => {
  card.classList.toggle("flip");
});

const animate = (element, animation = "") => {
  element.style.animation = `0.2s linear 0s alternate ${animation}`;
  element.addEventListener("animationend", (ev) => {
    element.removeAttribute("style");
  });
};

initCharElements();
