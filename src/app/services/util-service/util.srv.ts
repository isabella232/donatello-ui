
export class UtilService {

  static getRandomInt() {
    const min = Math.ceil(1);
    const max = Math.floor(20000);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
