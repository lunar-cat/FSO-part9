import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';
import {
  TextField,
  DiagnosisSelection,
  SelectField,
  HealthOption
} from '../AddPatientModal/FormField';
import { Entry, HealthCheckRating, UnionOmit, Diagnosis } from '../types';

export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface IAddEntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  type: Entry['type'];
  initialValues: EntryFormValues | null;
  diagnoses: { [id: string]: Diagnosis };
}

const healthRatingOptions: HealthOption[] = [
  {
    value: HealthCheckRating.Healthy,
    label: 'Healthy'
  },
  {
    value: HealthCheckRating.LowRisk,
    label: 'Low Risk'
  },
  {
    value: HealthCheckRating.HighRisk,
    label: 'High Risk'
  },
  {
    value: HealthCheckRating.CriticalRisk,
    label: 'Critical Risk'
  }
];

const checkValidity = (values: EntryFormValues) => {
  const requiredError = 'Field is required';
  const dateFormatError = 'Date Format Incorrect';
  const errors: {
    [field: string]: string | { [field: string]: string };
  } = {};
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!values.description) errors['description'] = requiredError;
  if (!values.date) errors['date'] = requiredError;
  if (values.date && !dateRegex.test(values.date))
    errors['date'] = dateFormatError;
  if (!values.specialist) errors['specialist'] = requiredError;
  switch (values.type) {
    case 'HealthCheck':
      if (values.healthCheckRating === undefined)
        errors['healthCheckRating'] = requiredError;
      break;
    case 'OccupationalHealthcare':
      if (!values.employerName) errors['employerName'] = requiredError;
      errors['sickLeave'] = { startDate: '', endDate: '' };
      if (
        values.sickLeave &&
        (values.sickLeave.startDate !== '' || values.sickLeave.endDate !== '')
      ) {
        if (!values.sickLeave.startDate && !values.sickLeave.endDate) {
          errors.sickLeave.startDate = requiredError;
          errors.sickLeave.endDate = requiredError;
        } else if (!values.sickLeave.startDate) {
          errors.sickLeave.startDate = requiredError;
        } else if (!values.sickLeave.endDate) {
          errors.sickLeave.endDate = requiredError;
        }
      }
      if (values.sickLeave && values.sickLeave.startDate) {
        if (!dateRegex.test(values.sickLeave.startDate)) {
          errors.sickLeave.startDate = dateFormatError;
        }
      }
      if (values.sickLeave && values.sickLeave.endDate) {
        if (!dateRegex.test(values.sickLeave.endDate)) {
          errors.sickLeave.endDate = dateFormatError;
        }
      }
      break;
    case 'Hospital':
      errors['discharge'] = { date: '', criteria: '' };

      if (!values.discharge.date && !values.discharge.criteria) {
        errors.discharge.date = requiredError;
        errors.discharge.criteria = requiredError;
      } else if (!values.discharge.date) {
        errors.discharge.date = requiredError;
      } else if (!values.discharge.criteria) {
        errors.discharge.criteria = requiredError;
      }
      if (values.discharge.date && !dateRegex.test(values.discharge.date)) {
        errors.discharge.date = dateFormatError;
      }
      break;
    default:
      break;
  }
  console.log('errors\n', errors);
  return errors;
};
const AddEntryForm = ({
  onSubmit,
  type,
  onCancel,
  initialValues,
  diagnoses
}: IAddEntryFormProps) => {
  if (!initialValues) return null;
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={(values) => checkValidity(values)}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              disabled={true}
            />

            {type === 'OccupationalHealthcare' && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Start Date (optional)"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End Date (optional)"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            {type === 'HealthCheck' && (
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={healthRatingOptions}
              />
            )}
            {type === 'Hospital' && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right'
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
