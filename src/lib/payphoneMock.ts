export const initiatePayment = (amount: number, userData: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, transactionId: 'mock_12345' });
    }, 2000);
  });
};