import { Request, Response } from 'express';
import { Order } from '../models/orderModel';

export const orderController = {
  async getOrders(req: Request, res: Response) {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get orders' });
    }
  },

  async createOrder(req: Request, res: Response) {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create order' });
    }
  },

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get order' });
    }
  }
};