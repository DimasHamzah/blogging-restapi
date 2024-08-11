const { Blogs, Categories, Users } = require('../db/models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const blogs = await Blogs.findAll({
                attributes: { exclude: ['id', 'category_id', 'user_id']},
                include: [
                    {
                        model: Categories,
                        attributes: ['name'],
                    },
                    {
                        model: Users,
                        attributes: ['username']
                    }
                ]
            });

            return res.json({
                error: false,
                message: 'ok',
                data: blogs
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            });
        }
    },
    show: async (req, res, next) => {
        try {
            const slug = req.params.slug;
            const blogs = await Blogs.findOne({
                where: { slug: slug },
                attributes: {exclude:['id', 'category_id']},
                include: [
                    {
                        model: Categories,
                        attributes: ['name']
                    },
                    {
                        model: Users,
                        attributes: ['username']
                    }
                ]
            })

            if (blogs === null) {
                return res.status(404).json({
                    error: false,
                    message: 'No blog found'
                })
            }

            return res.status(200).json({
                data: blogs,
            })
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            });
        }
    }
}