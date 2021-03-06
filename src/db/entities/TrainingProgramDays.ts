
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { TrainingPrograms } from './TrainingPrograms'
import { TrainingTypes } from './TrainingTypes'
import { TrainingProgramDayExercises } from './TrainingProgramDayExercises'
import { TrainingProcesses } from './TrainingProcesses'

@Entity()
export class TrainingProgramDays {

  @PrimaryGeneratedColumn({
    comment: 'ID дня тренировочной программы'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Название дня тренировочной программы'
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Комментарий к тренировочному дню'
  })
  comment: string

  @OneToMany(() => TrainingProgramDayExercises, trainingProgramDayExercises => trainingProgramDayExercises.trainingProgramDay)
  trainingProgramDayExercises: TrainingProgramDayExercises[]

  @ManyToOne(() => TrainingPrograms, trainingProgram => trainingProgram.trainingProgramDays)
  trainingProgram: TrainingPrograms

  @ManyToOne(() => TrainingTypes, trainingType => trainingType.trainingProgramDays)
  trainingType: TrainingTypes

  @OneToMany(() => TrainingProcesses, trainingProcesses => trainingProcesses.trainingProgramDay)
  trainingProcesses: TrainingProcesses[]

}
