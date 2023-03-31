import { inject, Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { ToastController } from "@ionic/angular";
import OneSignal from "onesignal-cordova-plugin";
import NotificationReceivedEvent from "onesignal-cordova-plugin/dist/NotificationReceivedEvent";
import { map, Subject, switchMap, tap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OneSignalService {
  protected toastCtrl = inject(ToastController);
  protected notificationReceived$ = new Subject<NotificationReceivedEvent>();

  async startup() {
    const device = await Device.getInfo();

    if (device.platform === "web")
      return;

    this.notificationReceived$.pipe(
      map(nr => nr.getNotification()),
      switchMap(notification => this.toastCtrl.create({
        header: notification.title,
        message: notification.body,
        duration: 5000,
        position: "top"
      })),
      tap(toast => toast.present())
    )
    .subscribe();

    OneSignal.setAppId("");

    OneSignal.promptForPushNotificationsWithUserResponse(() => 
      OneSignal.setNotificationWillShowInForegroundHandler(notification => this.notificationReceived$.next(notification))
    );
  }
}
