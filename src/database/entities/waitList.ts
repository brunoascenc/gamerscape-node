import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user";

@Entity("waitList")
export class WaitList {
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
