import SaleService from '../services/saleService.js'

export default class SaleController {
    constructor() {
        this.saleService = new SaleService()
    }

    async getAllSales(req, res, next) {
        try {
            const sales = await this.saleService.getAllSales()
            res.status(200).json(sales)
        } catch (error) {
            next(error)
        }
    }

    async addSale(req, res, next) {
        try {
            // console.log("Request body: ", req.body)
            const sale = await this.saleService.addSale(req.body)
            res.status(201).json(sale)
        } catch (error) {
            next(error)
        }
    }

    async updateSale(req, res, next) {
        try {
            const sale = await this.saleService.updateSale(req.params.id, req.body)
            res.status(200).json(sale)
        } catch (error) {
            next(error)
        }
    }

    async deleteSale(req, res, next) {
        try {
            await this.saleService.deleteSale(req.params.id)
            res.status(204).end()
        } catch (error) {
            next(error)
        }
    }

    async toggleSaleStatus(req, res, next) {
            try {
                console.log('@@@ id => ', req.params.id)
                console.log('@@@ status => ', req.body.status)
                const sale = await this.saleService.toggleSaleStatus(req.params.id, req.body.status)
                res.status(200).json(sale)
            } catch (error) {
                next(error)
            }
        }
}