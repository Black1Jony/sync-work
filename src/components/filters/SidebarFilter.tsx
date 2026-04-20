import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const SidebarFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [priceMin, setPriceMin] = useState(Number(searchParams.get('price_min')) || 0);
  const [priceMax, setPriceMax] = useState(Number(searchParams.get('price_max')) || 10000);
  const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 10);

  const updateParams = useCallback((updates: Record<string, string | number | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      value === null || value === '' || value === 0 ? newParams.delete(key) : newParams.set(key, String(value));
    });
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({
        price_min: priceMin || null,
        price_max: priceMax === 10000 ? null : priceMax,
        limit: limit === 10 ? null : limit,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [priceMin, priceMax, limit]);

  const handleSearchSubmit = () => updateParams({ search: searchInput || null });
  const handleReset = () => {
    setSearchInput('');
    setPriceMin(0);
    setPriceMax(10000);
    setLimit(10);
    setSearchParams(new URLSearchParams());
  };

  return (
    <aside className="w-80 min-h-screen bg-[#1a1a1a] border-r border-white/5 flex flex-col sticky top-0">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">Filters</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Search</label>
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              placeholder="Search projects..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button onClick={handleSearchSubmit} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/5 rounded-md transition-colors">
              <Search className="w-4 h-4 text-orange-400" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-300">Budget Range</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Min</span>
                <span className="text-sm font-medium text-orange-400">${priceMin}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer slider-orange"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Max</span>
                <span className="text-sm font-medium text-orange-400">${priceMax}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer slider-orange"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Per Page</label>
          <div className="grid grid-cols-4 gap-2">
            {[10, 20, 30, 50].map((value) => (
              <button
                key={value}
                onClick={() => setLimit(value)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  limit === value
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {(searchParams.get('search') || searchParams.get('price_min') || searchParams.get('price_max') || searchParams.get('limit')) && (
          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300">Active</span>
              <button onClick={handleReset} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchParams.get('search') && (
                <span className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded text-xs text-orange-400">
                  {searchParams.get('search')}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateParams({ search: null })} />
                </span>
              )}
              {searchParams.get('price_min') && (
                <span className="px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded text-xs text-orange-400">
                  ${searchParams.get('price_min')}+
                </span>
              )}
              {searchParams.get('price_max') && (
                <span className="px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded text-xs text-orange-400">
                  ${searchParams.get('price_max')}-
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .slider-orange::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fb923c;
          cursor: pointer;
          border: 2px solid #1a1a1a;
        }
        .slider-orange::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #fb923c;
          cursor: pointer;
          border: 2px solid #1a1a1a;
        }
      `}</style>
    </aside>
  );
};

export default SidebarFilter;
