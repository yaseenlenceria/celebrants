import React, { useState } from 'react';
import { Download, Copy, Database, Play, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { exportAllCelebrants, ExportProgress, ExportResult } from '../services/dataExporter';

const AdminExport: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const startExport = async () => {
    setIsExporting(true);
    setError(null);
    setExportResult(null);
    setCopied(false);

    try {
      const result = await exportAllCelebrants((progressUpdate) => {
        setProgress(progressUpdate);
      });

      setExportResult(result);
      setProgress(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const downloadJson = () => {
    if (!exportResult) return;

    const blob = new Blob([JSON.stringify(exportResult, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `celebrants-live-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (!exportResult) return;

    try {
      await navigator.clipboard.writeText(JSON.stringify(exportResult, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-sage-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-champagne-100 p-3 rounded-2xl">
              <Database className="h-8 w-8 text-champagne-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-charcoal-800 font-serif">
                Data Export Tool
              </h1>
              <p className="text-charcoal-600">
                Export celebrant data from RapidAPI to static JSON
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
              <li>Click "Start Export" to fetch celebrants from all major UK & Ireland cities</li>
              <li>Wait for the export to complete (this may take 1-2 minutes)</li>
              <li>Click "Download JSON" to save the file</li>
              <li>
                Save the downloaded file to: <code className="bg-blue-100 px-2 py-1 rounded">C:\Users\Seenu\Desktop\website\data\celebrants-live.json</code>
              </li>
              <li>Refresh the Directory page to use the new static data</li>
            </ol>
          </div>
        </div>

        {/* Export Control */}
        <div className="bg-white rounded-3xl shadow-lg border border-sage-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-charcoal-800 mb-4">Export Control</h2>

          {!isExporting && !exportResult && (
            <button
              onClick={startExport}
              className="w-full bg-champagne hover:bg-champagne-600 text-white px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-md hover:shadow-lg"
            >
              <Play className="h-5 w-5" />
              Start Export
            </button>
          )}

          {isExporting && progress && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal-700">
                  {progress.status === 'fetching' ? 'Fetching' : 'Processing'} {progress.currentCity}...
                </span>
                <span className="text-sm text-charcoal-600">
                  City {progress.cityIndex} of {progress.totalCities}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-sage-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-champagne h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${(progress.cityIndex / progress.totalCities) * 100}%`,
                  }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-cream-100 rounded-xl p-4">
                  <p className="text-xs text-charcoal-600 uppercase tracking-wide">
                    Current City
                  </p>
                  <p className="text-2xl font-bold text-charcoal-800">
                    {progress.celebrantsInCity}
                  </p>
                  <p className="text-xs text-charcoal-500">celebrants found</p>
                </div>
                <div className="bg-cream-100 rounded-xl p-4">
                  <p className="text-xs text-charcoal-600 uppercase tracking-wide">
                    Total So Far
                  </p>
                  <p className="text-2xl font-bold text-charcoal-800">
                    {progress.totalCelebrants}
                  </p>
                  <p className="text-xs text-charcoal-500">total celebrants</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-charcoal-600">
                <Clock className="h-4 w-4 animate-spin" />
                <span>Export in progress, please wait...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Export Failed</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {exportResult && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Export Complete!</p>
                  <p className="text-sm text-green-700 mt-1">
                    Successfully exported {exportResult.metadata.totalCelebrants} celebrants
                    in {exportResult.metadata.exportDuration}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={downloadJson}
                  className="bg-champagne hover:bg-champagne-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-md hover:shadow-lg"
                >
                  <Download className="h-5 w-5" />
                  Download JSON
                </button>
                <button
                  onClick={copyToClipboard}
                  className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-colors shadow-md hover:shadow-lg"
                >
                  <Copy className="h-5 w-5" />
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>

              <button
                onClick={() => {
                  setExportResult(null);
                  setError(null);
                }}
                className="w-full bg-cream-200 hover:bg-cream-300 text-charcoal-800 px-6 py-3 rounded-2xl font-semibold transition-colors"
              >
                Start New Export
              </button>
            </div>
          )}
        </div>

        {/* Statistics Preview */}
        {exportResult && (
          <div className="bg-white rounded-3xl shadow-lg border border-sage-200 p-8">
            <h2 className="text-xl font-bold text-charcoal-800 mb-6">Export Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-champagne-50 to-champagne-100 rounded-xl p-6">
                <p className="text-sm text-champagne-700 uppercase tracking-wide mb-2">
                  Total Celebrants
                </p>
                <p className="text-4xl font-bold text-champagne-900">
                  {exportResult.metadata.totalCelebrants}
                </p>
              </div>

              <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-xl p-6">
                <p className="text-sm text-sage-700 uppercase tracking-wide mb-2">Countries</p>
                <p className="text-4xl font-bold text-sage-900">
                  {exportResult.metadata.countries.length}
                </p>
                <p className="text-xs text-sage-600 mt-2">
                  {exportResult.metadata.countries.join(', ')}
                </p>
              </div>

              <div className="bg-gradient-to-br from-ink-50 to-ink-100 rounded-xl p-6">
                <p className="text-sm text-ink-700 uppercase tracking-wide mb-2">Cities</p>
                <p className="text-4xl font-bold text-ink-900">
                  {exportResult.metadata.cities.length}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-cream-100 rounded-xl p-4">
              <h3 className="font-semibold text-charcoal-800 mb-3">Cities Covered:</h3>
              <div className="flex flex-wrap gap-2">
                {exportResult.metadata.cities.map((city) => (
                  <span
                    key={city}
                    className="bg-white border border-sage-200 px-3 py-1 rounded-full text-sm text-charcoal-700"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                <strong>Last Updated:</strong>{' '}
                {new Date(exportResult.lastUpdated).toLocaleString()}
              </p>
              <p className="text-sm text-blue-900 mt-1">
                <strong>Export Duration:</strong> {exportResult.metadata.exportDuration}
              </p>
              <p className="text-sm text-blue-900 mt-1">
                <strong>Data Source:</strong> {exportResult.source}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminExport;
