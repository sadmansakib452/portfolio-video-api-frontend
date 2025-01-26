import { ReactNode } from 'react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isUpward: boolean;
  };
}

const StatisticsCard = ({
  title,
  value,
  icon,
  description,
  trend,
}: StatisticsCardProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {value}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {icon}
        </div>
      </div>

      {(description || trend) && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium">{description}</span>
          {trend && (
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                trend.isUpward ? 'text-meta-3' : 'text-meta-5'
              }`}
            >
              {trend.isUpward ? '+' : '-'}
              {trend.value}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;
