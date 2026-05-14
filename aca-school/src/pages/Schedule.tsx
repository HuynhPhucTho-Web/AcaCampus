import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const DAYS = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
const DAY_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_JA = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
const DAY_ZH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const DAY_KO = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const DAY_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const DAY_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DAY_DE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

const SUBJECT_COLORS: Record<string, string> = {
  'Toán': 'from-blue-500 to-blue-600',
  'Văn': 'from-purple-500 to-purple-600',
  'Anh': 'from-green-500 to-green-600',
  'Lý': 'from-orange-500 to-orange-600',
  'Hóa': 'from-red-500 to-red-600',
  'Sinh': 'from-teal-500 to-teal-600',
  'Sử': 'from-yellow-500 to-yellow-600',
  'Địa': 'from-pink-500 to-pink-600',
  'GDCD': 'from-indigo-500 to-indigo-600',
  'Thể dục': 'from-cyan-500 to-cyan-600',
  'Tin học': 'from-violet-500 to-violet-600',
};

const LABELS = {
  vi: {
    title: 'Thời khóa biểu',
    subtitle: 'Lịch học tuần này',
    period: 'Tiết',
    room: 'Phòng',
    teacher: 'Giáo viên',
    noClass: 'Không có tiết học',
  },
  en: {
    title: 'Weekly Schedule',
    subtitle: 'This week\'s class schedule',
    period: 'Period',
    room: 'Room',
    teacher: 'Teacher',
    noClass: 'No class',
  },
  ja: {
    title: '週間スケジュール',
    subtitle: '今週の時間割',
    period: '時限',
    room: '教室',
    teacher: '先生',
    noClass: '授業なし',
  },
  zh: {
    title: '周课程表',
    subtitle: '本周课程安排',
    period: '节',
    room: '教室',
    teacher: '老师',
    noClass: '无课',
  },
  ko: {
    title: '주간 일정',
    subtitle: '이번 주 수업 시간표',
    period: '교시',
    room: '교실',
    teacher: '선생님',
    noClass: '수업 없음',
  },
  fr: {
    title: 'Emploi du temps',
    subtitle: 'Emploi du temps de cette semaine',
    period: 'Cours',
    room: 'Salle',
    teacher: 'Professeur',
    noClass: 'Pas de cours',
  },
  es: {
    title: 'Horario semanal',
    subtitle: 'Horario de clases de esta semana',
    period: 'Hora',
    room: 'Aula',
    teacher: 'Profesor',
    noClass: 'Sin clase',
  },
  de: {
    title: 'Wochenplan',
    subtitle: 'Der Unterrichtsplan dieser Woche',
    period: 'Stunde',
    room: 'Raum',
    teacher: 'Lehrer',
    noClass: 'Kein Unterricht',
  },
};

export default function Schedule() {
  const { classSchedules, theme, language } = useAppStore();
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const getDayLabel = (index: number) => {
    const labels: Record<string, string[]> = {
      vi: DAY_EN,
      en: DAY_EN,
      ja: DAY_JA,
      zh: DAY_ZH,
      ko: DAY_KO,
      fr: DAY_FR,
      es: DAY_ES,
      de: DAY_DE,
    };
    return labels[language]?.[index] || DAY_EN[index];
  };

  const t = LABELS[language] || LABELS.vi;

  const getScheduleForDay = (dayIndex: number) => {
    return classSchedules.filter((s) => s.dayOfWeek === dayIndex).sort((a, b) => a.period - b.period);
  };

  const selectedDaySchedule = getScheduleForDay(selectedDay);

  const navigateDay = (direction: number) => {
    setSelectedDay((prev) => {
      const next = prev + direction;
      if (next > 6) return 0;
      if (next < 0) return 6;
      return next;
    });
  };

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} flex items-center gap-3`}>
          <Calendar className="w-8 h-8 text-purple-500" />
          {t.title}
        </h1>
        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.subtitle}</p>
      </div>
      

      {/* Day Selector */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateDay(-1)}
          className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white shadow-lg hover:shadow-xl'} transition-all duration-200`}
        >
          <ChevronLeft className={theme === 'dark' ? 'text-white' : 'text-gray-600'} />
        </button>
        
        <div className="flex gap-2">
          {DAYS.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                selectedDay === index
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-purple-50'
              }`}
            >
              {getDayLabel(index)}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigateDay(1)}
          className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white shadow-lg hover:shadow-xl'} transition-all duration-200`}
        >
          <ChevronRight className={theme === 'dark' ? 'text-white' : 'text-gray-600'} />
        </button>
      </div>

      {/* Schedule Grid */}
      <div className={`rounded-3xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
        <div className="grid grid-cols-7 gap-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500">
          {DAYS.map((_, index) => (
            <div
              key={index}
              className="text-center text-white font-semibold py-2"
            >
              {getDayLabel(index)}
            </div>
          ))}
        </div>

        <div className="p-6">
          {/* Periods */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((period) => {
              const classItem = selectedDaySchedule.find((s) => s.period === period);
              const colorClass = classItem ? SUBJECT_COLORS[classItem.subject] || 'from-gray-500 to-gray-600' : 'from-gray-200 to-gray-300';
              
              return (
                <div
                  key={period}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                    classItem
                      ? theme === 'dark'
                        ? 'bg-gray-700'
                        : 'bg-gradient-to-r ' + colorClass + ' text-white shadow-lg'
                      : theme === 'dark'
                      ? 'bg-gray-700/50'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl ${
                    classItem ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    <Clock className="w-6 h-6" />
                    <span className="ml-1">{period}</span>
                  </div>
                  
                  {classItem ? (
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        <span className="font-bold text-lg">{classItem.subject}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 opacity-90">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {classItem.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {classItem.teacher}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.noClass}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className={`mt-6 p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Môn học / Subjects</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(SUBJECT_COLORS).map((subject) => (
            <span
              key={subject}
              className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${SUBJECT_COLORS[subject]}`}
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
