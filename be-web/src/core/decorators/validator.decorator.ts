import { Transform } from 'class-transformer';
import {
  registerDecorator,
  ValidateIf,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import moment from 'moment';
// import { values } from 'underscore';

export function IsOnlyDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isOnlyDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;
          return (
            typeof value === 'string' &&
            moment(value, ['DD-MM-YYYY', 'YYYY-MM-DD'], true).isValid()
          );
        },
      },
    });
  };
}

export function IsPositiveCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPositive',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value?: any) {
          if (!value) return true;
          return typeof value === 'number' && value > 0;
        },
      },
    });
  };
}

export function IsBooleanCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBoolean',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value?: any) {
          if (!value) return true;
          return typeof value === 'boolean';
        },
      },
    });
  };
}

export function MatchCustom(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
      },
    });
  };
}

export function MinLengthCustom(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'minLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;
          if (typeof value != 'string') return false;
          const length = value.trim().length;
          return length >= min;
        },
        defaultMessage() {
          return `${propertyName} must be longer than or equal to ${min} characters.`;
        },
      },
    });
  };
}

export function MaxLengthCustom(
  max: number,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'maxLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [max],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;
          if (typeof value != 'string') return false;
          const length = value.trim().length;
          return length <= max;
        },
        defaultMessage() {
          return `${propertyName} must be shorter than or equal to ${max} characters.`;
        },
      },
    });
  };
}

export function NotMatchesCustom(
  format: RegExp,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'notMatches',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;
          return typeof value == 'string' && !format.test(value);
        },
      },
    });
  };
}

export function IsStringOrNumber(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isStringOrNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;
          return typeof value == 'string' || typeof value == 'number';
        },
      },
    });
  };
}

export function Regex(format: RegExp, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'regex',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return true;
          value = value.trim();
          return (
            typeof value == 'string' && value.length != 0 && format.test(value)
          );
        },
      },
    });
  };
}

export function IsImageNameWithExtension(
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isImageNameWithExtension',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value.match(/\.(jpg|jpeg|png|gif|webp)$/);
        },
      },
    });
  };
}

export function IsArrImageNameWithExtension(
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isImageNameWithExtension',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            value instanceof Array &&
            value.every((v) => v.match(/\.(jpg|jpeg|png|gif|webp)$/))
          );
        },
      },
    });
  };
}

export function MatchesCustom(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'matchesCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (!value) return false;
          const regex = /^(?!\s*$).+$/;
          return regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not be null, empty, or only whitespace`;
        },
      },
    });
  };
}

export function IsOptionalCustom(validationOptions?: ValidationOptions) {
  return ValidateIf((_obj, value) => {
    if (value !== undefined) {
      return value === null || value.length == 0;
    }
    return false;
  }, validationOptions);
}

export function Trim() {
  return Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  );
}
