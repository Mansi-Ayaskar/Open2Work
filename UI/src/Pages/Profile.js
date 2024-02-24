import { TextField, InputLabel, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react';
import { profileFormList } from '../helper/profile-data';
import CustomSelect from '../Components/CustomSelect';

function Profile() {
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [inputs, setInputs] = useState({
    openToWork: false,
    skills: [],
    baselocation: '',
    preferredlocation: ''
  });
  const handleChange = (event) => {
    if (event.target.name === 'email') {
      setIsValidEmail(event.target.value.includes('@persistent.com'));
    } else {
      setIsValidEmail(true);
    }
    setInputs((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('inputs: ', inputs);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Share your Profile</h1>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {profileFormList.map((formData) => {
            if (formData.type === 'dropdown') {
              return (
                <Fragment key={formData.id}>
                  <InputLabel>{formData.label}</InputLabel>
                  <CustomSelect
                    name={formData.id}
                    value={inputs[formData.id]}
                    onChange={handleChange}
                    items={formData.items}
                    isMulti={formData.isMultiSelect}
                  />
                </Fragment>
              );
            } else if (formData.type === 'checkbox') {
              return (
                <Fragment key={formData.id}>
                  <InputLabel>{formData.label}</InputLabel>
                  <Checkbox
                    name={formData.id}
                    checked={inputs[formData.id]}
                    onChange={(e) =>
                      setInputs((values) => ({
                        ...values,
                        [formData.id]: e.target.checked
                      }))
                    }
                  />
                </Fragment>
              );
            }
            return (
              <TextField
                key={formData.id}
                id={formData.id}
                type={formData.type ?? 'text'}
                name={formData.id}
                label={formData.label}
                variant="standard"
                value={inputs[formData.id] || ''}
                onChange={handleChange}
                error={formData.type === 'email' ? !isValidEmail : false}
                helperText={
                  formData.type === 'email'
                    ? 'Incorrect email. Please enter Persistent email id.'
                    : 'Enter valid input'
                }
              />
            );
          })}

          <input type="submit" />
        </form>
      </Box>
    </div>
  );
}

export default Profile;
