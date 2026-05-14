// Language and Theme types
export type Language = 'vi' | 'en' | 'ja' | 'zh' | 'ko' | 'fr' | 'es' | 'de';
export type Theme = 'light' | 'dark';

// User types
export type UserRole = 'student' | 'teacher' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  classId?: string;
  studentId?: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'event';
  date: string;
  author: string;
  isRead: boolean;
}

// Grade types
export interface Grade {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  type: 'midterm' | 'final' | 'homework' | 'quiz';
  date: string;
  semester: string;
}

// Schedule types
export interface ClassSchedule {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  period: number; // 1-7
  subject: string;
  room: string;
  teacher?: string;
}

export interface ExamSchedule {
  id: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  semester: string;
}

// Leave Request types
export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedBy?: string;
  notes?: string;
}

// Message types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

// Forum types
export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  subject: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  replies: number;
  createdAt: string;
  isPinned: boolean;
}

// Study path types
export interface StudyPath {
  id: string;
  subject: string;
  currentLevel: number;
  targetLevel: number;
  recommendations: string[];
  progress: number;
}

// Document types
export interface Document {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'pdf' | 'video' | 'image' | 'doc';
  url: string;
  uploadDate: string;
  author: string;
  downloads: number;
}

// Sticker types
export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  category: string;
  isUnlocked: boolean;
}

// Quiz types
export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeSpent: number;
}

export interface Leaderboard {
  rank: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  className: string;
  totalPoints: number;
}

// AI Assistant types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
