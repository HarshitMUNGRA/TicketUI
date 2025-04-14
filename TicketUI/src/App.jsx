import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  ConcertId: '',
  Email: '',
  Name: '',
  Phone: '',
  Quantity: '',
  CreditCard: '',
  Expiration: '',
  SecurityCode: '',
  Address: '',
  City: '',
  Province: '',
  PostalCode: '',
  Country: ''
}

const validationSchema = Yup.object({
  ConcertId: Yup.number()
    .typeError('ConcertId must be a number.')
    .positive('ConcertId must be a positive integer.')
    .required('ConcertId is required.'),

  Email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),

  Name: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Name cannot contain numbers.')
    .min(2, 'Name must be at least 2 characters long.')
    .max(100, 'Name cannot exceed 100 characters.')
    .required('Name is required.'),

  Phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits.')
    .required('Phone number is required.'),

  Quantity: Yup.number()
    .typeError('Quantity must be a number.')
    .positive('Quantity must be a positive integer.')
    .required('Quantity is required.'),

  CreditCard: Yup.string()
    .matches(/^\d{12}$/, 'Credit card number must be exactly 12 digits.')
    .required('Credit card number is required.'),

  Expiration: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration must be in MM/YY format.')
    .required('Expiration date is required.'),

  SecurityCode: Yup.string()
    .matches(/^\d{3}$/, 'Security code must be exactly 3 digits.')
    .required('Security code is required.'),

  Address: Yup.string()
    .max(200, 'Address cannot be longer than 200 characters.')
    .required('Address is required.'),

  City: Yup.string()
    .max(100, 'City cannot be longer than 100 characters.')
    .required('City is required.'),

  Province: Yup.string()
    .max(50, 'Province cannot be longer than 50 characters.')
    .required('Province is required.'),

  PostalCode: Yup.string()
    .length(6, 'Postal code must be exactly 6 characters.')
    .required('Postal code is required.'),

  Country: Yup.string()
    .max(100, 'Country cannot be longer than 100 characters.')
    .required('Country is required.')
})


export default function App() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch('https://nscc-0490104-tickethub-eqcvgpbnhtb2c2he.canadacentral-01.azurewebsites.net/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        alert(res.ok ? 'Ticket booked successfully!' : 'Booking failed')
        if (res.ok) resetForm()
      } catch {
        alert('Network error')
      }
    }
  })

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #d8b4fe, #fbcfe8)',
    padding: '40px'
  }

  const formStyle = {
    width: '100%',
    maxWidth: '700px',
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  }

  const labelStyle = {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '6px'
  }

  const inputStyle = {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.2s'
  }

  const inputErrorStyle = {
    ...inputStyle,
    border: '1px solid red'
  }

  const errorTextStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px'
  }

  const buttonStyle = {
    padding: '14px',
    backgroundColor: '#6366f1',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer'
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={formik.handleSubmit} style={formStyle}>
        <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '10px' }}>
          🎟️ Concert Ticket Booking
        </h2>

        {Object.entries(formik.values).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>{key}</label>
            <input
              type={key === 'SecurityCode' ? 'password' : 'text'}
              name={key}
              value={value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={formik.touched[key] && formik.errors[key] ? inputErrorStyle : inputStyle}
              placeholder={`Enter ${key}`}
            />
            {formik.touched[key] && formik.errors[key] && (
              <span style={errorTextStyle}>{formik.errors[key]}</span>
            )}
          </div>
        ))}

        <button type="submit" style={buttonStyle}>Submit Ticket</button>
      </form>
    </div>
  )
}
