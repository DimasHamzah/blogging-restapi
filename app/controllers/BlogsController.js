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
                attributes: { exclude: ['id', 'category_id'] },
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
            });

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
    },
    store: async (req, res, next) => {
        try {
            const { slug, category_id, title, subtitle, description } = req.body;

            if (!req.file) {
                return res.status(300).json({
                    error: false,
                    message: 'No Image blog found'
                });
            }

            const blog = await Blogs.create({
                slug,
                user_id: req.users,
                category_id,
                title,
                subtitle,
                description,
                images: `images/blog/${req.file.filename}`
            });

            return res.status(201).json({
                error: false,
                message: 'ok',
                data: blog
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id;
            const blogs = await Blogs.findByPk(id);

            if (!blogs) {
                return res.status(404).json({
                    error: false,
                    message: 'No blog found'
                });
            }

            const { slug, category_id, title, subtitle, description } = req.body;

            if (!req.file) {
                return res.status(300).json({
                    error: false,
                    message: 'No Image blog found'
                });
            }

            const blog = await blogs.update({
                slug,
                category_id,
                title,
                subtitle,
                description,
                images: `images/blog/${req.file.filename}`
            });

            return res.status(200).json({
                error: false,
                message: 'Updated',
                data: blog
            })
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
    },
    destroy: async (req, res, next) => {
        try {
            const id = req.params.id;

            const blogs = await Blogs.findByPk(id);

            if (!blogs) {
                return res.status(404).json({
                    error: false,
                    message: 'Data Not Found'
                });
            }

            await blogs.destroy();

            return res.status(200).json({
                error: false,
                message: 'ok'
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: error.message
            })
        }
    }
}