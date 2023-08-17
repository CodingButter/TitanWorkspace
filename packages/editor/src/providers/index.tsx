import TitanEngineProvider, { TitanEngineProviderProps } from '@app/providers/TitanEngineProvider';
import ToolsProvider from '@app/providers/ToolsProvider';

const Providers = ({ canvasRef, children }: TitanEngineProviderProps) => {

    return (
            <ToolsProvider>
                <TitanEngineProvider canvasRef= { canvasRef } >
                    { children }
                </TitanEngineProvider>
            </ToolsProvider>
    )
}

export default Providers;