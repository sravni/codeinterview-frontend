type TToNumberOptions = {
  default?: number;
  min?: number;
  max?: number;
};

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function trim(value: string): string {
  return value.trim();
}

export function toDate(value: string): Date {
  return new Date(value);
}

export function toBoolean(value: string): boolean {
  value = value.toLowerCase();

  return value === 'true' || value === '1' ? true : false;
}

export function toNumber(value: string, opts: TToNumberOptions = {}): number {
  const newValue: number = Number.parseFloat(value);

  if (Number.isNaN(newValue) && opts.default) {
    return opts.default;
  }

  if (opts.min && newValue < opts.min) {
    return opts.min;
  }

  if (opts.max && newValue > opts.max) {
    return opts.max;
  }

  return newValue;
}
