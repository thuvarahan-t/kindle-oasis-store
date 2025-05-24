
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  rating: number;
  category: string;
}

interface BookCardProps {
  book: Book;
  showProgress?: boolean;
}

const BookCard = ({ book, showProgress = false }: BookCardProps) => {
  const { addToCart } = useCart();
  const { hasPurchased } = useAuth();
  const isPurchased = hasPurchased(book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      cover: book.cover
    });
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link to={`/books/${book.id}`} className="flex-1">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={book.cover} 
              alt={book.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            {book.price === 0 && (
              <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                FREE
              </span>
            )}
            {isPurchased && (
              <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                OWNED
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">{book.author}</p>
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
            </div>
            <p className="text-lg font-bold">
              {book.price === 0 ? 'Free' : `$${book.price.toFixed(2)}`}
            </p>
            {showProgress && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">60% complete</p>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        {isPurchased ? (
          <Button asChild className="w-full">
            <Link to={`/reader/${book.id}`}>Read Now</Link>
          </Button>
        ) : (
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            variant={book.price === 0 ? "default" : "outline"}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {book.price === 0 ? 'Get Free Book' : 'Add to Cart'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
