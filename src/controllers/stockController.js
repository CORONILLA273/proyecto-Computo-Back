import StockService from '../services/stockService.js'

export default class StockController {
    constructor() {
        this.stockService = new StockService()
    }

    async getAllStocks(req, res, next) {
        try {
            const stocks = await this.stockService.getAllStocks()
            res.status(200).json(stocks)
        } catch (error) {
            next(error)
        }
    }

    async addStock(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const stock = await this.stockService.addStock(req.body)
            res.status(201).json(stock)
        } catch (error) {
            next(error)
        }
    }

    async updateStock(req, res, next) {
        try {
            const stock = await this.stockService.updateStock(req.params.id, req.body)
            res.status(200).json(stock)
        } catch (error) {
            next(error)
        }
    }

    async deleteStock(req, res, next) {
        try {
            await this.stockService.deleteStock(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleStockStatus(req, res, next) {
            try {
                console.log('@@@ id => ', req.params.id)
                console.log('@@@ status => ', req.body.status)
                const stock = await this.stockService.toggleStockStatus(req.params.id, req.body.status)
                res.status(200).json(stock)
            } catch (error) {
                next(error)
            }
        }
}