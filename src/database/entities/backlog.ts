import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity("backlog")
export class Backlog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  externalId: string;

  @Column({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;
}
