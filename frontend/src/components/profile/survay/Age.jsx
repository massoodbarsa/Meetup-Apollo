import React, { useEffect, useState } from 'react'
import SurveySlider from "./SurveySlider";

export default function Age({ handleAgeOrGender, name, ageRange }) {


    const ageMarks = [
        {
            value: 18,
            label: '18',
        }
    ];

    const defaultValue = ageRange[0] ? [ageRange[0].minAge, ageRange[0].maxAge] : [18, 40]

    return (
        <>
            <SurveySlider
                title='Preferd Age Range? '
                marks={ageMarks}
                defaultValue={defaultValue}
                minimum={18}
                maximum={100}
                handleAgeOrGender={handleAgeOrGender}
                name={name}
            />
        </>
    )
}
