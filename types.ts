
export enum ViewState {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  LEAD_CAPTURE = 'LEAD_CAPTURE',
  AI_DESIGNER = 'AI_DESIGNER',
  CONTRACTOR_TOOL = 'CONTRACTOR_TOOL'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  sqft: number;
  status: 'new' | 'viewed' | 'quoted';
  createdAt: string;
}

export interface Quote {
  items: Array<{ description: string; cost: number }>;
  total: number;
  estimatedDuration: string;
}

export interface AuthState {
  user: { name: string; role: 'contractor' | 'lead' } | null;
  isLoggedIn: boolean;
}
