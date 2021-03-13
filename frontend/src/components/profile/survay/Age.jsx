import React, { useEffect, useState } from 'react'
import SurveySlider from "./SurveySlider";

export default function Age({ handleAgeOrGender, name }) {

    const ageMarks = [
        {
            value: 18,
            label: '18',
        }
    ];

    const defaultValue = [18, 40]

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
