const { Categories } =  require('../db/models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const categories = await Categories.findAll();

            return res.status(200).json({
                error: false,
                message: 'ok',
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            });
        }
    }
}