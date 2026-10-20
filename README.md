# BARAKA CITY

### More Than a Game
**Explore. Learn. Build. Belong.**

*A living 3D world shaped by faith, knowledge, community, and everyday life.*

---

## Overview

Baraka City is an ambitious 3D open-world life simulation game built around faith, knowledge, community, and everyday life. It brings together exploration, social interaction, education, and immersive gameplay in a shared virtual city.

From mosques and madrasas to universities, marketplaces, residential neighborhoods, hospitals, and football pitches, Baraka City is designed to give players a world they can explore, interact with, and help bring to life.

Players can create their own characters, explore the city, visit different locations, interact with other characters, participate in activities, and develop their own experiences within the world.

Baraka City aims to be more than a place to play. It is being developed as a world where exploration creates discovery, activities encourage learning, and shared experiences help a community grow.

> A city to explore. A community to grow with. A world to belong to.

---

## The Vision

Many virtual worlds focus on competition, combat, or isolated activities. Baraka City explores a different approach: an open-world social experience where education, personal expression, community, and everyday activities belong to the same connected environment.

The long-term vision is to create a living city where players can learn, socialize, explore, participate in meaningful activities, build relationships, and experience different aspects of everyday life.

By combining interactive environments with social gameplay and character progression, Baraka City aims to create a digital world that feels alive, welcoming, and worth returning to.

**Faith. Knowledge. Community. Future.**

---

## The World

Baraka City is designed as a connected 3D environment rather than a collection of static screens. Every location should feel like part of the same city, with its own atmosphere, activities, and interactions.

### Mosque
Players can enter mosques, explore the prayer space, sit, pray, and participate in community activities. Mosque environments are designed to reflect the importance of faith and community within the Baraka City experience.

### Madrasa
Madrasas provide spaces for learning, religious education, and interaction between students and teachers. Future activities may include lessons, educational challenges, and community learning experiences.

### University
University environments expand the educational side of the game. Players can explore campuses, visit classrooms, study, attend activities, and socialize with other students.

### Homes and Neighborhoods
Residential areas make the city feel personal and lived in. Players can explore streets, enter accessible homes, interact with household objects, sit, rest, and experience different aspects of virtual home life.

### Marketplace
The marketplace introduces shops, stalls, vendors, and opportunities for interaction. It can become a central meeting point where players explore goods, participate in activities, and experience the city's commercial life.

### Football Pitch
Football pitches provide spaces for recreation, friendly matches, competitions, and community gatherings.

### Parks and Community Spaces
Parks and public spaces give players places to relax, walk, sit, meet others, and participate in social activities.

### Hospitals and Civic Locations
Hospitals and other civic locations can expand the city with public services, role-playing opportunities, and community-centered activities.

### Roads and Transportation
Roads connect the different parts of the city. The intended environment includes cars, buses, motorcycles, pedestrians, intersections, and realistic road movement that contributes to a living urban atmosphere.

### Future Locations
Baraka City is designed to expand over time with additional neighborhoods, offices, businesses, recreation areas, and other destinations.

The goal is to make new locations genuine extensions of the world rather than disconnected pages or static interface cards.

---

## Gameplay

### Open-World Exploration
Players explore Baraka City through a third-person 3D character controller.

The experience is intended to include:
- Free movement through neighborhoods and public spaces.
- Exploration of roads, buildings, and landmarks.
- Access to supported interiors.
- Interaction with objects and characters.
- Discovery of activities and locations.
- Movement through a city populated by pedestrians, NPCs, and other players as multiplayer features are developed.

The world should feel connected, with consistent scale, readable landmarks, and a sense of distance between locations.

### Character Customization
Baraka City aims to let players create avatars that reflect their preferred appearance and style.

Planned customization options include:
- Male and female avatar options.
- Skin tones and facial features.
- Hair and beard styles where appropriate.
- Thobes, jalabiyyas, shirts, and trousers.
- Shoes, caps, hijabs, and accessories.
- Outfit colors and style variations.
- A rotatable 3D character preview.

Customization should carry through into the actual game world, so changes are visible on the player's avatar during gameplay.

### Interactive Actions
Players should be able to interact with the world directly rather than navigating unnecessary menus for every action.

Intended actions include:
- Walking and running.
- Sitting and standing.
- Waving, laughing, and greeting.
- Talking to nearby characters.
- Entering and leaving accessible buildings.
- Opening supported doors.
- Interacting with objects.
- Resting or sleeping in appropriate home spaces.
- Praying in designated mosque or prayer areas.
- Participating in educational and community activities.

Actions should use a consistent character state system and smooth animation transitions. Incompatible actions should not run simultaneously, and character movement should avoid sliding, floating, or teleporting.

### Multiplayer and Social Interaction
Baraka City is envisioned as a shared social world where players can encounter one another naturally.

The intended multiplayer experience includes:
- Other players represented as 3D avatars.
- Nearby player names displayed unobtrusively.
- Contextual interactions between players.
- Real-time text communication.
- Shared activities and community events.
- Opportunities to explore the city together.

A typical interaction should follow a natural flow:

```
See another player
        |
        v
Approach the player
        |
        v
Start a contextual interaction
        |
        v
Send and receive messages
        |
        v
Continue exploring together
```

Real-time synchronization, persistence, and multiplayer reliability depend on the supporting backend and networking implementation. These capabilities should only be described as complete after they have been implemented and tested end to end.

---

## Coin Economy

The Baraka City coin system connects gameplay activities, rewards, and in-world consequences through one continuous balance.

### Balance Rules
- Every new player starts with 0 coins.
- Rewards are added to the existing balance, while penalties are deducted from it. Negative balances are permitted and must never be automatically reset to zero.

| Event | Calculation | Balance |
| :--- | :--- | :--- |
| New player joins | Starting balance | 0 |
| Player hits an obstacle costing 5 coins | 0 − 5 | -5 |
| Player earns 5 coins | -5 + 5 | 0 |
| Player has -20 and earns 5 | -20 + 5 | -15 |
| Player has -15 and earns 20 | -15 + 20 | 5 |

The system must always update the current balance rather than calculating earnings and penalties independently.

### Earning Coins
Potential ways to earn coins include:
- Completing activities and quests.
- Participating in educational activities.
- Helping NPCs or completing community tasks.
- Discovering new locations.
- Participating in events and competitions.
- Completing daily or weekly challenges.
- Taking part in positive social and community activities.

### Collision Penalties
Collisions with vehicles, buildings, walls, and other solid obstacles may trigger coin penalties.

Collision handling should use appropriate event detection and cooldowns to prevent repeated deductions when a player remains in continuous contact with the same object.

Penalties should be understandable and proportionate. The economy should encourage exploration without making mistakes unnecessarily frustrating.

### Coin HUD
The current coin balance should remain visible in a small, unobtrusive game HUD element.

When the balance changes, the number should animate smoothly and may briefly display an indicator such as +5 or -5.

The display should remain readable across supported screen sizes without interrupting gameplay.

In a production multiplayer environment, balance changes and rewards should be validated by trusted backend logic to prevent client-side manipulation.

---

## Landscape-First Experience

Baraka City is designed specifically for landscape gameplay.

The wider orientation provides more room to view the environment, control the character, and interact with the world.

### Mobile Orientation
When a player opens the game on a phone or tablet in portrait orientation, the experience should display a simple orientation screen:

> **ROTATE YOUR PHONE**  
> *Baraka City is designed for landscape gameplay.*

Normal gameplay should wait until landscape orientation is detected. Because orientation locking depends on browser and device support, the experience should handle unsupported cases gracefully.

### Responsive Gameplay
The same game should adapt across:
- Android phones and iPhones.
- Tablets in landscape orientation.
- Laptops and desktop computers.
- Wide and ultrawide monitors.

The camera, field of view, HUD, controls, and rendering quality should adapt to the available screen size and device capability.

The 3D world must not be stretched or distorted to fit the viewport. Responsive design should preserve the open-world experience while adjusting how it is presented.

---

## Controls

### Mobile Landscape Controls
- Virtual joystick on the lower-left for movement.
- Touch and swipe for camera control.
- Contextual action controls on the lower-right.
- Comfortable touch targets.
- HUD elements positioned away from notches and screen edges.

### Desktop Controls
- **W, A, S, D** for movement.
- **Mouse movement** for camera control.
- **Shift** to run.
- Contextual interaction controls.

The actual control mapping should match the implemented game and be clearly communicated to players.

---

## Cinematic Entry Experience

The first screen introduces Baraka City as a game rather than a conventional marketing website.

The entry experience should share the same visual identity as the playable world, using the existing Baraka City logo and artwork.

The intended sequence is:
1. The city artwork appears with subtle cinematic background movement.
2. The existing BARAKA CITY title assembles letter by letter: B → A → R → A → K → A, followed by CITY underneath.
3. A loading sequence progresses through 15% → 45% → 75% → 100%.
4. At 100%, a circular rotating ENTER control becomes visible.
5. The player manually selects ENTER to begin.
6. A smooth transition leads into the playable game at `/dashboard`.

The game should not automatically enter the dashboard after loading. The player controls when to enter.

The entry screen should preserve the established artwork, logo, architecture, colors, and composition while adding motion that feels cinematic and performs well across supported devices.

---

## Design Direction

Baraka City uses a stylized, geometric 3D world with a distinctive visual identity.

The current direction emphasizes depth, readable silhouettes, recognizable architecture, and a compact interface that keeps attention on the environment.

### Visual Principles
- **Stylized 3D environments:** Buildings, roads, vehicles, and objects should share a consistent visual language.
- **Deep navy and ocean blue:** Establish depth and atmospheric perspective.
- **Teal and turquoise:** Provide selected world and interface accents.
- **Ivory and white:** Keep important information readable.
- **Restrained gold:** Highlight meaningful details without overwhelming the palette.
- **African and Islamic architectural influence:** Reflect the identity of the world through mosques, homes, markets, and civic spaces.
- **Cinematic open-world presentation:** Use perspective, camera movement, environmental scale, and character activity to make the city feel explorable.

### Interface Principles
- Keep the world as the main focus.
- Place HUD information near the screen edges.
- Make action controls directly usable.
- Avoid unnecessary modal windows and oversized panels.
- Maintain consistent styling between the entry screen and gameplay.
- Avoid random stars, sparkles, glitter, and decorative AI-style effects.
- Prioritize readable text, clear contrast, and comfortable touch targets.

---

## Technical Direction

Baraka City's technical direction prioritizes real-time 3D interaction, maintainability, performance, and a modular architecture that can support a growing world.

### Engineering Priorities
- A real-time 3D rendering environment.
- Reusable player movement and camera systems.
- Modular locations and interactive objects.
- Consistent animation and action-state handling.
- Collision detection and event-based coin penalties.
- One source of truth for the current coin balance.
- Responsive keyboard, mouse, and touch input.
- Performance scaling for lower- and higher-powered devices.
- Persistent player state when supported by the backend.
- Networking architecture suitable for future real-time multiplayer.

### Suggested System Architecture

| System | Responsibility |
| :--- | :--- |
| **PlayerController** | Character movement and movement states. |
| **CameraController** | Third-person camera and input handling. |
| **AvatarSystem** | Character appearance, animation, and customization. |
| **InteractionSystem** | Contextual interactions with objects and locations. |
| **WorldSystem** | Environment, roads, neighborhoods, and world objects. |
| **LocationSystem** | Entering, leaving, and tracking locations. |
| **VehicleSystem** | Road-following traffic, turns, and collision behavior. |
| **EconomySystem** | Coin balance, rewards, penalties, and transaction history. |
| **ChatSystem** | In-world player communication. |
| **MultiplayerSystem** | Player synchronization and shared-world state. |
| **ProgressionSystem** | Activities, quests, levels, and future life progression. |
| **HUDSystem** | Coin balance, minimap, location, status, and action controls. |
| **PerformanceSystem** | Adaptive quality, level of detail, and device-aware settings. |

*These names describe a suggested architecture. They should be aligned with the actual codebase rather than duplicated if equivalent systems already exist.*

---

## Project Structure

The conceptual product structure is organized as follows:

```
BARAKA CITY
|
|-- Cinematic Entry
|   |-- Brand Logo and Title Animation
|   |-- Loading Sequence
|   `-- Manual Enter Control
|
|-- Open World
|   |-- 3D Environment
|   |-- Player and Camera Controllers
|   |-- Avatar and Animation Systems
|   |-- Locations and Interactions
|   |-- Vehicles and Pedestrians
|   `-- HUD and Minimap
|
|-- Gameplay
|   |-- Character Customization
|   |-- Coin Economy
|   |-- Activities and Quests
|   |-- NPC Interactions
|   `-- Player Communication
|
`-- Platform
    |-- Landscape Orientation
    |-- Mobile and Desktop Controls
    |-- Responsive Camera and HUD
    `-- Performance Scaling
```

*This is a conceptual map of the product, not a claim about the repository's current directory layout.*

---

## Roadmap

The roadmap describes intended development priorities. Update it as features are implemented and verified.

### World and Movement
- [ ] Refine the core 3D world and player movement.
- [ ] Improve third-person camera behavior.
- [ ] Expand roads, intersections, and traffic.
- [ ] Add more vehicles and pedestrian behaviors.
- [ ] Expand enterable buildings and interiors.
- [ ] Develop mosque, madrasa, and classroom interiors.
- [ ] Expand university, marketplace, hospital, parks, and community spaces.

### Gameplay Systems
- [ ] Complete contextual player actions.
- [ ] Connect the coin balance to rewards and penalties.
- [ ] Add repeatable activities, quests, and challenges.
- [ ] Implement character customization that persists in the world.
- [ ] Improve object interactions and building entry.
- [ ] Develop meaningful progression systems.

### Community and Multiplayer
- [ ] Implement reliable player synchronization.
- [ ] Add real-time nearby-player communication.
- [ ] Support shared activities and community events.
- [ ] Add player safety and moderation controls.
- [ ] Test persistence and multiplayer behavior under real usage.

### Polish and Performance
- [ ] Verify landscape behavior on real mobile devices.
- [ ] Test tablet, desktop, and ultrawide layouts.
- [ ] Profile low-, mid-, and high-capability devices.
- [ ] Test collision edge cases and coin calculations.
- [ ] Verify loading, transitions, and error handling.
- [ ] Document setup and deployment using the actual project configuration.

---

## Development Status

Baraka City is in active development.

The current visual direction features a stylized 3D city with roads, buildings, mosques, and community spaces. The intended direction is to evolve this into a more immersive, cinematic, landscape-first open-world experience.

This README documents the project's vision and planned systems. It does not claim that every location, animation, multiplayer capability, or economy feature is already implemented. The roadmap and project status should remain aligned with what can be demonstrated in the current build.

---

## Contributing

Baraka City can benefit from contributions across:
- 3D environments and world-building.
- Gameplay programming and character controllers.
- Character modeling and animation.
- Interface and HUD design.
- Multiplayer and networking.
- Performance optimization.
- Testing, accessibility, and documentation.

Before contributing, review the repository's actual development setup, contribution guidelines, and license. Keep changes modular, preserve the visual identity, and test across supported device types.

---

## Creator

**Created by Dev Ameer**  
Building digital experiences at the intersection of technology, creativity, and community.  
Portfolio: [https://devameer.xyz/](https://devameer.xyz/)

---

## License

No license is specified in this README. Unless the repository includes a license granting permission, the project's code and assets should be treated as all rights reserved. Add the intended license before inviting reuse or redistribution.

---

<div align="center">

### BARAKA CITY
**More Than a Game**

*Faith · Knowledge · Community · Future*

</div>
