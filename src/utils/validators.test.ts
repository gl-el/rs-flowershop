import { validateEmail, validateDate } from './validators';
import dayjs, { Dayjs } from 'dayjs';

describe('validateEmail', () => {
  it('returns false and sets error message for an invalid email', () => {
    const setEmailErrorMock = jest.fn();
    const result = validateEmail('invalid-email', setEmailErrorMock);
    expect(result).toBe(false);
    expect(setEmailErrorMock).toHaveBeenCalledWith(
      expect.stringContaining('Invalid email address')
    );
  });
});

describe('validateDate', () => {
  it('returns "invalidDate" for null date', () => {
    const result = validateDate(null);
    expect(result).toBe('invalidDate');
  });

  it('returns "maxDate" for date of a person under the age limit', () => {
    const currentDate = new Date();
    const dateOfBirth = currentDate.getFullYear() - 12 + '-08-21';
    const result = validateDate(dayjs(dateOfBirth) as Dayjs);
    expect(result).toBe('maxDate');
  });

  it('returns null for a valid date', () => {
    const result = validateDate(dayjs('1990-01-01') as Dayjs);
    expect(result).toBeNull();
  });
});
