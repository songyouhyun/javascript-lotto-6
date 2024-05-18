import {Console, Random} from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async play() {
    const purchaseAmount = await Console.readLineAsync('구입금액을 입력해주세요.\n');
    const lottoCount = purchaseAmount / 1000;

    Console.print(`\n${lottoCount}개를 구매했습니다.`);
    let lottoNumbers = [];
    for (let i = 0; i < lottoCount; i++) {
      const randomNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(randomNumbers);
      lottoNumbers.push(lotto.numbers);
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

    let matchingCount;
    let bonusMatchingCount;
    let winningCountMap = new Map();
    let totalWinningAmount = 0;

    // 사용자가 구매한 로또 번호와 당첨 번호를 비교
    lottoNumbers.forEach((lottoNumber) => {
      matchingCount = 0;
      bonusMatchingCount = 0;
      winningNumbers.forEach((winningNumber) => {
        if (lottoNumber.includes(winningNumber)) {
          matchingCount++;
        }
        if (lottoNumber.includes(bonusNumber)) {
          bonusMatchingCount++;
        }

        let winningCount = 0;
        switch (matchingCount) {
          case 6:
            totalWinningAmount += 2000000000;
            winningCount = winningCountMap.get('1등') + 1;
            winningCountMap.set('1등', winningCount);
            break;
          case 5 && bonusMatchingCount > 0:
            totalWinningAmount += 30000000;
            winningCount = winningCountMap.get('2등');
            winningCountMap.set('2등', winningCount++);
            break;
          case 5:
            totalWinningAmount += 1500000;
            winningCount = winningCountMap.get('3등');
            winningCountMap.set('3등', winningCount++);
            break;
          case 4:
            totalWinningAmount += 50000;
            winningCount = winningCountMap.get('4등');
            winningCountMap.set('4등', winningCount++);
            break;
          case 3:
            totalWinningAmount += 5000;
            winningCount = winningCountMap.get('5등');
            winningCountMap.set('5등', winningCount++);
            break;
        }
      })
    })

    const revenue = this.calculateRevenue(purchaseAmount, totalWinningAmount);

    Console.print(
        '\n당첨 통계\n' +
        '---\n' +
        `3개 일치 (5,000원) - ${winningCountMap.get('5등') | 0}개\n` +
        `4개 일치 (50,000원) - ${winningCountMap.get('4등') | 0}개\n` +
        `5개 일치 (1,500,000원) - ${winningCountMap.get('3등') | 0}개\n` +
        `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningCountMap.get('2등') | 0}개\n` +
        `6개 일치 (2,000,000,000원) - ${winningCountMap.get('1등') | 0}개\n` +
        `총 수익률은 ${revenue}%입니다.`
    );
  }

  calculateRevenue(purchaseAmount, totalAmount) {
    return ((totalAmount / purchaseAmount) * 100).toFixed(1);
  }
}

export default App;
