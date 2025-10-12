import { BooklistService, BooklistItem } from '../../services/booklistService';
import BooklistsClient from './BooklistsClient';

export default function BooklistsPage() {
  // Get data on server side
  const result = BooklistService.getBooklistData();
  const booklistData = result.data?.technologies || [];
  const error = result.error || '';

  return <BooklistsClient initialData={booklistData} initialError={error} />;
}