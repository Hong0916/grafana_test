import { css, cx } from '@emotion/css';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { GrafanaTheme2 } from '@grafana/data';
import { Field, FieldSet, Input, TextArea, useStyles2 } from '@grafana/ui';

import { useCorrelationsFormContext } from './correlationsFormContext';
import { FormDTO } from './types';
import { getInputId } from './utils';

const getStyles = (theme: GrafanaTheme2) => ({
  label: css`
    max-width: ${theme.spacing(80)};
  `,
  description: css`
    max-width: ${theme.spacing(80)};
  `,
});

export const ConfigureCorrelationBasicInfoForm = () => {
  const { register, formState } = useFormContext<FormDTO>();
  const styles = useStyles2(getStyles);
  const { correlation, readOnly } = useCorrelationsFormContext();

  return (
    <>
      <FieldSet label="Define correlation label (Step 1 of 3)">
        <p>Define text that will describe the correlation.</p>
        <input type="hidden" {...register('config.type')} />
        <Field
          label="Label"
          description="This name will be used as the label for the correlation. This will show as button text, a menu item, or hover text on a link."
          className={styles.label}
          invalid={!!formState.errors.label}
          error={formState.errors.label?.message}
        >
          <Input
            id={getInputId('label', correlation)}
            {...register('label', { required: { value: true, message: 'This field is required.' } })}
            readOnly={readOnly}
            placeholder="e.g. Tempo traces"
          />
        </Field>

        <Field
          label="Description"
          description="Optional description with more information about the link"
          // the Field component automatically adds margin to itself, so we are forced to workaround it by overriding  its styles
          className={cx(styles.description)}
        >
          <TextArea id={getInputId('description', correlation)} {...register('description')} readOnly={readOnly} />
        </Field>
      </FieldSet>
    </>
  );
};
