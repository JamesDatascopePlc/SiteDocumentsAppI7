import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { useToast } from "./shared/services/toast";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  toast = useToast({
    header: "Error",
    buttons: [
      {
        icon: "close-outline"
      }
    ],
    duration: 4000
  });

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server Error
      this.toast.present({
        message: error.message
      });
    } else {
      // Client Error
      this.toast.present({
        message: !navigator.onLine 
          ? "No Internet Connection"
          : error?.message 
          || error.toString()
      });
    }

    console.error(error);
  }
}