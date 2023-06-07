export class Cup {
  id: string;
  name: string;
  date: string;
  volume: number | null;
  color: string;

  constructor(
    idParam: string,
    nameParam: string,
    dateParam: string,
    volumeParam: number | null,
    colorParam: string
  ) {
    this.id = idParam;
    this.name = nameParam;
    this.date = dateParam;
    this.volume = volumeParam;
    this.color = colorParam;
  }
}
