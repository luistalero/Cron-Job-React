import React, { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

interface BackendData {
  message: string
  service: string
  timestamp: string 
}

function DataFetcher() {
  const [data, setData] = useState<BackendData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<BackendData>('http://localhost:3001/')
        setData(response.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError
          if (axiosError.response) {
            setError(`Error del servidor: ${axiosError.response.status} - ${axiosError.response.data}`)
            console.error('Error de respuesta:', axiosError.response.data)
          } else if (axiosError.request) {
            setError('No se recibió respuesta del backend. ¿Está corriendo?')
            console.error('Error de petición:', axiosError.request)
          } else {
            setError(`Error: ${axiosError.message}`)
            console.error('Error de configuración:', axiosError.message)
          }
        } else {
          setError('Ocurrió un error inesperado al cargar los datos.')
          console.error('Error inesperado:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <p>Cargando datos...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>
  }

  return (
    <div>
      <h2>Datos desde el Backend:</h2>
      {data ? (
        <>
          <p>Mensaje: {data.message}</p>
          <p>Timestamp: {data.timestamp}</p>
          {data.id && <p>ID: {data.id}</p>}
          {data.name && <p>Nombre: {data.name}</p>}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      ) : (
        <p>No se encontraron datos.</p>
      )}
    </div>
  )
}

export default DataFetcher