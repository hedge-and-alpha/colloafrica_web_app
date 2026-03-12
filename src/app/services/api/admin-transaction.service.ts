import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// Transaction Interfaces
export interface TransactionListItem {
  id: number;
  reference: string;
  type: 'deposit' | 'withdrawal' | 'contribution' | 'disbursement' | 'transfer' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'flagged';
  userId: number;
  userName: string;
  userEmail: string;
  description: string;
  paymentMethod: string;
  gatewayResponse?: string;
  mgrId?: number;
  mgrName?: string;
  createdAt: string;
  completedAt?: string;
  fees: number;
  netAmount: number;
  ipAddress: string;
  userAgent: string;
  riskScore: number;
  flaggedReason?: string;
}

export interface TransactionDetails extends TransactionListItem {
  metadata: {
    gateway: string;
    gatewayTransactionId?: string;
    gatewayReference?: string;
    originalAmount?: number;
    exchangeRate?: number;
    processingTime?: number;
    retryCount?: number;
    webhookReceived?: boolean;
  };
  participants?: {
    senderId?: number;
    senderName?: string;
    receiverId?: number;
    receiverName?: string;
  };
  auditTrail: TransactionAuditEntry[];
  relatedTransactions?: RelatedTransaction[];
}

export interface TransactionAuditEntry {
  id: number;
  action: string;
  adminId: number;
  adminName: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface RelatedTransaction {
  id: number;
  reference: string;
  type: string;
  amount: number;
  status: string;
  relationship: 'parent' | 'child' | 'reversal' | 'refund';
  createdAt: string;
}

export interface TransactionFilters {
  search?: string;
  type?: string;
  status?: string;
  paymentMethod?: string;
  userId?: number;
  mgrId?: number;
  amountRange?: { min: number; max: number };
  dateRange?: { start: string; end: string };
  riskLevel?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

export interface TransactionAnalytics {
  totalVolume: number;
  totalRevenue: number;
  totalFees: number;
  transactionCount: number;
  averageTransactionSize: number;
  successRate: number;
  topPaymentMethods: PaymentMethodStats[];
  revenueByType: TypeRevenueStats[];
  volumeByPeriod: VolumeByPeriod[];
  riskMetrics: RiskMetrics;
}

export interface PaymentMethodStats {
  method: string;
  count: number;
  volume: number;
  successRate: number;
}

export interface TypeRevenueStats {
  type: string;
  volume: number;
  revenue: number;
  count: number;
}

export interface VolumeByPeriod {
  period: string;
  volume: number;
  count: number;
  revenue: number;
}

export interface RiskMetrics {
  flaggedTransactions: number;
  highRiskTransactions: number;
  averageRiskScore: number;
  fraudDetected: number;
}

export interface TransactionStatusUpdate {
  status: 'completed' | 'failed' | 'cancelled' | 'flagged';
  reason: string;
  adminNote: string;
  notifyUser: boolean;
  refundAmount?: number;
}

export interface RefundRequest {
  amount: number;
  reason: string;
  type: 'full' | 'partial';
  adminNote: string;
  notifyUser: boolean;
}

export interface PaginatedTransactionResponse {
  data: TransactionListItem[];
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminTransactionService {

  constructor() { }

  // Get transactions with filtering and pagination
  getTransactions(filters: TransactionFilters = {}): Observable<PaginatedTransactionResponse> {
    return of(this.getMockTransactions(filters)).pipe(
      delay(800),
      map(data => this.applyFilters(data, filters))
    );
  }

  // Get transaction details
  getTransactionDetails(transactionId: number): Observable<TransactionDetails> {
    return of(this.getMockTransactionDetails(transactionId)).pipe(delay(600));
  }

  // Update transaction status
  updateTransactionStatus(transactionId: number, update: TransactionStatusUpdate): Observable<any> {
    return of({
      success: true,
      message: `Transaction ${update.status} successfully`,
      transactionId,
      newStatus: update.status
    }).pipe(delay(1000));
  }

  // Process refund
  processRefund(transactionId: number, refund: RefundRequest): Observable<any> {
    return of({
      success: true,
      message: 'Refund processed successfully',
      refundId: Math.floor(Math.random() * 1000000),
      amount: refund.amount,
      transactionId
    }).pipe(delay(1500));
  }

  // Get transaction analytics
  getTransactionAnalytics(dateRange?: { start: string; end: string }): Observable<TransactionAnalytics> {
    return of(this.getMockAnalytics()).pipe(delay(1000));
  }

  // Export transactions
  exportTransactions(filters: TransactionFilters, format: 'csv' | 'excel'): Observable<Blob> {
    const csvContent = this.generateTransactionCSV(filters);
    const blob = new Blob([csvContent], { 
      type: format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    return of(blob).pipe(delay(2000));
  }

  // Flag transaction for review
  flagTransaction(transactionId: number, reason: string, adminNote: string): Observable<any> {
    return of({
      success: true,
      message: 'Transaction flagged for review',
      transactionId,
      flaggedReason: reason
    }).pipe(delay(800));
  }

  // Approve flagged transaction
  approveTransaction(transactionId: number, adminNote: string): Observable<any> {
    return of({
      success: true,
      message: 'Transaction approved',
      transactionId
    }).pipe(delay(1000));
  }

  // Get payment gateway status
  getPaymentGatewayStatus(): Observable<any> {
    return of({
      gateways: [
        { name: 'Paystack', status: 'active', uptime: 99.9, lastCheck: new Date().toISOString() },
        { name: 'Flutterwave', status: 'active', uptime: 99.7, lastCheck: new Date().toISOString() },
        { name: 'Bank Transfer', status: 'active', uptime: 98.5, lastCheck: new Date().toISOString() }
      ]
    }).pipe(delay(500));
  }

  // Private helper methods
  private getMockTransactions(filters: TransactionFilters): TransactionListItem[] {
    return [
      {
        id: 1,
        reference: 'TXN-2024-001',
        type: 'contribution',
        amount: 50000,
        currency: 'NGN',
        status: 'completed',
        userId: 1,
        userName: 'John Adebayo',
        userEmail: 'john@example.com',
        description: 'Monthly contribution to Lagos Professionals MGR',
        paymentMethod: 'Paystack',
        mgrId: 1,
        mgrName: 'Lagos Professionals MGR',
        createdAt: '2024-01-15T10:30:00Z',
        completedAt: '2024-01-15T10:32:00Z',
        fees: 750,
        netAmount: 49250,
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0...',
        riskScore: 15
      },
      {
        id: 2,
        reference: 'TXN-2024-002',
        type: 'withdrawal',
        amount: 100000,
        currency: 'NGN',
        status: 'pending',
        userId: 2,
        userName: 'Sarah Okafor',
        userEmail: 'sarah@example.com',
        description: 'Withdrawal to bank account',
        paymentMethod: 'Bank Transfer',
        createdAt: '2024-01-15T14:20:00Z',
        fees: 500,
        netAmount: 99500,
        ipAddress: '192.168.1.105',
        userAgent: 'Mozilla/5.0...',
        riskScore: 25
      },
      {
        id: 3,
        reference: 'TXN-2024-003',
        type: 'disbursement',
        amount: 500000,
        currency: 'NGN',
        status: 'completed',
        userId: 3,
        userName: 'Michael Okonkwo',
        userEmail: 'michael@example.com',
        description: 'MGR payout - Position 1',
        paymentMethod: 'Flutterwave',
        mgrId: 1,
        mgrName: 'Lagos Professionals MGR',
        createdAt: '2024-01-15T16:45:00Z',
        completedAt: '2024-01-15T16:47:00Z',
        fees: 2500,
        netAmount: 497500,
        ipAddress: '192.168.1.110',
        userAgent: 'Mozilla/5.0...',
        riskScore: 10
      },
      {
        id: 4,
        reference: 'TXN-2024-004',
        type: 'deposit',
        amount: 75000,
        currency: 'NGN',
        status: 'failed',
        userId: 4,
        userName: 'Grace Ikechukwu',
        userEmail: 'grace@example.com',
        description: 'Wallet funding',
        paymentMethod: 'Paystack',
        gatewayResponse: 'Insufficient funds',
        createdAt: '2024-01-15T18:10:00Z',
        fees: 0,
        netAmount: 0,
        ipAddress: '192.168.1.115',
        userAgent: 'Mozilla/5.0...',
        riskScore: 35
      },
      {
        id: 5,
        reference: 'TXN-2024-005',
        type: 'transfer',
        amount: 25000,
        currency: 'NGN',
        status: 'flagged',
        userId: 5,
        userName: 'David Emeka',
        userEmail: 'david@example.com',
        description: 'P2P transfer',
        paymentMethod: 'Internal',
        createdAt: '2024-01-15T20:30:00Z',
        fees: 100,
        netAmount: 24900,
        ipAddress: '192.168.1.120',
        userAgent: 'Mozilla/5.0...',
        riskScore: 85,
        flaggedReason: 'High risk score - unusual activity pattern'
      }
    ];
  }

  private getMockTransactionDetails(transactionId: number): TransactionDetails {
    const baseTransaction = this.getMockTransactions({}).find(t => t.id === transactionId) || this.getMockTransactions({})[0];
    
    return {
      ...baseTransaction,
      metadata: {
        gateway: 'Paystack',
        gatewayTransactionId: 'ps_txn_12345',
        gatewayReference: 'ps_ref_67890',
        originalAmount: baseTransaction.amount,
        exchangeRate: 1,
        processingTime: 2.5,
        retryCount: 0,
        webhookReceived: true
      },
      participants: {
        senderId: baseTransaction.userId,
        senderName: baseTransaction.userName,
        receiverId: 999,
        receiverName: 'Collo Platform'
      },
      auditTrail: [
        {
          id: 1,
          action: 'Transaction Created',
          adminId: 1,
          adminName: 'System',
          details: 'Transaction initiated by user',
          timestamp: baseTransaction.createdAt,
          ipAddress: baseTransaction.ipAddress
        },
        {
          id: 2,
          action: 'Payment Processed',
          adminId: 1,
          adminName: 'System',
          details: 'Payment gateway response received',
          timestamp: baseTransaction.completedAt || baseTransaction.createdAt,
          ipAddress: '10.0.0.1'
        }
      ],
      relatedTransactions: [
        {
          id: 101,
          reference: 'TXN-2024-FEE-001',
          type: 'fee',
          amount: baseTransaction.fees,
          status: 'completed',
          relationship: 'child',
          createdAt: baseTransaction.createdAt
        }
      ]
    };
  }

  private getMockAnalytics(): TransactionAnalytics {
    return {
      totalVolume: 12500000,
      totalRevenue: 186750,
      totalFees: 156750,
      transactionCount: 1247,
      averageTransactionSize: 100240,
      successRate: 94.2,
      topPaymentMethods: [
        { method: 'Paystack', count: 654, volume: 6547000, successRate: 96.1 },
        { method: 'Flutterwave', count: 423, volume: 4235000, successRate: 93.8 },
        { method: 'Bank Transfer', count: 170, volume: 1718000, successRate: 89.4 }
      ],
      revenueByType: [
        { type: 'contribution', volume: 8750000, revenue: 131250, count: 875 },
        { type: 'withdrawal', volume: 2100000, revenue: 21000, count: 210 },
        { type: 'disbursement', volume: 1500000, revenue: 22500, count: 150 },
        { type: 'deposit', volume: 150000, revenue: 12000, count: 12 }
      ],
      volumeByPeriod: [
        { period: '2024-01-01', volume: 1200000, count: 120, revenue: 18000 },
        { period: '2024-01-02', volume: 1450000, count: 145, revenue: 21750 },
        { period: '2024-01-03', volume: 1100000, count: 110, revenue: 16500 },
        { period: '2024-01-04', volume: 1650000, count: 165, revenue: 24750 },
        { period: '2024-01-05', volume: 1350000, count: 135, revenue: 20250 }
      ],
      riskMetrics: {
        flaggedTransactions: 23,
        highRiskTransactions: 67,
        averageRiskScore: 28.5,
        fraudDetected: 3
      }
    };
  }

  private applyFilters(data: TransactionListItem[], filters: TransactionFilters): PaginatedTransactionResponse {
    let filteredData = [...data];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredData = filteredData.filter(transaction =>
        transaction.reference.toLowerCase().includes(searchTerm) ||
        transaction.userName.toLowerCase().includes(searchTerm) ||
        transaction.userEmail.toLowerCase().includes(searchTerm) ||
        transaction.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply type filter
    if (filters.type) {
      filteredData = filteredData.filter(transaction => transaction.type === filters.type);
    }

    // Apply status filter
    if (filters.status) {
      filteredData = filteredData.filter(transaction => transaction.status === filters.status);
    }

    // Apply payment method filter
    if (filters.paymentMethod) {
      filteredData = filteredData.filter(transaction => transaction.paymentMethod === filters.paymentMethod);
    }

    // Apply amount range filter
    if (filters.amountRange) {
      filteredData = filteredData.filter(transaction =>
        transaction.amount >= filters.amountRange!.min &&
        transaction.amount <= filters.amountRange!.max
      );
    }

    // Apply risk level filter
    if (filters.riskLevel) {
      filteredData = filteredData.filter(transaction => {
        if (filters.riskLevel === 'low') return transaction.riskScore < 30;
        if (filters.riskLevel === 'medium') return transaction.riskScore >= 30 && transaction.riskScore < 70;
        if (filters.riskLevel === 'high') return transaction.riskScore >= 70;
        return true;
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredData.sort((a, b) => {
        let aValue: any = a[filters.sortBy as keyof TransactionListItem];
        let bValue: any = b[filters.sortBy as keyof TransactionListItem];

        if (filters.sortBy === 'createdAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (filters.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    // Apply pagination
    const page = filters.page || 1;
    const perPage = filters.perPage || 10;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = filteredData.slice(start, end);

    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      totalPages: Math.ceil(filteredData.length / perPage),
      perPage
    };
  }

  private generateTransactionCSV(filters: TransactionFilters): string {
    const transactions = this.getMockTransactions(filters);
    const headers = ['Reference', 'Type', 'Amount', 'Status', 'User', 'Description', 'Payment Method', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.reference,
        t.type,
        t.amount,
        t.status,
        t.userName,
        `"${t.description}"`,
        t.paymentMethod,
        t.createdAt
      ].join(','))
    ].join('\n');

    return csvContent;
  }
} 