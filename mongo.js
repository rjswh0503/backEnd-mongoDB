const MongoClient = require('mongodb').MongoClient

const url ='mongodb+srv://shin:153123@cluster0.ydxf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const createProduct = async(req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };

    const client = new MongoClient(url);

    try{
        await client.connect();
        const db = client.db('products_test');
        const result = db.collection('products').insertOne(newProduct)
    }catch (error){
        return res.json({message: '데이터 저장 실패!!'});
    };
    

    res.json(newProduct);
};



const getProducts = async(req,res,next) => {
    const client = new MongoClient(url);
    let products;
    try{
        await client.connect();
        const db = client.db('products_test');
        products = await db.collection('products').find().toArray();
    }catch(error){
        return res.json({message: '저장된 데이터가 없습니다.'});
    };

    res.json(products);
};


exports.createProduct = createProduct;
exports.getProducts = getProducts;
