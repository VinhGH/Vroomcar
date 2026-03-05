import Car from '../models/Car.js';
import Category from '../models/Category.js';

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
export const getCars = async (req, res) => {
    try {
        const { type, location, maxPrice, search } = req.query;
        let query = {};

        // Filter by type
        if (type && type !== 'Tất cả') {
            const category = await Category.findOne({ name: type });
            if (category) {
                query.category_id = category._id;
            }
        }

        // Filter by location
        if (location && location !== 'Tất cả') {
            query.location_text = location;
        }

        // Filter by price
        if (maxPrice) {
            query.price_per_day = { $lte: Number(maxPrice) };
        }

        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const cars = await Car.find(query).populate('category_id', 'name');
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách xe' });
    }
};

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Get car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
export const getCarById = async (req, res) => {
    const car = await Car.findById(req.params.id).populate('category_id', 'name');

    if (car) {
        res.json(car);
    } else {
        res.status(404).json({ message: 'Không tìm thấy xe' });
    }
};
