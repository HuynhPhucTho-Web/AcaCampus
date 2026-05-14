import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import { 
  Sticker, 
  Lock, 
  Unlock, 
  Sparkles,
  Trophy,
  Star,
  Heart,
} from 'lucide-react';

export default function Stickers() {
  const { stickers, unlockedStickers, unlockSticker } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Achievement', 'Love', 'Cool', 'Cute', 'Magic', 'Nature'];
  
  const filteredStickers = selectedCategory === 'all' 
    ? stickers 
    : stickers.filter((s) => s.category === selectedCategory);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'all': return 'Tất cả';
      case 'Achievement': return '🏆 Thành tích';
      case 'Love': return '❤️ Yêu thương';
      case 'Cool': return '🔥 Cool';
      case 'Cute': return '🐱 Dễ thương';
      case 'Magic': return '✨ Magic';
      case 'Nature': return '🌸 Thiên nhiên';
      default: return category;
    }
  };

  const handleUnlock = (stickerId: string) => {
    // Simulate unlocking (in real app, this would be based on achievements)
    unlockSticker(stickerId);
  };

  return ( 
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">✨ Bộ Sưu Tập Nhãn Dán</h2>
        <p className="text-white/90">Cá nhân hóa giao diện của bạn với những nhãn dán xinh xắn</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Sticker className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Tổng số</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stickers.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Unlock className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Đã mở khóa</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{unlockedStickers.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Chưa mở</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stickers.length - unlockedStickers.length}</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-2xl font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {filteredStickers.map((sticker) => {
          const isUnlocked = unlockedStickers.includes(sticker.id);
          return (
            <div
              key={sticker.id}
              className={`relative p-4 rounded-3xl transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg cursor-pointer'
                  : 'bg-gray-100'
              }`}
              onClick={() => !isUnlocked && handleUnlock(sticker.id)}
            >
              <div className={`text-4xl text-center ${!isUnlocked ? 'grayscale opacity-50' : ''}`}>
                {sticker.emoji}
              </div>
              <p className={`text-center text-sm mt-2 ${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                {sticker.name}
              </p>
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* How to Unlock */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Cách mở khóa nhãn dán
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-2xl">
            <Trophy className="w-8 h-8 text-purple-500 mb-2" />
            <h4 className="font-bold text-gray-800">Tham gia thi đua</h4>
            <p className="text-sm text-gray-600">Đạt thành cao trong các kỳ thi</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-2xl">
            <Star className="w-8 h-8 text-pink-500 mb-2" />
            <h4 className="font-bold text-gray-800">Hoàn thành bài tập</h4>
            <p className="text-sm text-gray-600">Làm đủ bài tập hàng ngày</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-2xl">
            <Heart className="w-8 h-8 text-orange-500 mb-2" />
            <h4 className="font-bold text-gray-800">Tích cực tham gia</h4>
            <p className="text-sm text-gray-600">Tương tác trong diễn đàn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
