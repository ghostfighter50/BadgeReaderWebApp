import axios, { AxiosResponse } from 'axios'
import apiConfig from '../config/api.json'

interface Badge {
  badgeId: string
  name: string
  lastScanned: Date
  isScanned: boolean
  isAdmin: boolean
}

export class BadgeService {
  private authToken: string | null

  constructor() {
    this.authToken = localStorage.getItem('token')
  }

  private getHeaders() {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    }

    if (this.authToken) {
      headers.auth = `${this.authToken}`
    }

    return headers
  }

  async getAllBadges(): Promise<any[]> {
    try {
      const response: AxiosResponse<any> = await axios.get(`https://${apiConfig.host}:${apiConfig.port}/api/badges`, {
        headers: this.getHeaders()
      })
      return response.data.data
    } catch (error: any) {
      console.error('Error fetching badges:', error.message)
      throw error
    }
  }

  async getBadgeById(badgeId: string): Promise<Badge> {
    try {
      const response: AxiosResponse<Badge> = await axios.get(
        `https://${apiConfig.host}:${apiConfig.port}/api/badges/${badgeId}`,
        {
          headers: this.getHeaders()
        }
      )
      return response.data
    } catch (error: any) {
      console.error('Error fetching badge by ID:', error.message)
      throw error
    }
  }

  async createBadge(badgeData: any): Promise<Badge> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `https://${apiConfig.host}:${apiConfig.port}/api/badges`,
        badgeData,
        {
          headers: this.getHeaders()
        }
      )
      return response.data.data
    } catch (error: any) {
      console.error('Error creating badge:', error.message)
      throw error
    }
  }

  async modifyBadge(badgeId: string, updatedBadgeData: Partial<any>): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `https://${apiConfig.host}:${apiConfig.port}/api/badges/${badgeId}`,
        updatedBadgeData,
        {
          headers: this.getHeaders()
        }
      )
      return response.data
    } catch (error: any) {
      console.error('Error updating badge:', error.message)
      throw error
    }
  }

  async deleteBadge(badgeId: string): Promise<void> {
    try {
      await axios.delete(`https://${apiConfig.host}:${apiConfig.port}/api/badges/${badgeId}`, {
        headers: this.getHeaders()
      })
    } catch (error: any) {
      console.error('Error deleting badge:', error.message)
      throw error
    }
  }

  async deleteAllBadges(): Promise<void> {
    try {
      await axios.delete(`https://${apiConfig.host}:${apiConfig.port}/api/badges`, {
        headers: this.getHeaders()
      })
    } catch (error: any) {
      console.error('Error deleting all badges:', error.message)
      throw error
    }
  }
}

export default BadgeService
