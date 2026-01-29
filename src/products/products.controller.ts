import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RcpExceptionFilter } from 'src/common/filters/rpc-exception.filter';
import { PRODUCT_SERVICE } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy
  ) {}

  @Get()
  findAll( @Query() paginationDto : PaginationDto ) {
    return this.productClient.send('find_all_products', paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {

    //1. case to handler errors
    return this.productClient.send({ cmd : 'find_one_product'}, { id: id })
      .pipe( catchError( err => { throw new RpcException(err) }) );

    //
    //2. case to handler errors
    /*try {
      //firstValueForm --> allow us handler like a promise
      const product = await firstValueFrom(
        this.productClient.send({ cmd : 'find_one_product'}, { id: id }));
        return product;
    } catch (error) {
      //console.log(error);
      throw new RpcException(error); //This will allow rpc.exception.filters to catch and handle this error.
    }*/
    //
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send({ cmd : 'create_product'}, createProductDto )
      .pipe( catchError (err => { throw new RpcException(err)}));
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return this.productClient.send({ cmd : 'update_one_product'}, { id, ...updateProductDto})
    .pipe( catchError ( err => { throw new RpcException(err)}));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send({ cmd : 'delete_one_product'}, { id: id });
  }
}
