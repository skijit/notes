Microservices that Survive
===================

- [src](https://www.youtube.com/watch?v=rNQR1HqfEl0&t=1102s)

## Thesis:
- Change is the fundamental problem in software development
  - Maintaing/replacing existing code    
  - Integrating new tech
  - etc.

- He proposes principles which lead to healthy (potentially large-scale) systems that are able to survive over time:
  - Build small, decoupled components
  - Minimize cost of replacing infrastructure (e.g. VM's, containers)
  - Adopt practices that require you to prove your solutions to those key change problems.
    - Per Martin Fowler: "If it hurts, do it more"
    - "Radically Heterogenous Architecture"
    - Disposable Components
    - Immutable Architecture
    - Org Changes

## Details
- Current model of sw maturation leads to "legacy" systems, which are bad
- Compare to the system which last (e.g. bodies or cars)
  - individual components are replaced (sometimes rapidly)
  - but the system persists
- The body is a particularly good example bc:
  - it requires replacement of components (cells)
  - ie: if you're going to need component-replacement anyways, build it (deployment) into the process  
  - compare cell regeneration vs having a mechanic install a new part
- Tinier Components have an advantage:
  - Easier to understand
  - Cheaper/quicker to replace
- Immutable Infrastructure
  - Dont do maintenance on system-level components: VM's, etc
  - just rebuild them from scratch
    - Minimizes the maintenance overhead
    - Proves the very thing you're trying to build: it can handle change
    - E.G. Dont use Chef to keep a VM up for 2 years.  That is complicated, which makes reaching your end-goal of a system which handles change potentially more challenging
- Disposable Components
  - Plan to throw away components when you write them
  - Less stress - easier to learn
  - Decoupled design avoids lock-in to a particular tech - so less tech debt
- "The system is the asset, code is a liability"
  - Communication between components should be addressed in a dumb, uniform way
- Radically Heterogenous Architecture
  - Diversify risk by using a variety of technologies
  - Proves out the ability for change
- Suppose the initial cost of change is a constant
  - You can be address it proactively or reactively
  - Reactively entails more risk
  - Proactively enables lots of additional benefits
- Shared Services vs Shared Code
- The longer you don't change something, the harder it is to replace
  - Even if one component doesn't change, the things around it do change
- Unit tests encourage keeping things the same
  - Accept that errors exist, but can you minmize their impact
  - compare mean time to resolution vs mean time between errors
- Org Changes
  - Apply the same principles
- Small Projects are more successful so why not design around smaller projects
- Systems that survive are made of components that change
- "If it hursst, do it more often" - Martin Fowler
 
   




