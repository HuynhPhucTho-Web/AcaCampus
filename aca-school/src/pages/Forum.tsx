import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import {
  MessageSquare,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Pin,
  Filter,
  User,
} from 'lucide-react';

export default function ForumPage() {
  const { forumPosts, addForumPost, likePost, user } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Toán học' });

  const categories = ['all', 'Toán học', 'Ngữ Văn', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Sinh học'];

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;
    
    addForumPost({
      id: Date.now().toString(),
      authorId: user?.id || 'user',
      authorName: user?.name || 'Bạn',
      authorAvatar: '',
      subject: newPost.category,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      replies: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isPinned: false,
    });
    
    setNewPost({ title: '', content: '', category: 'Toán học' });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">💭 Diễn Đàn Thảo Luận</h2>
        <p className="text-white/90">Chia sẻ kiến thức và học hỏi cùng bạn bè</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Tất cả môn' : cat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Đăng bài mới
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {post.isPinned && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-lg">
                      <Pin className="w-3 h-3" />
                      Ghim
                    </span>
                  )}
                  <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-lg">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-3">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{post.authorName}</span>
                    <span className="text-sm text-gray-400">{post.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Không tìm thấy bài viết nào</p>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Đăng bài mới</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn môn học</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-purple-400 focus:outline-none"
                >
                  {categories.filter((c) => c !== 'all').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Nhập tiêu đề..."
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-purple-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Nhập nội dung..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-purple-400 focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCreatePost}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:shadow-lg transition-all"
              >
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
