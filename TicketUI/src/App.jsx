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
  ConcertId: Yup.number().required('Required'),
  Email: Yup.string().email('Invalid').required('Required'),
  Name: Yup.string().required('Required'),
  Phone: Yup.string().required('Required'),
  Quantity: Yup.number().required('Required'),
  CreditCard: Yup.string().required('Required'),
  Expiration: Yup.string().required('Required'),
  SecurityCode: Yup.string().required('Required'),
  Address: Yup.string().required('Required'),
  City: Yup.string().required('Required'),
  Province: Yup.string().required('Required'),
  PostalCode: Yup.string().required('Required'),
  Country: Yup.string().required('Required')
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
