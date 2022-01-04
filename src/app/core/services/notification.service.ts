import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(
    public toast: ToastrService
  ) { }

  success(message: string, title = 'Успех', timeSpan = 5000): void {
    this.toast.success(message, title, {
      timeOut: timeSpan,
    });
  }

  error(message: string, title = 'Ошибка', timeSpan = 5000): void {
    this.toast.error(message, title, {
      timeOut: timeSpan
    });
  }

  info(message: string, title = 'Информация', timeSpan = 5000): void {
    this.toast.info(message, title, {
      timeOut: timeSpan,
    });
  }

  warning(message: string, title = 'Предупреждение', timeSpan = 5000): void {
    this.toast.warning(message, title, {
      timeOut: timeSpan,
    });
  }
}
