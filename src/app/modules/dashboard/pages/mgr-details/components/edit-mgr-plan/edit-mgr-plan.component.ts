import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { ModalService } from '../../../../../../components/modal/modal.service';
import { MGR } from '../../../../../../interfaces/mgr.interface';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { emptyFieldValidator } from '../../../../../../validators/emptyField.validator';
import { DURATIONS, THEME_COLOURS } from '../../../mgr/data/mgr.data';
import {
  EditMGRForm,
  MGRDurationList,
  Theme,
} from '../../../mgr/interfaces/mgr.interfaces';
import { UtilsService } from '../../../../../../services/utils/utils.service';

@Component({
  selector: 'ca-edit-mgr-plan',
  templateUrl: './edit-mgr-plan.component.html',
  styleUrl: './edit-mgr-plan.component.css',
})
export class EditMgrPlanComponent implements OnInit {
  selectedThemeIndex: null | number = null;

  loading = false;
  isSubmitted = false;

  minJoinDate = new Date();

  form!: FormGroup<EditMGRForm>;

  themes: Theme[] = THEME_COLOURS;
  durations: MGRDurationList[] = DURATIONS;

  @Input() plan!: MGR;

  constructor(
    private fb: FormBuilder,
    private api: DashboardApiService,
    private modalService: ModalService,
    private alert: AlertService,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
    const parsedJoinDate = this.parseDateLocal(this.plan.join_date_deadline);

    // Allow selecting the existing date even if it's in the past
    this.minJoinDate =
      parsedJoinDate < new Date() ? parsedJoinDate : new Date();

    this.form = this.fb.nonNullable.group({
      name: this.fb.nonNullable.control(this.plan.name, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      amount: this.fb.nonNullable.control(this.plan.amount, [
        Validators.required,
        Validators.min(1000),
      ]),
      desc: this.fb.nonNullable.control(this.plan.desc, [
        Validators.required,
        emptyFieldValidator(),
      ]),
      number_of_members: this.fb.nonNullable.control(
        this.plan.number_of_members,
        [Validators.required, Validators.min(+this.plan.number_of_members)]
      ),
      duration: this.fb.nonNullable.control(this.plan.duration, [
        Validators.required,
      ]),
      join_date_deadline: this.fb.nonNullable.control(parsedJoinDate as unknown as string, [
        Validators.required,
      ]),
      theme_color: this.fb.nonNullable.control(this.plan.theme_color, [
        Validators.required,
      ]),
    });

    const idx = this.getCurrentThemeColor(this.plan.theme_color);
    this.selectedThemeIndex = idx >= 0 ? idx + 1 : null;
  }

  // Strips time/timezone from ISO string to avoid UTC offset shifting the date
  parseDateLocal(dateStr: string): Date {
    // Convert to local time first, then extract the date
    const utcDate = new Date(dateStr);
    const year = utcDate.getFullYear();
    const month = utcDate.getMonth();
    const day = utcDate.getDate();
    return new Date(year, month, day);
  }

  // Safely formats a Date object or string to YYYY-MM-DD for the backend
  formatDateForBackend(value: any): string {
    if (!value) return '';
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get name() {
    return this.form.get('name') as FormControl;
  }
  get desc() {
    return this.form.get('desc') as FormControl;
  }
  get duration() {
    return this.form.get('duration') as FormControl;
  }
  get numberOfMembers() {
    return this.form.get('number_of_members') as FormControl;
  }
  get amount() {
    return this.form.get('amount') as FormControl;
  }
  get joinDateDeadline() {
    return this.form.get('join_date_deadline') as FormControl<string | null>;
  }
  get themeColour() {
    return this.form.get('theme_color') as FormControl;
  }

  getCurrentThemeColor(colour: string) {
    return this.themes.findIndex(
      (theme) => theme.from === colour.split(' ')[0]
    );
  }

  selectTheme(theme: Theme, idx: number) {
    this.selectedThemeIndex = idx;
    const themeString = `${theme.from} ${theme.to}`;
    this.themeColour?.patchValue(themeString);
  }

  handleSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;
    this.loading = true;

    const data = this.form.value;

    const payload = {
      name: data.name,
      desc: data.desc,
      duration: data.duration,
      number_of_members: data.number_of_members,
      amount: data.amount,
      theme_color: data.theme_color,
      join_date_deadline: this.formatDateForBackend(data.join_date_deadline),
    };

    this.api.updateMGR(this.plan.id, payload).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.modalService.close({ action: 'refresh' });
        this.alert.open('success', {
          details: message,
          summary: status,
        });
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.alert.open('danger', {
          details: `${err.error.message}`,
        });
      },
    });
  }
}