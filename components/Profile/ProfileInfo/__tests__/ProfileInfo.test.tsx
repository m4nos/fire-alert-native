import React from 'react';
import {
  render,
  fireEvent,
  screen,
  userEvent
} from '@testing-library/react-native';
import ProfileInfo from '../ProfileInfo';
import { Formik } from 'formik';
import { UserProfileFields } from '../types';

jest.useFakeTimers();
// Mock the LocationInput component since it's tested separately
jest.mock('@components/Profile/LocationInput', () => {
  return jest.fn().mockImplementation(() => null);
});

describe('ProfileInfo', () => {
  const initialValues: Partial<UserProfileFields> = {
    userName: '',
    phoneNumber: '',
    location: {
      latitude: 0,
      longitude: 0
    }
  };

  const mockSubmit = jest.fn();

  const renderComponent = () => {
    return render(
      <Formik initialValues={initialValues} onSubmit={mockSubmit}>
        <ProfileInfo />
      </Formik>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders all form fields', () => {
    const { getAllByTestId } = renderComponent();
    expect(getAllByTestId('text-input-outlined-label-active')[0]).toBeTruthy();
    expect(getAllByTestId('text-input-outlined-label-active')[1]).toBeTruthy();
  });

  it('updates username field value', () => {
    const { getAllByTestId } = renderComponent();
    const input = getAllByTestId('text-input-outlined')[0];

    fireEvent.changeText(input, 'John Doe');

    expect(input.props.value).toBe('John Doe');
  });

  it('updates phone number field value', () => {
    const { getAllByTestId } = renderComponent();
    const input = getAllByTestId('text-input-outlined')[1];

    fireEvent.changeText(input, '1234567890');

    expect(input.props.value).toBe('1234567890');
  });

  it.skip('shows error message for invalid username', async () => {
    const { getAllByTestId, findByText } = renderComponent();
    const [userNameinput, phoneNumberInput] = getAllByTestId(
      'text-input-outlined'
    );

    await userEvent.press(userNameinput);
    await userEvent.press(phoneNumberInput);

    const errorMessage = await findByText('Username is required');
    expect(errorMessage).toBeTruthy();
  });

  it.skip('shows error message for invalid phone number', async () => {
    const { getAllByTestId, findByText } = renderComponent();
    const [userNameinput, phoneNumberInput] = getAllByTestId(
      'text-input-outlined'
    );
    fireEvent.changeText(userNameinput, '123');

    const errorMessage = await findByText('Invalid phone number');
    expect(errorMessage).toBeTruthy();
  });

  it('renders with pre-filled values', () => {
    const prefilledValues: Partial<UserProfileFields> = {
      userName: 'John Doe',
      phoneNumber: '1234567890',
      location: {
        latitude: 40.7128,
        longitude: -74.006
      }
    };

    const { getAllByTestId } = render(
      <Formik initialValues={prefilledValues} onSubmit={mockSubmit}>
        <ProfileInfo />
      </Formik>
    );

    const [userNameinput, phoneNumberInput] = getAllByTestId(
      'text-input-outlined'
    );

    expect(userNameinput.props.value).toBe('John Doe');
    expect(phoneNumberInput.props.value).toBe('1234567890');
  });
});
