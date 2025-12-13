import { Component, computed, effect, inject } from '@angular/core';
import { UserStoreService } from '../../../../../../stores+/user.store';
import { DashboardApiService } from '../../../../../../services/api/dashboard-api.service';
import { AlertService } from '../../../../../../components/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'ca-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styles: `
    :host .img-ctr {
      outline: 1px dashed #E3CFFC;
      outline-offset: 10px;
      position: relative;
    }
    :host .name {
      font-size: clamp(1.5rem, 1.3333rem + 0.7407vw, 2rem);
      color: #171717;
    }
  `,
})
export class ProfileCardComponent {
  loading = false;
  placeHolderImage = 'assets/images/profile-photo.webp';
  imgUrl: string | null = '';

  user = computed(() => this.userStore.user);

  constructor(
    private userStore: UserStoreService,
    private api: DashboardApiService,
    private alert: AlertService
  ) {
    effect(() => {
      if (this.userStore.user?.profile_picture) {
        this.imgUrl = this.userStore.user.profile_picture;
      } else {
        this.imgUrl = null;
      }
    });
  }

  handleChange(files: FileList) {
    const file = files[0];
    const regex = /\.(jpeg|jpg|png)$/i;

    if (file.size / (1024 * 1024) > 1) {
      this.alert.open('warning', {
        summary: 'Size error',
        details: 'Image size can not be greater than 1MB',
      });
      return;
    }

    if (!regex.test(file.name)) {
      this.alert.open('warning', {
        summary: 'MIME type error',
        details: 'Only .jpeg, .jpg and .png images can be uploaded',
      });
      return;
    }

    this.imgUrl = URL.createObjectURL(file) as string;
    const formData = new FormData();

    formData.append('profile_picture', file);
    this.updatePicture(formData);
  }

  updatePicture(data: FormData) {
    this.loading = true;

    this.api.uploadProfilePicture(data).subscribe({
      next: ({ message, status }) => {
        this.loading = false;
        this.alert.open('success', { details: message, summary: status });
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.imgUrl = this.userStore.user!.profile_picture;
        this.alert.open('danger', {
          details: error.error.message,
          summary: error.error.status + ' ' + error.status,
        });
      },
      complete: () => {
        URL.revokeObjectURL(this.imgUrl!);
      },
    });
  }
}
