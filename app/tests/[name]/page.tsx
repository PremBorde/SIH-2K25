import { mockTests } from '@/lib/mockData';
import TestDetailClient from './ClientPage';

export function generateStaticParams() {
  return mockTests.map(t => ({ name: t.id }));
}

export default function TestDetailPage() {
  return <TestDetailClient />;
}
