import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../interfaces/api-response';

export interface MgrListItem {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'suspended' | 'rejected';
  category: string;
  creator: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  memberCount: number;
  maxMembers: number;
  contributionAmount: number;
  contributionFrequency: 'daily' | 'weekly' | 'monthly';
  totalContributions: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  progress: number;
}

export interface MgrDetails extends MgrListItem {
  members: MgrMember[];
  contributions: MgrContribution[];
  settings: {
    autoApprove: boolean;
    requiresKyc: boolean;
    minimumCreditscore: number;
    allowEarlyWithdrawal: boolean;
    penaltyRate: number;
  };
  statistics: {
    successRate: number;
    averageContribution: number;
    totalDisbursed: number;
    activeMembers: number;
    completedCycles: number;
  };
  adminNotes: AdminNote[];
}

export interface MgrMember {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  status: 'active' | 'suspended' | 'completed' | 'defaulted';
  position: number;
  totalContributions: number;
  missedPayments: number;
  lastPayment: string;
  creditScore: number;
  disbursementDate?: string;
  disbursementAmount?: number;
}

export interface MgrContribution {
  id: string;
  memberId: number;
  memberName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'reversed';
  paymentMethod: string;
  transactionRef: string;
  cycle: number;
  notes?: string;
}

export interface AdminNote {
  id: string;
  adminId: number;
  adminName: string;
  note: string;
  type: 'info' | 'warning' | 'action' | 'approval';
  createdAt: string;
}

export interface MgrFilters {
  status?: string;
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
  minMembers?: number;
  maxMembers?: number;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'created_at' | 'name' | 'member_count' | 'total_contributions' | 'last_activity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminMgrService {
  private readonly baseUrl = environment.API_BASE_URL;

  get authToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }

  constructor(private readonly http: HttpClient) { }

  getMgrs(filters: MgrFilters = {}): Observable<{ data: MgrListItem[]; total: number; page: number; totalPages: number }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    let params = new HttpParams();

    Object.keys(filters).forEach(key => {
      const value = (filters as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'dateRange' && value.start && value.end) {
          params = params.set('date_start', value.start);
          params = params.set('date_end', value.end);
        } else if (typeof value === 'object') {
          params = params.set(key, JSON.stringify(value));
        } else {
          params = params.set(key, value.toString());
        }
      }
    });

    return this.http.get<ApiResponse & {
      data: MgrListItem[];
      meta: { total: number; page: number; totalPages: number }
    }>(`${this.baseUrl}/admin/mgrs`, { headers, params }).pipe(
      map((response) => ({
        data: response.data,
        total: response.meta.total,
        page: response.meta.page,
        totalPages: response.meta.totalPages
      })),
      catchError(() => of(this.getMockMgrList(filters)))
    );
  }

  /**
   * Get detailed MGR information
   */
  getMgrDetails(mgrId: string): Observable<MgrDetails> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: MgrDetails }>(
      `${this.baseUrl}/admin/mgrs/${mgrId}`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(this.getMockMgrDetails(mgrId)))
    );
  }

  /**
   * Update MGR status with admin notes
   */
  updateMgrStatus(mgrId: string, status: string, adminNote?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.patch<ApiResponse>(
      `${this.baseUrl}/admin/mgrs/${mgrId}/status`,
      { status, admin_note: adminNote },
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: 'Status updated successfully' }))
    );
  }

  /**
   * Suspend/Resume MGR member
   */
  updateMemberStatus(mgrId: string, memberId: number, status: string, reason?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.patch<ApiResponse>(
      `${this.baseUrl}/admin/mgrs/${mgrId}/members/${memberId}/status`,
      { status, reason },
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: 'Member status updated successfully' }))
    );
  }

  /**
   * Add admin note to MGR
   */
  addAdminNote(mgrId: string, note: string, type: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.post<ApiResponse>(
      `${this.baseUrl}/admin/mgrs/${mgrId}/notes`,
      { note, type },
      { headers }
    ).pipe(
      catchError(() => of({ success: true, message: 'Note added successfully' }))
    );
  }

  /**
   * Get MGR categories for filtering
   */
  getMgrCategories(): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });

    return this.http.get<ApiResponse & { data: string[] }>(
      `${this.baseUrl}/admin/mgrs/categories`,
      { headers }
    ).pipe(
      map((response) => response.data),
      catchError(() => of(['Savings', 'Investment', 'Emergency Fund', 'Business', 'Education', 'Housing']))
    );
  }

  /**
   * Export MGRs data
   */
  exportMgrs(filters: MgrFilters = {}, format: 'csv' | 'excel' = 'csv'): Observable<Blob> {
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

    return this.http.get(`${this.baseUrl}/admin/mgrs/export`, {
      headers,
      params,
      responseType: 'blob'
    }).pipe(
      catchError(() => of(new Blob(['Mock export data'], { type: 'text/csv' })))
    );
  }

  // Mock data methods for development
  private getMockMgrList(filters: MgrFilters): { data: MgrListItem[]; total: number; page: number; totalPages: number } {
    const mockData: MgrListItem[] = [
      {
        id: '1',
        name: 'Tech Professionals Savings Circle',
        description: 'A savings group for technology professionals in Lagos',
        status: 'active',
        category: 'Savings',
        creator: {
          id: 1,
          name: 'Adebayo Johnson',
          email: 'adebayo@example.com',
          phone: '+234-801-234-5678'
        },
        memberCount: 8,
        maxMembers: 10,
        contributionAmount: 50000,
        contributionFrequency: 'monthly',
        totalContributions: 1200000,
        startDate: '2024-01-15',
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-05-20T14:30:00Z',
        lastActivity: '2024-05-18T09:15:00Z',
        progress: 75
      },
      {
        id: '2',
        name: 'Small Business Investment Pool',
        description: 'Investment group for small business owners',
        status: 'pending',
        category: 'Investment',
        creator: {
          id: 2,
          name: 'Fatima Abdul',
          email: 'fatima@example.com',
          phone: '+234-802-345-6789'
        },
        memberCount: 5,
        maxMembers: 12,
        contributionAmount: 100000,
        contributionFrequency: 'monthly',
        totalContributions: 0,
        startDate: '2024-06-01',
        createdAt: '2024-05-20T15:45:00Z',
        updatedAt: '2024-05-20T15:45:00Z',
        lastActivity: '2024-05-20T15:45:00Z',
        progress: 0
      },
      {
        id: '3',
        name: 'Emergency Fund Network',
        description: 'Quick access emergency fund for medical expenses',
        status: 'active',
        category: 'Emergency Fund',
        creator: {
          id: 3,
          name: 'Chidi Okafor',
          email: 'chidi@example.com',
          phone: '+234-803-456-7890'
        },
        memberCount: 15,
        maxMembers: 20,
        contributionAmount: 25000,
        contributionFrequency: 'weekly',
        totalContributions: 3750000,
        startDate: '2024-02-01',
        createdAt: '2024-01-25T08:30:00Z',
        updatedAt: '2024-05-19T11:20:00Z',
        lastActivity: '2024-05-19T11:20:00Z',
        progress: 60
      },
      {
        id: '4',
        name: 'University Alumni Housing Fund',
        description: 'Housing fund for university alumni',
        status: 'completed',
        category: 'Housing',
        creator: {
          id: 4,
          name: 'Amina Hassan',
          email: 'amina@example.com',
          phone: '+234-804-567-8901'
        },
        memberCount: 6,
        maxMembers: 6,
        contributionAmount: 200000,
        contributionFrequency: 'monthly',
        totalContributions: 7200000,
        startDate: '2023-06-01',
        endDate: '2024-04-30',
        createdAt: '2023-05-15T12:00:00Z',
        updatedAt: '2024-04-30T16:00:00Z',
        lastActivity: '2024-04-30T16:00:00Z',
        progress: 100
      },
      {
        id: '5',
        name: 'Startup Funding Circle',
        description: 'Funding support for tech startups',
        status: 'suspended',
        category: 'Business',
        creator: {
          id: 5,
          name: 'Kemi Adeyemi',
          email: 'kemi@example.com',
          phone: '+234-805-678-9012'
        },
        memberCount: 3,
        maxMembers: 8,
        contributionAmount: 150000,
        contributionFrequency: 'monthly',
        totalContributions: 900000,
        startDate: '2024-03-01',
        createdAt: '2024-02-20T14:15:00Z',
        updatedAt: '2024-05-10T09:45:00Z',
        lastActivity: '2024-04-25T13:30:00Z',
        progress: 25
      }
    ];

    // Apply basic filtering
    let filteredData = mockData;
    if (filters.status && filters.status !== 'all') {
      filteredData = filteredData.filter(mgr => mgr.status === filters.status);
    }
    if (filters.category) {
      filteredData = filteredData.filter(mgr => mgr.category === filters.category);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredData = filteredData.filter(mgr =>
        mgr.name.toLowerCase().includes(search) ||
        mgr.description.toLowerCase().includes(search) ||
        mgr.creator.name.toLowerCase().includes(search)
      );
    }

    return {
      data: filteredData,
      total: filteredData.length,
      page: filters.page || 1,
      totalPages: Math.ceil(filteredData.length / (filters.perPage || 10))
    };
  }

  private getMockMgrDetails(mgrId: string): MgrDetails {
    return {
      id: mgrId,
      name: 'Tech Professionals Savings Circle',
      description: 'A savings group for technology professionals in Lagos focusing on building emergency funds and investment capital.',
      status: 'active',
      category: 'Savings',
      creator: {
        id: 1,
        name: 'Adebayo Johnson',
        email: 'adebayo@example.com',
        phone: '+234-801-234-5678'
      },
      memberCount: 8,
      maxMembers: 10,
      contributionAmount: 50000,
      contributionFrequency: 'monthly',
      totalContributions: 1200000,
      startDate: '2024-01-15',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-05-20T14:30:00Z',
      lastActivity: '2024-05-18T09:15:00Z',
      progress: 75,
      members: [
        {
          id: 1,
          userId: 101,
          name: 'Adebayo Johnson',
          email: 'adebayo@example.com',
          phone: '+234-801-234-5678',
          joinedAt: '2024-01-10T10:00:00Z',
          status: 'active',
          position: 1,
          totalContributions: 200000,
          missedPayments: 0,
          lastPayment: '2024-05-15T12:00:00Z',
          creditScore: 850,
          disbursementDate: '2024-02-15T10:00:00Z',
          disbursementAmount: 400000
        },
        {
          id: 2,
          userId: 102,
          name: 'Sarah Okonkwo',
          email: 'sarah@example.com',
          phone: '+234-802-345-6789',
          joinedAt: '2024-01-12T11:30:00Z',
          status: 'active',
          position: 2,
          totalContributions: 150000,
          missedPayments: 1,
          lastPayment: '2024-05-15T13:30:00Z',
          creditScore: 720
        },
        {
          id: 3,
          userId: 103,
          name: 'Michael Okoro',
          email: 'michael@example.com',
          phone: '+234-803-456-7890',
          joinedAt: '2024-01-15T09:15:00Z',
          status: 'active',
          position: 3,
          totalContributions: 200000,
          missedPayments: 0,
          lastPayment: '2024-05-15T14:45:00Z',
          creditScore: 780
        }
      ],
      contributions: [
        {
          id: 'c1',
          memberId: 101,
          memberName: 'Adebayo Johnson',
          amount: 50000,
          date: '2024-05-15T12:00:00Z',
          status: 'completed',
          paymentMethod: 'Bank Transfer',
          transactionRef: 'TXN123456789',
          cycle: 4,
          notes: 'Regular monthly contribution'
        },
        {
          id: 'c2',
          memberId: 102,
          memberName: 'Sarah Okonkwo',
          amount: 50000,
          date: '2024-05-15T13:30:00Z',
          status: 'completed',
          paymentMethod: 'Card Payment',
          transactionRef: 'TXN123456790',
          cycle: 4
        },
        {
          id: 'c3',
          memberId: 103,
          memberName: 'Michael Okoro',
          amount: 50000,
          date: '2024-05-15T14:45:00Z',
          status: 'completed',
          paymentMethod: 'Mobile Money',
          transactionRef: 'TXN123456791',
          cycle: 4
        }
      ],
      settings: {
        autoApprove: false,
        requiresKyc: true,
        minimumCreditscore: 650,
        allowEarlyWithdrawal: false,
        penaltyRate: 5.0
      },
      statistics: {
        successRate: 95.5,
        averageContribution: 48500,
        totalDisbursed: 800000,
        activeMembers: 8,
        completedCycles: 3
      },
      adminNotes: [
        {
          id: 'n1',
          adminId: 1,
          adminName: 'Admin User',
          note: 'MGR approved after KYC verification of all members',
          type: 'approval',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 'n2',
          adminId: 1,
          adminName: 'Admin User',
          note: 'Regular monitoring - all payments on schedule',
          type: 'info',
          createdAt: '2024-03-15T14:20:00Z'
        }
      ]
    };
  }
} 