import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  Notification, 
  Grade, 
  ExamSchedule, 
  Message, 
  Conversation,
  ForumPost,
  StudyPath,
  Document,
  Sticker,
  QuizResult,
  Leaderboard,
  ChatMessage,
  Language,
  Theme,
  ClassSchedule,
  LeaveRequest
} from '../stypes';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  
  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  addNotification: (notification: Notification) => void;
  
  // Grades
  grades: Grade[];
  addGrade: (grade: Grade) => void;
  
  // Exam Schedule
  examSchedules: ExamSchedule[];
  addExamSchedule: (exam: ExamSchedule) => void;
  
  // Messages
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  addMessage: (conversationId: string, message: Message) => void;
  markConversationRead: (id: string) => void;
  
  // Forum
  forumPosts: ForumPost[];
  addForumPost: (post: ForumPost) => void;
  likePost: (postId: string) => void;
  
  // Study Path
  studyPaths: StudyPath[];
  updateStudyPath: (path: StudyPath) => void;
  
  // Documents
  documents: Document[];
  addDocument: (doc: Document) => void;
  
  // Stickers
  stickers: Sticker[];
  unlockedStickers: string[];
  unlockSticker: (stickerId: string) => void;
  
  // Quiz
  quizResults: QuizResult[];
  addQuizResult: (result: QuizResult) => void;
  
  // Leaderboard
  leaderboard: Leaderboard[];
  
  // AI Assistant
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  
  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  
  // Theme & Language
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  
  // Class Schedule
  classSchedules: ClassSchedule[];
  addClassSchedule: (schedule: ClassSchedule) => void;
  
  // Leave Requests
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (request: LeaveRequest) => void;
  updateLeaveRequest: (id: string, status: 'pending' | 'approved' | 'rejected', notes?: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Notifications - Mock data
      notifications: [
        {
          id: '1',
          title: 'Thông báo nghỉ lễ',
          content: 'Trường nghỉ lễ Giáng sinh từ 24/12 đến 26/12',
          type: 'info',
          date: '2024-12-20',
          author: 'Ban giám hiệu',
          isRead: false,
        },
        {
          id: '2',
          title: 'Lịch thi học kỳ',
          content: 'Lịch thi học kỳ I đã được công bố. Vui lòng kiểm tra sổ liên lạc.',
          type: 'warning',
          date: '2024-12-18',
          author: 'Phòng đào tạo',
          isRead: false,
        },
        {
          id: '3',
          title: 'Hoạt động ngoại khóa',
          content: 'Tham gia cuộc thi Olympic Toán cấp trường ngày 15/01',
          type: 'event',
          date: '2024-12-15',
          author: 'CLB Toán học',
          isRead: true,
        },
        {
          id: '4',
          title: 'Kết quả học tập tháng 11',
          content: 'Kết quả học tập tháng 11 đã được cập nhật',
          type: 'success',
          date: '2024-12-01',
          author: 'Giáo viên chủ nhiệm',
          isRead: true,
        },
      ],
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
      })),
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
      })),
      
      // Grades - Mock data
      grades: [
        { id: '1', subject: 'Toán', score: 8.5, maxScore: 10, type: 'midterm', date: '2024-12-10', semester: 'Học kỳ I' },
        { id: '2', subject: 'Văn', score: 7.5, maxScore: 10, type: 'midterm', date: '2024-12-08', semester: 'Học kỳ I' },
        { id: '3', subject: 'Anh', score: 9.0, maxScore: 10, type: 'quiz', date: '2024-12-05', semester: 'Học kỳ I' },
        { id: '4', subject: 'Lý', score: 8.0, maxScore: 10, type: 'homework', date: '2024-12-03', semester: 'Học kỳ I' },
        { id: '5', subject: 'Hóa', score: 7.0, maxScore: 10, type: 'quiz', date: '2024-12-01', semester: 'Học kỳ I' },
        { id: '6', subject: 'Sinh', score: 8.5, maxScore: 10, type: 'midterm', date: '2024-11-28', semester: 'Học kỳ I' },
      ],
      addGrade: (grade) => set((state) => ({
        grades: [...state.grades, grade],
      })),
      
      // Exam Schedule - Mock data
      examSchedules: [
        { id: '1', subject: 'Toán', date: '2025-01-10', time: '08:00 - 10:00', room: 'Phòng 101', semester: 'Học kỳ I' },
        { id: '2', subject: 'Văn', date: '2025-01-11', time: '08:00 - 10:30', room: 'Phòng 102', semester: 'Học kỳ I' },
        { id: '3', subject: 'Anh', date: '2025-01-12', time: '10:00 - 11:30', room: 'Phòng 103', semester: 'Học kỳ I' },
        { id: '4', subject: 'Lý', date: '2025-01-13', time: '14:00 - 15:30', room: 'Phòng 201', semester: 'Học kỳ I' },
        { id: '5', subject: 'Hóa', date: '2025-01-14', time: '14:00 - 15:30', room: 'Phòng 202', semester: 'Học kỳ I' },
      ],
      addExamSchedule: (exam) => set((state) => ({
        examSchedules: [...state.examSchedules, exam],
      })),
      
      // Messages - Mock data
      conversations: [
        {
          id: '1',
          participantId: 'teacher1',
          participantName: 'Cô Mai - Giáo viên chủ nhiệm',
          participantAvatar: '',
          lastMessage: 'Con có câu hỏi gì không?',
          lastMessageTime: '10:30',
          unreadCount: 2,
        },
        {
          id: '2',
          participantId: 'parent1',
          participantName: 'Mẹ - Nguyễn Thị Hồng',
          participantAvatar: '',
          lastMessage: 'Chiều nay mẹ đến đón con nhé!',
          lastMessageTime: '09:15',
          unreadCount: 0,
        },
        {
          id: '3',
          participantId: 'teacher2',
          participantName: 'Thầy Long - Giáo viên Toán',
          participantAvatar: '',
          lastMessage: 'Bài tập về nhà là trang 45-46',
          lastMessageTime: 'Hôm qua',
          unreadCount: 1,
        },
      ],
      messages: {
        '1': [
          { id: '1', senderId: 'teacher1', senderName: 'Cô Mai', receiverId: 'student1', content: 'Chào em! Cô muốn nhắn về việc học nhóm cuối tuần.', timestamp: '10:00', isRead: true },
          { id: '2', senderId: 'student1', senderName: 'Em', receiverId: 'teacher1', content: 'Dạ cô! Em sẽ tham gia ạ.', timestamp: '10:15', isRead: true },
          { id: '3', senderId: 'teacher1', senderName: 'Cô Mai', receiverId: 'student1', content: 'Tốt lắm! Đừng quên chuẩn bị bài trước nhé.', timestamp: '10:30', isRead: false },
        ],
        '2': [
          { id: '1', senderId: 'student1', senderName: 'Con', receiverId: 'parent1', content: 'Mẹ ơi, con muốn mua một cuốn sách.', timestamp: '08:00', isRead: true },
          { id: '2', senderId: 'parent1', senderName: 'Mẹ', receiverId: 'student1', content: 'Con muốn mua sách gì? Mẹ sẽ chuyển tiền.', timestamp: '08:30', isRead: true },
          { id: '3', senderId: 'student1', senderName: 'Con', receiverId: 'parent1', content: 'Con muốn mua sách Toán nâng cao ạ.', timestamp: '09:00', isRead: true },
        ],
        '3': [
          { id: '1', senderId: 'teacher2', senderName: 'Thầy Long', receiverId: 'student1', content: 'Bài tập về nhà là trang 45-46', timestamp: 'Hôm qua', isRead: false },
        ],
      },
      addMessage: (conversationId, message) => set((state) => {
        const messages = state.messages[conversationId] || [];
        return {
          messages: {
            ...state.messages,
            [conversationId]: [...messages, message],
          },
        };
      }),
      markConversationRead: (id) => set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, unreadCount: 0 } : c
        ),
      })),
      
      // Forum - Mock data
      forumPosts: [
        {
          id: '1',
          authorId: 'student2',
          authorName: 'Nguyễn Văn A',
          authorAvatar: '',
          subject: 'Toán',
          title: 'Cách giải phương trình bậc 2 nhanh nhất?',
          content: 'Mọi người có thể chia sẻ cách giải phương trình bậc 2 nhanh không?',
          category: 'Toán học',
          likes: 15,
          replies: 8,
          createdAt: '2024-12-18',
          isPinned: true,
        },
        {
          id: '2',
          authorId: 'student3',
          authorName: 'Trần Thị B',
          authorAvatar: '',
          subject: 'Văn',
          title: 'Hướng dẫn viết mở bài nghị luận xã hội',
          content: 'Mình chia sẻ cách viết mở bài nghị luận xã hội hiệu quả...',
          category: 'Ngữ Văn',
          likes: 22,
          replies: 12,
          createdAt: '2024-12-17',
          isPinned: false,
        },
        {
          id: '3',
          authorId: 'student4',
          authorName: 'Lê Văn C',
          authorAvatar: '',
          subject: 'Anh',
          title: 'Từ vựng TOEIC thường gặp',
          content: 'Dưới đây là danh sách từ vựng TOEIC thường xuất hiện trong đề thi...',
          category: 'Tiếng Anh',
          likes: 30,
          replies: 18,
          createdAt: '2024-12-16',
          isPinned: false,
        },
        {
          id: '4',
          authorId: 'teacher3',
          authorName: 'Cô Hương',
          authorAvatar: '',
          subject: 'Lý',
          title: 'Ôn tập Vật lý học kỳ I',
          content: 'Các em chú ý: Chương trình ôn tập học kỳ I bao gồm...',
          category: 'Vật lý',
          likes: 45,
          replies: 25,
          createdAt: '2024-12-15',
          isPinned: true,
        },
      ],
      addForumPost: (post) => set((state) => ({
        forumPosts: [post, ...state.forumPosts],
      })),
      likePost: (postId) => set((state) => ({
        forumPosts: state.forumPosts.map((p) =>
          p.id === postId ? { ...p, likes: p.likes + 1 } : p
        ),
      })),
      
      // Study Path - Mock data
      studyPaths: [
        { id: '1', subject: 'Toán', currentLevel: 3, targetLevel: 5, recommendations: ['Ôn tập đại số', 'Luyện giải bài tập nâng cao'], progress: 60 },
        { id: '2', subject: 'Văn', currentLevel: 4, targetLevel: 5, recommendations: ['Đọc thêm văn học', 'Luyện viết luận'], progress: 80 },
        { id: '3', subject: 'Anh', currentLevel: 2, targetLevel: 4, recommendations: ['Học từ vựng mới', 'Luyện nghe'], progress: 40 },
        { id: '4', subject: 'Lý', currentLevel: 3, targetLevel: 4, recommendations: ['Ôn tập cơ học', 'Làm thí nghiệm'], progress: 55 },
      ],
      updateStudyPath: (path) => set((state) => ({
        studyPaths: state.studyPaths.map((p) =>
          p.id === path.id ? path : p
        ),
      })),
      
      // Documents - Mock data
      documents: [
        { id: '1', title: 'Bài giảng Toán - Chương 1', description: 'Đại số tuyến tính', subject: 'Toán', type: 'pdf', url: '#', uploadDate: '2024-12-15', author: 'Thầy Long', downloads: 120 },
        { id: '2', title: 'Video bài giảng Văn - Văn học hiện đại', description: 'Phân tích tác phẩm', subject: 'Văn', type: 'video', url: '#', uploadDate: '2024-12-14', author: 'Cô Mai', downloads: 85 },
        { id: '3', title: 'Tài liệu ôn thi Anh - Từ vựng', description: '1000 từ vựng thường gặp', subject: 'Anh', type: 'pdf', url: '#', uploadDate: '2024-12-13', author: 'Cô Hà', downloads: 200 },
        { id: '4', title: 'Bài tập Lý - Cơ học', description: 'Bài tập trắc nghiệm', subject: 'Lý', type: 'doc', url: '#', uploadDate: '2024-12-12', author: 'Thầy Minh', downloads: 95 },
        { id: '5', title: 'Sơ đồ Hóa - Bảng tuần hoàn', description: 'Hình ảnh minh họa', subject: 'Hóa', type: 'image', url: '#', uploadDate: '2024-12-11', author: 'Cô Lan', downloads: 150 },
        { id: '6', title: 'Video thí nghiệm Sinh', description: 'Thực hành Sinh học', subject: 'Sinh', type: 'video', url: '#', uploadDate: '2024-12-10', author: 'Thầy Hùng', downloads: 75 },
      ],
      addDocument: (doc) => set((state) => ({
        documents: [...state.documents, doc],
      })),
      
      // Stickers - Mock data
      stickers: [
        { id: '1', name: 'Star', emoji: '⭐', category: 'Achievement', isUnlocked: true },
        { id: '2', name: 'Heart', emoji: '❤️', category: 'Love', isUnlocked: true },
        { id: '3', name: 'Fire', emoji: '🔥', category: 'Cool', isUnlocked: true },
        { id: '4', name: 'Rocket', emoji: '🚀', category: 'Achievement', isUnlocked: false },
        { id: '5', name: 'Trophy', emoji: '🏆', category: 'Achievement', isUnlocked: false },
        { id: '6', name: 'Rainbow', emoji: '🌈', category: 'Cool', isUnlocked: false },
        { id: '7', name: 'Cat', emoji: '🐱', category: 'Cute', isUnlocked: true },
        { id: '8', name: 'Dog', emoji: '🐶', category: 'Cute', isUnlocked: false },
        { id: '9', name: 'Panda', emoji: '🐼', category: 'Cute', isUnlocked: false },
        { id: '10', name: 'Unicorn', emoji: '🦄', category: 'Magic', isUnlocked: false },
        { id: '11', name: 'Lightning', emoji: '⚡', category: 'Cool', isUnlocked: false },
        { id: '12', name: 'Flower', emoji: '🌸', category: 'Nature', isUnlocked: true },
      ],
      unlockedStickers: ['1', '2', '3', '7', '12'],
      unlockSticker: (stickerId) => set((state) => ({
        unlockedStickers: [...state.unlockedStickers, stickerId],
      })),
      
      // Quiz Results - Mock data
      quizResults: [
        { quizId: '1', score: 8, totalQuestions: 10, completedAt: '2024-12-18', timeSpent: 300 },
        { quizId: '2', score: 9, totalQuestions: 10, completedAt: '2024-12-16', timeSpent: 280 },
        { quizId: '3', score: 7, totalQuestions: 10, completedAt: '2024-12-14', timeSpent: 350 },
      ],
      addQuizResult: (result) => set((state) => ({
        quizResults: [...state.quizResults, result],
      })),
      
      // Leaderboard - Mock data
      leaderboard: [
        { rank: 1, userId: 's1', userName: 'Nguyễn Văn A', className: 'Lớp 10A1', totalPoints: 2500 },
        { rank: 2, userId: 's2', userName: 'Trần Thị B', className: 'Lớp 10A1', totalPoints: 2350 },
        { rank: 3, userId: 's3', userName: 'Lê Văn C', className: 'Lớp 10A2', totalPoints: 2200 },
        { rank: 4, userId: 's4', userName: 'Phạm Thị D', className: 'Lớp 10A1', totalPoints: 2100 },
        { rank: 5, userId: 's5', userName: 'Hoàng Văn E', className: 'Lớp 10A3', totalPoints: 1950 },
        { rank: 6, userId: 's6', userName: 'Ngô Thị F', className: 'Lớp 10A2', totalPoints: 1800 },
        { rank: 7, userId: 's7', userName: 'Đặng Văn G', className: 'Lớp 10A3', totalPoints: 1700 },
        { rank: 8, userId: 's8', userName: 'Vũ Thị H', className: 'Lớp 10A1', totalPoints: 1650 },
      ],
      
      // AI Chat - Mock data
      chatMessages: [
        { id: '1', role: 'assistant', content: 'Xin chào! Tôi là trợ lý học tập thông minh của trường. Bạn cần hỗ trợ gì?', timestamp: new Date().toISOString() },
      ],
      addChatMessage: (message) => set((state) => ({
        chatMessages: [...state.chatMessages, message],
      })),
      clearChat: () => set((state) => ({
        chatMessages: [state.chatMessages[0]],
      })),
      
      // UI State
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      currentPage: 'dashboard',
      setCurrentPage: (page) => set({ currentPage: page }),
      
      // Theme & Language
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      language: 'vi',
      setLanguage: (language) => set({ language }),
      
      // Class Schedule - Mock data
      classSchedules: [
        { id: '1', dayOfWeek: 1, period: 1, subject: 'Toán', room: 'Phòng 101', teacher: 'Thầy Long' },
        { id: '2', dayOfWeek: 1, period: 2, subject: 'Văn', room: 'Phòng 102', teacher: 'Cô Mai' },
        { id: '3', dayOfWeek: 1, period: 3, subject: 'Anh', room: 'Phòng 103', teacher: 'Cô Hà' },
        { id: '4', dayOfWeek: 1, period: 4, subject: 'Lý', room: 'Phòng 201', teacher: 'Thầy Hùng' },
        { id: '5', dayOfWeek: 1, period: 5, subject: 'Hóa', room: 'Phòng 202', teacher: 'Cô Lan' },
        { id: '6', dayOfWeek: 2, period: 1, subject: 'Văn', room: 'Phòng 102', teacher: 'Cô Mai' },
        { id: '7', dayOfWeek: 2, period: 2, subject: 'Toán', room: 'Phòng 101', teacher: 'Thầy Long' },
        { id: '8', dayOfWeek: 2, period: 3, subject: 'Sinh', room: 'Phòng 301', teacher: 'Cô Thảo' },
        { id: '9', dayOfWeek: 2, period: 4, subject: 'Anh', room: 'Phòng 103', teacher: 'Cô Hà' },
        { id: '10', dayOfWeek: 2, period: 5, subject: 'Sử', room: 'Phòng 104', teacher: 'Thầy Bình' },
        { id: '11', dayOfWeek: 3, period: 1, subject: 'Lý', room: 'Phòng 201', teacher: 'Thầy Hùng' },
        { id: '12', dayOfWeek: 3, period: 2, subject: 'Toán', room: 'Phòng 101', teacher: 'Thầy Long' },
        { id: '13', dayOfWeek: 3, period: 3, subject: 'Hóa', room: 'Phòng 202', teacher: 'Cô Lan' },
        { id: '14', dayOfWeek: 3, period: 4, subject: 'Văn', room: 'Phòng 102', teacher: 'Cô Mai' },
        { id: '15', dayOfWeek: 3, period: 5, subject: 'GDCD', room: 'Phòng 105', teacher: 'Cô Hương' },
        { id: '16', dayOfWeek: 4, period: 1, subject: 'Anh', room: 'Phòng 103', teacher: 'Cô Hà' },
        { id: '17', dayOfWeek: 4, period: 2, subject: 'Toán', room: 'Phòng 101', teacher: 'Thầy Long' },
        { id: '18', dayOfWeek: 4, period: 3, subject: 'Sinh', room: 'Phòng 301', teacher: 'Cô Thảo' },
        { id: '19', dayOfWeek: 4, period: 4, subject: 'Văn', room: 'Phòng 102', teacher: 'Cô Mai' },
        { id: '20', dayOfWeek: 4, period: 5, subject: 'Thể dục', room: 'Sân thể chất', teacher: 'Thầy Nam' },
        { id: '21', dayOfWeek: 5, period: 1, subject: 'Hóa', room: 'Phòng 202', teacher: 'Cô Lan' },
        { id: '22', dayOfWeek: 5, period: 2, subject: 'Lý', room: 'Phòng 201', teacher: 'Thầy Hùng' },
        { id: '23', dayOfWeek: 5, period: 3, subject: 'Toán', room: 'Phòng 101', teacher: 'Thầy Long' },
        { id: '24', dayOfWeek: 5, period: 4, subject: 'Anh', room: 'Phòng 103', teacher: 'Cô Hà' },
        { id: '25', dayOfWeek: 5, period: 5, subject: 'Tin học', room: 'Phòng máy', teacher: 'Thầy Tuấn' },
      ],
      addClassSchedule: (schedule) => set((state) => ({
        classSchedules: [...state.classSchedules, schedule],
      })),
      
      // Leave Requests - Mock data
      leaveRequests: [
        { id: '1', studentId: 'student1', studentName: 'Nguyễn Văn A', classId: '10A1', reason: 'Ốm', startDate: '2024-12-20', endDate: '2024-12-21', status: 'approved', createdAt: '2024-12-19', approvedBy: 'Cô Mai' },
        { id: '2', studentId: 'student2', studentName: 'Trần Thị B', classId: '10A1', reason: 'Khám bệnh', startDate: '2024-12-22', endDate: '2024-12-22', status: 'pending', createdAt: '2024-12-20' },
      ],
      addLeaveRequest: (request) => set((state) => ({
        leaveRequests: [...state.leaveRequests, request],
      })),
      updateLeaveRequest: (id, status, notes) => set((state) => ({
        leaveRequests: state.leaveRequests.map((r) =>
          r.id === id ? { ...r, status, notes } : r
        ),
      })),
    }),
    {
      name: 'school-app-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        unlockedStickers: state.unlockedStickers,
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
