import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// Settings Interfaces
export interface PlatformSettings {
  general: GeneralSettings;
  business: BusinessSettings;
  security: SecuritySettings;
  features: FeatureSettings;
  notifications: NotificationSettings;
}

export interface GeneralSettings {
  platformName: string;
  platformDescription: string;
  companyName: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  websiteUrl: string;
  logoUrl: string;
  favicon: string;
  timezone: string;
  language: string;
  currency: string;
}

export interface BusinessSettings {
  mgrSettings: {
    minimumContribution: number;
    maximumContribution: number;
    defaultDuration: number; // months
    processingFee: number; // percentage
    penaltyRate: number; // percentage
    maxMissedPayments: number;
  };
  transactionSettings: {
    dailyTransactionLimit: number;
    monthlyTransactionLimit: number;
    withdrawalFee: number; // percentage
    transferFee: number; // flat rate
    minimumWithdrawal: number;
    processingTime: number; // hours
  };
  kycSettings: {
    requireKyc: boolean;
    documentExpiryDays: number;
    autoApprovalThreshold: number;
    maxDocumentSize: number; // MB
    allowedDocumentTypes: string[];
  };
}

export interface SecuritySettings {
  authentication: {
    sessionTimeout: number; // minutes
    maxLoginAttempts: number;
    lockoutDuration: number; // minutes
    passwordMinLength: number;
    requireSpecialChars: boolean;
    twoFactorRequired: boolean;
  };
  dataProtection: {
    dataRetentionDays: number;
    anonymizeAfterDays: number;
    encryptSensitiveData: boolean;
    auditLogRetention: number; // days
  };
  riskManagement: {
    transactionRiskThreshold: number;
    suspiciousActivityFlags: string[];
    autoFlagTransactions: boolean;
    requireApprovalAbove: number;
  };
}

export interface FeatureSettings {
  userFeatures: {
    allowRegistration: boolean;
    emailVerificationRequired: boolean;
    profileEditingEnabled: boolean;
    allowAccountDeletion: boolean;
  };
  mgrFeatures: {
    allowMgrCreation: boolean;
    requireAdminApproval: boolean;
    allowPublicMgrs: boolean;
    enableMgrChat: boolean;
  };
  paymentFeatures: {
    enableBankTransfer: boolean;
    enableCardPayment: boolean;
    enableWalletPayment: boolean;
    enableCryptocurrency: boolean;
  };
  platformFeatures: {
    maintenanceMode: boolean;
    betaFeatures: boolean;
    analyticsEnabled: boolean;
    supportChatEnabled: boolean;
  };
}

export interface NotificationSettings {
  email: {
    smtp: {
      host: string;
      port: number;
      username: string;
      password: string;
      encryption: string;
    };
    templates: EmailTemplate[];
  };
  sms: {
    provider: string;
    apiKey: string;
    senderId: string;
    templates: SmsTemplate[];
  };
  push: {
    enabled: boolean;
    firebaseConfig: any;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  isActive: boolean;
}

export interface SmsTemplate {
  id: string;
  name: string;
  message: string;
  variables: string[];
  isActive: boolean;
}

export interface PaymentGateway {
  id: string;
  name: string;
  type: 'paystack' | 'flutterwave' | 'bank_transfer' | 'wallet';
  isActive: boolean;
  configuration: {
    publicKey?: string;
    secretKey?: string;
    merchantId?: string;
    webhookUrl?: string;
    callbackUrl?: string;
  };
  feeStructure: {
    percentage: number;
    flatFee: number;
    minimumFee: number;
    maximumFee: number;
  };
  supportedCurrencies: string[];
  supportedCountries: string[];
  processingTime: number; // minutes
  uptime: number; // percentage
  lastStatusCheck: string;
}

export interface SystemAdmin {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'support';
  permissions: string[];
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  createdBy: string;
}

export interface SystemLog {
  id: number;
  level: 'info' | 'warning' | 'error' | 'critical';
  category: string;
  message: string;
  details: any;
  userId?: number;
  adminId?: number;
  ipAddress: string;
  timestamp: string;
}

export interface AuditEntry {
  id: number;
  action: string;
  entityType: string;
  entityId: number;
  oldValues: any;
  newValues: any;
  adminId: number;
  adminName: string;
  ipAddress: string;
  timestamp: string;
}

export interface BackupInfo {
  id: string;
  type: 'full' | 'incremental' | 'manual';
  size: number; // bytes
  status: 'running' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  location: string;
  createdBy: string;
}

export interface SystemStatus {
  platform: {
    status: 'online' | 'maintenance' | 'degraded';
    uptime: number; // percentage
    version: string;
    lastDeployment: string;
  };
  database: {
    status: 'healthy' | 'warning' | 'critical';
    connections: number;
    maxConnections: number;
    responseTime: number; // ms
  };
  payments: {
    gateways: PaymentGateway[];
    overallStatus: 'healthy' | 'warning' | 'critical';
  };
  storage: {
    used: number; // bytes
    total: number; // bytes
    usage: number; // percentage
  };
  notifications: {
    emailQueue: number;
    smsQueue: number;
    failureRate: number; // percentage
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {

  constructor() { }

  // Platform Settings
  getPlatformSettings(): Observable<PlatformSettings> {
    return of(this.getMockPlatformSettings()).pipe(delay(800));
  }

  updatePlatformSettings(settings: Partial<PlatformSettings>): Observable<any> {
    return of({
      success: true,
      message: 'Platform settings updated successfully'
    }).pipe(delay(1000));
  }

  // Payment Gateways
  getPaymentGateways(): Observable<PaymentGateway[]> {
    return of(this.getMockPaymentGateways()).pipe(delay(600));
  }

  updatePaymentGateway(gatewayId: string, config: Partial<PaymentGateway>): Observable<any> {
    return of({
      success: true,
      message: 'Payment gateway updated successfully',
      gatewayId
    }).pipe(delay(1000));
  }

  testPaymentGateway(gatewayId: string): Observable<any> {
    return of({
      success: true,
      message: 'Gateway connection test successful',
      responseTime: Math.floor(Math.random() * 500) + 100
    }).pipe(delay(2000));
  }

  // System Admins
  getSystemAdmins(): Observable<SystemAdmin[]> {
    return of(this.getMockSystemAdmins()).pipe(delay(700));
  }

  createSystemAdmin(admin: Partial<SystemAdmin>): Observable<any> {
    return of({
      success: true,
      message: 'Admin user created successfully',
      adminId: Math.floor(Math.random() * 1000000)
    }).pipe(delay(1200));
  }

  updateSystemAdmin(adminId: number, updates: Partial<SystemAdmin>): Observable<any> {
    return of({
      success: true,
      message: 'Admin user updated successfully',
      adminId
    }).pipe(delay(1000));
  }

  deleteSystemAdmin(adminId: number): Observable<any> {
    return of({
      success: true,
      message: 'Admin user deleted successfully',
      adminId
    }).pipe(delay(800));
  }

  // System Logs
  getSystemLogs(filters?: { level?: string; category?: string; dateRange?: { start: string; end: string } }): Observable<SystemLog[]> {
    return of(this.getMockSystemLogs()).pipe(delay(900));
  }

  getAuditLogs(filters?: { action?: string; entityType?: string; adminId?: number }): Observable<AuditEntry[]> {
    return of(this.getMockAuditLogs()).pipe(delay(800));
  }

  // System Status
  getSystemStatus(): Observable<SystemStatus> {
    return of(this.getMockSystemStatus()).pipe(delay(500));
  }

  // Backups
  getBackups(): Observable<BackupInfo[]> {
    return of(this.getMockBackups()).pipe(delay(600));
  }

  createBackup(type: 'full' | 'incremental' | 'manual'): Observable<any> {
    return of({
      success: true,
      message: 'Backup initiated successfully',
      backupId: `backup_${Date.now()}`
    }).pipe(delay(1500));
  }

  restoreBackup(backupId: string): Observable<any> {
    return of({
      success: true,
      message: 'Backup restoration initiated',
      backupId
    }).pipe(delay(2000));
  }

  // Maintenance Operations
  clearCache(): Observable<any> {
    return of({
      success: true,
      message: 'System cache cleared successfully'
    }).pipe(delay(1500));
  }

  optimizeDatabase(): Observable<any> {
    return of({
      success: true,
      message: 'Database optimization completed',
      tablesOptimized: 15,
      spaceRecovered: '256 MB'
    }).pipe(delay(3000));
  }

  generateReport(type: string, dateRange: { start: string; end: string }): Observable<Blob> {
    const csvContent = this.generateReportCSV(type);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    return of(blob).pipe(delay(2000));
  }

  // Private helper methods
  private getMockPlatformSettings(): PlatformSettings {
    return {
      general: {
        platformName: 'Collo Africa',
        platformDescription: 'Empowering Communities Through Financial Inclusion',
        companyName: 'Collo Africa Limited',
        supportEmail: 'support@colloafrica.com',
        supportPhone: '+234-800-COLLO-AF',
        address: '123 Financial District, Lagos, Nigeria',
        websiteUrl: 'https://www.colloafrica.com',
        logoUrl: '/assets/logo.png',
        favicon: '/assets/favicon.ico',
        timezone: 'Africa/Lagos',
        language: 'en',
        currency: 'NGN'
      },
      business: {
        mgrSettings: {
          minimumContribution: 5000,
          maximumContribution: 1000000,
          defaultDuration: 12,
          processingFee: 2.5,
          penaltyRate: 5.0,
          maxMissedPayments: 2
        },
        transactionSettings: {
          dailyTransactionLimit: 2000000,
          monthlyTransactionLimit: 10000000,
          withdrawalFee: 1.5,
          transferFee: 100,
          minimumWithdrawal: 1000,
          processingTime: 24
        },
        kycSettings: {
          requireKyc: true,
          documentExpiryDays: 1095, // 3 years
          autoApprovalThreshold: 50000,
          maxDocumentSize: 5,
          allowedDocumentTypes: ['passport', 'national_id', 'drivers_license', 'utility_bill']
        }
      },
      security: {
        authentication: {
          sessionTimeout: 120,
          maxLoginAttempts: 5,
          lockoutDuration: 30,
          passwordMinLength: 8,
          requireSpecialChars: true,
          twoFactorRequired: true
        },
        dataProtection: {
          dataRetentionDays: 2555, // 7 years
          anonymizeAfterDays: 365,
          encryptSensitiveData: true,
          auditLogRetention: 1095
        },
        riskManagement: {
          transactionRiskThreshold: 70,
          suspiciousActivityFlags: ['high_velocity', 'unusual_amount', 'new_device', 'foreign_ip'],
          autoFlagTransactions: true,
          requireApprovalAbove: 1000000
        }
      },
      features: {
        userFeatures: {
          allowRegistration: true,
          emailVerificationRequired: true,
          profileEditingEnabled: true,
          allowAccountDeletion: false
        },
        mgrFeatures: {
          allowMgrCreation: true,
          requireAdminApproval: false,
          allowPublicMgrs: true,
          enableMgrChat: true
        },
        paymentFeatures: {
          enableBankTransfer: true,
          enableCardPayment: true,
          enableWalletPayment: true,
          enableCryptocurrency: false
        },
        platformFeatures: {
          maintenanceMode: false,
          betaFeatures: false,
          analyticsEnabled: true,
          supportChatEnabled: true
        }
      },
      notifications: {
        email: {
          smtp: {
            host: 'smtp.mailgun.org',
            port: 587,
            username: 'postmaster@colloafrica.com',
            password: '***********',
            encryption: 'tls'
          },
          templates: [
            {
              id: 'welcome',
              name: 'Welcome Email',
              subject: 'Welcome to Collo Africa!',
              body: 'Welcome {{name}} to our platform...',
              variables: ['name', 'email'],
              isActive: true
            }
          ]
        },
        sms: {
          provider: 'Termii',
          apiKey: '***********',
          senderId: 'ColloAfrica',
          templates: [
            {
              id: 'verification',
              name: 'Phone Verification',
              message: 'Your verification code is {{code}}',
              variables: ['code'],
              isActive: true
            }
          ]
        },
        push: {
          enabled: true,
          firebaseConfig: {}
        }
      }
    };
  }

  private getMockPaymentGateways(): PaymentGateway[] {
    return [
      {
        id: 'paystack',
        name: 'Paystack',
        type: 'paystack',
        isActive: true,
        configuration: {
          publicKey: 'pk_test_***',
          secretKey: 'sk_test_***',
          webhookUrl: 'https://api.colloafrica.com/webhooks/paystack'
        },
        feeStructure: {
          percentage: 1.5,
          flatFee: 100,
          minimumFee: 100,
          maximumFee: 2000
        },
        supportedCurrencies: ['NGN', 'USD', 'GHS'],
        supportedCountries: ['NG', 'GH'],
        processingTime: 2,
        uptime: 99.9,
        lastStatusCheck: new Date().toISOString()
      },
      {
        id: 'flutterwave',
        name: 'Flutterwave',
        type: 'flutterwave',
        isActive: true,
        configuration: {
          publicKey: 'FLWPUBK_TEST-***',
          secretKey: 'FLWSECK_TEST-***',
          webhookUrl: 'https://api.colloafrica.com/webhooks/flutterwave'
        },
        feeStructure: {
          percentage: 1.4,
          flatFee: 100,
          minimumFee: 100,
          maximumFee: 2000
        },
        supportedCurrencies: ['NGN', 'USD', 'GHS', 'KES'],
        supportedCountries: ['NG', 'GH', 'KE', 'UG'],
        processingTime: 3,
        uptime: 99.7,
        lastStatusCheck: new Date().toISOString()
      }
    ];
  }

  private getMockSystemAdmins(): SystemAdmin[] {
    return [
      {
        id: 1,
        username: 'superadmin',
        email: 'admin@colloafrica.com',
        fullName: 'System Administrator',
        role: 'super_admin',
        permissions: ['*'],
        isActive: true,
        lastLogin: '2024-01-15T10:30:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        createdBy: 'System'
      },
      {
        id: 2,
        username: 'finance_admin',
        email: 'finance@colloafrica.com',
        fullName: 'Finance Administrator',
        role: 'admin',
        permissions: ['transactions.*', 'reports.*', 'analytics.*'],
        isActive: true,
        lastLogin: '2024-01-15T08:45:00Z',
        createdAt: '2024-01-05T10:00:00Z',
        createdBy: 'superadmin'
      }
    ];
  }

  private getMockSystemLogs(): SystemLog[] {
    return [
      {
        id: 1,
        level: 'info',
        category: 'Authentication',
        message: 'Admin user logged in successfully',
        details: { username: 'superadmin' },
        adminId: 1,
        ipAddress: '192.168.1.100',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        level: 'warning',
        category: 'Transaction',
        message: 'High-value transaction flagged for review',
        details: { transactionId: 'TXN-2024-001', amount: 1500000 },
        userId: 123,
        ipAddress: '192.168.1.105',
        timestamp: '2024-01-15T10:25:00Z'
      }
    ];
  }

  private getMockAuditLogs(): AuditEntry[] {
    return [
      {
        id: 1,
        action: 'UPDATE',
        entityType: 'User',
        entityId: 123,
        oldValues: { status: 'pending' },
        newValues: { status: 'verified' },
        adminId: 1,
        adminName: 'System Administrator',
        ipAddress: '192.168.1.100',
        timestamp: '2024-01-15T10:30:00Z'
      }
    ];
  }

  private getMockSystemStatus(): SystemStatus {
    return {
      platform: {
        status: 'online',
        uptime: 99.8,
        version: '2.1.4',
        lastDeployment: '2024-01-10T14:30:00Z'
      },
      database: {
        status: 'healthy',
        connections: 25,
        maxConnections: 100,
        responseTime: 45
      },
      payments: {
        gateways: this.getMockPaymentGateways(),
        overallStatus: 'healthy'
      },
      storage: {
        used: 850000000000, // 850 GB
        total: 2000000000000, // 2 TB
        usage: 42.5
      },
      notifications: {
        emailQueue: 5,
        smsQueue: 2,
        failureRate: 1.2
      }
    };
  }

  private getMockBackups(): BackupInfo[] {
    return [
      {
        id: 'backup_20240115',
        type: 'full',
        size: 5368709120, // 5 GB
        status: 'completed',
        startTime: '2024-01-15T02:00:00Z',
        endTime: '2024-01-15T02:45:00Z',
        location: 's3://colloafrica-backups/2024/01/15',
        createdBy: 'System Scheduler'
      }
    ];
  }

  private generateReportCSV(type: string): string {
    const headers = ['Date', 'Type', 'Description', 'Value'];
    const csvContent = [
      headers.join(','),
      '2024-01-15,System,Platform Uptime,99.8%',
      '2024-01-15,Users,Total Active Users,1247',
      '2024-01-15,Transactions,Daily Volume,₦2.5M'
    ].join('\n');

    return csvContent;
  }
} 