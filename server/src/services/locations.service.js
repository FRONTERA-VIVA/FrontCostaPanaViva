import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/mapData.json');

/**
 * Backend Locations Service
 * Centralizes all data access for locations, whether from JSON or Prisma.
 */
export const locationsService = {
  /**
   * Returns all regional data (center, zoom, styles, and locations)
   */
  getRegionalData: async () => {
    try {
      const data = await fs.readFile(DATA_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error in LocationsService.getRegionalData:', error);
      throw new Error('Database access failed');
    }
  },

  /**
   * Find a specific location by ID
   */
  getById: async (id) => {
    try {
      const data = await fs.readFile(DATA_PATH, 'utf8');
      const { locations } = JSON.parse(data);
      return locations.find(loc => loc.id === parseInt(id));
    } catch (error) {
      console.error('Error in LocationsService.getById:', error);
      throw new Error('Location lookup failed');
    }
  }
};
