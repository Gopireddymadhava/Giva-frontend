import React from 'react'
import { CarouselCaption } from 'react-bootstrap'
import { Carousel, CarouselItem,CarouselIndicators,CarouselControl} from 'reactstrap'
import { useState } from 'react';
import {Card,CardBody,CardImg,CardGroup} from 'reactstrap';
const items = [
    {
      src: 'Bestsellers.webp',
      altText: '',
    caption: '',
      key: 1,
    },
    {
      src: 'carousel3.webp',
      altText: '',
    caption: '',
      key: 2,
    },
    {
      src: 'collection.webp',
      altText: '',
    caption: '',
      key: 3,
    },
  ];
export const Middle = (args) => {
    const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captiontext={item.caption}
          captionheader={item.caption}
        />
      </CarouselItem>
    );
  });
  return (
    <div>
    <Carousel
    activeIndex={activeIndex}
    next={next}
    previous={previous}
    {...args}
  >
    <CarouselIndicators
      items={items}
      activeIndex={activeIndex}
      onClickHandler={goToIndex}
    />
    {slides}
    <CarouselControl
      direction="prev"
      directionText="Previous"
      onClickHandler={previous}
    />
    <CarouselControl
      direction="next"
      directionText="Next"
      onClickHandler={next}
    />
  </Carousel>
  <br/>
  <h3>Latest Collections</h3>
  <CardGroup>
  <Card>
    <CardImg
      alt="Card image cap"
      src="Vivaah.webp"
      top
      width="100%"
    />
    <CardBody>
      
      
    </CardBody>
  </Card>&nbsp;&nbsp;
  <Card>
    <CardImg
      alt="Card image cap"
      src="Bhumi1.webp"
      top
      width="100%"
    />
    <CardBody>
      
       
    </CardBody>
  </Card>&nbsp;&nbsp;
  <Card>
    <CardImg
      alt="Card image cap"
      src="love.webp"
      top
      width="100%"
    />
    <CardBody>
      
      
    </CardBody>
  </Card>
</CardGroup>

    </div>
  )
}
