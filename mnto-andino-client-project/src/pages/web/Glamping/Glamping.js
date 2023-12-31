import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./LaMartina.scss";
import { CubeOtherCompany } from "./CubeOtherCompany";
import { image } from "../../../assets";
import { Divider } from "@mui/material";
import { BackToMntoAndino } from "../../../components/Client/BackToMntoAndino/BackToMntoAndino";

const COVERS = [
  "https://i.scdn.co/image/ab67616d00001e020ecc8c4fd215d9eb83cbfdb3",
  "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
  "https://i.scdn.co/image/ab67616d00001e02a7ea08ab3914c5fb2084a8ac",
  "https://i.scdn.co/image/ab67616d00001e0213ca80c3035333e5a6fcea59",
  "https://i.scdn.co/image/ab67616d00001e02df04e6071763615d44643725",
  "https://i.scdn.co/image/ab67616d00001e0239c7302c04f8d06f60e14403",
  "https://i.scdn.co/image/ab67616d00001e021c0bcf8b536295438d26c70d",
  "https://i.scdn.co/image/ab67616d00001e029bbd79106e510d13a9a5ec33",
  "https://i.scdn.co/image/ab67616d00001e021d97ca7376f835055f828139",
  "https://www.udiscovermusic.com/wp-content/uploads/2015/10/Kanye-West-Yeezus.jpg",
];

export const Glamping = () => {
  const COUNT = 10;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Draggable);

    gsap.set(".box", {
      yPercent: -50,
    });

    const STAGGER = 0.1;
    const DURATION = 1;
    const OFFSET = 0;
    const BOXES = gsap.utils.toArray(".box");

    const LOOP = gsap.timeline({
      paused: true,
      repeat: -1,
      ease: "none",
    });

    const SHIFTS = [...BOXES, ...BOXES, ...BOXES];

    SHIFTS.forEach((BOX, index) => {
      const BOX_TL = gsap
        .timeline()
        .set(BOX, {
          xPercent: 250,
          rotateY: -50,
          opacity: 0,
          scale: 0.5,
        })
        // Opacity && Scale
        .to(
          BOX,
          {
            opacity: 1,
            scale: 1,
            duration: 0.1,
          },
          0
        )
        .to(
          BOX,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.1,
          },
          0.9
        )
        // Panning
        .fromTo(
          BOX,
          {
            xPercent: 250,
          },
          {
            xPercent: -350,
            duration: 1,
            immediateRender: false,
            ease: "power1.inOut",
          },
          0
        )
        // Rotations
        .fromTo(
          BOX,
          {
            rotateY: -50,
          },
          {
            rotateY: 50,
            immediateRender: false,
            duration: 1,
            ease: "power4.inOut",
          },
          0
        )
        // Scale && Z
        .to(
          BOX,
          {
            z: 100,
            scale: 1.25,
            duration: 0.1,
            repeat: 1,
            yoyo: true,
          },
          0.4
        )
        .fromTo(
          BOX,
          {
            zIndex: 1,
          },
          {
            zIndex: BOXES.length,
            repeat: 1,
            yoyo: true,
            ease: "none",
            duration: 0.5,
            immediateRender: false,
          },
          0
        );
      LOOP.add(BOX_TL, index * STAGGER);
    });

    const CYCLE_DURATION = STAGGER * BOXES.length;
    const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET;

    const LOOP_HEAD = gsap.fromTo(
      LOOP,
      {
        totalTime: START_TIME,
      },
      {
        totalTime: `+=${CYCLE_DURATION}`,
        duration: 1,
        ease: "none",
        repeat: -1,
        paused: true,
      }
    );

    const PLAYHEAD = {
      position: 0,
    };

    const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration());

    const SCRUB = gsap.to(PLAYHEAD, {
      position: 0,
      onUpdate: () => {
        LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position));
      },
      paused: true,
      duration: 0.25,
      ease: "power3",
    });

    let iteration = 0;
    const WRAP = (min, max, value) => {
      const rangeSize = max - min;
      return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    const TRIGGER = ScrollTrigger.create({
      start: 0,
      end: "+=2000",
      horizontal: false,
      pin: ".boxes",
      onUpdate: (self) => {
        const SCROLL = self.scroll();
        if (SCROLL > self.end - 1) {
          // Go forwards in time
          WRAP(1, 1);
        } else if (SCROLL < 1 && self.direction < 0) {
          // Go backwards in time
          WRAP(-1, self.end - 1);
        } else {
          const NEW_POS = (iteration + self.progress) * LOOP_HEAD.duration();
          SCRUB.vars.position = NEW_POS;
          SCRUB.invalidate().restart();
        }
      },
    });

    const SNAP = gsap.utils.snap(1 / BOXES.length);

    //   const SNAP = gsap.utils.snap(1 / BOXES.length);

    const progressToScroll = (progress) =>
      gsap.utils.clamp(
        1,
        TRIGGER.end - 1,
        gsap.utils.wrap(0, 1, progress) * TRIGGER.end
      );

    const scrollToPosition = (position) => {
      const SNAP_POS = SNAP(position);
      const PROGRESS =
        (SNAP_POS - LOOP_HEAD.duration() * iteration) / LOOP_HEAD.duration();
      const SCROLL = progressToScroll(PROGRESS);
      if (PROGRESS >= 1 || PROGRESS < 0)
        return WRAP(Math.floor(PROGRESS), SCROLL);
      TRIGGER.scroll(SCROLL);
    };

    ScrollTrigger.addEventListener("scrollEnd", () =>
      scrollToPosition(SCRUB.vars.position)
    );

    const NEXT = () => scrollToPosition(SCRUB.vars.position - 1 / BOXES.length);
    const PREV = () => scrollToPosition(SCRUB.vars.position + 1 / BOXES.length);

    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft" || event.code === "KeyA") NEXT();
      if (event.code === "ArrowRight" || event.code === "KeyD") PREV();
    });

    document.querySelector(".boxes").addEventListener("click", (e) => {
      const BOX = e.target.closest(".box");
      if (BOX) {
        let TARGET = BOXES.indexOf(BOX);
        let CURRENT = gsap.utils.wrap(
          0,
          BOXES.length,
          Math.floor(BOXES.length * SCRUB.vars.position)
        );
        let BUMP = TARGET - CURRENT;
        if (TARGET > CURRENT && TARGET - CURRENT > BOXES.length * 0.5) {
          BUMP = (BOXES.length - BUMP) * -1;
        }
        if (CURRENT > TARGET && CURRENT - TARGET > BOXES.length * 0.5) {
          BUMP = BOXES.length + BUMP;
        }
        scrollToPosition(SCRUB.vars.position + BUMP * (1 / BOXES.length));
      }
    });

    window.BOXES = BOXES;

    gsap.set(".box", { display: "block" });

    gsap.set("button", {
      z: 200,
    });

    Draggable.create(".drag-proxy", {
      type: "x",
      trigger: ".box",
      onPress() {
        this.startOffset = SCRUB.vars.position;
      },
      onDrag() {
        SCRUB.vars.position = this.startOffset + (this.startX - this.x) * 0.001;
        SCRUB.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
      },
      onDragEnd() {
        scrollToPosition(SCRUB.vars.position);
      },
    });
  }, []);
  return (
    <div className="martina-section">
      <div className="title-makina-andina">
        <img src={image.logo4} alt="Logo Makina Andina" className="logo" />
        <h1>Glamping</h1>
      </div>
      <Divider />
      <div className="back-to-mnto">
        <BackToMntoAndino
          thumbnailSrc={image.logomnbg} // Ruta de la miniatura de la imagen
          fullSrc={image.logoSennovalabNoC} // Ruta de la imagen completa
        />
      </div>
      <div className="boxes">
        {COVERS.map((cover, index) => (
          <div
            className={`box ${index === currentIndex ? "active" : ""}`}
            style={{ "--src": `url(${cover})` }}
            key={index}
          >
            <span>{index + 1}</span>
            <img src={cover} alt={`Album ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="drag-proxy" />
      <CubeOtherCompany />
    </div>
  );
};
