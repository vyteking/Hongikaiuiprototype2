import { useState } from 'react';
import { Upload, FileSpreadsheet, Table, RefreshCw, X, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface DataUploadManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadData: (data: any[]) => void;
}

interface DataRow {
  id: string;
  [key: string]: any;
}

export function DataUploadManager({ isOpen, onClose, onUploadData }: DataUploadManagerProps) {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'manual'>('file');
  const [data, setData] = useState<DataRow[]>([
    { id: '1', 날짜: '2026-01', 매출: '1250', 비용: '850', 순이익: '400' },
    { id: '2', 날짜: '2026-02', 매출: '1380', 비용: '920', 순이익: '460' },
    { id: '3', 날짜: '2026-03', 매출: '1520', 비용: '1050', 순이익: '470' },
  ]);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const parsedData: DataRow[] = lines.slice(1)
      .filter(line => line.trim())
      .map((line, index) => {
        const values = line.split(',').map(v => v.trim());
        const row: DataRow = { id: `${index + 1}` };
        headers.forEach((header, i) => {
          row[header] = values[i] || '';
        });
        return row;
      });

    setData(parsedData);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        parseCSV(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleCellEdit = (rowId: string, column: string, value: string) => {
    setData(data.map(row => 
      row.id === rowId ? { ...row, [column]: value } : row
    ));
  };

  const handleAddRow = () => {
    const newId = `${parseInt(data[data.length - 1]?.id || '0') + 1}`;
    const newRow: DataRow = { id: newId };
    
    if (data.length > 0) {
      Object.keys(data[0]).forEach(key => {
        if (key !== 'id') newRow[key] = '';
      });
    }
    
    setData([...data, newRow]);
  };

  const handleDeleteRow = (rowId: string) => {
    setData(data.filter(row => row.id !== rowId));
  };

  const handleSaveData = () => {
    onUploadData(data);
    toast.success(`✅ 데이터가 성공적으로 업데이트되었습니다! (${data.length}개 행)`, {
      description: '보고서가 새로운 데이터로 갱신됩니다.',
      duration: 3000,
    });
    onClose();
  };

  const columns = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'id') : [];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">데이터 관리</h2>
            <p className="text-gray-400 text-sm mt-1">
              데이터를 업로드하거나 직접 입력하여 보고서를 갱신하세요
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Method Selection */}
        <div className="flex gap-4 p-6 border-b border-gray-700">
          <button
            onClick={() => setUploadMethod('file')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-lg border-2 transition-all ${
              uploadMethod === 'file'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Upload size={24} />
            <span className="font-semibold">파일 업로드</span>
          </button>
          <button
            onClick={() => setUploadMethod('manual')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-lg border-2 transition-all ${
              uploadMethod === 'manual'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Table size={24} />
            <span className="font-semibold">직접 입력</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {uploadMethod === 'file' ? (
            <div className="space-y-6">
              {/* File Upload Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <FileSpreadsheet size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  파일을 드래그하여 업로드
                </h3>
                <p className="text-gray-400 mb-6">
                  또는 클릭하여 CSV, Excel 파일 선택
                </p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
                  <Upload size={20} />
                  <span className="font-semibold">파일 선택</span>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preview */}
              {data.length > 0 && (
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">미리보기</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600">
                          {columns.map(col => (
                            <th key={col} className="px-4 py-2 text-left text-gray-300 font-medium">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.slice(0, 5).map(row => (
                          <tr key={row.id} className="border-b border-gray-700/50">
                            {columns.map(col => (
                              <td key={col} className="px-4 py-2 text-gray-300">
                                {row[col]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {data.length > 5 && (
                      <p className="text-gray-400 text-xs mt-2 text-center">
                        +{data.length - 5}개 행 더 있음
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Manual Data Entry */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">데이터 테이블</h4>
                <button
                  onClick={handleAddRow}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus size={18} />
                  <span className="text-sm font-semibold">행 추가</span>
                </button>
              </div>

              <div className="bg-gray-700/50 rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gray-800">
                      <tr className="border-b border-gray-600">
                        {columns.map(col => (
                          <th key={col} className="px-4 py-3 text-left text-gray-300 font-medium whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-center text-gray-300 font-medium w-20">
                          작업
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(row => (
                        <tr key={row.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                          {columns.map(col => (
                            <td key={col} className="px-2 py-2">
                              <input
                                type="text"
                                value={row[col]}
                                onChange={(e) => handleCellEdit(row.id, col, e.target.value)}
                                className="w-full px-2 py-1 bg-gray-600 text-white rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </td>
                          ))}
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => handleDeleteRow(row.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-750">
          <div className="text-gray-400 text-sm">
            총 <span className="text-white font-semibold">{data.length}</span>개 행
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSaveData}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save size={18} />
              <span className="font-semibold">저장 및 갱신</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}