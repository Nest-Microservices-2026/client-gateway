import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator"
import { OrderStatus, OrderStatusList } from "../enum/orders.enum"
import { OrderItemDto } from "./ordem-item.dto"
import { Type } from "class-transformer"


export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true})
    @Type( () => OrderItemDto )
    items: OrderItemDto[]
    /*@IsNumber({ maxDecimalPlaces : 2 })
    @IsPositive()
    totalAmount : number

    @IsNumber()
    @IsPositive()
    totalItems : number

    @IsEnum(OrderStatusList, {
        message : `Possible status value are ${OrderStatus}`
    })
    @IsOptional()
    status : OrderStatus = OrderStatus.PENDING

    @IsBoolean()
    @IsOptional()
    paid: boolean = false*/

}
