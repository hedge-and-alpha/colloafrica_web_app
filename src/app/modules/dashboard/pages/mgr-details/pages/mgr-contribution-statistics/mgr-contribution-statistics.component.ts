import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MGR } from '../../../../../../interfaces/mgr.interface';
import { TableHeading } from '../../../../../../interfaces/table-heading';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';

@Component({
  selector: 'ca-mgr-contribution-statistics',
  templateUrl: './mgr-contribution-statistics.component.html',
  styleUrl: './mgr-contribution-statistics.component.css',
})
export class MgrContributionStatisticsComponent implements OnInit {
  currentCycleNumber!: number;

  tableHeading = TABLE_HEADING;
  tableData: TableData[] = [];

  @Input({ required: true }) mgrPlan!: MGR;

  constructor(private api: DashboardApiService) {}

  ngOnInit(): void {
    this.currentCycleNumber = this.mgrPlan.current_cycle_number;
    this.getContributionStats(this.mgrPlan.id, this.currentCycleNumber);
  }

  getContributionStats(planId: string, cycle: number | string) {
    this.api
      .getMgrPlanContributionStats(planId, cycle)
      .pipe(
        map(({ data }) => {
          return data ? data.map((stat) => {
            const mgrUser = this.mgrPlan.mgr_users?.find(
              (user) => user.user_id === stat.user_id
            )!;
            return { ...stat, ...mgrUser };
          }) : ([] as TableData[]);
        })
      )
      .subscribe({
        next: (response) => {
          this.tableData = response;
        },
      });
  }

  cycleDateChange(event: number | undefined) {
    if (!event) return;

    this.currentCycleNumber = event;
    this.getContributionStats(this.mgrPlan.id, this.currentCycleNumber);
  }
}

const TABLE_HEADING: TableHeading[] = [
  { label: 'Name' },
  { label: 'Amount' },
  { label: 'Role' },
  { label: 'Position' },
  { label: 'Status' },
];

interface TableData {
  user_id: number;
  role: string;
  position: number;
  status: number;
  join_date: string;
  profile_pic: null | string;
  first_name: string;
  last_name: string;
  amount: string;
  date: string;
  allotted: boolean;
}
