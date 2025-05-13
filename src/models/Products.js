export class Products {
    constructor({ productName, supplierId, weight, category, dimensionUnit, dimensions, recordedStockLevel, warningThresholdStockLevel, autoOrderStockLevel, skuCode, barcodeNumber, grnNumber, image, purchasingPrice, sellingPriceMargin, productDescription }) {
        this.productName = productName
        this.supplierId = supplierId,
        this.weight = weight
        this.category = category
        this.dimensionUnit = dimensionUnit
        this.dimensions = dimensions
        this.recordedStockLevel = recordedStockLevel
        this.warningThresholdStockLevel = warningThresholdStockLevel
        this.autoOrderStockLevel = autoOrderStockLevel
        this.skuCode = skuCode
        this.barcodeNumber = barcodeNumber
        this.grnNumber = grnNumber
        this.image = image
        this.purchasingPrice = purchasingPrice
        this.sellingPriceMargin = sellingPriceMargin
        this.productDescription = productDescription
    }
}