import Navbar from '../home/components/Navbar';
import StatsOverview from '../home/components/StatsOverview';

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <div className="pt-24">
        <StatsOverview />
      </div>
    </div>
  );
}
