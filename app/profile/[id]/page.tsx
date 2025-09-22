import { mockAthletes } from '@/lib/mockData';
import ProfileClientPage from './ClientPage';

export function generateStaticParams() {
  return mockAthletes.map(athlete => ({
    id: athlete.id,
  }));
}

export default function ProfilePage() {
  return <ProfileClientPage />;
}
