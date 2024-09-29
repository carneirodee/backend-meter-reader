import {
    Table,
    Column,
    Model,
    ModelStatic,
    DataType,
    AllowNull,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import Customer from './customer';

@Table({
    timestamps: true,
    tableName: "customer-address",
    modelName: 'Customer-Address'
})
class Customer_Address extends Model{

    @AutoIncrement
    @AllowNull(false)
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        defaultValue: DataType.INTEGER,
    })
    declare costumer_address_id: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare address: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare district: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare city: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare state: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare country: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare postal_code: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare phone: string;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.UUID,
      })
      declare customer_code: string;

}

export default Customer_Address;