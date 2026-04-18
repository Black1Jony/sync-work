import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import OrderCard from './OrderCard'
import OrderSkeleton from './OrderSkeleton'
import type { Order } from '../../../types/orderTypes'
import api from "../../../api/api"

const OrdersFeed = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true)
        const response = await api.get('/tasks/getTasks')
        setOrders(response.data)
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    getOrders()
  }, [])

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Live <span className="text-orange-400">Orders</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real projects from real clients. Find your next opportunity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <OrderSkeleton key={i} />)
            : orders.map((order, i) => <OrderCard key={order.id} order={order} index={i} />)}
        </div>
      </div>
    </section>
  )
}

export default OrdersFeed
