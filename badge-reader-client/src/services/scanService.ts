import axios, { AxiosResponse } from 'axios'
import apiConfig from '../config/api.json'

interface Scan {
  badgeId: string;
}

/**
 * Service class for handling badge scanning operations.
 */
export class ScanService {
  /**
   * Initiates a scan for a badge with the specified ID.
   * @param {string} badgeId - The ID of the badge to be scanned.
   */
  async scanBadge (badgeId: string): Promise<Scan> {
    try {
      const response: AxiosResponse<Scan> = await axios.get(`http://${apiConfig.host}:${apiConfig.port}/api/scans/${badgeId}`)
      return response.data
    } catch (error: any) {
      console.error('Error scanning the badge:', error.message)
      throw error
    }
  }
}
