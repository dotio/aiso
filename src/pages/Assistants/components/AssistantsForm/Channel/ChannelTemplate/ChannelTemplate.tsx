import * as React from 'react';
import { UseFieldArrayRemove, UseFieldArrayUpdate, useFormContext } from 'react-hook-form';

import Telegram from '@web/pages/Assistants/components/AssistantsForm/Channel/Telegram';
import WhatsApp from '@web/pages/Assistants/components/AssistantsForm/Channel/WhatsApp';
import Jivosite from '@web/pages/Assistants/components/AssistantsForm/Channel/Jivosite';
import Unknown from '@web/pages/Assistants/components/AssistantsForm/Channel/Unknown';
import Vk from '@web/pages/Assistants/components/AssistantsForm/Channel/Vk';
import Jira from '@web/pages/Assistants/components/AssistantsForm/Channel/Jira';
import { ChannelTags, IAssistantChannelTemplate } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  name: string;
  index: number;
  fieldsLength: number;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<any, any>;
  templates: IAssistantChannelTemplate[];
}>;

const getSettingsComponent = (
  value?: IAssistantChannelTemplate | undefined
): (({ className }: Props) => JSX.Element) => {
  switch (value?.tag) {
    case ChannelTags.TELEGRAM:
      return Telegram;

    case ChannelTags.WHATSAPP:
      return WhatsApp;

    case ChannelTags.JIVOSITE:
      return Jivosite;

    case ChannelTags.VK:
      return Vk;

    case ChannelTags.JIRA:
      return Jira;

    default:
      return Unknown;
  }
};

function ChannelTemplate({ name, templates, index, remove, update, fieldsLength, ...rest }: Props) {
  const { watch } = useFormContext();

  const selectedOption = watch(name);
  const ChannelComponent = getSettingsComponent(selectedOption);

  return (
    <ChannelComponent fieldsLength={fieldsLength} update={update} templates={templates} index={index} name={name} remove={remove} {...rest} />
  );
}

export default ChannelTemplate;
