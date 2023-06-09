import { inject, Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { ToastController } from "@ionic/angular";
import OneSignal from "onesignal-cordova-plugin";
import NotificationReceivedEvent from "onesignal-cordova-plugin/dist/NotificationReceivedEvent";
import { map, switchMap, tap } from "rxjs";
import { use } from "../../rxjs";

@Injectable({
  providedIn: "root"
})
export class OneSignalService {
  protected toastCtrl = inject(ToastController);
  protected notificationReceived = use<NotificationReceivedEvent>();

  protected toast$ = this.notificationReceived(
    map(nr => nr.getNotification()),
    switchMap(notification => this.toastCtrl.create({
      header: notification.title,
      message: notification.body,
      duration: 5000,
      position: "top"
    })),
    tap(toast => toast.present())
  )();

  async startup() {
    const device = await Device.getInfo();

    if (device.platform === "web")
      return;

    this.toast$.subscribe();

    OneSignal.setAppId("");

    OneSignal.promptForPushNotificationsWithUserResponse(() => 
      OneSignal.setNotificationWillShowInForegroundHandler(notification => this.notificationReceived.next(notification))
    );
  }
}
