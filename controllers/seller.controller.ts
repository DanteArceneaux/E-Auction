
//@desc    Get all sellers
//@route   GET /api/v1/sellers
exports.getSellers =  (req, res) => {
    res.status(200).json({
        success: true,
        message: "Show all sellers"
    });
}

//@desc    Add a new product
//@route   POST /api/v1/sellers/add-product
exports.addProduct = (req, res) => {
    res.status(201).json({
        success: true,
        message: "Create a new product"
    });
}

//@desc    Delete a product by id
//@route   GET /api/v1/sellers/delete/{productId}
exports.deleteProductById = (req, res
) => {
    res.status(200).json({
        success: true,
        message: `Delete product ID: ${req.params.id}`
    });
}

