import { Transform, TransformFnParams } from "class-transformer"
import { IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "../../produto/entities/produto.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({ name: 'tb_categoria' })
export class Categoria {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    nome: string

    @ApiProperty()
    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];
}