var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Column, Model, DataType, HasMany, AllowNull, HasOne } from 'sequelize-typescript';
import Customer_Address from './customer-address';
import Measure from './measure';
let Customer = class Customer extends Model {
};
__decorate([
    AllowNull(false),
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
], Customer.prototype, "customer_code", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer.prototype, "code", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer.prototype, "name", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer.prototype, "email", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Customer.prototype, "password", void 0);
__decorate([
    Column({
        type: DataType.BLOB,
    })
], Customer.prototype, "profile_picture", void 0);
__decorate([
    Column({
        type: DataType.BLOB,
    })
], Customer.prototype, "access_token", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.BLOB,
    })
], Customer.prototype, "is_active", void 0);
__decorate([
    HasMany(() => Measure)
], Customer.prototype, "measures", void 0);
__decorate([
    HasOne(() => Customer_Address)
], Customer.prototype, "address", void 0);
Customer = __decorate([
    Table({
        timestamps: true,
        tableName: "customer",
        modelName: 'Customer'
    })
], Customer);
export default Customer;
