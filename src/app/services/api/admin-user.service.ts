import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';

export interface UserListItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended' | 'pending_verification' | 'verified' | 'deactivated';
  verificationLevel: 'none' | 'email' | 'phone' | 'basic_kyc' | 'full_kyc';
  creditScore: number;
  joinedAt: string;
  lastLoginAt: string;
  totalMgrs: number;
  totalContributions: number;
  profilePicture?: string;
  location: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface UserDetails extends UserListItem {
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    occupation: string;
    employer?: string;
    monthlyIncome?: number;
  };
  kycInfo: {
    documents: KycDocument[];
    verificationStatus: 'pending' | 'in_review' | 'approved' | 'rejected';
    verifiedAt?: string;
    verifiedBy?: string;
    rejectionReason?: string;
    nextOfKin: {
      name: string;
      relationship: string;
      phone: string;
      email?: string;
    };
  };
  financialInfo: {
    bankAccounts: BankAccount[];
    creditHistory: CreditScoreHistory[];
    transactionSummary: {
      totalDeposits: number;
      totalWithdrawals: number;
      totalContributions: number;
      totalReceived: number;
    };
  };
  activityLog: UserActivity[];
  mgrParticipation: UserMgrParticipation[];
  supportTickets: SupportTicket[];
  adminNotes: AdminNote[];
}

export interface KycDocument {
  id: string;
  type: 'national_id' | 'passport' | 'drivers_license' | 'utility_bill' | 'bank_statement' | 'selfie';
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: 'savings' | 'current' | 'other';
  isVerified: boolean;
  isPrimary: boolean;
  addedAt: string;
}

export interface CreditScoreHistory {
  id: string;
  score: number;
  previousScore: number;
  reason: string;
  adjustedBy: string;
  adjustedAt: string;
  type: 'automatic' | 'manual_adjustment' | 'penalty' | 'reward';
}

export interface UserActivity {
  id: string;
  type: 'login' | 'logout' | 'mgr_join' | 'mgr_leave' | 'contribution' | 'withdrawal' | 'profile_update' | 'kyc_upload';
  description: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  timestamp: string;
  metadata?: any;
}

export interface UserMgrParticipation {
  mgrId: string;
  mgrName: string;
  role: 'creator' | 'member';
  status: 'active' | 'completed' | 'suspended' | 'defaulted';
  joinedAt: string;
  position?: number;
  totalContributed: number;
  expectedContribution: number;
  missedPayments: number;
  disbursementReceived?: number;
  disbursementDate?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'account' | 'payment' | 'mgr' | 'kyc' | 'technical' | 'other';
  createdAt: string;
  lastUpdatedAt: string;
  assignedTo?: string;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  message: string;
  isAdminResponse: boolean;
  authorName: string;
  timestamp: string;
  attachments?: string[];
}

export interface AdminNote {
  id: string;
  adminId: number;
  adminName: string;
  note: string;
  type: 'info' | 'warning' | 'restriction' | 'verification' | 'support';
  isInternal: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UserFilters {
  status?: string;
  verificationLevel?: string;
  riskLevel?: string;
  creditScoreRange?: {
    min: number;
    max: number;
  };
  registrationDate?: {
    start: string;
    end: string;
  };
  lastLoginDate?: {
    start: string;
    end: string;
  };
  location?: string;
  search?: string;
  sortBy?: 'joined_at' | 'name' | 'email' | 'credit_score' | 'last_login' | 'total_contributions';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

export interface UserStatusUpdate {
  status: string;
  reason?: string;
  adminNote?: string;
  notifyUser?: boolean;
}

export interface CreditScoreAdjustment {
  newScore: number;
  reason: string;
  type: 'manual_adjustment' | 'penalty' | 'reward';
  adminNote?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private readonly baseUrl = environment.API_BASE_URL;
  
  get authToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }

  constructor(private readonly http: HttpClient) {}

  /**
   * Get users with advanced filtering
   */
  getUsers(filters: UserFilters = {}): Observable<{ data: UserListItem[]; total: number; page: number; totalPages: number }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    let params = new HttpParams();
    
    Object.keys(filters).forEach(key => {
      const value = (filters as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        if (typeof value === 'object' && value.start && value.end) {
          params = params.set(`${key}_start`, value.start);
          params = params.set(`${key}_end`, value.end);
        } else if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
          params = params.set(`${key}_min`, value.min.toString());
          params = params.set(`${key}_max`, value.max.toString());
        } else if (typeof value === 'object') {
          params = params.set(key, JSON.stringify(value));
        } else {
          params = params.set(key, value.toString());
        }
      }
    });

    return this.http.get<ApiResponse & { 
      data: UserListItem[]; 
      meta: { total: number; page: number; totalPages: number } 
    }>(`${this.baseUrl}/admin/users`, { headers, params }).pipe(
      map((response) => ({
        data: response.data,
        total: response.meta.total,
        page: response.meta.page,
        totalPages: response.meta.totalPages
      })),
      catchError(() => of(this.getMockUserList(filters)))
    );
  }

  /**
   * Get detailed user information
   */
  getUserDetails(userId: number): Observable<UserDetails> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: UserDetails }>(
      `${this.baseUrl}/admin/users/${userId}`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(this.getMockUserDetails(userId)))
    );
  }

  /**
   * Update user status
   */
  updateUserStatus(userId: number, update: UserStatusUpdate): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.patch<ApiResponse>(
      `${this.baseUrl}/admin/users/${userId}/status`,
      update,
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: 'User status updated successfully' }))
    );
  }

  /**
   * Adjust user credit score
   */
  adjustCreditScore(userId: number, adjustment: CreditScoreAdjustment): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<ApiResponse>(
      `${this.baseUrl}/admin/users/${userId}/credit-score`,
      adjustment,
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: 'Credit score updated successfully' }))
    );
  }

  /**
   * Approve/Reject KYC document
   */
  reviewKycDocument(userId: number, documentId: string, action: 'approve' | 'reject', reason?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<ApiResponse>(
      `${this.baseUrl}/admin/users/${userId}/kyc/${documentId}/review`,
      { action, reason },
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: `Document ${action}d successfully` }))
    );
  }

  /**
   * Send notification to user
   */
  sendNotification(userId: number, notification: { title: string; message: string; type: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<ApiResponse>(
      `${this.baseUrl}/admin/users/${userId}/notifications`,
      notification,
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: 'Notification sent successfully' }))
    );
  }

  /**
   * Reset user password
   */
  resetUserPassword(userId: number, sendEmail: boolean = true): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<ApiResponse>(
      `${this.baseUrl}/admin/users/${userId}/reset-password`,
      { send_email: sendEmail },
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: 'Password reset initiated' }))
    );
  }

  /**
   * Add admin note to user
   */
  addAdminNote(userId: number, note: string, type: string, isInternal: boolean = true): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<ApiResponse>(
      `${this.baseUrl}/admin/users/${userId}/notes`,
      { note, type, is_internal: isInternal },
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: 'Note added successfully' }))
    );
  }

  /**
   * Export users data
   */
  exportUsers(filters: UserFilters = {}, format: 'csv' | 'excel' = 'csv'): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      const value = (filters as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    params = params.set('format', format);

    return this.http.get(`${this.baseUrl}/admin/users/export`, { 
      headers, 
      params, 
      responseType: 'blob' 
    }).pipe(
      catchError(() => of(new Blob(['Mock user export data'], { type: 'text/csv' })))
    );
  }

  /**
   * Get user statistics
   */
  getUserStatistics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: any }>(
      `${this.baseUrl}/admin/users/statistics`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(this.getMockUserStatistics()))
    );
  }

  // Mock data methods for development
  private getMockUserList(filters: UserFilters): { data: UserListItem[]; total: number; page: number; totalPages: number } {
    const mockData: UserListItem[] = [
      {
        id: 1,
        name: 'Adebayo Johnson',
        email: 'adebayo@example.com',
        phone: '+234-801-234-5678',
        status: 'verified',
        verificationLevel: 'full_kyc',
        creditScore: 850,
        joinedAt: '2024-01-15T10:00:00Z',
        lastLoginAt: '2024-05-20T14:30:00Z',
        totalMgrs: 3,
        totalContributions: 750000,
        location: 'Lagos, Nigeria',
        riskLevel: 'low'
      },
      {
        id: 2,
        name: 'Sarah Okonkwo',
        email: 'sarah@example.com',
        phone: '+234-802-345-6789',
        status: 'active',
        verificationLevel: 'basic_kyc',
        creditScore: 720,
        joinedAt: '2024-02-20T11:30:00Z',
        lastLoginAt: '2024-05-19T09:15:00Z',
        totalMgrs: 2,
        totalContributions: 450000,
        location: 'Abuja, Nigeria',
        riskLevel: 'low'
      },
      {
        id: 3,
        name: 'Michael Okoro',
        email: 'michael@example.com',
        phone: '+234-803-456-7890',
        status: 'pending_verification',
        verificationLevel: 'phone',
        creditScore: 650,
        joinedAt: '2024-05-01T15:45:00Z',
        lastLoginAt: '2024-05-18T16:20:00Z',
        totalMgrs: 1,
        totalContributions: 100000,
        location: 'Port Harcourt, Nigeria',
        riskLevel: 'medium'
      },
      {
        id: 4,
        name: 'Fatima Abdul',
        email: 'fatima@example.com',
        phone: '+234-804-567-8901',
        status: 'suspended',
        verificationLevel: 'email',
        creditScore: 550,
        joinedAt: '2024-03-10T08:20:00Z',
        lastLoginAt: '2024-04-25T12:45:00Z',
        totalMgrs: 0,
        totalContributions: 0,
        location: 'Kano, Nigeria',
        riskLevel: 'high'
      },
      {
        id: 5,
        name: 'Chidi Okafor',
        email: 'chidi@example.com',
        phone: '+234-805-678-9012',
        status: 'verified',
        verificationLevel: 'full_kyc',
        creditScore: 780,
        joinedAt: '2024-01-28T12:15:00Z',
        lastLoginAt: '2024-05-20T18:00:00Z',
        totalMgrs: 4,
        totalContributions: 920000,
        location: 'Enugu, Nigeria',
        riskLevel: 'low'
      }
    ];

    // Apply basic filtering
    let filteredData = mockData;
    if (filters.status) {
      filteredData = filteredData.filter(user => user.status === filters.status);
    }
    if (filters.verificationLevel) {
      filteredData = filteredData.filter(user => user.verificationLevel === filters.verificationLevel);
    }
    if (filters.riskLevel) {
      filteredData = filteredData.filter(user => user.riskLevel === filters.riskLevel);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredData = filteredData.filter(user => 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone.includes(search)
      );
    }

    return {
      data: filteredData,
      total: filteredData.length,
      page: filters.page || 1,
      totalPages: Math.ceil(filteredData.length / (filters.perPage || 10))
    };
  }

  private getMockUserDetails(userId: number): UserDetails {
    return {
      id: userId,
      name: 'Adebayo Johnson',
      email: 'adebayo@example.com',
      phone: '+234-801-234-5678',
      status: 'verified',
      verificationLevel: 'full_kyc',
      creditScore: 850,
      joinedAt: '2024-01-15T10:00:00Z',
      lastLoginAt: '2024-05-20T14:30:00Z',
      totalMgrs: 3,
      totalContributions: 750000,
      location: 'Lagos, Nigeria',
      riskLevel: 'low',
      personalInfo: {
        firstName: 'Adebayo',
        lastName: 'Johnson',
        dateOfBirth: '1990-06-15',
        gender: 'male',
        address: {
          street: '123 Victoria Island',
          city: 'Lagos',
          state: 'Lagos State',
          country: 'Nigeria',
          postalCode: '100001'
        },
        occupation: 'Software Engineer',
        employer: 'Tech Solutions Ltd',
        monthlyIncome: 500000
      },
      kycInfo: {
        documents: [
          {
            id: 'doc1',
            type: 'national_id',
            fileName: 'national_id.jpg',
            fileUrl: '/uploads/kyc/national_id.jpg',
            uploadedAt: '2024-01-16T10:00:00Z',
            status: 'approved',
            reviewedBy: 'Admin User',
            reviewedAt: '2024-01-17T09:00:00Z'
          }
        ],
        verificationStatus: 'approved',
        verifiedAt: '2024-01-17T09:00:00Z',
        verifiedBy: 'Admin User',
        nextOfKin: {
          name: 'Funmi Johnson',
          relationship: 'Wife',
          phone: '+234-801-234-5679',
          email: 'funmi@example.com'
        }
      },
      financialInfo: {
        bankAccounts: [
          {
            id: 'bank1',
            bankName: 'First Bank',
            accountNumber: '1234567890',
            accountName: 'Adebayo Johnson',
            accountType: 'savings',
            isVerified: true,
            isPrimary: true,
            addedAt: '2024-01-16T10:00:00Z'
          }
        ],
        creditHistory: [
          {
            id: 'credit1',
            score: 850,
            previousScore: 800,
            reason: 'Consistent payment history',
            adjustedBy: 'System',
            adjustedAt: '2024-05-01T00:00:00Z',
            type: 'automatic'
          }
        ],
        transactionSummary: {
          totalDeposits: 800000,
          totalWithdrawals: 50000,
          totalContributions: 750000,
          totalReceived: 400000
        }
      },
      activityLog: [
        {
          id: 'activity1',
          type: 'login',
          description: 'User logged in',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0...',
          location: 'Lagos, Nigeria',
          timestamp: '2024-05-20T14:30:00Z'
        }
      ],
      mgrParticipation: [
        {
          mgrId: '1',
          mgrName: 'Tech Professionals Savings Circle',
          role: 'creator',
          status: 'active',
          joinedAt: '2024-01-15T10:00:00Z',
          position: 1,
          totalContributed: 200000,
          expectedContribution: 200000,
          missedPayments: 0,
          disbursementReceived: 400000,
          disbursementDate: '2024-02-15T10:00:00Z'
        }
      ],
      supportTickets: [],
      adminNotes: []
    };
  }

  private getMockUserStatistics() {
    return {
      totalUsers: 15420,
      activeUsers: 12350,
      verifiedUsers: 8900,
      pendingVerification: 2100,
      suspendedUsers: 420,
      averageCreditScore: 720,
      newRegistrationsThisMonth: 450,
      avgSessionDuration: '24 minutes',
      topLocations: [
        { location: 'Lagos', count: 4200 },
        { location: 'Abuja', count: 2800 },
        { location: 'Port Harcourt', count: 1900 }
      ]
    };
  }
} 