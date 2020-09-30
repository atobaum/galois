import Entity from "./Entity";

type Change = [string, any?];

export default abstract class AggregateRoot<
  C extends Change,
  K = number
> extends Entity<K> {
  protected changes: C[] = [];

  public clearChanges() {
    this.changes = [];
  }

  protected addChange(change: C) {
    this.changes.push(change);
  }
}
