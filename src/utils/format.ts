export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    console.log('formatDate received undefined date');
    return 'N/A';
  }
  
  try {
    console.log('Formatting date:', dateString);
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.log('Invalid date:', dateString);
      return 'N/A';
    }
    
    const formatted = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
    
    console.log('Formatted date:', formatted);
    return formatted;
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'N/A';
  }
}; 