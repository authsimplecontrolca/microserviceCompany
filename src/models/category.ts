// models/category.ts
import { Table, Column, Model, DataType, Default, AllowNull, HasMany, Unique } from 'sequelize-typescript';
import { Company } from './company';  // Relación con la tabla de empresas

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model<Category> {
  @AllowNull(false)
  @Unique('categoryName')
  @Column(DataType.STRING)
  categoryName!: string;  // Nombre de la categoría de empresa (Ej. Tecnología, Alimentación)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;  // Indica si la categoría está activa

  @HasMany(() => Company)  // Relación: Una categoría tiene muchas empresas
  companies!: Company[];
}
