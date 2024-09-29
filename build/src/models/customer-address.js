var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Column, Model, DataType, AllowNull, AutoIncrement, ForeignKey, } from 'sequelize-typescript';
import Customer from './customer';
let Customer_Address = class Customer_Address extends Model {
};
__decorate([
    AutoIncrement,
    AllowNull(false),
    Column({
        primaryKey: true,
        type: DataType.INTEGER,
        defaultValue: DataType.INTEGER,
    })
], Customer_Address.prototype, "costumer_address_id", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer_Address.prototype, "address", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer_Address.prototype, "district", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer_Address.prototype, "city", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer_Address.prototype, "state", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer_Address.prototype, "country", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer_Address.prototype, "postal_code", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer_Address.prototype, "phone", void 0);
__decorate([
    ForeignKey(() => Customer),
    Column({
        type: DataType.UUID,
    })
], Customer_Address.prototype, "customer_code", void 0);
Customer_Address = __decorate([
    Table({
        timestamps: true,
        tableName: "customer-address",
        modelName: 'Customer-Address'
    })
], Customer_Address);
export default Customer_Address;
