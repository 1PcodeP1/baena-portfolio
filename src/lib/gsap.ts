// src/lib/gsap.ts
// Centralized GSAP setup: register plugins once, import from here everywhere.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
