import React, { useState } from 'react';

interface IngestionConfirmationStepProps {
  onComplete: () => void;
  onBack: () => void;
  taskType?: 'phenotype' | 'genotype' | 'image';
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
