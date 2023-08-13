import React from 'react'
import { useEffect, useState, useRef } from 'react';
import ThisPlantInfo from '../homeContent/detailStatus/ThisPlantInfo';
import axios from 'axios';

function FindPlant() {

    const plants = ['Angel Wing Begonia', 'Areca Palm', 'Broadleaf Lady Palm',
        'Fiddle Leaf Fig', 'Gardenia Jasminoides', 'Geranium',
        'Goldcrest Wilma', 'Golden Pothos', 'Heartleaf Philodendron',
        'Lucky Bamboo', 'Money Tree', 'Monstera Deliciosa', 'Rubber Plant',
        'Snake Plant', 'Cycad'];

    const [plantName, setPlantName] = useState('');
    const [searchName, setSearchName] = useState('');
    const [plantDetail, setPlantDetail] = useState(null);
    const [plantImage, setPlantImage] = useState(null);

    const fileInputRef = useRef();

    useEffect(() => {
        if (searchName) {
            receivePlantDetail();     
        }
    }, [searchName]);

    const receivePlantDetail = async () => {
        try {
            const res = await axios.get('/plantInfoData.json');
            setPlantDetail(res.data[searchName]);
        } catch (err) {
            console.error("Error fetching plant data:", err);
        }
    }

    const handleSendImage = () => {
        const formData = new FormData();
        formData.append('plantImage', plantImage);

        axios.post('http://165.246.116.53:5000/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            })
            .then((res) => {
                setPlantName(res.data[1].plantName)
            })
    }

    return (
        <div>
            <div>
                <div style={{ minHeight: '200px', alignItems: 'center', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h5 style={{ marginTop: '30px', textAlign: 'center', padding: '5px' }}>For information on plants, <br/>
                        Upload a picture or enter the name of the plant</h5>   
                    <img style={{ marginTop: '30px', border: '1px solid black', width: '100px', height: '100px' }} src={plantImage ? URL.createObjectURL(plantImage) : 'plantplant.png'} class="rounded-circle" alt="..."></img>
                    <div style={{ marginTop: '10px' }}>
                        <button onClick={() => fileInputRef.current.click()} id='uploadBtn' style={{ borderRadius: '10px', borderRight: '1px solid white', borderTopRightRadius: '0px', borderBottomRightRadius: '0px', backgroundColor: '#73BD72', color: "white" }} type="button" className="btn">Upload</button>
                        <button onClick={handleSendImage} style={{ borderRadius: '10px', borderTopLeftRadius: '0px', borderLeft: '1px solid white', borderBottomLeftRadius: '0px', backgroundColor: '#73BD72', color: "white" }} type="button" className="btn">Find</button>
                    </div>
                </div>
                <input ref={fileInputRef} onChange={(e) => setPlantImage(e.target.files[0])} style={{ display: 'none' }} type="file" id="input-file" />
            </div>

            <div style={{ marginTop: '30px', marginBottom: '30px', display: 'flex'  }}>
                <input style={{ borderRadius: '0px', fontWeight: 'bold' }} autocomplete="off"  list='plants' placeholder="Plant's name" type="text" className="form-control" id="recipient-name" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
                <datalist id="plants">
                    {plants.map((plant, index) => (
                        <option key={index} value={plant} />
                    ))}
                </datalist>
                <button style={{ color: 'white', backgroundColor: '#73BD72', border: 'none', }} type='button' onClick={() => setSearchName(plantName)} >Search</button>
            </div>
            {plantDetail ?
                <div style={{ minHeight: '400px' }}>
                    <div style={{ padding: '10px', lineHeight: '35px' }}>
                        EnName, KoName : {plantDetail.plantEnName} / {plantDetail.plantKoName}<br />
                        Species : {plantDetail.plantKind} <br />
                        LeastIllumninance: {plantDetail.plantLeastIllumninance} Lux<br />
                        PreferedPlace : {plantDetail.plantPlace}<br />
                        RasingLevel : {plantDetail.plantLevel}<br />
                        GrowthRate : {plantDetail.plantGrowthRate}<br />
                        PreferedTemp : {plantDetail.plantTemp} ℃<br />
                        LeastTemp : {plantDetail.plantWinterTemp} ℃<br />
                        Humidity : {plantDetail.plantHumidity} %<br />
                        Fertility : {plantDetail.plantFertility}<br />
                        SpringWater : {plantDetail.plantSpringWater}<br />
                        SummerWater : {plantDetail.plantSummerWater}<br />
                        AutumnWater : {plantDetail.PlantAutumnWater}<br />
                        WinterWater : {plantDetail.plantWinterWater}<br />
                        plantInfo:
                        {plantDetail && plantDetail.plantInfo && typeof plantDetail.plantInfo === 'string' ?
                            plantDetail.plantInfo.split('\n').map((info, index) => (
                                <div key={index}>{index + 1 }: {info}</div>
                            ))
                            : null}
                        plantGrowthType : {plantDetail.plantGrowthType}<br />
                        plantHeight : {plantDetail.plantHeight} cm<br />
                        plantArea : {plantDetail.plantArea} cm<br />
                    </div>
            </div>
                : <div style={{ minHeight: '60px', textAlign: 'center', fontSize: '20px' }}> Please choose a plant above </div>
            }
        </div>
    )
}

export default FindPlant