import axios, { AxiosResponse } from 'axios'
import apiConfig from '../config/api.json'

/**
 * Service class for handling badge scanning operations.
 */
export class ScanService {
  /**
   * Initiates a scan for a badge with the specified ID.
   * @param {string} badgeId - The ID of the badge to be scanned.
   */
  async scanBadge(badgeId: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://${apiConfig.host}:${apiConfig.port}/api/scan/${badgeId}`
      )
      return response.data.data
    } catch (error: any) {
      console.error('Error scanning the badge:', error.message)
      throw error
    }
  }
}
