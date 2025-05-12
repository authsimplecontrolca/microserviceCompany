// models/paymentMethod.ts
import { Table, Column, Model, DataType, Default, AllowNull, HasMany, Unique } from 'sequelize-typescript';
import { Company } from './company'; // Relación con la tabla de empresas

@Table({ tableName: 'payment_methods', timestamps: true })
export class PaymentMethod extends Model<PaymentMethod> {
  @AllowNull(false)
  @Unique('paymentMethodName')
  @Column(DataType.STRING)
  paymentMethodName!: string; // Nombre del tipo de pago (Ej. Transferencia, Efectivo)

  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean; // Indica si el tipo de pago está activo

  @HasMany(() => Company) // Relación: Un tipo de pago tiene muchas empresas
  companies!: Company[];
}
