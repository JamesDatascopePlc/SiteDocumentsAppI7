import React, { useEffect } from 'react';
import { StoryFn } from '@storybook/angular';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';

export const StoryThemeDecorator = (Story: StoryFn) => {
  const dark = useDarkMode();

  useEffect(() => {
    const backgroundColor = dark ? themes.dark.appBg : themes.light.appBg;
      document.body.style.backgroundColor = backgroundColor || 'inherit';
  }, [dark]);

  return (
    Story
  );
}