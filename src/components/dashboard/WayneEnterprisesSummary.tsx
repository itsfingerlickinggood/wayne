import React from 'react';
import { mockWayneEnterprises } from '../../data/mockData';
import { formatCurrency, formatLargeNumber, formatColorizedPercent } from '../../utils/formatters';
import { Building2, ChevronRight } from 'lucide-react';

const WayneEnterprisesSummary: React.FC = () => {
  // Get top 4 Wayne Enterprises subsidiaries by value
  const topEnterprises = [...mockWayneEnterprises]
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);
  
  // Calculate total value of all enterprises
  const totalEnterpriseValue = mockWayneEnterprises.reduce((sum, enterprise) => sum + enterprise.value, 0);
  
  return (
    <div className="wayne-card">
      <div className="p-4 border-b border-midnight-100 flex items-center justify-between">
        <div className="flex items-center">
          <Building2 className="h-5 w-5 text-wayne-blue mr-2" />
          <h3 className="text-base font-medium text-gray-200">Wayne Enterprises</h3>
        </div>
        <p className="text-lg font-bold">{formatCurrency(totalEnterpriseValue, 0)}</p>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {topEnterprises.map((enterprise) => {
            const performanceFormatted = formatColorizedPercent(enterprise.performance);
            
            return (
              <div 
                key={enterprise.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-midnight-200 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-200">{enterprise.name}</p>
                  <p className="text-xs text-gray-400">{enterprise.sector}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatLargeNumber(enterprise.value)}</p>
                  <p className={`text-xs ${performanceFormatted.className}`}>
                    {performanceFormatted.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="mt-4 w-full flex items-center justify-center p-2 text-sm text-wayne-blue hover:bg-midnight-200 rounded-md transition-colors">
          <span>View All Enterprises</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default WayneEnterprisesSummary;