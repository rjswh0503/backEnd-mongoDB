const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect(
    'mongodb+srv://shin:153123@cluster0.ydxf4.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0'
    ).then(() => {
        console.log('데이터베이스 연결');
    }).catch(() => {
        console.log('데이터베이스 연결 오류');
    })


const createProduct = async(req, res, next) => {
    const createProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
    // console.log(createProduct)
    // mongodb에 데이터 저장 하면 자동으로 ObjectId가 생김
    const result = await createProduct.save();
    // console.log(typeof createProduct._id);

    res.json(result);
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;