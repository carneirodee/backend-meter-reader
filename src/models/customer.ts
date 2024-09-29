import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  AllowNull,
  HasOne
} from 'sequelize-typescript';

import Customer_Address from './customer-address';
import Measure from './measure';

@Table({
  timestamps: true,
  tableName: "customer",
  modelName: 'Customer'
})
class Customer extends Model<Customer> {

  @AllowNull(false)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare customer_code: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare code: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.BLOB,
  })
  declare profile_picture: string;

  @Column({
    type: DataType.BLOB,
  })
  declare access_token: string;

  @AllowNull(false)
  @Column({
    type: DataType.BLOB,
  })
  declare is_active: string;

  @HasMany(()=> Measure)
  declare measures: Measure[];

  @HasOne(() => Customer_Address)  
  declare address: Customer_Address;

}

export default Customer;