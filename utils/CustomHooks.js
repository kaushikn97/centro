import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

const usePreciseTimer = (handler, periodInMilliseconds, activityFlag) => {
  const [timeDelay, setTimeDelay] = useState(1);
  const savedCallback = useRef();
  const initialTime = useRef();

  useEffect(() => {
    savedCallback.current = handler;
  }, [handler]);

  useEffect(() => {
    if (activityFlag) {
      initialTime.current = moment().valueOf();
      const id = setInterval(() => {
        const currentTime = moment().valueOf();
        const delay = currentTime - initialTime.current;
        initialTime.current = currentTime;
        setTimeDelay(delay / 1000);
        savedCallback.current(timeDelay);
      }, periodInMilliseconds);

      return () => {
        clearInterval(id);
      };
    }
  }, [periodInMilliseconds, activityFlag, timeDelay]);
};

export default usePreciseTimer;