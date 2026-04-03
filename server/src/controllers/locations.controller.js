import { locationsService } from '../services/locations.service.js';

/**
 * Controller to fetch all regional data for the map and explorer.
 */
export const getAllLocations = async (req, res) => {
  try {
    const data = await locationsService.getRegionalData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching regional data:', error);
    res.status(500).json({ message: 'Error fetching locations' });
  }
};

/**
 * Controller to fetch a specific location by ID.
 */
export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await locationsService.getById(id);
    
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    
    res.json(location);
  } catch (error) {
    console.error('Error fetching location by ID:', error);
    res.status(500).json({ message: 'Error fetching location' });
  }
};
