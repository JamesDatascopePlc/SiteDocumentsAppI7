import React, { useCallback } from 'react';
import { addons, types } from '@storybook/addons';
import { FORCE_REMOUNT, FORCE_RE_RENDER } from '@storybook/core-events';
import { IconButton } from '@storybook/components';
import { useGlobals, useStorybookState } from '@storybook/manager-api';

const IosModeButton = () => {
  const [globals, updateGlobals] = useGlobals();
  const state = useStorybookState();

  const storyId: string = state.storyId || "";
  const isActive: boolean = globals['iosMode'] || false;

  // Function that will update the global value and trigger a UI refresh.
  const updateIosMode = () => {
    const previewIframe = document.querySelector<HTMLIFrameElement>("#storybook-preview-iframe");
    if (previewIframe == null) return;

    const iFrameHtml = previewIframe.contentWindow?.document.querySelector<HTMLElement>("html");
    if (iFrameHtml == null) return;

    const nowIsActive = !isActive;

    updateGlobals({
      ['iosMode']: nowIsActive,
    });
    const channel = addons.getChannel();

    iFrameHtml.setAttribute("mode", nowIsActive ? "ios" : "md");

    // Invokes Storybook's addon API method (with the FORCE_RE_RENDER) event to trigger a UI refresh
    channel.emit(FORCE_RE_RENDER);
    channel.emit(FORCE_REMOUNT, { storyId: storyId });
  };

  const toggleIosMode = useCallback(() => updateIosMode(), [state, isActive]);

  return (
    <IconButton
      key="ios-mode"
      active={isActive}
      title="Toggle IOS Mode"
      onClick={toggleIosMode}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px">
        <path style={{ stroke: "none", "fill": "rgb(60, 60, 60)" }} d="M 12.367188 9.828125 C 11.605469 9.449219 11.121094 8.734375 11.039062 7.859375 C 10.953125 6.921875 11.351562 6.027344 12.105469 5.464844 C 12.210938 5.386719 12.273438 5.28125 12.285156 5.152344 C 12.300781 5.019531 12.253906 4.878906 12.167969 4.78125 C 12.152344 4.757812 12.136719 4.738281 12.113281 4.714844 C 11.375 4.019531 10.449219 3.636719 9.507812 3.636719 L 9.46875 3.636719 C 9.015625 3.644531 8.566406 3.753906 8.128906 3.859375 C 7.6875 3.964844 7.230469 4.074219 6.78125 4.074219 C 6.597656 4.074219 6.429688 4.058594 6.261719 4.019531 C 5.183594 3.398438 4.230469 3.261719 3.4375 3.613281 C 2.667969 3.957031 2.09375 4.714844 1.730469 5.867188 C 1.410156 6.867188 1.328125 8.066406 1.488281 9.332031 C 1.679688 10.878906 2.429688 12.0625 3.207031 13.109375 C 3.253906 13.171875 3.308594 13.21875 3.375 13.25 C 3.390625 13.261719 3.40625 13.277344 3.425781 13.289062 C 3.808594 13.574219 4.242188 13.703125 4.78125 13.703125 C 5.132812 13.703125 5.492188 13.648438 5.839844 13.597656 C 6.1875 13.542969 6.546875 13.488281 6.898438 13.488281 C 7.097656 13.488281 7.28125 13.507812 7.453125 13.542969 C 7.667969 13.589844 7.863281 13.671875 8.050781 13.753906 C 8.339844 13.875 8.636719 14 8.996094 14 C 9.03125 14 9.066406 14 9.101562 13.996094 C 9.601562 13.964844 10.113281 13.726562 10.617188 13.296875 C 11.519531 12.523438 12.078125 11.421875 12.53125 10.453125 C 12.554688 10.402344 12.570312 10.34375 12.574219 10.289062 C 12.628906 10.097656 12.550781 9.917969 12.367188 9.828125 Z M 10.199219 8.097656 C 10.308594 9.066406 10.808594 9.878906 11.605469 10.390625 C 10.917969 11.824219 10.085938 13.136719 8.675781 13.164062 C 8.136719 12.789062 7.59375 12.613281 6.964844 12.613281 C 6.828125 12.613281 6.683594 12.621094 6.539062 12.640625 C 6.3125 12.664062 6.089844 12.707031 5.875 12.75 C 5.539062 12.816406 5.222656 12.875 4.910156 12.875 C 4.507812 12.875 4.179688 12.773438 3.875 12.550781 C 3.871094 12.546875 3.867188 12.542969 3.863281 12.542969 C 3.136719 11.554688 2.609375 10.675781 2.402344 9.601562 C 2.226562 8.699219 2.230469 7.707031 2.410156 6.726562 C 2.601562 5.6875 2.976562 4.957031 3.519531 4.558594 C 3.757812 4.382812 4.027344 4.296875 4.339844 4.296875 C 4.78125 4.296875 5.234375 4.480469 5.539062 4.617188 C 5.996094 4.824219 6.519531 4.933594 7.046875 4.933594 C 7.609375 4.933594 8.167969 4.8125 8.660156 4.582031 C 8.671875 4.574219 8.683594 4.570312 8.699219 4.558594 C 9.585938 4.328125 10.476562 4.519531 11.226562 5.101562 C 10.457031 5.894531 10.074219 7.007812 10.199219 8.097656 Z M 10.199219 8.097656 "/>
        <path style={{ stroke: "none", "fill": "rgb(60, 60, 60)" }} d="M 7 3.546875 C 7.089844 3.546875 7.175781 3.519531 7.25 3.476562 C 9.910156 2.90625 10.628906 1.503906 10.765625 0.425781 C 10.785156 0.277344 10.730469 0.179688 10.683594 0.125 C 10.613281 0.046875 10.5 0 10.375 0 C 10.316406 0 10.253906 0.0117188 10.210938 0.0273438 C 10.191406 0.0273438 10.171875 0.0273438 10.152344 0.03125 C 8.535156 0.257812 7.203125 1.371094 6.59375 3.007812 C 6.542969 3.136719 6.554688 3.265625 6.625 3.363281 C 6.703125 3.476562 6.847656 3.546875 7 3.546875 Z M 7.863281 2.40625 C 8.316406 1.742188 8.949219 1.269531 9.714844 1.023438 C 9.421875 1.625 8.800781 2.089844 7.863281 2.40625 Z M 7.863281 2.40625 "/>
      </svg>
    </IconButton>
  );
};

const ADDON_ID = "datascope-addon/ios-mode";
const TOOL_ID = `${ADDON_ID}/tool`;

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'IOS Mode',
    type: types.TOOL,
    render: () => <IosModeButton />
  });
});