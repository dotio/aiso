import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button, FileButton, Stack, Avatar, Flex, Text } from '@mantine/core';
import { IconCamera, IconRotateClockwise } from '@tabler/icons-react';

import classes from './Avatar.module.css'

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  name: string;
}>

function AvatarForm({ name, className }: Props) {

  const {  setValue, formState: { errors } } = useFormContext();

  const errorMsg = errors?.[name]
    ? String(errors?.[name]?.message)
    : undefined;

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Stack className={classes.root}>
          <Flex justify="center" align="center" direction="column">
            <Avatar src={field.value} size={92} alt='Avatar' />
            <Text size="xs" color="blue" mt="xs">Аватар ассистента</Text>
          </Flex>

          <Flex justify="flex-end" gap="md">
            <Button variant='white' radius="md"  onClick={() => setValue(name, '')}>
              <IconRotateClockwise size={24}/>
            </Button>
            <FileButton
              accept="image/*"
              onChange={(file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setValue(name, reader.result as string);
                };
                reader.readAsDataURL(file as any);
              }}
            >
              {(props) => <Button radius="md" variant='white' {...props}>
                <IconCamera size={24}/>
              </Button>}
            </FileButton>
          </Flex>
          {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
        </Stack>
      )}
    />
  );
}

export default AvatarForm;
