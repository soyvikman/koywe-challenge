export interface Quote {
  _id: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  expiresAt: string;
}
