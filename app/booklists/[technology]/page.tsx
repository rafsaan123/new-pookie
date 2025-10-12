import { BooklistService, TechnologyBooklist } from '../../../services/booklistService';
import TechnologyBooklistClient from './TechnologyBooklistClient';

interface TechnologyBooklistPageProps {
  params: {
    technology: string;
  };
}

export default function TechnologyBooklistPage({ params }: TechnologyBooklistPageProps) {
  const technologySlug = params.technology;
  
  // Get data on server side
  const result = BooklistService.getTechnologyBooklist(technologySlug);
  const booklistData = result.data || null;
  const error = result.error || '';

  return <TechnologyBooklistClient initialData={booklistData} initialError={error} technologySlug={technologySlug} />;
}