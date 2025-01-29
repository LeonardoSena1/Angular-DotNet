export class CreateOrderDto {
    customerId!: number;
    userId!: number;
    products!: OrderProductDto[];
}

export class OrderProductDto {
    productId!: number;
    quantity!: number;
}