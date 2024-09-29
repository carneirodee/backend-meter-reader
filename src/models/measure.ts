import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  AutoIncrement,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Customer from './customer';

@Table({
  timestamps: true,
  tableName: "measure",
  modelName: 'Measure'
})
class Measure extends Model {

  @AllowNull(false)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare measure_uuid: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare measure_datetime: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare measure_value: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare measure_type: string;

  @Column({
    type: DataType.STRING,
  })
  declare has_confirmed: number;

  @Column({
    type: DataType.STRING,
  })
  declare image_url: string;

  
  // @ForeignKey(() => Customer)
  //   @Column({
  //       type: DataType.UUID,
  //     })
      declare customer_code: string;

}

export default Measure;