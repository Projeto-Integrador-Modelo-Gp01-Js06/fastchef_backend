import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity"
import { NumericTransformer } from "../../util/numerictransformer"


@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Column({type: 'decimal',  precision: 10, scale: 2,  nullable: false, transformer: new NumericTransformer()})
    preco: number

    @Column({length: 500, nullable: false})
    foto: string

    @Column('float')
    calories: number;

    @Column('float')
    saturatedFat: number;

    @Column('float')
    sugar: number;

    @Column('float')
    sodium: number;

    @Column({ nullable: true, default: "A" })
    nutriScore?: string;


    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: "CASCADE"
    })
    categoria: Categoria;


    
}

