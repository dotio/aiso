import * as yup from 'yup';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import _extend from 'lodash/extend';
import { TFunction } from 'i18next';

export declare interface IValidationSchema {
  t: TFunction<'translation', undefined>;
}

export const enum SOURCE_FIELDS {
  PROVIDER_ID = 'provider_id',
  NAME = 'name'
}

export const enum GRAPH_FIELDS {
  PROVIDER_ID = 'provider_id',
  NAME = 'name'
}

export const enum CHANNEL_FIELDS {
  TAG = 'tag',
  NAME = 'name',
  ID = 'id',
  DESTROY = '_destroy'
}

export const enum VK_FIELDS {
  ACCESS_TOKEN = 'access_token',
  GROUP_ID = 'group_id'
}

export const enum JIRA_FIELDS {
  ACCESS_TOKEN = 'access_token',
  BASE_URL = 'base_url',
}

export const enum TELEGRAM_FIELDS {
  TOKEN = 'token',
}

export const enum WHATSAPP_FIELDS {
  CASCADE_ID = 'cascade_id',
  SUBJECT_ID = 'subject_id',
  API_KEY = 'api_key',
}

export const enum JIVOSITE_FIELDS {
  PROVIDER_ID = 'provider_id',
  PROVIDER_TOKEN = 'provider_token',
  CHANNEL_ID = 'channel_id',
}

export const enum ASSISTANTS_FIELDS {
  ID = 'id',
  NAME = 'name',
  GENDER = 'gender',
  COMMUNICATION_STYLE = 'communication_style',
  AVATAR = 'avatar',
  DESCRIPTION = 'description',
  SOURCE = 'source',
  GRAPH = 'graph',
  CHANNELS = 'channels',
  SETTINGS = 'settings'
}

const telegramSettingsSchema = yup.object({
  [TELEGRAM_FIELDS.TOKEN]: yup.string().required()
});

const whatsappSettingsSchema = yup.object({
  [WHATSAPP_FIELDS.SUBJECT_ID]: yup.string().required(),
  [WHATSAPP_FIELDS.CASCADE_ID]: yup.string().required(),
  [WHATSAPP_FIELDS.API_KEY]: yup.string().required()
});

const jivositeSettingsSchema = yup.object({
  [JIVOSITE_FIELDS.PROVIDER_ID]: yup.string().required(),
  [JIVOSITE_FIELDS.CHANNEL_ID]: yup.string().required(),
  [JIVOSITE_FIELDS.PROVIDER_TOKEN]: yup.string().required()
});

const vkSettingsSchema = yup.object({
  [VK_FIELDS.ACCESS_TOKEN]: yup.string().required(),
  [VK_FIELDS.GROUP_ID]: yup.string().required()
});

const jiraSettingsSchema = yup.object({
  [JIRA_FIELDS.ACCESS_TOKEN]: yup.string().required(),
  [JIRA_FIELDS.BASE_URL]: yup.string().required()
});

const getSettingsSchema = (tag: string) => {
  switch (tag) {
    case 'telegram':
      return telegramSettingsSchema;
    case 'whatsapp':
      return whatsappSettingsSchema;
    case 'jivo':
      return jivositeSettingsSchema;
    case 'vk':
      return vkSettingsSchema;
    case 'jira':
      return jiraSettingsSchema;
    default:
      return yup.object();
  }
};

// TODO make required GENDER, COMMUNICATION_STYLE, AVATAR
export const validationSchema = ({ t }: IValidationSchema) => (
  yup.object({
    [ASSISTANTS_FIELDS.ID]: yup.string().optional().nullable(),
    [ASSISTANTS_FIELDS.NAME]: yup.string().max(96).required(),
    [ASSISTANTS_FIELDS.GENDER]: yup.string().required(),
    [ASSISTANTS_FIELDS.COMMUNICATION_STYLE]: yup.string().required(),
    [ASSISTANTS_FIELDS.AVATAR]: yup.string(),
    [ASSISTANTS_FIELDS.DESCRIPTION]: yup.string().max(144).optional().nullable(),
    [ASSISTANTS_FIELDS.SOURCE]: yup.object({
      [SOURCE_FIELDS.PROVIDER_ID]: yup.string().required(),
      [SOURCE_FIELDS.NAME]: yup.string().required()
    }).required(),
    [ASSISTANTS_FIELDS.GRAPH]: yup.object({
      [GRAPH_FIELDS.PROVIDER_ID]: yup.string().required(),
      [GRAPH_FIELDS.NAME]: yup.string().required(),
    }).required(),
    [ASSISTANTS_FIELDS.CHANNELS]: yup.array().of(
      yup.object().shape({
        [CHANNEL_FIELDS.TAG]: yup.string().required(),
        [CHANNEL_FIELDS.NAME]: yup.string().required(),
        [ASSISTANTS_FIELDS.SETTINGS]: yup.lazy((settings, { parent }) => getSettingsSchema(parent.tag)),
      })
    ).required().min(1, t('At least one channel is required')),
  }).required()
);

export const defaultValues = {
  [ASSISTANTS_FIELDS.NAME]: '',
  [ASSISTANTS_FIELDS.GENDER]: null,
  [ASSISTANTS_FIELDS.COMMUNICATION_STYLE]: null,
  [ASSISTANTS_FIELDS.SOURCE]: null,
  [ASSISTANTS_FIELDS.GRAPH]: null,
  [ASSISTANTS_FIELDS.CHANNELS]: [],
};

export const extendDefaultValues = (values: object | null = {}) => {
  return _extend({}, defaultValues, _omitBy(values, _isNil));
};
