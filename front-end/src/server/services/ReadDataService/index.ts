import IReadData from "@/utils/interfaces/IReadData";

export default class ReadDataService<T> implements IReadData<T> {
  #readData: T;

  constructor(readData: T) {
    this.#readData = readData;
  }

  #read(): T[] {
    return this.#readData as T[];
  }

  #readById(): T {
    return this.#readData as T;
  }

  get getRead(): T[] {
    return this.#read();
  }

  get getReadById(): T {
    return this.#readById();
  }
}
