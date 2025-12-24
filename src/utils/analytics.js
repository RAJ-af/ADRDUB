// Download tracking utility
export const trackDownload = () => {
  try {
    // Get current count from localStorage
    const currentCount = parseInt(localStorage.getItem('totalDownloads') || '10482', 10);
    const newCount = currentCount + 1;
    
    // Save new count
    localStorage.setItem('totalDownloads', newCount.toString());
    
    // Track download time
    const downloads = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    downloads.push({
      timestamp: new Date().toISOString(),
      count: newCount
    });
    
    // Keep only last 100 downloads
    if (downloads.length > 100) {
      downloads.splice(0, downloads.length - 100);
    }
    
    localStorage.setItem('downloadHistory', JSON.stringify(downloads));
    
    return newCount;
  } catch (error) {
    console.error('Failed to track download:', error);
    return null;
  }
};

export const getTotalDownloads = () => {
  try {
    return parseInt(localStorage.getItem('totalDownloads') || '10482', 10);
  } catch (error) {
    return 10482;
  }
};

export const getDownloadHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('downloadHistory') || '[]');
  } catch (error) {
    return [];
  }
};
