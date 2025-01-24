import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("waitList")
export class WaitList {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  externalId: string;

  @Column({type: "timestamp", default: () => "NOW()" })
  createdAt: Date;
}
