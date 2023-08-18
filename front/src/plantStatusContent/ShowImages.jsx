import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


function ShowImages({plantNum}) {
    
    const fetchImages = async () => {
        try {
            const response = await axios.get('서버의 URL'); // 여기에 실제 서버의 URL을 입력해주세요.
            setImages(response.data); // 받아온 이미지 데이터를 state에 저장
            setLoading(false); // 로딩 상태 변경
        } catch (error) {
            console.error("서버로부터 이미지를 받아오는데 실패했습니다.", error);
            setLoading(false); // 로딩 상태 변경
        }
    }  // imgs안에 1번은 이미지, 2번은 메세지로

    const Server_IP = process.env.REACT_APP_Server_IP;
    const [images, setImages] = useState([]); // 이미지 데이터를 저장할 state
    const [loading, setLoading] = useState(true); // 로딩 상태를 나타내는 state
    fetchImages();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('서버의 URL'); // 여기에 실제 서버의 URL을 입력해주세요.
                setImages(response.data); // 받아온 이미지 데이터를 state에 저장
                setLoading(false); // 로딩 상태 변경
            } catch (error) {
                console.error("서버로부터 이미지를 받아오는데 실패했습니다.", error);
                setLoading(false); // 로딩 상태 변경
            }
        }

        fetchImages(); // 함수 실행
    }, []);

    return (
        <div>
            <div id="carouselExampleDark" class="carousel carousel-dark slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                        <img src="Aimg.png" class="d-block w-100" alt="..."/>
                            <div class="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                        <img src="..." class="d-block w-100" alt="..."/>
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                    </div>
                    <div class="carousel-item">
                        <img src="Aimg.png" class="d-block w-100" alt="..."/>
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default ShowImages
