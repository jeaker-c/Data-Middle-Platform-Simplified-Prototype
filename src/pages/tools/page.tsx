import Navbar from '../home/components/Navbar';
import FileTools from '../home/components/FileTools';

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <div className="pt-24">
        <FileTools />
      </div>
    </div>
  );
}
