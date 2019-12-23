import React, { useState } from 'react'

function FruitList({ fruits, onSetFruit }) {
    return (
        <ul>
            {fruits.map(v => <li key={v} onClick={() => onSetFruit(v)}> {v}</li>)}
        </ul>
    )
}


export default function HooksTest() {
    const [fruit, setFruit] = useState('')
    const [fruits, setFruits] = useState(['香蕉', '草莓', '芒果'])
    return (
        <div>
            <p>{fruit === '' ? '请选择水果?' : `您选择的是:${fruit}`}</p>
            <FruitList fruits={fruits} onSetFruit={setFruit} ></FruitList>
        </div>
    )
}