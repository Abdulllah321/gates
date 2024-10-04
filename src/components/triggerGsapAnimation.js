import gsap from "gsap";

let tl;

export const createTimeline = () => {
  tl = gsap.timeline({
    defaults: { duration: 1.5, ease: "elastic.out(1, 0.6)" },
  });
};

export const GsapAnimation = (selector, animationData) => {
  if (tl) {
    tl.to(selector, { attr: animationData }, 0); // Add to the timeline
  }
};

export const clearTimeline = () => {
  if (tl) tl.clear();
};
