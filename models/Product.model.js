//create a model  While adding a product, following information is required. Product NameShort Description, Detailed Description, Category, Starting Price, Bid end date
//category should contain painting, sculptor and ornament

class Product {
  constructor(
    productName,
    shortDescription,
    detailedDescription,
    productCategory,
    startingPrice,
    bidEndDate
  ) {
    this.productName = productName;
    this.shortDescription = shortDescription;
    this.detailedDescription = detailedDescription;
    this.productCategory = productCategory;
    this.startingPrice = startingPrice;
    this.bidEndDate = bidEndDate;
  }
}

module.exports = Product;
