import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { IsNotEmpty, IsPositive } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string

    @IsPositive()
    @IsNotEmpty()
    @Column({type: 'decimal', nullable: false})
    preco: number

    @Column({length: 500, nullable: false})
    foto: string

    @IsPositive()
    @IsNotEmpty()
    @Column({type: 'decimal', nullable: false})
    inf_nutricional: number

    //@ManyToOne(() => Categoria, (categoria) => categoria.produto, {
       // onDelete: "CASCADE"
    //})
    //categoria: Categoria;


    
}

