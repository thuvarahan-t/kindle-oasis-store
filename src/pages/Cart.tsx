
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CheckoutDialog from '@/components/checkout/CheckoutDialog';

const Cart = () => {
  const { items, removeFromCart, clearCart, total, itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowCheckout(true);
  };

  const handleCheckoutComplete = () => {
    clearCart();
    setShowCheckout(false);
    navigate('/dashboard');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Discover our amazing collection of books</p>
            <Button asChild>
              <Link to="/books">Browse Books</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Cart Items ({itemCount})</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700"
                  >
                    Clear Cart
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img 
                      src={item.cover} 
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.author}</p>
                      <p className="text-lg font-bold text-blue-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/books">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <CheckoutDialog 
          open={showCheckout} 
          onClose={() => setShowCheckout(false)}
          onComplete={handleCheckoutComplete}
          total={total * 1.08}
          items={items}
        />
      </div>
    </div>
  );
};

export default Cart;
