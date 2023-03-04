import React from 'react'
import { Carousel, Image } from 'antd';

const slides = [
    {
        id: 1,
        src: "https://dailysuzukicantho.com/OTO3602200370/files/banner/Anh_4.jpg",
        alt: "Slide 1",
    },
    {
        id: 2,
        src: "https://dailysuzukicantho.com/OTO3602200370/files/banner/Anh_1.png",
        alt: "Slide 2",
    },
    {
        id: 3,
        src: "https://dailysuzukicantho.com/OTO3602200370/files/banner/Anh_3.jpg",
        alt: "Slide 3",
    },
    {
        id: 4,
        src: "https://dailysuzukicantho.com/OTO3602200370/files/banner/Anh_2.png",
        alt: "Slide 4",
    },
]

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const CarouselComponent = () => {
    return (
        <Carousel
            effect="fade"
            autoplay="true"
            dotPosition="left"
        >
            {
                slides && slides.map((item, index) => {
                    return (
                        <div key={index} className="carousel-item">
                            <Image
                                src={item.src}
                                preview={false}
                                alt={item.alt}
                                title={item.alt}
                            />
                        </div>
                    )
                })
            }
        </Carousel>
    )
}

export default CarouselComponent