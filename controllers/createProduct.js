module.exports = (req, res) => {
    if (!req.body.title || !req.body.price)
        res.status(422).json({ message: 'Produto sem título e/ou preço' });

    res
        .status(200)
        .json({ message: 'Produto fake criado com sucesso', data: req.body });
};