import * as React from 'react';
import cx from 'clsx';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IconPlus } from '@tabler/icons-react';
import { Flex, Stack, Text } from '@mantine/core';

import classes from './Channel.module.css';
import ChannelTemplate from '@web/pages/Assistants/components/AssistantsForm/Channel/ChannelTemplate';
import { ASSISTANTS_FIELDS } from '../AssistantsForm.schema';
import { AssistantsSections, ChannelTags, IAssistant, IAssistantChannelTemplate } from '@web/types';
import SwitcherChannel from '@web/pages/Assistants/components/AssistantsForm/SwitcherChannel';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant?: IAssistant;
}>;

const templates: IAssistantChannelTemplate[] = [
  { tag: ChannelTags.TELEGRAM, name: 'Telegram' },
  { tag: ChannelTags.WHATSAPP, name: 'WhatsApp' },
  { tag: ChannelTags.JIVOSITE, name: 'JivoSite' },
  { tag: ChannelTags.VK, name: 'VK' },
  { tag: ChannelTags.JIRA, name: 'Jira' }
];

interface IChannelField extends Record<'customId', string> {
  _destroy: boolean;
  tag: ChannelTags;
  name: string;
  id: string;
  settings: any;
  status: any;
  uuid: any;
}

function Channel({ className, assistant }: Props) {
  const { watch, control } = useFormContext();
  const { fields, append, update, remove } = useFieldArray({
    name: `${ASSISTANTS_FIELDS.CHANNELS}`,
    control: control,
    keyName: 'customId'
  });

  const selectedChannels = watch(ASSISTANTS_FIELDS.CHANNELS) || [];
  const availableOptions =
    templates?.filter(
      (option) =>
        !selectedChannels?.some(
          (channel: IAssistantChannelTemplate) => channel?.tag === option?.tag
        )
    ) || [];

  const validFields = fields.filter((field) => !(field as IChannelField)._destroy);

  return (
    <Stack className={cx(classes.root, className)} gap="md">
      <Text fw={500} size="xl" id={AssistantsSections.Channels}>
        Каналы интеграции
      </Text>
      {!!selectedChannels?.length &&
        fields.map((field: Record<'customId', string>, index: number) => {
          const channelField = field as IChannelField;
          const filteredTemplates = templates.filter(
            (option) =>
              !selectedChannels.some(
                (channel: IAssistantChannelTemplate, i: number) =>
                  channel?.tag === option.tag && i !== index
              )
          );

          return (
            !channelField._destroy && (
              <div className={classes.input} key={channelField.customId}>
                <Flex justify="space-between" align="center">
                  <Text fw={500} mb="sm" size="lg">
                    {`Канал ${index + 1 - fields.filter((f, i) => (f as IChannelField)._destroy && i < index).length}`}
                  </Text>
                  <SwitcherChannel tag={channelField.tag} assistant={assistant as IAssistant} />
                </Flex>
                <ChannelTemplate
                  {...channelField}
                  name={`${ASSISTANTS_FIELDS.CHANNELS}.${index}`}
                  templates={filteredTemplates}
                  index={index}
                  remove={remove}
                  update={update}
                  fieldsLength={validFields.length}
                />
              </div>
            )
          );
        })}
      {availableOptions.length > 0 && (
        <Flex
          className={classes.add}
          gap="md"
          onClick={() => append({ tag: availableOptions[0].tag, name: availableOptions[0].name })}
        >
          <IconPlus color="#5D98EF" />
          <Text color="#5D98EF">Добавить канал</Text>
        </Flex>
      )}
    </Stack>
  );
}

export default Channel;
