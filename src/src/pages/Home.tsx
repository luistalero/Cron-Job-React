import React from 'react'
import Button from '../components/Button'

const Home: React.FC = () => {
  const handleRegisterUser = () => {
    alert('Navegar a la pantalla de Registrar Usuario')
    // Aquí puedes implementar la lógica de navegación
  }

  const handleScheduleEmail = () => {
    alert('Navegar a la pantalla de Programar Correo')
    // Aquí puedes implementar la lógica de navegación
  }

  const handleListScheduledEmails = () => {
    alert('Navegar a la pantalla de Listar Correos Programados')
    // Aquí puedes implementar la lógica de navegación
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1>Bienvenido a la Gestión de Correos</h1>
      <Button label="Registrar Usuario" onClick={handleRegisterUser} />
      <Button label="Programar Correo" onClick={handleScheduleEmail} />
      <Button label="Listar Correos Programados" onClick={handleListScheduledEmails} />
    </div>
  )
}

export default Home
