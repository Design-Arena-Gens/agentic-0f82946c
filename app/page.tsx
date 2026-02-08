'use client'

import { useState } from 'react'
import { ShoppingCart, Menu, X, Plus, Minus, Trash2 } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  origin: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 45,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Audio',
    origin: 'Dhaka, Bangladesh'
  },
  {
    id: 2,
    name: 'Bluetooth Speaker',
    price: 35,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    description: 'Portable Bluetooth speaker with deep bass',
    category: 'Audio',
    origin: 'Chittagong, Bangladesh'
  },
  {
    id: 3,
    name: 'USB-C Earbuds',
    price: 25,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    description: 'Comfortable in-ear earbuds with crystal clear sound',
    category: 'Audio',
    origin: 'Dhaka, Bangladesh'
  },
  {
    id: 4,
    name: 'Phone Stand',
    price: 15,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
    description: 'Adjustable aluminum phone stand for desk',
    category: 'Accessories',
    origin: 'Sylhet, Bangladesh'
  },
  {
    id: 5,
    name: 'Laptop Sleeve',
    price: 20,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop',
    description: 'Premium fabric laptop sleeve with pocket',
    category: 'Accessories',
    origin: 'Dhaka, Bangladesh'
  },
  {
    id: 6,
    name: 'Wireless Charging Pad',
    price: 30,
    image: 'https://images.unsplash.com/photo-1591290619762-d69b2b96d6c8?w=500&h=500&fit=crop',
    description: 'Fast wireless charging pad for all devices',
    category: 'Tech',
    origin: 'Chittagong, Bangladesh'
  },
  {
    id: 7,
    name: 'Smart Watch Band',
    price: 18,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop',
    description: 'Premium silicone watch band in multiple colors',
    category: 'Accessories',
    origin: 'Dhaka, Bangladesh'
  },
  {
    id: 8,
    name: 'Cable Organizer Set',
    price: 12,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    description: 'Keep your cables organized and tangle-free',
    category: 'Accessories',
    origin: 'Rajshahi, Bangladesh'
  },
  {
    id: 9,
    name: 'Portable Power Bank',
    price: 28,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    description: '20000mAh power bank with fast charging',
    category: 'Tech',
    origin: 'Dhaka, Bangladesh'
  },
  {
    id: 10,
    name: 'LED Desk Lamp',
    price: 32,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    description: 'Adjustable LED lamp with touch controls',
    category: 'Lifestyle',
    origin: 'Khulna, Bangladesh'
  },
  {
    id: 11,
    name: 'Mechanical Keyboard',
    price: 55,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop',
    description: 'RGB mechanical keyboard with blue switches',
    category: 'Tech',
    origin: 'Dhaka, Bangladesh'
  },
  {
    id: 12,
    name: 'Wireless Mouse',
    price: 22,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    description: 'Ergonomic wireless mouse with precision tracking',
    category: 'Tech',
    origin: 'Chittagong, Bangladesh'
  }
]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Audio', 'Tech', 'Accessories', 'Lifestyle']

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-spotify-black border-b border-spotify-gray sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-spotify-green rounded-full p-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Spotify Store</h1>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#products" className="hover:text-spotify-green transition">Products</a>
              <a href="#about" className="hover:text-spotify-green transition">About</a>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:text-spotify-green transition"
              >
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-spotify-green rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <a href="#products" className="block hover:text-spotify-green transition">Products</a>
              <a href="#about" className="block hover:text-spotify-green transition">About</a>
              <button
                onClick={() => {
                  setIsCartOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center space-x-2 hover:text-spotify-green transition"
              >
                <ShoppingCart size={20} />
                <span>Cart ({getTotalItems()})</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-spotify-gray to-spotify-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Premium Products from <span className="text-spotify-green">Bangladesh</span>
          </h2>
          <p className="text-xl text-spotify-lightgray mb-8 max-w-2xl mx-auto">
            Discover high-quality audio gear, tech accessories, and lifestyle products. Shipped worldwide.
          </p>
          <a href="#products" className="btn-primary inline-block">
            Shop Now
          </a>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="products">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-spotify-green text-white'
                  : 'bg-spotify-gray text-white hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="card group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-spotify-green text-xs font-bold px-2 py-1 rounded-full">
                  ${product.price}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-spotify-lightgray text-sm mb-2">{product.description}</p>
              <p className="text-xs text-spotify-green mb-4">📍 {product.origin}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full btn-primary"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-spotify-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">About Spotify Store Bangladesh</h2>
            <p className="text-spotify-lightgray text-lg mb-4">
              We're a premium dropshipping store bringing you the best tech and lifestyle products from Bangladesh.
              Our mission is to connect global customers with high-quality, affordable products while supporting
              local businesses in Bangladesh.
            </p>
            <p className="text-spotify-lightgray text-lg">
              Every purchase supports local manufacturers and helps grow the Bangladeshi economy.
              We ensure quality control, fast shipping, and excellent customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-spotify-black border-t border-spotify-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Spotify Store</h3>
              <p className="text-spotify-lightgray">Premium products from Bangladesh</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-spotify-lightgray">
                <li><a href="#products" className="hover:text-spotify-green transition">Products</a></li>
                <li><a href="#about" className="hover:text-spotify-green transition">About</a></li>
                <li><a href="#" className="hover:text-spotify-green transition">Shipping</a></li>
                <li><a href="#" className="hover:text-spotify-green transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-spotify-lightgray">Email: info@spotifystore.com</p>
              <p className="text-spotify-lightgray">Dhaka, Bangladesh</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-spotify-gray text-center text-spotify-lightgray">
            <p>&copy; 2024 Spotify Store Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-spotify-gray shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="hover:text-spotify-green transition"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto mb-4 text-spotify-lightgray" />
                  <p className="text-spotify-lightgray">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="bg-spotify-black rounded-lg p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            <p className="text-spotify-green font-bold">${item.price}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-spotify-gray rounded"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-spotify-gray rounded"
                              >
                                <Plus size={16} />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto p-1 hover:text-red-500 transition"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-spotify-black pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold mb-2">
                      <span>Subtotal:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-spotify-lightgray">
                      Shipping calculated at checkout
                    </p>
                  </div>

                  <button className="w-full btn-primary">
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
