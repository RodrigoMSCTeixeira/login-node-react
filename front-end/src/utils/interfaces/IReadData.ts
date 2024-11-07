export default interface IReadData<T> {
  get getRead(): T[] | null;
  get getReadById(): T | null;
}
