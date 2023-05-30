export class NewCup {
  name: string;
  date: string;
  volume: number | null;
  color: string;

  constructor(
    nameParam: string,
    dateParam: string,
    volumeParam: number,
    colorParam: string
  ) {
    this.name = nameParam;
    this.date = dateParam;
    this.volume = volumeParam;
    this.color = colorParam;
  }
}
