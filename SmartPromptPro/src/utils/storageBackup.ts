/**
 * Utilidad para respaldo de datos del formulario en localStorage
 * como fallback si n8n no está disponible
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

/**
 * Guarda los datos del formulario en localStorage como respaldo
 * @param data Datos del formulario a guardar
 */
export function saveToLocalBackup(data: FormData): void {
  try {
    const timestamp = new Date().toISOString()
    const backupKey = `form_backup_${timestamp}`
    const existingBackups = JSON.parse(localStorage.getItem('form_backups') || '[]')
    
    existingBackups.push({
      key: backupKey,
      data: data,
      timestamp: timestamp
    })

    // Mantener solo los últimos 50 backups para no llenar el storage
    const recentBackups = existingBackups.slice(-50)
    localStorage.setItem('form_backups', JSON.stringify(recentBackups))
    localStorage.setItem(backupKey, JSON.stringify(data))
    
    console.debug('[Backup] Datos guardados en localStorage:', backupKey)
  } catch (error) {
    console.warn('[Backup] Error guardando en localStorage:', error)
  }
}

/**
 * Recupera todos los backups del localStorage
 */
export function getLocalBackups(): Array<{key: string, data: FormData, timestamp: string}> {
  try {
    return JSON.parse(localStorage.getItem('form_backups') || '[]')
  } catch {
    return []
  }
}

/**
 * Elimina un backup específico del localStorage
 */
export function removeLocalBackup(backupKey: string): void {
  try {
    localStorage.removeItem(backupKey)
    const existingBackups = getLocalBackups()
    const filteredBackups = existingBackups.filter(backup => backup.key !== backupKey)
    localStorage.setItem('form_backups', JSON.stringify(filteredBackups))
  } catch (error) {
    console.warn('[Backup] Error eliminando backup:', error)
  }
}
