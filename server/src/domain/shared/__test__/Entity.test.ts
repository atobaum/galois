import Entity from "../Entity";

class ConcreteEntity extends Entity {}
class ConcreteEntity2 extends Entity {}

describe("Entity", () => {
  it("isNew, isModified", () => {
    const newEntity = new ConcreteEntity(null);
    expect(newEntity.isNew()).toBe(true);
    expect(newEntity.isModified()).toBe(false);
  });

  it("equals", () => {
    const newEntity = new ConcreteEntity(null);
    const entity1 = new ConcreteEntity(1);
    const entity11 = new ConcreteEntity(1);
    const entity12 = new ConcreteEntity(2);
    const entity21 = new ConcreteEntity2(1);
    const entity22 = new ConcreteEntity2(2);

    expect(entity1.equals(newEntity)).toBe(false);
    expect(entity1.equals(entity1)).toBe(true);
    expect(entity1.equals(entity11)).toBe(true);
    expect(entity1.equals(entity12)).toBe(false);
    expect(entity1.equals(entity21)).toBe(false);
    expect(entity1.equals(entity22)).toBe(false);
  });
});
