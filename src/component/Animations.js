import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

// animation for fade in effect with words
export const FadeInWords = ({
  children,
  stagger = 0,
  x = 0,
  ref,
  className = "",
}) => {
  const el = useRef();
  const animation = useRef();

  useGSAP(
    () => {
      animation.current = gsap.from(el.current, {
        x,
        opacity: 0,
        duration: 0.7,
        ease: "power4",
        stagger: 0.04,
      });
    },
    { scope: el }
  ); // Added scope for GSAP context

  useGSAP(() => {
    // forward the animation instance
    if (typeof ref === "function") {
      ref(animation.current);
    } else if (ref) {
      ref.current = animation.current;
    }
  }, [ref]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
};

// animation for fade in effect
export const FadeIn = ({
  children,
  stagger = 0,
  y = 0,
  ref,
  className = "table-responsive",
}) => {
  const el = useRef();
  const animation = useRef();

  useGSAP(
    () => {
      animation.current = gsap.from(el.current.children, {
        opacity: 0,
        stagger,
        y,
        ease: "power3.out", // Added ease for smoother animation
      });
    },
    { scope: el }
  ); // Added scope for GSAP context

  useGSAP(() => {
    // forward the animation instance
    if (typeof ref === "function") {
      ref(animation.current);
    } else if (ref) {
      ref.current = animation.current;
    }
  }, [ref]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
};

// animation for fade in effect from bottom
export const FadeInBottom = ({
  children,
  stagger = 0,
  y = 0,
  ref,
  className = "",
}) => {
  const el = useRef();
  const animation = useRef();

  useGSAP(
    () => {
      animation.current = gsap.from(el.current.children, {
        opacity: 0,
        stagger,
        y,
        ease: "power3.out", // Added ease for smoother animation
      });
    },
    { scope: el }
  ); // Added scope for GSAP context

  useGSAP(() => {
    // forward the animation instance
    if (typeof ref === "function") {
      ref(animation.current);
    } else if (ref) {
      ref.current = animation.current;
    }
  }, [ref]);

  return (
    <div ref={el} className={``}>
      {children}
    </div>
  );
};
