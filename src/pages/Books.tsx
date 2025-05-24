
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BookCard from '@/components/books/BookCard';

// Mock data - in real app this would come from API
const allBooks = [
  {
    id: '1',
    title: 'The Digital Revolution',
    author: 'Jane Smith',
    price: 9.99,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    rating: 4.5,
    category: 'technology'
  },
  {
    id: '2',
    title: 'Modern Web Development',
    author: 'John Doe',
    price: 12.99,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    rating: 4.8,
    category: 'technology'
  },
  {
    id: '3',
    title: 'The Art of Leadership',
    author: 'Sarah Johnson',
    price: 8.99,
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    rating: 4.3,
    category: 'business'
  },
  {
    id: '4',
    title: 'Science Fiction Tales',
    author: 'Mike Chen',
    price: 0,
    cover: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?w=300&h=400&fit=crop',
    rating: 4.6,
    category: 'fiction'
  },
  {
    id: '5',
    title: 'History of Computing',
    author: 'Alice Brown',
    price: 0,
    cover: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop',
    rating: 4.2,
    category: 'technology'
  },
  {
    id: '6',
    title: 'Marketing Psychology',
    author: 'Robert Wilson',
    price: 15.99,
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    rating: 4.7,
    category: 'business'
  }
];

const Books = () => {
  const [searchParams] = useSearchParams();
  const [filteredBooks, setFilteredBooks] = useState(allBooks);
  const [sortBy, setSortBy] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');

  const category = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');

  useEffect(() => {
    let filtered = [...allBooks];

    // Filter by category
    if (category && category !== 'all') {
      if (category === 'free') {
        filtered = filtered.filter(book => book.price === 0);
      } else if (category === 'bestsellers') {
        filtered = filtered.filter(book => book.rating >= 4.5);
      } else {
        filtered = filtered.filter(book => book.category === category);
      }
    }

    // Filter by search query
    const query = searchFromUrl || searchQuery;
    if (query) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'author':
          return a.author.localeCompare(b.author);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredBooks(filtered);
  }, [category, searchFromUrl, searchQuery, sortBy]);

  const getCategoryTitle = () => {
    if (category === 'free') return 'Free Books';
    if (category === 'bestsellers') return 'Bestsellers';
    if (category === 'fiction') return 'Fiction';
    if (category === 'non-fiction') return 'Non-Fiction';
    if (category === 'technology') return 'Technology';
    if (category === 'business') return 'Business';
    return 'All Books';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getCategoryTitle()}</h1>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="author">Author A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-gray-600">{filteredBooks.length} books found</p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
