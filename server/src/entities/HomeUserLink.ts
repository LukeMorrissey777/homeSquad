import { Entity, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";

@Entity()
export class HomeUserLink {
  @PrimaryKey()
  userId!: number;

  @PrimaryKey()
  homeId!: number;

  [PrimaryKeyType]: [number, number];

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
