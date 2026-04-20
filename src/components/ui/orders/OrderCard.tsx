import { motion } from 'framer-motion'
import { User, Code2, Database, Palette, Cpu, Cloud, Zap } from 'lucide-react'
import type { Order } from '../../../types/orderTypes'

interface OrderCardProps {
  order: Order
  index: number
}

const techIcons: Record<string, any> = {
  React: Code2,
  TypeScript: Code2,
  Tailwind: Palette,
  Supabase: Database,
  Go: Cpu,
  WebSocket: Zap,
  PostgreSQL: Database,
  Redis: Database,
  Figma: Palette,
  'React Native': Code2,
  Framer: Palette,
  Python: Cpu,
  FastAPI: Zap,
  OpenAI: Cloud,
  Docker: Cloud,
  Vue: Code2,
  'Node.js': Cpu,
  MongoDB: Database,
  Mapbox: Cloud,
  Rust: Cpu,
  'Binance API': Zap, 
  TradingView: Palette
}

const OrderCard = ({ order, index }: OrderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.1
      }}
      whileHover={{
        y: -4,
        boxShadow: '0 0 30px rgba(255, 106, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.5)'
      }}
      className="relative bg-[#1a1a1a] border border-white/5 rounded-xl p-6 overflow-hidden group cursor-pointer transition-all duration-300"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,106,0,0.08) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <User size={16} />
            <span className="font-medium">{order.profiles.name}</span>
          </div>
          <div className="text-orange-400 font-bold text-lg tracking-tight">
            ${order.budget.toLocaleString()}
          </div>
        </div>

        <h3 className="text-white text-xl font-semibold mb-3 leading-tight tracking-tight">
          {order.title}
        </h3>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {order.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {order.stack.map((tech) => {
            const Icon = techIcons[tech] || Code2
            return (
              <div
                key={tech}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 font-medium hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-200"
              >
                <Icon size={14} className="text-orange-400/80" />
                <span>{tech}</span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default OrderCard
