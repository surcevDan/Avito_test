export type StatsPeriod = "today" | "week" | "month";

export interface SummaryStatsT {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface DecisionsChartData {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface ActivityChartData {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface CategoriesChartData {
  [category: string]: number;
}


export interface adsT {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: "pending" | "approved" | "rejected";
  priority: "normal" | "urgent";
  createdAt: string;
  updatedAt: string;
  images: string[];
  moderationHistory?: [{
    id: number,
    moderatorId: number,
    moderatorName: string,
    action: "pending" | "approved" | "rejected",
    reason: string,
    comment: string,
    timestamp: string
  }],
  characteristics?: Record<string, string>,
  seller?: {
    id: number,
    name: string,
    rating: string,
    totalAds: number,
    registeredAt: string
  }
}


export type TFilters = {
  page?: number;
  limit?: number;
  status?: Array<EStatusValue>;
  categoryId?: null | number;
  minPrice?: null | number;
  maxPrice?: null | number;
  search?: string;
  sortBy?: null | string;
  sortOrder?: null | string;
};

type EStatusValue = (typeof EStatus)[keyof typeof EStatus];

const EStatus = {
  draft: "draft",
  pending: "pending",
  approved: "approved",
  rejected: "rejected"
};


export interface PaginationT {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
}