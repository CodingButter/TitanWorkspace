import { useContext } from 'react';
import { ToolsContext } from '@app/providers/ToolsProvider';
const useTools = () => useContext(ToolsContext);
export default useTools;