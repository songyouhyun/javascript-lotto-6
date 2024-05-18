import {Console, Random} from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async play() {
    const purchaseAmount = await Console.readLineAsync('구입금액을 입력해주세요.\n');
    const lottoCount = purchaseAmount / 1000;

    if (isNaN(lottoCount)) {
      Console.print("[ERROR]")
    }

    Console.print(`${lottoCount}개를 구매했습니다.`);
    let lottoArray = [];
    for (let i = 0; i < lottoCount; i++) {
      const randomNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(randomNumbers);
      lottoArray.push(lotto.numbers);
      Console.print(`[${lotto.numbers.join(', ')}]`);
    }

    let winningNumbersFromUser = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
    winningNumbersFromUser = winningNumbersFromUser
        .trim()
        .split(',')
        .map(
            (value) => parseInt(value)
        );

    let bonusNumber = await Console.readLineAsync('\n보너스 번호를 입력해주세요.\n');
    bonusNumber = parseInt(bonusNumber);

    let winningCountMap = new Map();
    let winningCount;

    // 사용자가 구매한 로또 번호와 당첨 번호를 비교
    lottoArray.forEach((lottoNumber) => {
      const matchingCount = lottoNumber.filter(num => winningNumbersFromUser.includes(num)).length;
      const isBonusMatch = lottoNumber.includes(bonusNumber);

      if (matchingCount === 6) {
        winningCount = winningCountMap.get('1등') || 0;
        winningCount++;
        winningCountMap.set('1등', winningCount);
      } else if (matchingCount === 5 && isBonusMatch) {
        winningCount = winningCountMap.get('2등') || 0;
        winningCount++;
        winningCountMap.set('2등', winningCount);
      } else if (matchingCount === 5) {
        winningCount = winningCountMap.get('3등') || 0;
        winningCount++;
        winningCountMap.set('3등', winningCount);
      } else if (matchingCount === 4) {
        winningCount = winningCountMap.get('4등') || 0;
        winningCount++;
        winningCountMap.set('4등', winningCount);
      } else if (matchingCount === 3) {
        winningCount = winningCountMap.get('5등') || 0;
        winningCount++;
        winningCountMap.set('5등', winningCount);
      }
    })

    const totalWinningAmount = this.#calculateTotalWinningAmount(winningCountMap);
    const revenue = this.#calculateRevenue(purchaseAmount, totalWinningAmount);

    Console.print(
        '\n당첨 통계\n' +
        '---\n' +
        `3개 일치 (5,000원) - ${winningCountMap.get('5등') || 0}개\n` +
        `4개 일치 (50,000원) - ${winningCountMap.get('4등') || 0}개\n` +
        `5개 일치 (1,500,000원) - ${winningCountMap.get('3등') || 0}개\n` +
        `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningCountMap.get('2등') || 0}개\n` +
        `6개 일치 (2,000,000,000원) - ${winningCountMap.get('1등') || 0}개\n` +
        `총 수익률은 ${revenue}%입니다.`
    );
  }

  #calculateTotalWinningAmount(winningCountMap) {
    let winningAmount = 0;
    winningCountMap.forEach((value, key) => {
      switch (key) {
        case '1등':
          winningAmount += 2000000000;
          break;
        case '2등':
          winningAmount += 30000000;
          break;
        case '3등':
          winningAmount += 1500000;
          break;
        case '4등':
          winningAmount += 50000;
          break;
        case '5등':
          winningAmount += 5000;
          break;
      }
    });
    return winningAmount;
  }

  #calculateRevenue(purchaseAmount, totalAmount) {
    return ((totalAmount / purchaseAmount) * 100).toFixed(1);
  }
}

export default App;
