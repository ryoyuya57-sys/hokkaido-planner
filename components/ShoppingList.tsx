import React, { useState, useRef } from 'react';
import { ShoppingBasket, Plus, X, Image as ImageIcon, Trash2, Check, Upload, StickyNote } from 'lucide-react';
import { ShoppingItem } from '../types';

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemNote, setNewItemNote] = useState('');
  const [newItemImage, setNewItemImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItemImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      imageUrl: newItemImage || undefined,
      note: newItemNote.trim() || undefined,
      isPurchased: false,
    };

    setItems([...items, newItem]);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setNewItemName('');
    setNewItemNote('');
    setNewItemImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const togglePurchased = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
    ));
  };

  const deleteItem = (id: string) => {
    if (window.confirm('確定要刪除這個項目嗎？')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="pb-32 pt-6 px-5 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">購物清單</h2>
          <p className="text-slate-500 text-sm mt-1">必買伴手禮與紀念品</p>
        </div>
        <div className="bg-pink-100 p-2 rounded-full">
          <ShoppingBasket className="w-6 h-6 text-pink-600" />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
            <ShoppingBasket className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>清單是空的，點擊右下角按鈕新增！</p>
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl p-3 shadow-sm border transition-all duration-300 flex items-start gap-3 ${
                item.isPurchased ? 'border-green-200 bg-green-50/50 opacity-75' : 'border-slate-100'
              }`}
            >
              {/* Checkbox */}
              <button 
                onClick={() => togglePurchased(item.id)}
                className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  item.isPurchased ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent hover:border-pink-300'
                }`}
              >
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </button>

              {/* Image */}
              <div className="flex-shrink-0 w-20 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-100 relative group">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon className="w-8 h-8 opacity-50" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 py-1">
                <h3 className={`font-bold text-slate-800 text-lg leading-tight ${item.isPurchased ? 'line-through text-slate-400' : ''}`}>
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-2">
                  {item.isPurchased ? '已購買' : '尚未購買'}
                </p>
                {item.note && (
                  <div className="text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-start gap-1.5">
                    <StickyNote className="w-3.5 h-3.5 mt-0.5 text-slate-400 flex-shrink-0" />
                    <span className="break-words">{item.note}</span>
                  </div>
                )}
              </div>

              {/* Delete */}
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-slate-300 hover:text-red-400 transition-colors mt-1"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white rounded-full shadow-xl shadow-pink-200 flex items-center justify-center transition-all duration-300 z-40 group"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white rounded-2xl w-full max-w-sm relative z-10 shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">新增購物項目</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">商品名稱</label>
                  <input 
                    type="text" 
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="例如：薯條三兄弟"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">參考圖片 (選填)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-colors relative overflow-hidden bg-slate-50"
                  >
                    {newItemImage ? (
                      <img src={newItemImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-xs">點擊上傳或拍照</span>
                      </>
                    )}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {newItemImage && (
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setNewItemImage(null); if(fileInputRef.current) fileInputRef.current.value=''; }}
                      className="text-xs text-red-500 mt-2 hover:underline w-full text-center"
                    >
                      移除圖片
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">備註 (選填)</label>
                  <textarea 
                    value={newItemNote}
                    onChange={(e) => setNewItemNote(e.target.value)}
                    placeholder="例如：要送給同事的，數量3盒..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none h-24"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={!newItemName.trim()}
                    className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-200 transition-all active:scale-[0.98]"
                  >
                    加入清單
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;