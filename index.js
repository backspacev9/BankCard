class Base {
  element;
  constructor(tag = "div", styles = [], caption = "") {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerText = caption;
  }
}

const numberInput = document.getElementById("numberInput");
const finputNumber = document.getElementById("finput-number");
const numbersEl = [];
var prev = 0;

for (let i = 0; i < 16; i++) {
  numbersEl.push(new Base("div", ["char", "numberChar"], "#"));
}

numbersEl.forEach((el) => {
  numberInput.append(el.element);
});

finputNumber.addEventListener("input", (ev) => {
  let numbers = ev.currentTarget.value.split("");
  let i = numbers.length > 0 ? numbers.length - 1 : numbers.length;
  if (prev > numbers.length) {
    i = prev - 1;
    moveDown(numbersEl[i].element);
  } else [moveUp(numbersEl[i].element)];

  numbersEl[i].element.innerText = numbers[i] ? numbers[i] : "#";

  prev = numbers.length;
  console.log(numbers);
});

const moveUp = (element) => {
  element.classList.add("moveUp");
  element.addEventListener("animationend", (ev) => {
    element.classList.remove("moveUp");
  });
};
const moveDown = (element) => {
  element.classList.add("moveDown");
  element.addEventListener("animationend", (ev) => {
    element.classList.remove("moveDown");
  });
};
