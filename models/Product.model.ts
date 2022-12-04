//create a model  While adding a product, following information is required. Product NameShort Description, Detailed Description, Category, Starting Price, Bid end date
//category should contain painting, sculptor and ornament

const categoryImport = require('./Category.enum');
const Category = categoryImport.Category;

export class Product {
    id: number;
    name: string;
    shortDescription: string;
    detailedDescription: string;
    category = Category;
    startingPrice: number;
    bidEndDate: Date;
}
   