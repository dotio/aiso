type TelegramSettings = {
  token: string;
};

export type WhatsAppSettings = {
  subject_id: string;
  cascade_id: string;
  api_key: string;
};

export type VkSettings = {
  group_id: string;
  access_token: string;
};

type JivoSiteSettings = {
  provider_id: string;
  channel_id: string;
  provider_token: string;
};

export type JiraSettings = {
  base_url: string;
  access_token: string;
};

export enum ChannelTags {
  TELEGRAM = 'telegram',
  WHATSAPP = 'whatsapp',
  JIVOSITE = 'jivo',
  VK = 'vk',
  JIRA = 'jira'
}

export interface IAssistantChannelTemplate {
  tag: ChannelTags;
  name: string;
  id?: string;
}

export type Channel =
  | {
      id: string;
      tag: ChannelTags.TELEGRAM;
      name: string;
      settings: TelegramSettings;
      status: string;
    }
  | {
      id: string;
      tag: ChannelTags.WHATSAPP;
      name: string;
      settings: WhatsAppSettings;
      status: string;
    }
  | {
      id: string;
      tag: ChannelTags.VK;
      name: string;
      settings: VkSettings;
      status: string;
    }
  | {
      id: string;
      tag: ChannelTags.JIRA;
      name: string;
      settings: JiraSettings;
      status: string;
    }
  | {
      id: string;
      tag: ChannelTags.JIVOSITE;
      name: string;
      settings: JivoSiteSettings;
      status: string;
    };

export interface IAssistant {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  status: 'idle' | 'started' | 'rejected';
  source: {
    provider_id: string;
    name: string;
  };
  graph: {
    provider_id: string;
    name: string;
  };
  channels: Channel[];
  gender: 'male' | 'female';
  avatar: string;
  communication_style: string;
}

export enum AssistantsSections {
  Main = 'main',
  Channels = 'channels',
  Sources = 'sources',
  Graph = 'graph'
}

export const GenderList = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' }
];

export const CommunicationList = [{ value: 'official', label: 'Официальный' }];
