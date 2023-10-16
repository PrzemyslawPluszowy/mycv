import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  password: string;

  @AfterInsert()
  logInsert() {
    console.log("Inserted User with id: ", this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log("Removed User with id: ", this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log("Updated User with id: ", this.id);
  }
}
