import Entity from "./Entity";

type Change = {
  type: string;
  payload: any;
};

export default abstract class AggregateRoot<K = number> extends Entity<K> {
  protected changes: Change[] = [];

  public clearChanges() {
    this.changes = [];
  }

  protected addChange(change: Change) {
    this.changes.push(change);
  }
}
