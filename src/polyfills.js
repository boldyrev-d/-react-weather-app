import values from 'object.values';

if (!Object.values) {
  values.shim();
}
