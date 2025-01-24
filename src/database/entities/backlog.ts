import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("backlog")
export class Backlog {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  externalId: string;

  @Column({type: "timestamp", default: () => "NOW()" })
  createdAt: Date;
}
