import * as React from 'react';
import { useEffect } from 'react';
import { useForm, FormProvider, Mode } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as yup from 'yup';

export type DisableProps = {
  valid: boolean,
  dirty: boolean
}

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  mode?: Mode;
  onSubmit: (values: object) => void;
  onError: (errors: object) => void;
  onReset?: () => void;
  defaultValues?: object;
  schema: any;
  clearAfterSubmit?: boolean;
  setDisabledRules?: ((values: DisableProps) => void) | undefined;
}>;

function Form({
  mode = 'all',
  defaultValues = {},
  schema,
  onSubmit,
  onError,
  onReset,
  clearAfterSubmit = false,
  className,
  children,
  setDisabledRules
}: Props) {
  const methods = useForm({
    mode,
    defaultValues,
    resolver: yupResolver(schema),
    shouldFocusError: true
  });

  const dirty = methods.formState.isDirty;
  const valid = methods.formState.isValid;

  useEffect(() => {
    setDisabledRules && setDisabledRules({
      dirty,
      valid
    });
  }, [dirty, setDisabledRules, valid]);

  const handleReset = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    methods.reset();
    onReset && onReset();
  };

  const handleSubmit = (values: object) => {
    onSubmit(values);

    if (clearAfterSubmit) {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(handleSubmit, onError)}
        onReset={handleReset}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
