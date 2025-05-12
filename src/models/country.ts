// models/country.ts
import { Table, Column, Model, DataType, Default, Unique } from 'sequelize-typescript';

@Table({ tableName: 'countries', timestamps: true })
export class Country extends Model<Country> {
  @Unique('countryName')
  @Column(DataType.STRING)
  countryName!: string; // Country name

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indica si la categoría está activa
}
