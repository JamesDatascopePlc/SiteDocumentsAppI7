import React, { useCallback } from 'react';
import { addons, types } from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { Icons, IconButton } from '@storybook/components';
import { useGlobals } from '@storybook/manager-api';

const ExampleToolbar = () => {
  const [globals, updateGlobals] = useGlobals();

  const isActive = globals['my-param-key'] || false;

  // Function that will update the global value and trigger a UI refresh.
  const refreshAndUpdateGlobal = () => {
    updateGlobals({
      ['my-param-key']: !isActive,
    }),
      // Invokes Storybook's addon API method (with the FORCE_RE_RENDER) event to trigger a UI refresh
      addons.getChannel().emit(FORCE_RE_RENDER);
  };

  const toggleIosMode = useCallback(() => refreshAndUpdateGlobal(), [isActive]);

  return (
    <IconButton
      key="ios-mode"
      active={isActive}
      title="Toggle IOS Mode"
      onClick={toggleIosMode}
    >
      <Icons icon="switchalt" />
    </IconButton>
  );
};

const ADDON_ID = "datascope-addon/ios-mode";
const TOOL_ID = `${ADDON_ID}/tool`;

// const [globals, updateGlobals] = useGlobals();

// const isActive = globals['my-param-key'] || false;

// // Function that will update the global value and trigger a UI refresh.
// const refreshAndUpdateGlobal = () => {
//   updateGlobals({
//     ['my-param-key']: !isActive,
//   }),
//   // Invokes Storybook's addon API method (with the FORCE_RE_RENDER) event to trigger a UI refresh
//   addons.getChannel().emit(FORCE_RE_RENDER);
// };

// const toggleIosMode = useCallback(() => refreshAndUpdateGlobal(), [isActive]);

// const render = ({ active, key }: Addon_RenderOptions) => (
//   <IconButton title="Toggle IOS Mode" active={active} key={key} onClick={toggleIosMode}>
//     <Icons icon="switchalt" />
//   </IconButton>
// )

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'Outline',
    type: types.TOOL,
    render: () => <ExampleToolbar />
  });
});