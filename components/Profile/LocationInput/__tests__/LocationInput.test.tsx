import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import LocationInput from '../LocationInput';
import { Formik } from 'formik';
import useReverseGeolocation from '@hooks/useReverseGeolocation';

jest.useFakeTimers();
// Mock the required modules
jest.mock('expo-location');
jest.mock('expo-font');
jest.mock('@hooks/useReverseGeolocation');

const mockAlert = jest.spyOn(Alert, 'alert');

const mockLocation = {
  coords: {
    latitude: 40.7128,
    longitude: -74.006
  }
};

const mockGeolocationResponse = {
  state_district: 'New York'
};

describe('LocationInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      { status: 'granted' }
    );
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(
      mockLocation
    );
    (useReverseGeolocation as jest.Mock).mockResolvedValue(
      mockGeolocationResponse
    );
  });

  const renderComponent = () => {
    return render(
      <Formik
        initialValues={{
          location: { latitude: 0, longitude: 0 },
          userName: '',
          phoneNumber: ''
        }}
        onSubmit={jest.fn()}
      >
        <LocationInput />
      </Formik>
    );
  };

  it('renders location input with initial state', () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText('Grant access to location')).toBeTruthy();
  });

  it('requests location permission when location icon is pressed', async () => {
    const { getByTestId } = renderComponent();

    await act(async () => {
      fireEvent.press(getByTestId('right-icon-adornment'));
    });

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
    expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
  });

  it('shows alert when location permission is denied', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      { status: 'denied' }
    );
    const { getByTestId } = renderComponent();

    await act(async () => {
      fireEvent.press(getByTestId('right-icon-adornment'));
    });

    expect(mockAlert).toHaveBeenCalledWith(
      'Permission to access location was denied'
    );
  });

  it('displays location data after successful location fetch', async () => {
    const { getByTestId, getByDisplayValue } = renderComponent();

    await act(async () => {
      fireEvent.press(getByTestId('right-icon-adornment'));
    });

    expect(getByDisplayValue('New York')).toBeTruthy();
  });

  it('handles location fetch error gracefully', async () => {
    const mockError = new Error('Location fetch failed');
    (Location.getCurrentPositionAsync as jest.Mock).mockRejectedValue(
      mockError
    );
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { getByTestId } = renderComponent();

    await act(async () => {
      fireEvent.press(getByTestId('right-icon-adornment'));
    });

    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    consoleSpy.mockRestore();
  });
});
