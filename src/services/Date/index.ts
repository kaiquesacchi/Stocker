import moment from "moment";

export default class Date {
  static toReadable = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };
}
