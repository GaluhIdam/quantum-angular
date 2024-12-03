export interface BillingDTO {
  billingNumber: string;
  payer: string;
  amount: string;
  collecctionRation: string;
  fic: string;
  date: string;
  overdue: string;
  status:
    | 'Draft'
    | 'Ongoing'
    | 'Offgoing'
    | 'System Client'
    | 'Confirmed'
    | 'Promised'
    | 'Difficult'
    | 'Non-Performing'
    | 'Installment'
    | 'Paid'
    | 'Completion'
    | 'Prebill'
    | 'Delete';
  secondment?: string;
}

export interface DetailBillingDTO {
  item: {
    billing: string;
    service: string;
  };
  baseAmount: string;
  discount: string;
  ammountAfterDisc: string;
}
