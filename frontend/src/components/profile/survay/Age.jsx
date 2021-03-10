import React from 'react'
import AirbnbSlider from "./SurveySlider";

export default function Age() {

    const ageMarks = [
        {
            value: 18,
            label: '18',
        }
    ];

    const defaultValue = [18, 40]

    return (
        <>
            <AirbnbSlider
                title='Preferd Age Range? '
                marks={ageMarks}
                defaultValue={defaultValue}
                minimum={18}
                maximum={100} />
        </>
    )
}
