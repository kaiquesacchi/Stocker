export default class Currency {
  static toReadable = (value: number) => {
    return value
      .toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
}
