export class Location {
  name: string;
  description: string;
  config: any;
  constructor(name: string, description: string, config: any) {
    this.name = name;
    this.description = description;
    this.config = config;
  }
}