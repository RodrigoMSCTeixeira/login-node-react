export default abstract class ServiceModel<T> {
  protected create?(): Promise<T>;
  protected read?(): Promise<T[] | T>;
  // #update?(): Promise<T>;
  // #delete?(): Promise<T>;

  get getCreate(): void | Promise<T> {
    if (this.create) {
      return this.create();
    }
  }

  get getRead(): void | Promise<T[] | T> {
    if (this.read) {
      return this.read();
    }
  }

  // get getUpdate(): void | Promise<T> {
  //   if (this.#update) {
  //     return this.#update();
  //   }
  // }

  // get getDelete(): void | Promise<T> {
  //   if (this.#delete) {
  //     return this.#delete();
  //   }
  // }
}
