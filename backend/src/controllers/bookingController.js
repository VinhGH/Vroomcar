import Booking from '../models/Booking.js';

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - car_id
 *               - total_amount
 *             properties:
 *               car_id:
 *                 type: string
 *               total_amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
export const createBooking = async (req, res) => {
    const { car_id, total_amount, paymentMethod } = req.body;

    if (!car_id || !total_amount) {
        res.status(400).json({ message: 'Thông tin đặt xe không đầy đủ' });
        return;
    }

    const booking = await Booking.create({
        user_id: req.user._id,
        car_id,
        total_amount,
        status: 'Chờ duyệt',
    });

    if (booking) {
        res.status(201).json(booking);
    } else {
        res.status(400).json({ message: 'Đặt xe thất bại' });
    }
};

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Get user bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
export const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user_id: req.user._id })
        .populate('car_id')
        .sort('-createdAt');
    res.json(bookings);
};

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   put:
 *     summary: Update booking status (cancel)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
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
export const cancelBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
        if (booking.user_id.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Không có quyền hủy đơn này' });
            return;
        }
        booking.status = 'Đã hủy';
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } else {
        res.status(404).json({ message: 'Không tìm thấy đơn đặt xe' });
    }
};
