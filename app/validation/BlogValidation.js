const { body, validationResult } = require("express-validator");

const validationBlog = [
    body('slug')
        .isString()
        .withMessage('Slug must be a string')
        .notEmpty()
        .withMessage('Slug is required')
        .isLength({ max: 255 })
        .withMessage('Slug cannot exceed 255 characters'),

    body('category_id')
        .isNumeric()
        .withMessage('Category ID must be a number')
        .notEmpty()
        .withMessage('Category ID is required'),

    body('title')
        .isString()
        .withMessage('Title must be a string')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 255 })
        .withMessage('Title cannot exceed 255 characters'),

    body('subtitle')
        .isString()
        .withMessage('Subtitle must be a string')
        .isLength({ max: 255 })
        .withMessage('Subtitle cannot exceed 255 characters'),

    body('description')
        .isString()
        .withMessage('Description must be a string')
        .notEmpty()
        .withMessage('Description is required'),

    body('image')
        .notEmpty()
        .withMessage('Images must be a string')
        .optional(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validationBlog };