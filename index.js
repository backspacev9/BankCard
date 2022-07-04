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
const cwInput = document.getElementById("cwInput");

const card = document.getElementById("card");
const floatBorder = document.getElementById("floatBorder");
const cardHolder = document.getElementById("cardHolder");
const expires = document.getElementById("expires");

const formInputNumber = document.getElementById("formInput-number");
const formInputName = document.getElementById("formInput-name");
const FormCwInput = document.getElementById("form-cwInput");
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");

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
  // ^[\d ]*$
  // ^-?\d*$
  if (/^[\d]*$/.test(ev.target.value) === false) {
    formInputNumber.value = formInputNumber.value.slice(0, -(ev.target.value.length - prevNumbers));
    return;
  }
  let cursorPos = ev.target.selectionStart;
  let numbers = ev.currentTarget.value.replaceAll(" ", "").split("");

  let k = cursorPos - 1;

  if (prevNumbers > numbers.length) {
    //erase
    k = numbers.length;
    animate(numbersEl[k].element, "move_up");
  } else {
    if (cursorPos - 1 == prevNumbers) {
      animate(numbersEl[k].element, "move_down");
    }
    animate(numbersEl[prevNumbers].element, "move_down");
  }
  // }

  for (let i = 0; i < numbersEl.length; i++) {
    numbersEl[i].element.innerText = numbers[i] ? numbers[i] : "#";
  }
  // const regexedInput = ev.currentTarget.value.replaceAll(" ", "").replace(/.{4}/g, "$& ");
  // formInputNumber.value =
  //   formInputNumber.value.length !== 19 ? regexedInput : regexedInput.slice(0, -1);

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
    FormCwInput.value = FormCwInput.value.slice(0, -(ev.target.value.length - prevCW));
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

formInputNumber.addEventListener("focus", () => {
  moveFloatBorder(numberInput, formInputNumber);
});
formInputName.addEventListener("focus", () => {
  moveFloatBorder(cardHolder, formInputName);
});
monthSelect.addEventListener("focus", () => {
  moveFloatBorder(expires, monthSelect);
});
yearSelect.addEventListener("focus", () => {
  moveFloatBorder(expires, yearSelect);
});

FormCwInput.addEventListener("focus", () => {
  hideFloatBorder();
});

const animate = (element, animation = "") => {
  element.style.animation = `0.2s linear 0s alternate ${animation}`;
  element.addEventListener("animationend", (ev) => {
    element.removeAttribute("style");
  });
};
const moveFloatBorder = (moveToEl, focusedEl) => {
  floatBorder.style.opacity = 1;
  floatBorder.style.width = moveToEl.offsetWidth + "px";
  floatBorder.style.height = moveToEl.offsetHeight + "px";
  floatBorder.style.left = moveToEl.offsetLeft + "px";
  floatBorder.style.top = moveToEl.offsetTop + "px";
  focusedEl.addEventListener("blur", (ev) => {
    hideFloatBorder();
  });
};
const hideFloatBorder = () => {
  floatBorder.style.left = 0;
  floatBorder.style.top = 0;
  floatBorder.style.width = 100 + "%";
  floatBorder.style.height = 100 + "%";
  floatBorder.style.opacity = 0;
};
initCharElements();
