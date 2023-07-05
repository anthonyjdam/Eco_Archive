import React from 'react'
import { ResponsiveWaffle } from '@nivo/waffle';

function DailyCapacity({ currentGlass, currentPlastic, currentMetal, currentPaper, maxCap }) {

    const data = [
        {
            "id": "currentGlass",
            "label": "Glass",
            "value": currentGlass
        },
        {
            "id": "currentPlastic",
            "label": "Plastic",
            "value": currentPlastic
        },
        {
            "id": "currentMetal",
            "label": "Metal",
            "value": currentMetal
        },
        {
            "id": "currentPaper",
            "label": "Paper",
            "value": currentPaper
        },
    ]

    return (
        // style={{ height: '150em', width:'150em'}}
        // className="w-[14rem] h-[14rem]"
        <div className="h-[10rem] md:h-[9rem] xl:h-[14rem]">
            <ResponsiveWaffle
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                data={data}
                total={maxCap}
                columns={10}
                rows={10}
                padding={2}
                valueFormat=".2f"
                colors={['#4338ca ', '#60a5fa', '#1e3a8a', '#0d9488']}
                borderRadius={3}


                motionStagger={2}
                

            />
        </div>
    )
}

export default DailyCapacity