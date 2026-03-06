import React, { useState } from 'react';

interface IngestionConfirmationStepProps {
  onComplete: () => void;
  onBack: () => void;
  taskType?: 'phenotype' | 'genotype' | 'image' | 'directory_scan' | 'environment';
}

export default function IngestionConfirmationStep({ onComplete, onBack, taskType = 'phenotype' }: IngestionConfirmationStepProps) {
  const [conflictMode, setConflictMode] = useState<'overwrite' | 'version' | 'skip'>('version');
  const [ingestionScope, setIngestionScope] = useState<'all' | 'valid_only'>('all');
  
  const summary = {
    total: 1245,
    new: 1100,
    conflict: 145,
    version: 'V1.2'
  };

  // Genotype specific summary
  const genotypeSummary = {
    totalMaterials: 384,
    validMaterials: 372,
    abnormalMaterials: 12,
    snpCount: '45,230'
  };

  const [envFiles, setEnvFiles] = useState([
    { id: '1', name: '2024Q1_德州基地_温度报表.xlsx', size: '1.2 MB', items: 450, status: 'verified', type: 'excel' },
    { id: '2', name: '2024Q1_德州基地_湿度报表.xlsx', size: '850 KB', items: 450, status: 'verified', type: 'excel' },
    { id: '3', name: '2024Q1_德州基地_风速报表.csv', size: '2.4 MB', items: 380, status: 'verified', type: 'csv' },
  ]);

  const [searchStation, setSearchStation] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  // Store station selection for each file
  const [fileStationMap, setFileStationMap] = useState<Record<string, string>>({});

  const handleStationSelect = (stationId: string) => {
    setSelectedStation(stationId);
    // Auto-assign to currently selected files if needed, or just keep state for next action
  };

  const assignStationToFile = (fileId: string, stationId: string) => {
    setFileStationMap(prev => ({
      ...prev,
      [fileId]: stationId
    }));
  };

  const stations = [
    { id: 'DZ-E01', name: '德州基地-东区', location: '山东德州' },
    { id: 'SY-12', name: '南繁中心-12号地', location: '海南三亚' },
    { id: 'BJ-CP-01', name: '昌平气象站', location: '北京昌平' },
    { id: 'WC-05', name: '五常试验站', location: '黑龙江五常' },
  ];

  const filteredStations = searchStation.trim() 
    ? stations.filter(s => s.name.includes(searchStation) || s.id.includes(searchStation))
    : stations;

  if (taskType === 'environment') {
    return (
      <div className="flex gap-6 h-full items-start">
        {/* Left: File List */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 min-h-[600px] flex flex-col">
           <div className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                 <i className="ri-file-list-3-line text-xl"></i>
               </div>
               <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">文件预览</h3>
             </div>
             <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-full">
               共 {envFiles.length} 个资源
             </span>
           </div>

           <div className="flex-1 space-y-4">
             {envFiles.map(file => (
               <div 
                 key={file.id} 
                 onClick={() => setSelectedStation(fileStationMap[file.id] || null)}
                 className={`group p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    fileStationMap[file.id] 
                      ? 'bg-indigo-50/30 border-indigo-200' 
                      : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50'
                 }`}
               >
                 <div className="flex items-center gap-5">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                     file.type === 'zip' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'
                   }`}>
                     <i className={`ri-file-${file.type === 'zip' ? 'zip' : 'excel'}-2-line`}></i>
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900 mb-1">{file.name}</h4>
                     <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                       <span>{file.size}</span>
                       <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                       <span>{file.items}条</span>
                     </div>
                   </div>
                 </div>

                 <div className="flex items-center gap-4">
                   {fileStationMap[file.id] ? (
                     <div className="flex flex-col items-end">
                       <span className="text-xs font-bold text-indigo-600">{stations.find(s => s.id === fileStationMap[file.id])?.name}</span>
                       <span className="text-[10px] text-indigo-400 font-mono">{fileStationMap[file.id]}</span>
                     </div>
                   ) : (
                     <span className="text-xs text-gray-400 italic">待关联站点</span>
                   )}
                   
                   <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-green-100">
                     Verified
                   </span>
                 </div>
               </div>
             ))}

             <button className="w-full py-8 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center gap-2 group">
               <i className="ri-add-line text-2xl group-hover:scale-110 transition-transform"></i>
               <span className="text-xs font-bold tracking-widest uppercase">继续添加更多资源</span>
             </button>
           </div>
        </div>

        {/* Right: Station Matching & Sync */}
        <div className="w-[380px] space-y-6 shrink-0">
           {/* Station Search */}
           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <i className="ri-map-pin-line text-teal-500"></i>
                匹配目标站点
              </div>

              <div className="relative mb-6">
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="输入站点名称/编号搜索" 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                  value={searchStation}
                  onChange={(e) => setSearchStation(e.target.value)}
                />
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {filteredStations.map(station => (
                  <div 
                    key={station.id}
                    onClick={() => {
                        handleStationSelect(station.id);
                        // In a real scenario, we might want to select a file first then assign.
                        // For this demo, let's assume we are assigning to all unassigned files or just showing selection
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedStation === station.id 
                        ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-200' 
                        : 'bg-white border-gray-100 hover:border-teal-500 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        selectedStation === station.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-600'
                      }`}>
                        <i className="ri-map-pin-2-line"></i>
                      </div>
                      <div>
                        <div className={`font-bold text-sm mb-0.5 ${selectedStation === station.id ? 'text-white' : 'text-gray-900'}`}>
                          {station.name}
                        </div>
                        <div className={`text-xs font-mono ${selectedStation === station.id ? 'text-teal-100' : 'text-gray-400'}`}>
                          {station.id}
                        </div>
                      </div>
                    </div>
                    {selectedStation === station.id && <i className="ri-check-line text-xl"></i>}
                  </div>
                ))}
              </div>
           </div>

           {/* Sync Card */}
           <div className="bg-[#0f172a] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-teal-400 text-xs font-bold uppercase tracking-[0.2em]">
                  <i className="ri-shield-check-line"></i>
                  Sync Authorization
                </div>

                <h3 className="text-gray-400 text-sm mb-2 font-medium">将确认入库以下批次数据至:</h3>
                <div className="text-2xl font-bold mb-6 truncate leading-tight">
                  {selectedStation 
                    ? stations.find(s => s.id === selectedStation)?.name 
                    : <span className="text-gray-600 italic">请先选择站点...</span>}
                </div>

                <div className="flex gap-3 mb-8">
                  <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 uppercase tracking-wide">
                    Items: {envFiles.reduce((acc, f) => acc + f.items, 0)}
                  </span>
                  {selectedStation && (
                    <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 uppercase tracking-wide">
                      Station: {selectedStation}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (!selectedStation) {
                      alert('请先选择目标站点');
                      return;
                    }
                    // Apply to all for demo simplicity, or could apply to currently selected file
                    const newMap = { ...fileStationMap };
                    envFiles.forEach(f => {
                        if (!newMap[f.id]) newMap[f.id] = selectedStation;
                    });
                    setFileStationMap(newMap);
                    
                    // If all files have stations, then complete
                    if (Object.keys(newMap).length >= envFiles.length) {
                         onComplete();
                    }
                  }}
                  disabled={!selectedStation}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                    selectedStation 
                      ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/50 hover:-translate-y-0.5' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <i className="ri-save-3-line text-lg"></i>
                  确认关联并同步
                </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (taskType === 'image') {
    return (
      <div className="flex flex-col h-full">
         <div className="flex-1 flex flex-col items-center justify-center -mt-10">
           {/* Success Icon */}
           <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 border border-teal-100">
             <i className="ri-checkbox-line text-4xl text-teal-600"></i>
           </div>
           
           <h2 className="text-2xl font-bold text-gray-900 mb-2">准备就绪，待入库确认</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 w-full max-w-5xl mb-12 mt-12">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                 <div className="text-xs font-bold text-gray-400 uppercase mb-2">待入库总数</div>
                 <div className="text-4xl font-bold text-gray-900 flex items-baseline gap-2">
                   384 <span className="text-sm font-medium text-gray-400">份</span>
                 </div>
              </div>

              <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100 shadow-sm flex flex-col items-center text-center">
                 <div className="text-xs font-bold text-green-600 uppercase mb-2">匹配现有</div>
                 <div className="text-4xl font-bold text-green-700 flex items-baseline gap-2">
                   152 <span className="text-sm font-medium text-green-600/60">份</span>
                 </div>
              </div>

              <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col items-center text-center">
                 <div className="text-xs font-bold text-purple-600 uppercase mb-2">新增材料</div>
                 <div className="text-4xl font-bold text-purple-700 flex items-baseline gap-2">
                   2 <span className="text-sm font-medium text-purple-600/60">份</span>
                 </div>
              </div>

              <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100 shadow-sm flex flex-col items-center text-center">
                 <div className="text-xs font-bold text-red-600 uppercase mb-2">异常删除</div>
                 <div className="text-4xl font-bold text-red-700 flex items-baseline gap-2">
                   12 <span className="text-sm font-medium text-red-600/60">份</span>
                 </div>
              </div>
           </div>

           {/* Policy Card */}
           <div className="w-full max-w-5xl bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-900/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="flex items-start gap-5">
                 <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center border border-gray-700 shrink-0 mt-1">
                    <i className="ri-shield-check-line text-teal-400 text-2xl"></i>
                 </div>
                 
                 <div className="flex-1">
                   <h3 className="text-xl font-bold leading-relaxed">
                     系统将自动同步 <span className="text-white">372 份</span>合格图像资源。其中包括 <span className="text-purple-400 font-bold border-b-2 border-purple-400/30 px-1">2 份</span> 新材料条目的自动化创建。
                   </h3>
                   <div className="h-px bg-gray-800 w-full my-6"></div>
                   
                   <div className="flex items-center justify-between">
                      <button
                        onClick={() => window.confirm('确定要取消本次任务吗？') && onBack()}
                        className="px-8 py-4 bg-gray-800 border border-gray-700 text-gray-300 rounded-2xl font-bold hover:bg-gray-700 hover:text-white transition-all flex items-center gap-2"
                      >
                        <i className="ri-delete-bin-line"></i>
                        取消任务
                      </button>

                      <button
                        onClick={onComplete}
                        className="px-16 py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-900/50 hover:bg-teal-500 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 text-lg"
                      >
                        <i className="ri-save-3-line"></i>
                        执行入库同步
                        <i className="ri-arrow-right-line"></i>
                      </button>
                   </div>
                 </div>
              </div>
           </div>
         </div>
      </div>
    );
  }

  if (taskType === 'genotype') {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <i className="ri-information-line text-blue-600 mt-0.5"></i>
          <div className="text-sm text-blue-800">
            <p className="font-medium">以下数据已完成质量评估，请确认是否入库</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">入库数据摘要</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-sm text-gray-500 mb-1">总材料数</div>
              <div className="text-3xl font-bold text-gray-900">{genotypeSummary.totalMaterials}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">合格材料</div>
              <div className="text-3xl font-bold text-green-600">{genotypeSummary.validMaterials}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">异常材料</div>
              <div className="text-3xl font-bold text-red-600">{genotypeSummary.abnormalMaterials}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">入库范围选择</h4>
          <div className="space-y-4">
            <div 
              className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${ingestionScope === 'all' ? 'border-teal-500 bg-teal-50' : 'hover:bg-gray-50'}`}
              onClick={() => setIngestionScope('all')}
            >
              <input 
                type="radio" 
                checked={ingestionScope === 'all'} 
                readOnly
                className="mt-1 text-teal-600 focus:ring-teal-500"
              />
              <div>
                <div className="font-medium text-gray-900">全部入库 (包含异常材料)</div>
                <div className="text-sm text-gray-500 mt-1">所有材料数据都将写入数据库，异常材料将被标记为“需复核”。</div>
              </div>
            </div>

            <div 
              className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${ingestionScope === 'valid_only' ? 'border-teal-500 bg-teal-50' : 'hover:bg-gray-50'}`}
              onClick={() => setIngestionScope('valid_only')}
            >
              <input 
                type="radio" 
                checked={ingestionScope === 'valid_only'}
                readOnly
                className="mt-1 text-teal-600 focus:ring-teal-500"
              />
              <div>
                <div className="font-medium text-gray-900">仅入库合格材料 (推荐)</div>
                <div className="text-sm text-gray-500 mt-1">自动剔除 {genotypeSummary.abnormalMaterials} 份异常材料，仅入库 {genotypeSummary.validMaterials} 份高质量数据。</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button 
            onClick={() => window.confirm('确定要取消本次任务吗？') && onBack()} // In real app, this might navigate away
            className="px-4 py-2 bg-white border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
          >
            取消任务
          </button>
          <button 
            onClick={onComplete}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <i className="ri-database-2-fill"></i>
            确认入库
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Data Summary */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h4 className="text-lg font-medium text-gray-900 mb-4">入库数据摘要</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-sm text-gray-500 mb-1">即将入库总数</div>
            <div className="text-3xl font-bold text-gray-900">{summary.total}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">新增数据</div>
            <div className="text-3xl font-bold text-green-600">{summary.new}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">覆盖/冲突数据</div>
            <div className="text-3xl font-bold text-orange-500">{summary.conflict}</div>
          </div>
        </div>
      </div>

      {/* Conflict Resolution Strategy */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h4 className="text-lg font-medium text-gray-900 mb-4">数据冲突处理策略</h4>
        <div className="space-y-4">
          <div 
            className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${conflictMode === 'overwrite' ? 'border-teal-500 bg-teal-50' : 'hover:bg-gray-50'}`}
            onClick={() => setConflictMode('overwrite')}
          >
            <input 
              type="radio" 
              name="conflict" 
              checked={conflictMode === 'overwrite'} 
              readOnly
              className="mt-1 text-teal-600 focus:ring-teal-500"
            />
            <div>
              <div className="font-medium text-gray-900">覆盖已有数据</div>
              <div className="text-sm text-gray-500 mt-1">若系统中已存在相同主键的数据，将直接使用新数据覆盖旧数据。此操作不可撤销。</div>
            </div>
          </div>

          <div 
            className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${conflictMode === 'version' ? 'border-teal-500 bg-teal-50' : 'hover:bg-gray-50'}`}
            onClick={() => setConflictMode('version')}
          >
            <input 
              type="radio" 
              name="conflict" 
              checked={conflictMode === 'version'}
              readOnly
              className="mt-1 text-teal-600 focus:ring-teal-500"
            />
            <div>
              <div className="font-medium text-gray-900">新建数据版本 (推荐)</div>
              <div className="text-sm text-gray-500 mt-1">保留旧数据，将新数据作为新版本存入。系统将自动维护版本号。</div>
            </div>
          </div>

          <div 
            className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${conflictMode === 'skip' ? 'border-teal-500 bg-teal-50' : 'hover:bg-gray-50'}`}
            onClick={() => setConflictMode('skip')}
          >
            <input 
              type="radio" 
              name="conflict" 
              checked={conflictMode === 'skip'}
              readOnly
              className="mt-1 text-teal-600 focus:ring-teal-500"
            />
            <div>
              <div className="font-medium text-gray-900">跳过冲突数据</div>
              <div className="text-sm text-gray-500 mt-1">仅入库新增数据，忽略所有存在冲突的数据行。</div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3">
        <i className="ri-alert-line text-orange-600 mt-0.5"></i>
        <div className="text-sm text-orange-800">
          请仔细确认入库策略。点击“确认入库”后，系统将立即开始处理数据写入，期间请勿关闭页面。
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
        >
          上一步
        </button>
        <button 
          onClick={onComplete}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <i className="ri-database-2-fill"></i>
          确认入库
        </button>
      </div>
    </div>
  );
}
