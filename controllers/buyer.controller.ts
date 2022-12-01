

exports.getBuyers =  (req, res) => {
    res.status(200).json({
        success: true,
        message: "Show all buyers", 
    });
}

exports.placeBid = (req, res) => {
    res.status(201).json({
        success: true,
        message: "Create a new bid"
    });
}

//updatebid
exports.updateBid = (req, res) => {
    res.status(201).json({
        success: true,
        message: "Update a bid"
    });
}


