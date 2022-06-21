class CharElement extends HTMLElement {
  char = "";
  class = "";
  constructor(char, className = []) {
    this.char = char;
    this.classList.add(...className);
  }
}

class NumberElement extends CharElement {
  constructor() {
    super();
  }
}
