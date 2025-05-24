
import { useParams } from 'react-router-dom';

const Reader = () => {
  const { bookId } = useParams();
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">PDF Reader</h1>
        <p>Reading book ID: {bookId}</p>
        <p className="text-gray-600 mt-4">The PDF reader interface will be implemented here with proper content protection.</p>
      </div>
    </div>
  );
};

export default Reader;
