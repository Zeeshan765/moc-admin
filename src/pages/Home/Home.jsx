import Chart from '../../components/chart/Chart';
import Featureboxes from '../../components/featuresBoxes/Featureboxes';
//import { userData } from '../../dummyData';
import React, { useEffect, useMemo, useState } from 'react';
import './home.css';
import apiService from '../../services/ApiService';
//import BarChart from '../../components/BarChart/BarChart';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));




const Home = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  const [userStats, setUserStats] = useState([]);
  const [userStats1, setUserStats1] = useState([]);
  console.log(userStats1);

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
      setIsLoading(true);
      try {
        const res = await apiService.get('/api/user/stats');
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total },
          ])
        );
      } catch {}
      setIsLoading(false);
    };
    getStats();
  }, [MONTHS]);



  // useEffect(() => {
  //   const getStats1 = async () => {
  //     try {
  //       const res = await apiService.get('/api/user/stats').then((data) => {
  //         setUserStats1(data.data);
    
  //       });
  //     } catch {}
  //   }
  //   getStats1();
  // }, []);



  return (
    <>
     {isLoading ? ( <Backdrop className={classes.backdrop} open ={isLoading} >
    <CircularProgress color="inherit" />
  </Backdrop>) : (
      <div className='home'>
        <Featureboxes />
        <Chart
          data={userStats}
          title='User Analytics'
          grid
          dataKey='Active User'
        />
        {/* <BarChart
                labels={MONTHS.length === 0 ? ["pink"] : MONTHS[0].labels}
                data1={userStats1.length === 0 ? [0, 0, 0, 0, 0, 0] : userStats1[0].total}
               // data2={data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[1].values}
        /> */}
      </div>
  )}
    </>
  );
};

export default Home;
