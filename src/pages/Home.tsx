
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BookCard from '@/components/books/BookCard';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for demonstration
const featuredBooks = [
  {
    id: '1',
    title: 'The Digital Revolution',
    author: 'Jane Smith',
    price: 9.99,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    rating: 4.5,
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Modern Web Development',
    author: 'John Doe',
    price: 12.99,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    rating: 4.8,
    category: 'Programming'
  },
  {
    id: '3',
    title: 'The Art of Leadership',
    author: 'Sarah Johnson',
    price: 8.99,
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    rating: 4.3,
    category: 'Business'
  },
  {
    id: '4',
    title: 'Science Fiction Tales',
    author: 'Mike Chen',
    price: 0,
    cover: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?w=300&h=400&fit=crop',
    rating: 4.6,
    category: 'Fiction'
  }
];

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Explore thousands of digital books across every genre. Start reading instantly on any device.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/books">Browse Books</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/books?category=free">Free Books</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Books</h2>
            <p className="text-lg text-gray-600">Handpicked selections from our editors</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/books">View All Books</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Fiction', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop', path: '/books?category=fiction' },
              { name: 'Non-Fiction', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop', path: '/books?category=non-fiction' },
              { name: 'Technology', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', path: '/books?category=technology' },
              { name: 'Business', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop', path: '/books?category=business' }
            ].map((category) => (
              <Link key={category.name} to={category.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-center">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Read Section (for authenticated users) */}
      {isAuthenticated && user?.purchasedBooks && user.purchasedBooks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Continue Reading</h2>
              <Button variant="outline" asChild>
                <Link to="/dashboard">View Library</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks
                .filter(book => user.purchasedBooks.includes(book.id))
                .map((book) => (
                  <BookCard key={book.id} book={book} showProgress={true} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Free Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Books</h2>
            <p className="text-lg text-gray-600">Explore our collection of free digital books</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.filter(book => book.price === 0).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/books?category=free">View All Free Books</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
