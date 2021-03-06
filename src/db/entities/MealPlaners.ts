
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { Users } from './Users'
import { MealParts } from './MealParts'
import { Marks } from './Marks'

@Entity()
export class MealPlaners {

  @PrimaryGeneratedColumn({
    comment: 'ID плана питания на сутки'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Дата плана питания'
  })
  date: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Название плана питания'
  })
  title: string

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Описание плана питания'
  })
  description: string

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
    comment: 'Ожидаемое кол-во белков'
  })
  targetProtein: number

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
    comment: 'Ожидаемое кол-во жиров'
  })
  targetFats: number

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
    comment: 'Ожидаемое кол-во углеводов'
  })
  targetCarb: number

  @ManyToOne(() => Users, user => user.mealPlaners)
  user: Users

  @OneToMany(() => MealParts, mealParts => mealParts.mealPlaner)
  mealParts: MealParts[]

  @ManyToMany(() => Marks, marks => marks.mealPlanerMarks)
  @JoinTable({ name: 'meal_planer_marks' })
  marks: Marks[]

  @CreateDateColumn({
    type: 'timestamp',
    comment: 'Дата создания'
  })
  createdAt: Date

  // @UpdateDateColumn()
  // updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp',
    comment: 'Дата удаления'
  })
  deletedAt: Date

}
