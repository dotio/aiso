import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Text, Button, Box } from '@mantine/core';

import Header from '@web/pages/Assistants/Add/components/Header';
import Form from '@web/components/Forms/Form';
import AssistantsForm, {
  validationSchema,
  extendDefaultValues
} from '@web/pages/Assistants/components/AssistantsForm';
import { useAppDispatch } from '@web/store';
import { assistantsCreateAction } from '@web/store/assistantsSlice/actions';
import MainLoader from '@web/components/MainLoader/MainLoader';
import { notification } from '@web/components/Notification';

import { IAssistantCreateParams } from '@web/connections';

import classes from './Add.module.css';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

const Add: React.FC<Props> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (values: unknown) => {
    try {
      setLoading(true);

      await dispatch(assistantsCreateAction(values as IAssistantCreateParams)).unwrap();
      navigate('/assistants');
    } catch (error) {
      notification('error', 'Возникла ошибка', 'Попробуйте повторить запрос позднее');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    console.log('handle reset');
  };

  const handleError = (errors: unknown) => {
    console.log('handle error: ', errors);
  };

  return loading ? (
    <MainLoader title="Создаем ассистента..." />
  ) : (
    <Form
      schema={validationSchema({ t })}
      defaultValues={extendDefaultValues({})}
      onSubmit={handleSubmit}
      onError={handleError}
      onReset={handleReset}
    >
      <Header />
      <Box className={classes.root}>
        <Box className={classes.body}>
          <Box className={classes.mainContent}>
            <AssistantsForm />
          </Box>
          <Box className={classes.saveSection}>
            <Text size="14px" lh="22px" color="#323D42">
              Заполните необходимую информацию ниже, чтобы продолжить
            </Text>
            <Box className={classes.buttons}>
              <Button type="reset" className={classes.cancel_btn} fw={500} radius="lg" size="lg">
                Отмена
              </Button>
              <Button type="submit" className={classes.save_btn} fw={500} radius="lg" size="lg">
                Сохранить
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Form>
  );
};

export default Add;
