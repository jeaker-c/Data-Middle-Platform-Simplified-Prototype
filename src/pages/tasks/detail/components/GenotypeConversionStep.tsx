import { useState, useEffect } from 'react';

interface GenotypeConversionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function GenotypeConversionStep({ onNext, onBack }: GenotypeConversionStepProps) {
  const [status, setStatus] = useState<'converting' | 'success' | 'error'>('converting');
  const [progress, setProgress] = useState(0);
  const outputFiles = [
    'maize_genotype_v3-sheet1.vcf',
    'maize_genotype_v1-sheet2.vcf',
    'maize_genotype_v2-sheet2.vcf'
  ];

  useEffect(() => {
    if (status === 'converting') {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setStatus('success');
            return 100;
          }
          return prev + 5; // fast simulation
        });
      }, 150);
      return () => clearInterval(timer);
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center h-full py-12">
      {status === 'converting' && (
        <div className="text-center w-full max-w-md">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
            <div 
               className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"
               style={{ transform: `rotate(${progress * 3.6}deg)` }} // Just visual spinning
            ></div>
            <span className="text-teal-700 font-bold text-xl">{progress}%</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">正在转换数据格式...</h2>
          <p className="text-gray-500 mb-8">正在将 Excel/HMP 数据标准化为 VCF 格式，预计耗时 2-5 分钟</p>
          
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-teal-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 max-w-2xl w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            <i className="ri-check-line"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">格式转换成功！</h2>
          <p className="text-gray-500 mb-8">已成功生成标准 VCF 文件，准备进行质量控制分析</p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 text-left">
            <div className="text-sm text-gray-500 font-medium mb-4">输出文件</div>
            <div className="space-y-3">
              {outputFiles.map((file) => (
                <div key={file} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                      <i className="ri-file-text-line"></i>
                    </div>
                    <span className="font-medium text-gray-900 truncate">{file}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            {/* <button
              onClick={onBack} // Actually usually can't go back after conversion easily without resetting
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              重新配置
            </button> */}
            <button
              onClick={onNext}
              className="px-8 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              进入质量控制 (QC)
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
