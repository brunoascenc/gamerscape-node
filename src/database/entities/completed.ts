import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity("completed")
export class Completed {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  externalId: string;

  @Column({ type: "bool" })
  psCompletionism: boolean;

  @Column({ type: "bool" })
  steamCompletionism: boolean;

  @Column({ type: "bool" })
  xboxCompletionism: boolean;

  @Column({ type: "timestamp", default: () => "NOW()" })
  createdAt: Date;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;
}
