class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    numbers.forEach((number) => {
      const uniqueArray = [];
      if (uniqueArray.includes(number)) {
        throw new Error("[ERROR] 중복되지 않는 숫자여야 합니다.")
      }
      uniqueArray.push(number);
    });
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
