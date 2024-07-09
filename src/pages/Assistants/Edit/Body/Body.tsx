import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Text } from '@mantine/core';

import { IAssistant } from '@web/types';
import classes from './Body.module.css';
import Header from '../Header';
import MainLoader from '@web/components/MainLoader/MainLoader';
import Form from '@web/components/Forms/Form';
import AssistantsForm, {
  validationSchema,
  extendDefaultValues, ASSISTANTS_FIELDS
} from '@web/pages/Assistants/components/AssistantsForm';
import { useAppDispatch } from '@web/store';
import Aside from '@web/pages/Assistants/Edit/Aside';
import { assistantsUpdateAction } from '@web/store/assistantsSlice/actions';
import { IAssistantUpdateParams } from '@web/connections';
import { notification } from '@web/components/Notification';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
}>;

const BodyComponent: React.FC<Props> = ({ assistant }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    const newData = {
      ...values,
      id: assistant.id,
    }

    try {
      setLoading(true);

      await dispatch(assistantsUpdateAction(newData as IAssistantUpdateParams)).unwrap();
      navigate(`/assistants/${assistant.id}`);
    } catch (error) {
      notification('error', 'Возникла ошибка', 'Попробуйте повторить запрос позднее');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    navigate(`/assistants/${assistant.id}`);
  };

  const handleError = (errors: unknown) => {
    console.log('handle error: ', errors);
  };

  return loading ? (
    <MainLoader title="Редактируем ассистента..." />
  ) : (
    <Form
      schema={validationSchema({ t })}
      defaultValues={extendDefaultValues({
        ...assistant,
        [ASSISTANTS_FIELDS.CHANNELS]: assistant?.channels.map((channel)=>({
         ...channel,
          id: channel.id,
          _destroy: false
        })) || []
      })}
      onSubmit={handleSubmit}
      onError={handleError}
    >
      <Header assistant={assistant} />
      <Box className={classes.root}>

        <Box className={classes.body}>
          <Box className={classes.aside}>
            <Aside assistant={assistant} />
          </Box>
          <Box className={classes.mainContent}>
            <AssistantsForm assistant={assistant} />
          </Box>
          <Box className={classes.saveSection}>
            <Text size="14px" lh="22px" color="#323D42">
              Отредактируйте необходимую информацию ниже, чтобы продолжить
            </Text>
            <Box className={classes.buttons}>
              <Button
                onClick={handleReset}
                className={classes.cancel_btn}
                fw={500}
                radius="lg"
                size="lg"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                className={classes.save_btn}
                fw={500}
                radius="lg"
                size="lg"
              >
                Сохранить
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Form>
  );
};

export default BodyComponent;
