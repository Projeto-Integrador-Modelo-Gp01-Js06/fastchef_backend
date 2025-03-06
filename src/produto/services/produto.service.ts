import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {DeleteResult,ILike,LessThan,Like ,MoreThan,Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find(
            {
                relations: {
                    categoria: true
                }
            }
        );
    }

    async findById(id: number): Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where:{
                nome: Like(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        })
    }

    async findMaiorPreco(maior: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                preco: MoreThan(maior)
            },
            order: {
                preco: 'DESC'
            }
        });
    }

    async findMenorPreco(menor: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                preco: LessThan(menor)
            },
            order: {
                preco: 'ASC'
            }
        });
    }

    async create(produto: Produto): Promise<Produto> {
        produto.nutriScore = this.calcularNutriScoreInterno(produto);
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        
        let buscaProduto = await this.findById(produto.id);

        if (!buscaProduto || !produto.id)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        produto.nutriScore = this.calcularNutriScoreInterno(produto);
        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let buscaProduto= await this.findById(id);

        if (!buscaProduto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.delete(id);

    }

    async calcularNutriScore(produto: Produto): Promise<Produto> {
        // Calcula o Nutri-Score do produto antes de salvar
        produto.nutriScore = this.calcularNutriScoreInterno(produto);
    
        // Salva o produto no banco de dados com o Nutri-Score calculado
        return await this.produtoRepository.save(produto);
    }
    
    private calcularNutriScoreInterno(produto: Produto): string {
        let score = 0;
    
        // Regras básicas para cálculo do Nutri-Score
        score += produto.calorias > 500 ? 10 : 0;
        score += produto.gorduraSaturada > 5 ? 10 : 0;
        score += produto.acucar > 10 ? 10 : 0;
        score += produto.sodio > 600 ? 10 : 0;
    
        // Classificação final baseada no score acumulado
        if (score <= 3) return 'A';
        if (score <= 10) return 'B';
        if (score <= 20) return 'C';
        if (score <= 30) return 'D';
        return 'E';
    }
}