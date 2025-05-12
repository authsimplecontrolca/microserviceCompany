// models/company.ts
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Unique,
} from 'sequelize-typescript';
import { PaymentMethod } from './paymentMethod'; // Relación con PaymentMethod
import { Category } from './category'; // Relación con Category
import { CompanySize } from './companySize'; // Relación con CompanySize
import { Country } from './country'; // Relación con Country

@Table({ tableName: 'companies', timestamps: true })
export class Company extends Model<Company> {
  @AllowNull(false)
  @Unique('commercialName')
  @Column(DataType.STRING)
  commercialName!: string; // Commercial name of the company

  @AllowNull(false)
  @Unique('fiscalName')
  @Column(DataType.STRING)
  fiscalName!: string; // Fiscal name of the company

  @AllowNull(false)
  @Column(DataType.STRING)
  representativeFirstName!: string; // Representative's first name

  @AllowNull(false)
  @Column(DataType.STRING)
  representativeLastName!: string; // Representative's last name

  @AllowNull(false)
  @Unique('ruc')
  @Column(DataType.STRING)
  ruc!: string; // Company RUC

  @AllowNull(false)
  @Unique('contactNumber')
  @Column(DataType.STRING)
  contactNumber!: string; // Contact number

  @AllowNull(false)
  @Unique('corporateEmail')
  @Column(DataType.STRING)
  corporateEmail!: string; // Corporate email

  @AllowNull(false)
  @Column(DataType.STRING)
  address!: string; // Physical address of the company

  @ForeignKey(() => PaymentMethod)
  @Column(DataType.INTEGER)
  paymentMethodId!: number; // Relationship with PaymentMethod table

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId!: number; // Relationship with Category table

  @ForeignKey(() => CompanySize)
  @Column(DataType.INTEGER)
  companySizeId!: number; // Relationship with CompanySize table

  @ForeignKey(() => Country)
  @Column(DataType.INTEGER)
  countryId!: number; // Relationship with Country table

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indicates if the company is active

  @Column(DataType.INTEGER)
  activeWorkers!: number; // Number of active workers

  @Column(DataType.STRING)
  website!: string; // Company website

  @Column(DataType.TEXT)
  description!: string; // Company description

  @Column(DataType.INTEGER)
  logoImageId?: number; // Logo image ID

  @Column(DataType.INTEGER)
  backgroundImageId?: number; // Background image ID

  @Column(DataType.INTEGER)
  createdBy!: number; // User who created the company

  @Column(DataType.INTEGER)
  updatedBy!: number; // User who updated the company

  @Column(DataType.STRING)
  mapUrl!: string; // URL of the location map

  @BelongsTo(() => PaymentMethod)
  paymentMethod!: PaymentMethod; // Reverse relationship with PaymentMethod

  @BelongsTo(() => Category)
  category!: Category; // Reverse relationship with Category

  @BelongsTo(() => CompanySize)
  companySize!: CompanySize; // Reverse relationship with CompanySize

  @BelongsTo(() => Country)
  country!: Country; // Reverse relationship with Country
}
