import { Device } from "@capacitor/device";
import { memoize } from "lodash-es";

export const getDeviceUuid = memoize(async () => {
  const { uuid } = await Device.getId();
  return uuid;
});

export const getDeviceString = memoize(async () => {
  const info = await Device.getInfo();
  return `${info.model}@${info.platform}@${info.osVersion}`;
});