import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import SidebarFilter from "../components/filters/SidebarFilter"
import Pagination from "../components/pagination/Pagination"
import OrderCard from "../components/ui/orders/OrderCard"
import axiosInstance from "../api/api"
import type { Order } from "../types/orderTypes"

const OrdersPage = () => {
  const [searchParams] = useSearchParams()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const search = searchParams.get('search') || ''
  const priceMin = Number(searchParams.get('price_min')) || 0
  const priceMax = Number(searchParams.get('price_max')) || 10000
  const limit = Number(searchParams.get('limit')) || 10
  const page = Number(searchParams.get('page')) || 1

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const { data } = await axiosInstance.get('/tasks/getTasks', {
          params: {
            search,
            price_min: priceMin || undefined,
            price_max: priceMax === 10000 ? undefined : priceMax,
            limit,
            page
          }
        })
        setOrders(data.orders || data)
        setTotal(data.total || data.length)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [search, priceMin, priceMax, limit, page])

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Header />
      <div className="flex flex-1">
        <SidebarFilter />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-40 bg-[#1a1a1a] border border-white/5 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : orders.length > 0 ? (
              <>
                <div className="grid gap-4 mb-8">
                  {orders.map((order, index) => (
                    <OrderCard key={order.id} order={order} index={index} />
                  ))}
                </div>
                <Pagination totalItems={total} currentPage={page} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-orange-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-gray-400 text-sm text-center max-w-md mb-6">
                  We couldn't find any projects matching your filters. Try adjusting your search criteria or check back later for new opportunities.
                </p>
                <button
                  onClick={() => window.location.href = '/works'}
                  className="px-6 py-2.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-colors text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default OrdersPage