// =========================================================
// contact.js
// Contact form validation: checks for empty fields, a valid
// email format, and a digits-only phone number, per the brief.
// =========================================================

const form = document.getElementById('contact-form');
const statusBox = document.getElementById('form-status');

const FIELD_NAMES = ['name', 'email', 'phone', 'message'];

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop native submission — we validate ourselves
    handleSubmit();
  });

  // Clear a field's error as soon as the user starts correcting it,
  // rather than making them re-submit just to see the error disappear
  FIELD_NAMES.forEach((fieldName) => {
    const el = document.getElementById(fieldName);
    el?.addEventListener('input', () => clearFieldError(fieldName));
  });
}

/**
 * Reads the form, validates it, and either shows field-level
 * errors or a success message.
 */
function handleSubmit() {
  const values = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  FIELD_NAMES.forEach((fieldName) => {
    errors[fieldName] ? showFieldError(fieldName, errors[fieldName]) : clearFieldError(fieldName);
  });

  if (isValid) {
    const firstName = values.name.split(' ')[0];
    showStatus('success', `Thanks, ${firstName}! Your message looks good and is ready to send.`);
    form.reset();
  } else {
    showStatus('error', 'Please fix the highlighted fields before sending.');
  }
}

/**
 * Runs every validation rule and collects any errors found.
 * @param {{name:string, email:string, phone:string, message:string}} values
 * @returns {Object} map of fieldName -> error message (empty object if all valid)
 */
function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Please enter your full name.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';
  }

  if (!values.phone) {
    errors.phone = 'Please enter your phone number.';
  } else if (!isDigitsOnly(values.phone)) {
    errors.phone = 'Phone number should contain digits only, e.g. 08012345678.';
  }

  if (!values.message) {
    errors.message = 'Please enter a message.';
  }

  return errors;
}

/**
 * A readable, "good enough for a contact form" email check —
 * something@something.something. Not a full RFC-5322 validator
 * (nothing truly is), but it catches real mistakes.
 * @param {string} value
 */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Confirms the value is digits only — no spaces, dashes, or
 * plus signs — matching the brief's exact wording.
 * @param {string} value
 */
function isDigitsOnly(value) {
  return /^[0-9]+$/.test(value);
}

function showFieldError(fieldName, message) {
  document.getElementById(`field-${fieldName}`)?.classList.add('has-error');
  const errorEl = document.getElementById(`error-${fieldName}`);
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(fieldName) {
  document.getElementById(`field-${fieldName}`)?.classList.remove('has-error');
  const errorEl = document.getElementById(`error-${fieldName}`);
  if (errorEl) errorEl.textContent = '';
}

function showStatus(type, message) {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.className = `form-status visible ${type}`;
}