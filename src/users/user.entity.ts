import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude() // Excluir la contraseña en las respuestas
  password: string;

  @Column({ default: 'user' })
  role: string; // Roles: 'user' o 'admin'

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
