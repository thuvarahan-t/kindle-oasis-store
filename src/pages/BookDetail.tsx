
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Book Detail Page</h1>
        <p>Viewing book with ID: {id}</p>
        <p className="text-gray-600 mt-4">This page will show detailed book information, reviews, and purchase options.</p>
      </div>
    </div>
  );
};

export default BookDetail;
