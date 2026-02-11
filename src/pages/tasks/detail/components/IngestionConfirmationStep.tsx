import React, { useState } from 'react';

interface IngestionConfirmationStepProps {
  onComplete: () => void;
  onBack: () => void;
  taskType?: 'phenotype' | 'genotype';
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
