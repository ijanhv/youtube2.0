import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import ChannelCard from './ChannelCard';
import Videos from './Videos';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail ] = useState();
  const [ videos, setVideos ] = useState();
  const { id } = useParams();

  console.log(channelDetail, videos)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(145,49,182,1) 20%, rgba(1,187,186,1) 60%, rgba(149,239,254,1) 100%)',
          zIndex: 10,
          height: '300px'

        }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: {sm: '100px' }}} />
          <Videos videos={videos} />
      </Box>

    </Box>
  )
}

export default ChannelDetail