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
  ) {}

  ngOnInit(): void {
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
      join_date_deadline: this.fb.nonNullable.control(
        this.plan.join_date_deadline,
        [Validators.required]
      ),
      theme_color: this.fb.nonNullable.control(this.plan.theme_color, [
        Validators.required,
      ]),
    });
    this.selectedThemeIndex =
      this.getCurrentThemeColor(this.plan.theme_color) + 1;
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
    let themeString = `${theme.from} ${theme.to}`;
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
      join_date_deadline: this.utils.transformDate(data.join_date_deadline!.toString()),
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
          details: `${err.error.message}`
        });
      },
    });
  }
}
