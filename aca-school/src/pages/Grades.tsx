import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Filter,
  Download,
  Star,
} from 'lucide-react';

export default function Grades() {
  const { grades, examSchedules } = useAppStore();
  const [activeTab, setActiveTab] = useState<'scores' | 'exams'>('scores');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  const subjects = [...new Set(grades.map((g) => g.subject))];
  const filteredGrades = subjectFilter === 'all' 
    ? grades 
    : grades.filter((g) => g.subject === subjectFilter);

  const averageScore = filteredGrades.reduce((acc, g) => acc + g.score, 0) / filteredGrades.length;
  
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-500';
    if (score >= 7) return 'text-blue-500';
    if (score >= 5) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 9) return 'from-green-400 to-emerald-500';
    if (score >= 7) return 'from-blue-400 to-cyan-500';
    if (score >= 5) return 'from-orange-400 to-amber-500';
    return 'from-red-400 to-pink-500';
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'midterm': return 'Giữa kỳ';
      case 'final': return 'Cuối kỳ';
      case 'homework': return 'Bài tập';
      case 'quiz': return 'Quiz';
      default: return type;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">📊 Sổ Liên Lạc Điện Tử</h2>
        <p className="text-white/90">Theo dõi điểm số và lịch thi của bạn</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Điểm TB</span>
          </div>
          <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>
            {averageScore.toFixed(1)}
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Số môn</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{subjects.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Số bài thi</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{examSchedules.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('scores')}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium transition-colors ${
              activeTab === 'scores'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Điểm số
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium transition-colors ${
              activeTab === 'exams'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Lịch thi
          </button>
        </div>

        {/* Scores Tab */}
        {activeTab === 'scores' && (
          <div className="p-6">
            {/* Filter */}
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-gray-100 focus:border-purple-400 focus:outline-none"
              >
                <option value="all">Tất cả môn</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <button className="ml-auto px-4 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Tải xuống
              </button>
            </div>

            {/* Grades List */}
            <div className="space-y-4">
              {filteredGrades.map((grade) => (
                <div
                  key={grade.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:shadow-md transition-shadow"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getScoreBg(grade.score)} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{grade.score}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{grade.subject}</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-lg">
                        {getTypeLabel(grade.type)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{grade.semester}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getScoreColor(grade.score)}`}>
                      {grade.score}/{grade.maxScore}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {grade.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exams Tab */}
        {activeTab === 'exams' && (
          <div className="p-6">
            <div className="space-y-4">
              {examSchedules.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-purple-500 rounded-2xl flex flex-col items-center justify-center text-white">
                    <span className="text-xs font-medium">{exam.date.split('-')[1]}</span>
                    <span className="text-lg font-bold">{exam.date.split('-')[2]}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{exam.subject}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {exam.time}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {exam.room}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium">
                      {exam.semester}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
