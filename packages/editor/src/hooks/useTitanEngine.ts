import { useContext } from 'react';
import { TitanEngineContext } from '@app/providers/TitanEngineProvider';

const useTitanEngine = () => {
    return useContext(TitanEngineContext);
};
export default useTitanEngine;