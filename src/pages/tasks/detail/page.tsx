import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../home/components/Navbar';
import FileRecognitionStep from './components/FileRecognitionStep';
import SheetSelectionStep from './components/SheetSelectionStep';
import DataValidationStep from './components/DataValidationStep';
import DataCorrectionStep from './components/DataCorrectionStep';
import IngestionConfirmationStep from './components/IngestionConfirmationStep';
import GenotypeProcessingStep from './components/GenotypeProcessingStep';
import GenotypeConversionStep from './components/GenotypeConversionStep';
import GenotypeQCStep from './components/GenotypeQCStep';
import AttributeAssociationStep from './components/AttributeAssociationStep';
import ImageQCStep from './components/ImageQCStep';
import ManualBindingStep from './components/ManualBindingStep';

type StepStatus = 'pending' | 'processing' | 'completed' | 'error';
type TaskType = 'phenotype' | 'genotype' | 'image';

interface Step {
  id: number;
  key: string;
  name: string;
  status: StepStatus;
  description?: string;
}

const PHENOTYPE_STEPS: Step[] = [
  { id: 1, key: 'file_recognition', name: '文件解析', status: 'processing', description: '解析文件结构' },
  { id: 2, key: 'sheet_mapping', name: '数据映射', status: 'pending', description: '选择 Sheet 并映射字段' },
  { id: 3, key: 'validation', name: '规则校验', status: 'pending', description: '数据完整性与逻辑校验' },
  { id: 4, key: 'preview_correction', name: '数据修正', status: 'pending', description: '预览并修正错误数据' },
  { id: 5, key: 'ingestion', name: '入库确认', status: 'pending', description: '最终确认入库' },
];

const GENOTYPE_STEPS: Step[] = [
  { id: 1, key: 'file_recognition', name: '文件识别', status: 'processing', description: '识别文件类型' },
  { id: 2, key: 'format_processing', name: '格式处理', status: 'pending', description: '定义数据结构' },
  { id: 3, key: 'format_conversion', name: '格式转换', status: 'pending', description: '转换为标准 VCF' },
  { id: 4, key: 'quality_control', name: '质量控制', status: 'pending', description: 'QC 指标统计' },
  { id: 5, key: 'ingestion', name: '入库确认', status: 'pending', description: '确认入库' },
];

const IMAGE_STEPS: Step[] = [
  { id: 1, key: 'file_recognition', name: '解压并扫描', status: 'processing', description: '解压文件并扫描图片' },
  { id: 2, key: 'attribute_association', name: '属性关联', status: 'pending', description: '关联图片属性信息' },
  { id: 3, key: 'image_qc', name: '匹配结果', status: 'pending', description: '检查图像匹配结果' },
  { id: 4, key: 'manual_binding', name: '手动绑定/重命名', status: 'pending', description: '人工修正绑定' },
  { id: 5, key: 'resource_sync', name: '资源同步', status: 'pending', description: '同步至资源库' },
];

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskType, setTaskType] = useState<TaskType>('phenotype');
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [steps, setSteps] = useState<Step[]>(PHENOTYPE_STEPS);

  // Reset steps when task type changes
  useEffect(() => {
    if (taskType === 'phenotype') {
      setSteps(PHENOTYPE_STEPS);
    } else if (taskType === 'genotype') {
      setSteps(GENOTYPE_STEPS);
    } else {
      setSteps(IMAGE_STEPS);
    }
    setActiveStepId(1);
  }, [taskType]);

  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === activeStepId);
    if (currentIndex < steps.length - 1) {
      const newSteps = [...steps];
      newSteps[currentIndex].status = 'completed';
      newSteps[currentIndex + 1].status = 'processing';
      setSteps(newSteps);
      setActiveStepId(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(s => s.id === activeStepId);
    if (currentIndex > 0) {
      setActiveStepId(steps[currentIndex - 1].id);
    }
  };

  const handleComplete = () => {
    const newSteps = [...steps];
    newSteps[newSteps.length - 1].status = 'completed';
    setSteps(newSteps);
    alert('任务入库成功！');
    navigate('/tasks');
  };

  const renderStepContent = () => {
    if (taskType === 'phenotype') {
      switch (activeStep.key) {
        case 'file_recognition':
          return <FileRecognitionStep onNext={handleNext} taskType="phenotype" />;
        case 'sheet_mapping':
          return <SheetSelectionStep onNext={handleNext} onBack={handleBack} />;
        case 'validation':
          return <DataValidationStep onNext={handleNext} onBack={handleBack} />;
        case 'preview_correction':
          return <DataCorrectionStep onNext={handleNext} onBack={handleBack} />;
        case 'ingestion':
          return <IngestionConfirmationStep onComplete={handleComplete} onBack={handleBack} taskType="phenotype" />;
        default:
          return <div>Unknown Step</div>;
      }
    } else if (taskType === 'genotype') {
      switch (activeStep.key) {
        case 'file_recognition':
          return <FileRecognitionStep onNext={handleNext} taskType="genotype" />;
        case 'format_processing':
          return <GenotypeProcessingStep onNext={handleNext} onBack={handleBack} />;
        case 'format_conversion':
          return <GenotypeConversionStep onNext={handleNext} onBack={handleBack} />;
        case 'quality_control':
          return <GenotypeQCStep onNext={handleNext} onBack={handleBack} />;
        case 'ingestion':
          return <IngestionConfirmationStep onComplete={handleComplete} onBack={handleBack} taskType="genotype" />;
        default:
          return <div>Unknown Step</div>;
      }
    } else {
      // Image Task
      switch (activeStep.key) {
        case 'file_recognition':
          return <FileRecognitionStep onNext={handleNext} taskType="image" />;
        case 'attribute_association':
          return <AttributeAssociationStep onNext={handleNext} onBack={handleBack} />;
        case 'image_qc':
          return <ImageQCStep onNext={handleNext} onBack={handleBack} />;
        case 'manual_binding':
          return <ManualBindingStep onNext={handleNext} onBack={handleBack} />;
        case 'resource_sync':
          return <IngestionConfirmationStep onComplete={handleComplete} onBack={handleBack} taskType="image" />;
        default:
          return <div>Unknown Step</div>;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-6 py-4 pt-20 flex flex-col h-screen">
        {/* Top: Header & Task Info Summary */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/tasks')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-gray-900">任务详情</h1>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                  taskType === 'phenotype' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : taskType === 'genotype'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                  {taskType === 'phenotype' ? '表型数据' : taskType === 'genotype' ? '基因型数据' : '图像数据'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                <div className="flex items-center gap-1.5">
                  <i className="ri-file-list-3-line"></i>
                  <span>任务: {taskType === 'phenotype' ? '2024春季表型数据上传' : taskType === 'genotype' ? '玉米群体基因型入库' : '2026年参试品种图片'}</span>
                </div>
                <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                <div className="flex items-center gap-1.5">
                  <i className="ri-database-2-line"></i>
                  <span>数据集: 玉米种质资源库_2024</span>
                </div>
                <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                   <span className="text-blue-600 font-medium">处理中</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             {/* Dev Toggle for Demo */}
             <div className="flex bg-gray-100 rounded-lg p-0.5 mr-2">
                <button 
                  onClick={() => setTaskType('phenotype')}
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-md transition-all ${taskType === 'phenotype' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  表型
                </button>
                <button 
                  onClick={() => setTaskType('genotype')}
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-md transition-all ${taskType === 'genotype' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  基因型
                </button>
                <button 
                  onClick={() => setTaskType('image')}
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-md transition-all ${taskType === 'image' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  图像
                </button>
             </div>

             <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm text-xs">
                   下载日志
                </button>
                <button className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 font-medium transition-colors shadow-sm text-xs">
                   取消任务
                </button>
             </div>
          </div>
        </div>

        {/* Middle: Horizontal Stepper */}
        <div className="mb-3 shrink-0">
          <div className="flex items-center justify-between relative">
             {/* Progress Bar Background */}
             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 mx-12"></div>
             
             {steps.map((step, index) => {
               const isActive = step.id === activeStepId;
               const isCompleted = step.status === 'completed';
               const isPending = step.status === 'pending';
               
               return (
                 <div 
                   key={step.id} 
                   className={`flex flex-col items-center relative group ${!isPending ? 'cursor-pointer' : ''}`}
                   onClick={() => !isPending && setActiveStepId(step.id)}
                 >
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all z-10 text-sm ${
                     isActive 
                       ? 'bg-teal-600 border-teal-600 text-white shadow-lg scale-110' 
                       : isCompleted 
                         ? 'bg-white border-teal-600 text-teal-600' 
                         : 'bg-white border-gray-300 text-gray-400'
                   }`}>
                     {isCompleted ? (
                       <i className="ri-check-line text-base"></i>
                     ) : (
                       <span className="font-bold">{index + 1}</span>
                     )}
                   </div>
                   <div className={`mt-1 text-xs font-medium transition-colors ${
                     isActive ? 'text-teal-700' : isCompleted ? 'text-teal-600' : 'text-gray-500'
                   }`}>
                     {step.name}
                   </div>
                 </div>
               );
             })}
          </div>
        </div>

        {/* Bottom: Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden min-h-0">
          {/* Step Header */}
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center shrink-0">
            <div>
               <h2 className="text-base font-bold text-gray-900">{activeStep.name}</h2>
               <p className="text-xs text-gray-500 mt-0.5">{activeStep.description}</p>
            </div>
            {/* Step Status Indicator */}
            <div className="flex items-center gap-2">
               {activeStep.status === 'processing' && (
                 <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                   <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5 animate-pulse"></span>
                   处理中...
                 </span>
               )}
            </div>
          </div>
          
          {/* Step Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {renderStepContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
