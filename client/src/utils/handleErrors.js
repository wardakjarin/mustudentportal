export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('API Error Response:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
    
    if (error.response.status === 401) {
      return 'Session expired. Please login again.';
    }
    
    return error.response.data.message || 'An error occurred with the server';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Request Error:', error.request);
    return 'No response from server. Please check your connection.';
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Setup Error:', error.message);
    return 'An unexpected error occurred';
  }
};

export const displayError = (error, setError) => {
  const errorMessage = handleApiError(error);
  setError(errorMessage);
  setTimeout(() => setError(null), 3000);
};