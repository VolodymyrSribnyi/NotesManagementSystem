export const getStatusText = (status: number) => {
    const statusMap: Record<number,string> = {
        0: 'Done',     // 
        1: 'In Process',    // 
        2: 'NotS tarted', // 
        3: 'Planned'   // 
    };
    return statusMap[status] || 'Unknown';
};