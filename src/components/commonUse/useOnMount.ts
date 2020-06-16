/*eslint-disable*/
import {useEffect} from 'react';
function useOnMount(fn: Function) {
  useEffect(() => {
    fn()
  }, [])
}
export default useOnMount;
