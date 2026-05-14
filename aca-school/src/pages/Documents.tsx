import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import {
  FolderOpen,
  Search,
  Filter,
  Download,
  FileText,
  Video,
  Image,
  File,
  Eye,
} from 'lucide-react';

export default function Documents() {
  const { documents } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', 'Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh'];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesSubject = selectedSubject === 'all' || doc.subject === selectedSubject;
    return matchesSearch && matchesType && matchesSubject;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'video': return <Video className="w-6 h-6 text-purple-500" />;
      case 'image': return <Image className="w-6 h-6 text-blue-500" />;
      case 'doc': return <File className="w-6 h-6 text-orange-500" />;
      default: return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100';
      case 'video': return 'bg-purple-100';
      case 'image': return 'bg-blue-100';
      case 'doc': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">📚 Kho Tài Liệu Học Tập</h2>
        <p className="text-white/90">Tải xuống bài giảng, tài liệu và video bài học</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm tài liệu..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="all">Tất cả loại</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="image">Hình ảnh</option>
            <option value="doc">Tài liệu</option>
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-3 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="all">Tất cả môn</option>
            {subjects.filter(s => s !== 'all').map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl ${getTypeColor(doc.type)} flex items-center justify-center`}>
                {getTypeIcon(doc.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{doc.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{doc.description}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-teal-100 text-teal-600 text-xs rounded-lg">
                    {doc.subject}
                  </span>
                  <span className="text-xs text-gray-400">{doc.uploadDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Download className="w-4 h-4" />
                <span>{doc.downloads}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-teal-500 rounded-xl hover:bg-teal-600 transition-colors">
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Không tìm thấy tài liệu nào</p>
        </div>
      )}
    </div>
  );
}
