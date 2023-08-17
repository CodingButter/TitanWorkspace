import { createContext } from 'react';
import useLocalStorage from '@app/hooks/useLocalStorage';

export type Tool = {
    label: string;
    description: string;
    order: number;
}

export type ToolSettings = {
    historyStorage: number;
    tools: Tool[];
}

export type ToolContext = {
    activeTool: string;
    setActiveTool: (tool: string) => void;
    history: string[];
    historyIndex: number;
    undo: () => void;
    redo: () => void;
    addHistory: () => void;
}

export const ToolsContext = createContext<ToolContext>({} as ToolContext);

const ToolsProvider = ({ children }: React.PropsWithChildren) => {
    const [activeTool, setActiveTool] = useLocalStorage("activeTool", "select");
    const [history, setHistory] = useLocalStorage("history", []);
    const [historyIndex, setHistoryIndex] = useLocalStorage("historyIndex", 0);

  

    const addHistory = () => {
        //@TODO Get current state of scene
        const currentState = "";
        setHistory([...history, currentState]);
    }

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            //Reload State
        }
    }

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            //Reload State
        }
    }

    return (
        <ToolsContext.Provider value={{
            activeTool,
            setActiveTool,
            history,
            historyIndex,
            undo,
            redo,
            addHistory
        }}>
            {children}
        </ToolsContext.Provider>
    )   
}

export default ToolsProvider;
