export class Cup {
  id: string;
  name: string;
  date: string;
  volume: number | null;
  color: string;
  action: string;

  constructor(
    idParam: string,
    nameParam: string,
    dateParam: string,
    volumeParam: number | null,
    colorParam: string,
    actionParam: string
  ) {
    this.id = idParam;
    this.name = nameParam;
    this.date = dateParam;
    this.volume = volumeParam;
    this.color = colorParam;
    this.action = actionParam;
  }
}
