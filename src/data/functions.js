import axios from 'axios';
import moment from 'moment';
import { Linking } from 'react-native';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;
const API_URL = 'https://maps.googleapis.com/maps/api/directions/json';

export const formattedDate = date => {
  const now = moment();
  const duration = moment.duration(now.diff(date));

  const days = duration.days();
  const minutes = duration.minutes();
  const hours = duration.hours();

  const newDate = moment(date).format('DD MMM');

  if (days > 0) return newDate;
  if (hours > 1) return `${hours} hrs ago`;
  if (hours > 0) return `${hours} hr ago`;
  if (minutes > 0) return `${minutes} min ago`;

  return 'now';
};

export const openGoogleMapsDirections = ({ origin, destination }) => {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin?.coordinates[1]},${origin?.coordinates[0]}&destination=${destination?.coordinates[1]},${destination?.coordinates[0]}`;

  Linking.openURL(url).catch(error => {
    console.warn(`Error opening Google Maps: ${error}`);
  });
};

export const getOrderMetrics = async (
  { origin, destination },
  setOrderMetrics,
) => {
  const params = {
    origin: `${origin?.lat} ${origin?.lng}`,
    destination: `${destination?.lat} ${destination?.lng}`,
    key: API_KEY,
    departure_time: 'now', // You can also specify a specific time
    traffic_model: 'pessimistic', // Or 'optimistic', or '
  };

  try {
    const { data } = await axios({
      method: 'GET',
      url: API_URL,
      params,
    });
    const routes = data.routes;
    if (routes.length > 0) {
      const legs = routes[0].legs;
      if (legs.length > 0) {
        const distance = legs[0].distance.text;
        const duration = legs[0].duration.text;

        setOrderMetrics({
          distance,
          duration,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
