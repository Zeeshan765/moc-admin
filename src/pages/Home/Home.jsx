import Chart from '../../components/chart/Chart';
import Featureboxes from '../../components/featuresBoxes/Featureboxes';
//import { userData } from '../../dummyData';
import React, { useEffect, useMemo, useState } from 'react';
import './home.css';
import apiService from '../../services/ApiService';

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await apiService.get('/api/user/stats');
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <> 
      <div className='home'>
        <Featureboxes />
        <Chart
          data={userStats}
          title='User Analytics'
          grid
          dataKey='Active User'
        />
      </div>
    </>
  );
};

export default Home;
