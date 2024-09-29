var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Column, Model, DataType, AllowNull, ForeignKey, } from 'sequelize-typescript';
import Customer from './customer';
let Measure = class Measure extends Model {
};
__decorate([
    AllowNull(false),
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
], Measure.prototype, "measure_uuid", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.DATE,
    })
], Measure.prototype, "measure_datetime", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Measure.prototype, "measure_value", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Measure.prototype, "measure_type", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Measure.prototype, "has_confirmed", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Measure.prototype, "image_url", void 0);
__decorate([
    ForeignKey(() => Customer),
    Column({
        type: DataType.UUID,
    })
], Measure.prototype, "customer_code", void 0);
Measure = __decorate([
    Table({
        timestamps: true,
        tableName: "measure",
        modelName: 'Measure'
    })
], Measure);
export default Measure;
