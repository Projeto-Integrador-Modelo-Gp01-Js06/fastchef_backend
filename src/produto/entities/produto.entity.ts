import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity"
import { NumericTransformer } from "../../util/numerictransformer"
import { ApiProperty } from "@nestjs/swagger"
import { Usuario } from "../../usuario/entities/usuario.entity"


@Entity({name: "tb_produtos"})
export class Produto {

    @ApiProperty()
    @PrimaryGeneratedColumn()    
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string
    
    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Column({type: 'decimal',  precision: 10, scale: 2,  nullable: false, transformer: new NumericTransformer()})
    preco: number

    @ApiProperty()
    @Column({length: 500, nullable: false})
    foto: string

    @ApiProperty()
    @IsPositive()
    @Column({ type: "float", default: 0 })
    calories: number;

    @ApiProperty()
    @IsPositive()
    @Column({ type: "float", default: 0 })
    saturatedFat: number;

    @ApiProperty()
    @IsPositive()
    @Column({ type: "float", default: 0 })
    sugar: number;

    @ApiProperty()
    @IsPositive()
    @Column({ type: "float", default: 0 })
    sodium: number;

    @ApiProperty()
    @Column({ nullable: true, default: "0" })
    nutriScore?: string;

    @ApiProperty({ type: () => Categoria })
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: "CASCADE"
    })
    categoria: Categoria;

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Categoria, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Categoria;
    
}