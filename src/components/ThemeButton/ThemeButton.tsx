import React from 'react'
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

import { useAppDispatch, useAppSelector } from '@web/store';
import { themeSwitchSelector } from '@web/store/themeSlice/selectors/themeSwitch';
import { themeSwitchAction } from '@web/store/themeSlice/action';
import { EColorScheme } from '@web/store/themeSlice/adapter/adapter';

const ThemeButton = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector(themeSwitchSelector);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';
  const switchColorThemeHandler = () => {
    dispatch(
      themeSwitchAction(colorTheme === EColorScheme.LIGHT ? EColorScheme.DARK : EColorScheme.LIGHT)
    );
    toggleColorScheme();
  };

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={switchColorThemeHandler}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
};

export default ThemeButton;
