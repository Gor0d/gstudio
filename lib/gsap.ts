"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

// All registration stays in this module; consumers share the same GSAP instance.
gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);
export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
