import {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";

import TitanEngine from "@titan/interface"; 
import Core from "@titan/Core/Core";

export const TitanEngineContext = createContext<{ titan: Core | null }>({
  titan: null,
});

export interface TitanEngineProviderProps extends PropsWithChildren {
  canvasRef:{
    current:HTMLCanvasElement|null
  }
}

const TitanEngineProvider = ({ children, canvasRef }: TitanEngineProviderProps) => {
  const [titanEngine, setTitanEngine] = useState<Core|null>(null);

  useEffect(() => {
        const resize = () => {
        TitanEngine.setSize(window.innerWidth,window.innerHeight)
      }
    if (canvasRef.current != null) {
      TitanEngine.init(canvasRef.current, window.innerWidth, window.innerHeight)
      TitanEngine.getCore().run()
      setTitanEngine(() => TitanEngine.getCore());
  
      window.addEventListener('resize', resize)
      
    }
    return () => {
      window.removeEventListener('resize',resize)
      TitanEngine.destroy();
    }
  }, [canvasRef,titanEngine]);
  return (
    <TitanEngineContext.Provider value={{ titan:titanEngine }}>
      {children}
    </TitanEngineContext.Provider>
  );
};

export default TitanEngineProvider;
