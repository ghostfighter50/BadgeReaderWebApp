import axios, { AxiosResponse } from 'axios'
import apiConfig from '../config/api.json'

interface Badge {
  id: string;
  name: string;
  lastScanned: Date;
  scanned: boolean;
}

export class BadgeService {
  /**
   * Fetches all badges from the API.
   */
  async getAllBadges (): Promise<Badge[]> {
    try {
      const response: AxiosResponse<Badge[]> = await axios.get(
        `http://${apiConfig.host}:${apiConfig.port}/api/badges`
      )
      return response.data
    } catch (error: any) {
      console.error('Error fetching badges:', error.message)
      throw error
    }
  }

  /**
   * Fetches a badge by ID from the API.
   * @param {string} badgeId - The ID of the badge to fetch.
   */
  async getBadgeById (badgeId: string): Promise<Badge> {
    try {
      const response: AxiosResponse<Badge> = await axios.get(
        `http://${apiConfig.host}:${apiConfig.port}/api/badges/${badgeId}`
      )
      return response.data
    } catch (error: any) {
      console.error('Error fetching badge by ID:', error.message)
      throw error
    }
  }

  /**
   * Creates a new badge using the provided data.
   * @param {Badge} badgeData - The data for the new badge.
   */
  async createBadge (badgeData: Badge): Promise<Badge> {
    try {
      const response: AxiosResponse<Badge> = await axios.post(
        `http://${apiConfig.host}:${apiConfig.port}/api/badges`,
        badgeData
      )
      return response.data
    } catch (error: any) {
      console.error('Error creating badge:', error.message)
      throw error
    }
  }

  /**
   * Updates a badge with the provided ID using the specified data.
   * @param {string} badgeId - The ID of the badge to update.
   * @param {Partial<Badge>} updatedBadgeData - The data to update the badge with.
   */
  async modifyBadge (
    badgeId: string,
    updatedBadgeData: Partial<Badge>
  ): Promise<Badge> {
    try {
      const response: AxiosResponse<Badge> = await axios.put(
        `http://${apiConfig.host}:${apiConfig.port}/api/badges/${badgeId}`,
        updatedBadgeData
      )
      return response.data
    } catch (error: any) {
      console.error('Error updating badge:', error.message)
      throw error
    }
  }

  /**
   * Deletes a badge with the provided ID.
   * @param {string} badgeId - The ID of the badge to delete.
   */
  async deleteBadge (badgeId: string): Promise<void> {
    try {
      await axios.delete(`http://${apiConfig.host}:${apiConfig.port}/api/badges/${badgeId}`)
    } catch (error: any) {
      console.error('Error deleting badge:', error.message)
      throw error
    }
  }
}
