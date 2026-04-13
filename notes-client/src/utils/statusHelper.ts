export interface StatusStyle {
  badge: string;
  dot: string;
}

export const getStatusStyle = (statusName: string): StatusStyle => {
  const name = statusName?.toLowerCase();
  if (name?.includes('progress')) {
    return {
      badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
      dot: 'bg-blue-500',
    };
  }
  if (name?.includes('done') || name?.includes('виконано')) {
    return {
      badge: 'bg-green-50 text-green-700 ring-1 ring-green-200',
      dot: 'bg-green-500',
    };
  }
  // To Do / default
  return {
    badge: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
    dot: 'bg-gray-400',
  };
};