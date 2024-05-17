import {Console, Random} from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async play() {
    const purchaseAmount = await Console.readLineAsync('구입금액을 입력해주세요.\n');
    const lottoCount = purchaseAmount / 1000;

    Console.print(`\n${lottoCount}개를 구매했습니다.`);
    for (let i = 0; i < lottoCount; i++) {
      const randomNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(randomNumbers);
      Console.print(lotto.numbers);
    }

    let winningNumbers = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
    winningNumbers = winningNumbers
        .trim()
        .split(',')
        .map(
            (value) => parseInt(value)
        );

    let bonusNumber = await Console.readLineAsync('\n보너스 번호를 입력해주세요.\n');
    bonusNumber = parseInt(bonusNumber);
  }
}

export default App;
