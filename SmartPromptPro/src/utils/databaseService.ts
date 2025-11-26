/**
 * Servicio genérico para enviar datos a bases de datos externas
 * Configura las URLs en las variables abaixo
 */

interface FormData {
  nombre: string
  email: string
  telefono: string
  interes: string
  mensaje: string
  fuente: string
  fecha: string
}

// CONFIGURACIÓN - Actualiza estas variables con tus endpoints
const DATABASE_ENDPOINTS = {
  // Ejemplo: Firebase Firestore
  firebase: '', // 'https://firestore.googleapis.com/v1/projects/tu-proyecto/databases/(default)/documents/leads'
  
  // Ejemplo: Supabase
  supabase: '', // 'https://tu-proyecto.supabase.co/rest/v1/leads'
  
  // Ejemplo: Airtable
  airtable: '', // 'https://api.airtable.com/v0/tu-base/tu-tabla'
  
  // Ejemplo: MongoDB Realm
  mongodb: '', // 'https://data.mongodb-api.com/app/tu-app/endpoint/data/v1/action/insertOne'
  
  // Tu endpoint personalizado
  custom: '' // 'https://tu-api.com/form-data'
}

// Headers de autenticación - Actualiza según tu base de datos
const DATABASE_HEADERS: Record<string, HeadersInit> = {
  firebase: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer tu-token-firebase'
  },
  supabase: {
    'Content-Type': 'application/json',
    'apikey': 'tu-api-key-supabase',
    'Authorization': 'Bearer tu-token-supabase'
  },
  airtable: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer tu-api-key-airtable'
  },
  mongodb: {
    'Content-Type': 'application/json',
    'api-key': 'tu-api-key-mongodb'
  },
  custom: {
    'Content-Type': 'application/json'
  }
}

/**
 * Envía datos a una base de datos externa configurada
 * @param data Datos del formulario
 * @param databaseType Tipo de base de datos ('firebase', 'supabase', etc.)
 */
export async function sendToDatabase(
  data: FormData, 
  databaseType: keyof typeof DATABASE_ENDPOINTS = 'custom'
): Promise<{success: boolean; error?: string}> {
  
  const endpoint = DATABASE_ENDPOINTS[databaseType]
  const headers = DATABASE_HEADERS[databaseType]
  
  if (!endpoint) {
    return { 
      success: false, 
      error: `Endpoint no configurado para ${databaseType}. Actualiza DATABASE_ENDPOINTS en databaseService.ts` 
    }
  }

  try {
    // Transformar datos según el formato requerido por cada base de datos
    const payload = transformDataForDatabase(data, databaseType)
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      console.debug(`[Database] Datos enviados exitosamente a ${databaseType}`)
      return { success: true }
    } else {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }
  } catch (error) {
    console.error(`[Database] Error enviando a ${databaseType}:`, error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }
  }
}

/**
 * Transforma los datos al formato requerido por cada base de datos
 */
function transformDataForDatabase(data: FormData, databaseType: string): unknown {
  switch (databaseType) {
    case 'firebase':
      return {
        fields: {
          nombre: { stringValue: data.nombre },
          email: { stringValue: data.email },
          telefono: { stringValue: data.telefono },
          interes: { stringValue: data.interes },
          mensaje: { stringValue: data.mensaje },
          fuente: { stringValue: data.fuente },
          fecha: { timestampValue: data.fecha }
        }
      }
    
    case 'supabase':
    case 'custom':
      return data
    
    case 'airtable':
      return {
        records: [{
          fields: {
            Nombre: data.nombre,
            Email: data.email,
            Telefono: data.telefono,
            Interes: data.interes,
            Mensaje: data.mensaje,
            Fuente: data.fuente,
            Fecha: data.fecha
          }
        }]
      }
    
    case 'mongodb':
      return {
        collection: 'leads',
        database: 'smartprompt',
        dataSource: 'Cluster0',
        document: data
      }
    
    default:
      return data
  }
}

/**
 * Verifica la configuración de las bases de datos
 */
export function checkDatabaseConfig(): Record<string, boolean> {
  const config: Record<string, boolean> = {}
  
  Object.entries(DATABASE_ENDPOINTS).forEach(([key, endpoint]) => {
    config[key] = !!endpoint
  })
  
  return config
}
