// models/companySize.ts
import { Table, Column, Model, DataType, Default, AllowNull, HasMany, Unique } from 'sequelize-typescript';
import { Company } from './company'; // Relación con la tabla de empresas

@Table({ tableName: 'company_sizes', timestamps: true })
export class CompanySize extends Model<CompanySize> {
  @AllowNull(false)
  @Unique('sizeRange')
  @Column(DataType.STRING)
  sizeRange!: string; // Rango de tamaño de la empresa (Ej. "50-100 trabajadores", "más de 100 trabajadores")

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indica si el tamaño de la empresa está activo

  @HasMany(() => Company) // Relación: Un tamaño de empresa tiene muchas empresas
  companies!: Company[];
}
