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

    @IsPositive()
    @Column({ type: "float", default: 0 })
    calories: number;

    @IsPositive()
    @Column({ type: "float", default: 0 })
    saturatedFat: number;

    @IsPositive()
    @Column({ type: "float", default: 0 })
    sugar: number;

    @IsPositive()
    @Column({ type: "float", default: 0 })
    sodium: number;

    @Column({ nullable: true, default: "0" })
    nutriScore?: string;


    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: "CASCADE"
    })
    categoria: Categoria;

    @ManyToOne(() => Categoria, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
        })
        usuario: Categoria;


    
}

