import React from 'react'
import AirbnbSlider from "./SurveySlider";

export default function Height({ handleAgeOrGender, name, heightRange }) {

    const heightMarks = [
        {
            value: 100,
            label: '100 cm',
        },
    ];

    const defaultValue = heightRange[0] ? [heightRange[0].minHeight, heightRange[0].maxHeight] : [150, 190]

    return (
        <>
            <AirbnbSlider
                title='Preferd Height Range? '
                marks={heightMarks}
                defaultValue={defaultValue}
                minimum={100}
                maximum={200}
                handleAgeOrGender={handleAgeOrGender}
                name={name}

            />

        </>
    )
}
