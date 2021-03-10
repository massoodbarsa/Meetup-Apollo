import React from 'react'
import AirbnbSlider from "./SurveySlider";

export default function Height() {

    const heightMarks = [
        {
            value: 100,
            label: '100 cm',
        },
    ];

    const defaultValue = [150, 190]

    return (
        <>
            <AirbnbSlider
                title='Preferd Height Range? '
                marks={heightMarks}
                defaultValue={defaultValue}
                minimum={100}
                maximum={200} />
        </>
    )
}
