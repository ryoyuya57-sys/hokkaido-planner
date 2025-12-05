import React, { useState } from 'react';
import { Wallet, Plus, X, Trash2, Calendar, CreditCard, Banknote, Bus, Utensils, BedDouble, Ticket, ShoppingBag, MoreHorizontal, RefreshCcw, Calculator, Settings } from 'lucide-react';
import { ExpenseItem, ExpenseCategory, PaymentMethod } from '../types';

const Expenses = () => {
  const [items, setItems] = useState<ExpenseItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0.22); // 1 JPY = 0.22 TWD
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [converterInput, setConverterInput] = useState('');
  const [converterResult, setConverterResult] = useState('');

  // Form State
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [note, setNote] = useState('');

  const totalAmountJPY = items.reduce((sum, item) => sum + item.amount, 0);
  const totalAmountTWD = Math.round(totalAmountJPY * exchangeRate);

  const getCategoryIcon = (cat: ExpenseCategory) => {
    switch (cat) {
      case 'transport': return <Bus className="w-5 h-5" />;
      case 'food': return <Utensils className="w-5 h-5" />;
      case 'lodging': return <BedDouble className="w-5 h-5" />;
      case 'ticket': return <Ticket className="w-5 h-5" />;
      case 'shopping': return <ShoppingBag className="w-5 h-5" />;
      default: return <MoreHorizontal className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (cat: ExpenseCategory) => {
    const map: Record<ExpenseCategory, string> = {
      transport: '交通',
      food: '飲食',
      lodging: '住宿',
      ticket: '門票',
      shopping: '購物',
      other: '其他'
    };
    return map[cat];
  };

  // Warm Color Scheme Helper
  const getCategoryColor = (cat: ExpenseCategory) => {
    switch (cat) {
      case 'transport': return 'bg-blue-100 text-blue-600';
      case 'food': return 'bg-orange-100 text-orange-600';
      case 'lodging': return 'bg-amber-100 text-amber-600';
      case 'ticket': return 'bg-rose-100 text-rose-600';
      case 'shopping': return 'bg-pink-100 text-pink-600';
      default: return 'bg-stone-100 text-stone-600';
    }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;

    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      category,
      name,
      date,
      amount: parseInt(amount),
      paymentMethod,
      note: note.trim() || undefined,
    };

    setItems([newItem, ...items]);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setCategory('food');
    setName('');
    setDate(new Date().toISOString().split('T')[0]);
    setAmount('');
    setPaymentMethod('cash');
    setNote('');
  };

  const deleteItem = (id: string) => {
    if (window.confirm('確定要刪除這筆紀錄嗎？')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleConverterChange = (val: string) => {
    setConverterInput(val);
    if (!val) {
        setConverterResult('');
        return;
    }
    const num = parseFloat(val);
    if (!isNaN(num)) {
        // Calculate JPY to TWD
        setConverterResult((num * exchangeRate).toFixed(0));
    }
  };

  const handleRateChange = (val: string) => {
      const newRate = parseFloat(val);
      const safeRate = isNaN(newRate) ? 0 : newRate;
      setExchangeRate(safeRate);
      
      // Immediately update converter result if input exists
      if (converterInput) {
          const num = parseFloat(converterInput);
          if (!isNaN(num)) {
              setConverterResult((num * safeRate).toFixed(0));
          }
      }
  };

  return (
    <div className="pb-32 pt-6 px-5 min-h-screen bg-orange-50/30">
      
      {/* Currency Converter (Collapsible) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 mb-4 transition-all duration-300">
        <div 
            className="flex justify-between items-center cursor-pointer select-none"
            onClick={() => setIsConverterOpen(!isConverterOpen)}
        >
            <div className="flex items-center gap-2 text-orange-700 font-bold">
                <RefreshCcw className="w-4 h-4" />
                <span className="text-sm">匯率換算</span>
            </div>
            <div className="flex items-center gap-2">
                {!isConverterOpen && (
                    <span className="text-xs text-orange-400 bg-orange-50 px-2 py-0.5 rounded-full">
                        1 : {exchangeRate}
                    </span>
                )}
                <Calculator className={`w-4 h-4 text-orange-400 transition-transform duration-300 ${isConverterOpen ? 'rotate-180 text-orange-600' : ''}`} />
            </div>
        </div>
        
        {isConverterOpen && (
            <div className="mt-4 pt-4 border-t border-orange-100 animate-in slide-in-from-top-2 duration-200">
                {/* Rate Setting */}
                <div className="flex items-center justify-between mb-4 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100">
                    <div className="flex items-center gap-1.5 text-orange-800 text-xs font-medium">
                        <Settings className="w-3.5 h-3.5" />
                        <span>設定匯率</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono">1 JPY =</span>
                        <input 
                            type="number" 
                            step="0.001"
                            value={exchangeRate}
                            onChange={(e) => handleRateChange(e.target.value)}
                            className="w-20 px-2 py-1 text-sm text-center font-bold text-orange-700 bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
                        />
                        <span className="text-xs text-slate-400 font-mono">TWD</span>
                    </div>
                </div>

                {/* Calculator Inputs */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 group-focus-within:text-orange-500 transition-colors">¥</span>
                        <input 
                            type="number" 
                            value={converterInput}
                            onChange={(e) => handleConverterChange(e.target.value)}
                            placeholder="日幣"
                            className="w-full pl-7 pr-3 py-2.5 bg-orange-50/50 border border-transparent group-focus-within:bg-white group-focus-within:border-orange-300 rounded-xl text-sm outline-none transition-all placeholder:text-gray-300 font-medium"
                        />
                    </div>
                    <div className="text-orange-300 font-bold">=</div>
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">$</span>
                        <input 
                            type="text" 
                            readOnly
                            value={converterResult}
                            placeholder="台幣"
                            className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm text-slate-700 font-bold outline-none placeholder:text-gray-300"
                        />
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Total Card (Warm Tone) */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-200 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-orange-100 text-sm font-medium mb-1">總花費 (日幣)</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black tracking-tight">¥{totalAmountJPY.toLocaleString()}</span>
          </div>
          <div className="mt-1 text-orange-100/80 text-sm font-medium">
            ≈ NT$ {totalAmountTWD.toLocaleString()} 
            <span className="text-[10px] opacity-70 ml-1 font-normal">(匯率 {exchangeRate})</span>
          </div>
          <div className="mt-4 flex gap-4 text-xs opacity-90">
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
              <Banknote className="w-3 h-3" />
              <span>現金: ¥{items.filter(i => i.paymentMethod === 'cash').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
              <CreditCard className="w-3 h-3" />
              <span>刷卡: ¥{items.filter(i => i.paymentMethod === 'credit').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <Wallet className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-20 rotate-12" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">支出紀錄</h2>
        <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full border border-orange-200">{items.length} 筆</span>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-orange-200">
            <Wallet className="w-12 h-12 mx-auto mb-3 opacity-20 text-orange-400" />
            <p>目前沒有支出紀錄</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
              {/* Category Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getCategoryColor(item.category)}`}>
                {getCategoryIcon(item.category)}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800 truncate pr-2">{item.name}</h3>
                  <span className="font-bold text-slate-800 whitespace-nowrap">¥{item.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded">
                    <Calendar className="w-3 h-3" />
                    {item.date.slice(5).replace('-', '/')}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded">
                    {item.paymentMethod === 'cash' ? <Banknote className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                    {item.paymentMethod === 'cash' ? '現金' : '信用卡'}
                  </span>
                </div>
                {item.note && (
                  <p className="text-xs text-slate-400 mt-1 truncate">{item.note}</p>
                )}
              </div>

              {/* Delete */}
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 text-slate-300 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-full shadow-xl shadow-orange-200 flex items-center justify-center transition-all duration-300 z-40 group"
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
                <h3 className="text-xl font-bold text-slate-800">新增支出</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddExpense} className="space-y-4">
                
                {/* Category Grid */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">類別</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['transport', 'food', 'lodging', 'ticket', 'shopping', 'other'] as ExpenseCategory[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                          category === cat 
                            ? 'bg-orange-50 border-orange-500 text-orange-700' 
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <div className="scale-75 mb-1">{getCategoryIcon(cat)}</div>
                        <span className="text-xs font-medium">{getCategoryLabel(cat)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">名稱</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例如：午餐、JR車票"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">金額 (¥)</label>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all font-mono"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">付款方式</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                        paymentMethod === 'cash' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      <Banknote className="w-4 h-4" /> 現金
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                        paymentMethod === 'credit' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> 信用卡
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">備註 (選填)</label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="補充說明..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none h-20"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98]"
                  >
                    新增支出
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

export default Expenses;