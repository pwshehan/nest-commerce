import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from '../guards/seller.guard';
import { User } from '../utilities/user.decorator';
import { User as UserDocument} from '../types/user';
import { Product } from '../types/product';


@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get()
    async listall(){
        return this.productService.findall();
    }

    @Get('/mine')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async listMine(@User() user: UserDocument): Promise<Product[]> {
        const { id } = user;
        return await this.productService.findByOwner(id);
    }

    @Get('/seller/:id')
    async listBySeller(@Param('id') id: string): Promise<Product[]> {
        return await this.productService.findByOwner(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async create(@Body() product: CreateProductDTO, @User() user: UserDocument){
        return this.productService.create(product, user);
    }

    @Get(':id')
    async read(@Param('id') id: string){
        return this.productService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async update(@Param('id') id: string, @Body() product: UpdateProductDTO, @User() user: UserDocument){
        const { id: userId } = user;
        return this.productService.update(id, product, userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async delete(@Param('id') id: string, @User() user: UserDocument){
        const { id: userId } = user;
        return this.productService.delete(id, userId);
    }
}
