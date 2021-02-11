import React, { useContext, useState } from 'react'


const SequencerContext = React.createContext() 
const SequencerContextUpdate = React.createContext()

export function useSequencerContext() {
    return useContext(SequencerContext)
}

export function useSequencerContextUpdate() {
    return useContext(SequencerContextUpdate)
}

export function SequencerContextProvider({ children }) {
    const [sequencerIndex, setSequencerIndex] = useState(0)
    
    function getIndex() {
        setSequencerIndex()
    }

    return (
        <>
            <SequencerContext.Provider value={sequencerIndex}>
                <SequencerContextUpdate.Provider value={getIndex}>
                    {children}
                </SequencerContextUpdate.Provider>
            </SequencerContext.Provider>
        </>
    )
}