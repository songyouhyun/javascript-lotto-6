import {Console} from "@woowacourse/mission-utils";

class App {
  async play() {
    const purchaseAmount = await Console.readLineAsync('구입금액을 입력해주세요.\n')
  }
}

export default App;
