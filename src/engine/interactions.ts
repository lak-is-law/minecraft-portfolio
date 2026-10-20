import { TargetInfo, Player } from "./player";
import { VoxelWorld } from "../world/world";
import { HUDManager } from "../ui/hud";
import {
  ModalManager,
  getLakshyaAvatarHtml,
  getRogerAvatarHtml,
  getAnimalAvatarHtml,
  getLightningMcQueenAvatarHtml,
  getDocHudsonAvatarHtml,
  getCitizenAvatarHtml
} from "../ui/modals";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { sound } from "./audio";
import { npcChatManager } from "./npcChat";

export interface InteractionContext {
  player: Player;
  world: VoxelWorld;
  hud: HUDManager;
  modals: ModalManager;
}

/**
 * Domain Interaction Manager
 * Routes and handles player interactions with world objects (projects, experience,
 * signs, resume chests, NPCs, animals, vehicles, and teleports).
 */
export class InteractionManager {
  private player: Player;
  private world: VoxelWorld;
  private hud: HUDManager;
  private modals: ModalManager;

  constructor(context: InteractionContext) {
    this.player = context.player;
    this.world = context.world;
    this.hud = context.hud;
    this.modals = context.modals;
  }

  public handleInteraction(target: TargetInfo) {
    if (this.player.ridingVehicle || this.world.mcQueenManager?.raceState?.active) return;
    if (!target.interactable) return;
    const inter = target.interactable;

    if (inter.type === 'project' && inter.id) {
      const proj = PORTFOLIO_DATA.projects.find(p => p.id === inter.id);
      if (proj) {
        this.modals.openProjectModal(proj);
        this.hud.pushChatMessage('Discovery', `Inspecting project: ${proj.title}`);
      }
    } else if (inter.type === 'experience' && inter.id) {
      const exp = PORTFOLIO_DATA.experience.find(e => e.id === inter.id);
      if (exp) {
        this.modals.openExperienceModal(exp);
      }
    } else if (inter.type === 'leadership') {
      this.modals.openLeadershipModal(inter.id);
      this.hud.pushChatMessage('Leadership', 'Entered Leadership Palace records.');
    } else if (inter.type === 'research') {
      this.modals.openResearchModal(inter.id);
      this.hud.pushChatMessage('Research', 'Accessed Research & AI Lab terminals.');
    } else if (inter.type === 'interests') {
      this.modals.openInterestsModal();
      this.hud.pushChatMessage('Interests', 'Entered Interests & Passions Pavilion.');
    } else if (inter.type === 'languages') {
      this.modals.openLanguagesModal();
      this.hud.pushChatMessage('Languages', 'Entered Foreign Languages & Global Communication Embassy.');
    } else if (inter.type === 'minigame') {
      this.modals.openMinigameModal(this.world.minigameBlocksPlaced);
      this.hud.pushChatMessage('Minigame', 'Entered Builder\'s Arena!');
    } else if (inter.type === 'skills') {
      this.modals.openSkillsModal();
      this.hud.pushChatMessage('Alchemy', 'Opened Alchemy Brewing Stand & Potions Guide.');
    } else if (inter.type === 'chest') {
      this.modals.openResumeChestModal();
      this.hud.pushChatMessage('Loot', 'Opened Ancient Dungeon Treasure Chest!');
    } else if (inter.type === 'sign') {
      const title = inter.title || 'Notice';
      const text = inter.text || '';
      if (title.includes('Big Ben') || title.includes('Great Bell') || title.includes('Elizabeth Tower')) {
        sound.playBell();
        this.hud.pushChatMessage('Westminster', '🔔 Big Ben\'s Great Bell chimes resonantly across London!');
      } else if (title.includes('Auto-Rickshaw') || title.includes('Tuk-Tuk')) {
        sound.playAutoHorn();
        this.hud.pushChatMessage('Auto-Rickshaw', '🛺 Pee-peep! Meter down! The Bajaj 3-wheeler darts through the avenue with style!');
      } else if (title.includes('Gopuram') || title.includes('Mandapam') || title.includes('Temple')) {
        sound.playTempleBell();
        this.hud.pushChatMessage('Mandapam', '🔔 Sacred bronze temple bell rings out with peace and auspicious blessings.');
      } else if (title.includes('ISRO') || title.includes('Chandrayaan')) {
        sound.playRocketRumble();
        this.hud.pushChatMessage('ISRO Telemetry', '🚀 Chandrayaan-3 soft touchdown at Shiv Shakti Point! Lunar exploration active.');
      } else if (title.includes('Cricket')) {
        sound.playBlockBreak();
        this.hud.pushChatMessage('Gully Cricket', '🏏 SIXER! Out of the ground and over the rooftops! What a magnificent shot!');
      } else if (title.includes('Chai') || title.includes('Dhaba') || title.includes('Golgappe') || title.includes('Dosa') || title.includes('Sundal')) {
        sound.playSlurp();
        this.hud.pushChatMessage('Street Food', '☕ Kadak ginger-cardamom cutting chai enjoyed! Energy fully restored!');
      } else if (title.includes('Hawa Mahal')) {
        sound.playSitar();
        this.hud.pushChatMessage('Jaipur Royal Court', '🌸 Cool desert winds whisper through Hawa Mahal\'s 953 honeycombed jharokhas.');
      } else if (title.includes('India Gate') || title.includes('Amar Jawan')) {
        sound.playLevelUp();
        this.hud.pushChatMessage('Amar Jawan Jyoti', '🇮🇳 Saluting the eternal flame and the indomitable courage of India\'s guardians.');
      } else if (title.includes('Rangoli') || title.includes('Diwali')) {
        sound.playSitar();
        this.hud.pushChatMessage('Diwali Festival', '🪔 Sparkling diyas and royal Rangoli bring festive light and joy to the realm!');
      } else if (title.includes('Safari') || title.includes('Wildlife') || title.includes('Panda') || title.includes('Lion') || title.includes('Elephant') || title.includes('Giraffe') || title.includes('Penguin') || title.includes('Tiger') || title.includes('Peacock') || title.includes('Zoo')) {
        sound.playLevelUp();
        this.hud.pushChatMessage('Sanctuary', `Observing habitat: ${title}`);
      }
      this.modals.openSignModal(title, text);
    } else if (inter.type === 'teleport') {
      this.modals.openFastTravelModal(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons(), this.world.liveTrains);
    } else if (inter.type === 'npc') {
      npcChatManager.handleNPCInteract(inter.id || '', inter.title);
      if (inter.id === 'lightning_mcqueen') {
        sound.playKaChow();
        const qPos = this.world.getMcQueenPosition();
        if (qPos) {
          this.world.spawnHammerSparkles(qPos.x, qPos.y + 1.2, qPos.z);
        }
        this.hud.pushChatMessage('Lightning McQueen', '⚡ Ka-Chow! Roaring at Radiator Springs Raceway [X: 190, Y: 2, Z: -15]! "I am speed!"');
        this.modals.openNPCDialogModal({
          id: 'lightning_mcqueen',
          name: 'Lightning McQueen #95',
          title: '7-Time Piston Cup Champion · Rust-eze Racing',
          badge: '[CHAMPION #95]',
          badgeColor: '#dc2626',
          locationBadge: 'Radiator Springs Raceway [X: 190, Z: -15]',
          avatarHtml: getLightningMcQueenAvatarHtml(),
          text: '⚡ "Ka-Chow!" Lightning McQueen flashes his iconic pearlescent grin, revs his 750-horsepower V8 engine, and lets out twin exhaust flame pops!\n\n"Hey racer! Welcome to Lightning McQueen Street & Radiator Springs Raceway [X: 190, Y: 2, Z: -15]! Float like a Cadillac, sting like a Beemer. What are you waiting for? Jump in and let\'s tear up the asphalt!"',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '🏎️ Jump in & Drive Lightning McQueen! [E]',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.close(true);
                this.player.startDrivingMcQueen();
                this.player.requestPointerLock();
                this.hud.pushChatMessage('Race Control', '⚡ Boarded Lightning McQueen! WASD to race, SPACE to Power Drift, SHIFT for Nitro, E to exit.');
              }
            },
            {
              label: '🏆 Challenge Doc Hudson to Willy\'s Butte Race!',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.close(true);
                this.player.startDrivingMcQueen();
                this.world.mcQueenManager?.startRaceChallenge();
                this.player.requestPointerLock();
                this.hud.pushChatMessage('Race Control', '🏁 Piston Cup Challenge vs Doc Hudson started! Red... Yellow... Green... GO!');
              }
            },
            {
              label: '📍 Where is this raceway located?',
              styleClass: 'mc-btn-stone',
              response: '⚡ "You\'re at Radiator Springs Raceway & Lightning McQueen Street [X: 190, Y: 2, Z: -15]! Willy\'s Butte sits in the center loop, Flo\'s V8 Café is on the pit straight, and Doc Hudson\'s pit box is right across the track!"'
            },
            {
              label: '🏁 Hear Racing Wisdom (Doc Hudson)',
              styleClass: 'mc-btn-blue',
              action: () => {
                sound.playRaceCarEngine(1.4);
              },
              response: '"Doc Hudson taught me everything I know out at Willy\'s Butte. When you\'re entering a slide on dirt or pavement, turn right to go left! Give it too much throttle, you lose the rear; balance the slide with counter-steer, and you blast past the pack!"\n\n— The Fabulous Hudson Hornet #51 Racing Academy'
            },
            {
              label: '⚡ Shout "Ka-Chow!" with McQueen',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playKaChow();
                sound.playLevelUp();
                const pos = this.world.getMcQueenPosition();
                if (pos) this.world.spawnHammerSparkles(pos.x, pos.y + 1.5, pos.z);
                this.hud.pushChatMessage('Lightning McQueen', '⚡ KA-CHOW! Lightning spark fanfare active!');
              },
              response: '⚡ "KA-CHOW!!" Twin sparks burst from McQueen\'s front fenders and high-octane flame pops from his dual side exhausts! Cheering erupts from the spectator grandstands!\n\nPiston Cup Championship Energy at 100%!'
            },
            {
              label: '🛞 Learn about Guido\'s World Record Pit Stop',
              styleClass: 'mc-btn-stone',
              response: '"At the Piston Cup tiebreaker, Chick Hicks\' crew laughed when Luigi and Guido rolled out. Then Guido performed the legendary sub-2.5-second 4-tire change! Luigi yelled \'Peet stop!\' and I rejoined in 1st place! Never underestimate the Radiator Springs crew!"'
            }
          ]
        });
      } else if (inter.id === 'doc_hudson') {
        sound.playRaceCarEngine(1.1);
        const hPos = this.world.getHudsonPosition();
        if (hPos) {
          this.world.spawnHammerSparkles(hPos.x, hPos.y + 1.2, hPos.z);
        }
        this.hud.pushChatMessage('Doc Hudson #51', '🏁 "You wanna challenge the Fabulous Hudson Hornet? Step onto the track, kid!"');
        this.modals.openNPCDialogModal({
          id: 'doc_hudson',
          name: 'Doc Hudson #51',
          title: '3-Time Piston Cup Champion · The Fabulous Hudson Hornet',
          badge: '[CHAMPION #51]',
          badgeColor: '#1e40af',
          locationBadge: 'Doc\'s Pit Crew Box [X: 190, Z: -8]',
          avatarHtml: getDocHudsonAvatarHtml(),
          text: '🏁 "Folks call me Doc Hudson. Back in \'51, \'52, and \'53, they called me the Fabulous Hudson Hornet.\n\nDriving fast in a straight line is easy. Knowing how to slide through the dirt and slingshot past the pack—that\'s real racing. Think you\'ve got what it takes to beat me around Willy\'s Butte?"',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '🏆 Accept Race Challenge: 3 Laps vs Doc Hudson!',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.close(true);
                this.player.startDrivingMcQueen();
                this.world.mcQueenManager?.startRaceChallenge();
                this.player.requestPointerLock();
                this.hud.pushChatMessage('Race Control', '🏁 Piston Cup Challenge vs Doc Hudson started! Red... Yellow... Green... GO!');
              }
            },
            {
              label: '🧠 Teach me "Turn Right to Go Left"',
              styleClass: 'mc-btn-blue',
              action: () => {
                sound.playTireDrift();
              },
              response: '"When you\'re entering the hairpin slide, you counter-steer. If you\'re drifting hard to the left, turn your wheel right! Give it too much gas, you spin out into the cactus; balance the throttle, and the rear tires bite and launch you forward!"\n\n— The Fabulous Hudson Hornet #51 Racing Academy'
            },
            {
              label: '🏆 What about your 3 Piston Cups?',
              styleClass: 'mc-btn-stone',
              response: '"1951, 1952, 1953. Back then we didn\'t have telemetry computers or fancy simulators—just raw Hudson Twin H-Power, grit, and driving feel. They\'re just empty cups, kid. It\'s the race that matters."'
            }
          ]
        });
      } else if (inter.id === 'roger') {
        sound.playDogBark();
        if (this.world.dogMesh) {
          this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
        }
        this.hud.pushChatMessage('Roger', '*Woof woof!* Welcome to Spawn Plaza [X: 4.5, Y: 2, Z: 7.3] beside Lakshya! (Wags tail happily)');
        this.modals.openNPCDialogModal({
          id: 'roger',
          name: 'Roger',
          title: 'Loyal Companion · Best Boy 🐾',
          badge: '[GOOD BOY]',
          badgeColor: '#16a34a',
          locationBadge: 'Spawn Plaza [X: 4.5, Z: 7.3]',
          avatarHtml: getRogerAvatarHtml(),
          text: '*Pant pant!* Roger gazes up with bright, warm eyes at Spawn Plaza [X: 4.5, Y: 2.0, Z: 7.3]!\n\nHis golden tail swishes rhythmically across the green grass beside Lakshya! *Woof!* (He gently bumps his wet nose against your hand, ready to fetch Lakshya\'s resume or play!)',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '📜 Roger, fetch Lakshya\'s Resume Chest! [Open Resume]',
              styleClass: 'mc-btn-gold',
              action: () => {
                sound.playLevelUp();
                sound.playDogBark();
                if (this.world.dogMesh) {
                  this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
                }
                this.hud.pushChatMessage('Roger', '*Woof woof!* (Roger proudly trots over and presents Lakshya\'s Ancient Resume Chest!)');
                this.modals.openResumeChestModal();
              },
              response: '*BARK BARK!* Roger trots over to the Ancient Chest, flips open the latch with his nose, and presents Lakshya\'s official resume dossier!\n\n📄 Check out the PDF download, technical skills, and credentials inside!'
            },
            {
              label: '💡 Roger, what makes Lakshya a great engineer?',
              styleClass: 'mc-btn-blue',
              action: () => {
                sound.playDogBark();
              },
              response: '*Woof!* Roger sits upright with pride:\n\n"Lakshya is a full-stack engineer and creative technologist who builds high-performance real-time applications! He created TODAR 2.0 (smart expense tracker), TrackYourFlight (flight telemetry), and this entire interactive 3D Minecraft realm in TypeScript & WebGL!\n\nHe writes clean code, solves complex algorithms, and always tests his software!"'
            },
            {
              label: '🏆 Roger, what are Lakshya\'s top achievements?',
              styleClass: 'mc-btn-gold',
              response: '*Arf arf!* Roger does an excited tap-dance on the grass:\n\n• 🥇 1st Place Winner at UCSI University Hackathon\n• 🎓 B.Tech CSE at SRMIST (8.89 / 10.0 · CGPA 4.37 / 5.0)\n• 🤝 Head of Alumni Relations (DAA) managing 25,000+ members\n• 🚀 5+ production-grade web applications & open-source projects!'
            },
            {
              label: '🐾 Pet Roger gently',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                if (this.world.dogMesh) {
                  this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
                }
                this.hud.pushChatMessage('Roger', '*Happy purrs & tail wags* (Roger leans deeply into your palm!)');
              },
              response: '*Woof!* Roger closes his eyes in bliss, leaning his head firmly into your palm while making soft contented puppy murmurs. Roger\'s tail is wagging at supersonic speed!\n\n(+50 Good Boy Affection)'
            },
            {
              label: '🥩 Feed tasty cooked steak',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                sound.playBlockBreak();
                if (this.world.dogMesh) {
                  this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
                }
                this.hud.pushChatMessage('Roger', '*Chomp chomp!* (Roger joyfully devours the steak!)');
              },
              response: '*CHOMP CHOMP!* Roger snatches the Minecraft steak out of your hand and gulps it down in two bites! He does a little happy tap-dance on the grass. Sparkles and hearts burst overhead!\n\nRoger\'s happiness is at 100%!'
            },
            {
              label: '🎾 Play fetch with stick',
              styleClass: 'mc-btn-stone',
              action: () => {
                sound.playDogBark();
                if (this.world.dogMesh) {
                  this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
                }
              },
              response: '*BARK!* You toss an oak twig across the spawn plaza! Roger bolts across the cobble path, snatches it mid-air with an Olympic jump, and trots proudly back to drop it directly on your shoes!\n\n*Woof woof!* (Throw it again!)'
            },
            {
              label: '📍 Roger, where are we located right now?',
              styleClass: 'mc-btn-stone',
              response: '*Woof!* Roger does a happy spin and taps his paw on the grass!\n\n📍 Roger\'s Spot: Crossroads Citadel Spawn Plaza [X: 4.5, Y: 2.0, Z: 7.3]\n\n"We are sitting right beside Lakshya in the center of the world! To the west is the Safari Zoo, to the east is Neo York and Hollywood, and straight ahead is the Emerald Fountain!"'
            },
            {
              label: '🧭 Ask Roger where Lakshya\'s work is',
              styleClass: 'mc-btn-stone',
              response: '*Arf!* Roger sits upright, points his furry snout towards the eastern pillars and the Redstone Nether Portal, then glances back at Lakshya with a wagging tail!\n\nRoger recommends checking the Golden Landmark Pillars or opening the Fast Travel Map [M]!'
            }
          ]
        });
      } else if (inter.id === 'oreo_cat') {
        sound.playLevelUp();
        if (this.world.catMesh) {
          this.world.spawnHammerSparkles(this.world.catMesh.position.x, this.world.catMesh.position.y + 0.6, this.world.catMesh.position.z);
        }
        this.hud.pushChatMessage('Oreo', '*Purrrrr!* Basking at Coastal Boulders [X: 10.5, Y: 1, Z: 82.5] by Palm Paradise Beach!');
        this.modals.openNPCDialogModal({
          id: 'oreo_cat',
          name: 'Oreo',
          title: 'Tuxedo Beach Cat · Coastal Sunbather 🐾',
          badge: '[MEOW]',
          badgeColor: '#18181b',
          locationBadge: 'Coastal Boulders [X: 10.5, Z: 82.5]',
          avatarHtml: getAnimalAvatarHtml('🐱', '#18181b'),
          text: '*Prrrr...* Oreo the black & white tuxedo cat lounges serenely on the warm coastal boulders [X: 10.5, Y: 1.0, Z: 82.5] by Palm Paradise Beach!\n\nShe watches the turquoise ocean waves and twitches her tail contently in the warm sunlight.',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '🐟 Feed Fresh Raw Salmon',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                if (this.world.catMesh) {
                  this.world.spawnHammerSparkles(this.world.catMesh.position.x, this.world.catMesh.position.y + 0.6, this.world.catMesh.position.z);
                }
              },
              response: '*Crunch munch!* Oreo devours the fresh fish delicately, licks her whiskers with deep satisfaction, and gives you a soft, raspy head-butt!\n\n(+100 Feline Friendship)'
            },
            {
              label: '📍 Where is this beach spot located?',
              styleClass: 'mc-btn-stone',
              response: '*Mew...* Oreo stretches out her paws gracefully.\n\n📍 Location: Coastal Boulders Beachfront [X: 10.5, Y: 1.0, Z: 82.5]\n\n"You found the sunny ocean rocks southwest of Spawn Citadel! North is the Sunset Saloon, and just along the shore is Palm Paradise Beach and the Grand Ferris Wheel."'
            },
            {
              label: '🐾 Scratch behind ears',
              styleClass: 'mc-btn-gold',
              response: '*Loud motorboat purring!* Oreo stretches out her paws and rolls onto her back in complete sunlit ecstasy.'
            }
          ]
        });
      } else if (inter.id?.startsWith('animal_') || inter.meta?.type === 'animal') {
        const aMeta = inter.meta;
        const aType = aMeta?.animalType || 'animal';
        const aTitle = inter.title || 'Wild Animal';
        const aSpecies = aMeta?.animalSpecies || 'Island Inhabitant';
        const aPos = aMeta?.position || { x: 0, y: 1, z: 0 };
        const posX = Math.round(aPos.x);
        const posY = Math.round(aPos.y);
        const posZ = Math.round(aPos.z);

        sound.playAnimalSound(aType);
        if (aMeta?.position) {
          this.world.spawnHammerSparkles(aMeta.position.x, aMeta.position.y + 1.2, aMeta.position.z);
        }

        const animalInfoMap: Record<string, { emoji: string; treat: string; treatName: string; bg: string; fact: string; habit: string }> = {
          panda: { emoji: '🐼', treat: '🎋', treatName: 'Fresh Bamboo Shoot', bg: '#14532d', habit: 'Giant Panda Bamboo Valley', fact: 'Pandas spend up to 12 hours a day eating bamboo! In this world, they enjoy tumbling downhill into the water canals.' },
          lion: { emoji: '🦁', treat: '🥩', treatName: 'Savanna Steak Cutlet', bg: '#854d0e', habit: 'Serengeti African Lion Kopje', fact: 'Simba perches high on the granite kopje outcrop to survey the savanna territory and watch travelers board the railway.' },
          elephant: { emoji: '🐘', treat: '🌾', treatName: 'Sugar Cane Sheaf', bg: '#334155', habit: 'Gentle Elephant Oasis', fact: 'Elephants have incredible memory and deep social bonds. Tembo and the herd love swimming near the waterfall base.' },
          temple_elephant: { emoji: '🐘', treat: '🪔', treatName: 'Blessed Modak & Fruits', bg: '#78350f', habit: 'Royal Temple Sanctuary', fact: 'Airavata is adorned with royal festival headwear and guards the sacred temple pavilions with peaceful dignity.' },
          giraffe: { emoji: '🦒', treat: '🍃', treatName: 'Acacia Leaf Twig', bg: '#a16207', habit: 'Rothschild Giraffe Canopy Reserve', fact: 'Giraffes can reach acacia trees over 5 meters tall! Their long necks help them spot approaching visitors from miles away.' },
          polar_bear: { emoji: '🐻‍❄️', treat: '🐟', treatName: 'Chilled Raw Salmon', bg: '#0369a1', habit: 'Glacial Iceberg Cove', fact: 'Barnaby and cub Snowdrop enjoy cool northern breezes and diving off the pack ice into deep ocean waters.' },
          penguin: { emoji: '🐧', treat: '🐟', treatName: 'Silver Cod Fish', bg: '#0f766e', habit: 'Antarctic Colony Shelf', fact: 'Emperor penguins slide across the snow on their bellies (tobogganing) to travel faster than walking!' },
          tiger: { emoji: '🐯', treat: '🥩', treatName: 'Forest Prime Rib', bg: '#9a3412', habit: 'Royal Bengal Tiger Sanctuary', fact: 'Shera is the guardian of the eastern forests. Bengal tigers are strong swimmers and often cool off in shaded streams.' },
          peacock: { emoji: '🦚', treat: '🌻', treatName: 'Golden Sunflower Seeds', bg: '#1e3a8a', habit: 'Royal Palace Gardens', fact: 'Mayur displays majestic iridescent plumage during morning mist and sunrise across the palace courtyard.' },
          sheep: { emoji: '🐑', treat: '🌾', treatName: 'Sweet Field Wheat', bg: '#475569', habit: 'Sunflower Countryside Meadows', fact: 'Woolly provides warm wool for voxel tapestries and loves grazing among the sunflowers and poppies.' },
          pig: { emoji: '🐷', treat: '🥕', treatName: 'Crisp Orange Carrot', bg: '#be185d', habit: 'Countryside Barnyard', fact: 'Wilbur has an acute sense of smell and loves snuffling through soft dirt near the farm fences for hidden truffles.' },
          zebra: { emoji: '🦓', treat: '🌱', treatName: 'Fresh Savanna Grass', bg: '#374151', habit: 'Serengeti Open Plains', fact: 'Every zebra has a stripe pattern as unique as human fingerprints! Marty enjoys racing alongside the railway trains.' },
          flamingo: { emoji: '🦩', treat: '🦐', treatName: 'Lagoon Brine Shrimp', bg: '#db2777', habit: 'Tropical Waters Sanctuary', fact: 'Flamingos get their vibrant pink coloration from carotenoids in the aquatic food they filter from the shallow waters.' }
        };

        const info = animalInfoMap[aType] || { emoji: '🐾', treat: '🌾', treatName: 'Wild Grass Treat', bg: '#1e293b', habit: 'Island Sanctuary', fact: 'A friendly creature living in harmony across Lakshya\'s Minecraft portfolio archipelago!' };

        this.hud.pushChatMessage(aTitle, `*Observing ${aTitle} (${aSpecies}) at ${info.habit} [X: ${posX}, Y: ${posY}, Z: ${posZ}]!*`);

        this.modals.openNPCDialogModal({
          id: inter.id || `animal_${aType}`,
          name: aTitle,
          title: `${aSpecies} · ${info.habit}`,
          badge: `[SAFARI]`,
          badgeColor: '#059669',
          locationBadge: `${info.habit} [X: ${posX}, Z: ${posZ}]`,
          avatarHtml: getAnimalAvatarHtml(info.emoji, info.bg),
          text: `You approach ${aTitle}! They tilt their head inquisitively, observing you in the gentle island breeze.\n\n📍 Location: ${info.habit} [X: ${posX}, Y: ${posY}, Z: ${posZ}]\nSpecies: ${aSpecies}`,
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: `${info.treat} Feed ${info.treatName}`,
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                sound.playAnimalSound(aType);
                if (aMeta?.position) {
                  this.world.spawnHammerSparkles(aMeta.position.x, aMeta.position.y + 1.2, aMeta.position.z);
                }
                this.hud.pushChatMessage(aTitle, `Happily munches on the ${info.treatName}! ✨`);
              },
              response: `*Munch munch!* ${aTitle} enthusiastically enjoys the ${info.treatName}! Sparkles swirl all around them, and they let out a contented, happy sound.\n\nThey now trust you as a friend of the sanctuary!`
            },
            {
              label: '🐾 Pet gently',
              styleClass: 'mc-btn-gold',
              action: () => {
                sound.playAnimalSound(aType);
                if (aMeta?.position) {
                  this.world.spawnHammerSparkles(aMeta.position.x, aMeta.position.y + 0.8, aMeta.position.z);
                }
              },
              response: `You reach out and stroke ${aTitle} gently. They relax under your touch and lean in affectionately!\n\nNature harmony achieved (+25 Exploration XP)!`
            },
            {
              label: '📍 Tell me about your habitat & location',
              styleClass: 'mc-btn-stone',
              response: `📍 Sanctuary Dossier [${aTitle}]:\n\n• Habitat: ${info.habit}\n• Coordinates: [X: ${posX}, Y: ${posY}, Z: ${posZ}]\n• Species: ${aSpecies}\n\n"${info.fact}"\n\nPress [M] anytime to open Fast Travel if you want to warp back here!`
            },
            {
              label: '📖 Learn Wildlife Fun Fact',
              styleClass: 'mc-btn-blue',
              response: `🌿 Wildlife Log [${aSpecies}]:\n\n"${info.fact}"\n\nLocated within the ${info.habit} of Lakshya's portfolio island!`
            }
          ]
        });
      } else if (inter.id?.startsWith('citizen_') || inter.meta?.type === 'citizen') {
        const cMeta = inter.meta;
        const cRole = cMeta?.role || 'Island Resident';
        const cTitle = inter.title || 'Island Citizen';
        const cPos = cMeta?.position || { x: 0, y: 2, z: 0 };
        const posX = Math.round(cPos.x);
        const posY = Math.round(cPos.y);
        const posZ = Math.round(cPos.z);
        const cColor = cMeta?.tagColor || '#38bdf8';

        sound.playVillagerHuh();
        if (cPos) {
          this.world.spawnHammerSparkles(cPos.x, cPos.y + 1.2, cPos.z);
        }

        const npcId = inter.id || `citizen_${cTitle.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const npcInfo = npcChatManager.handleNPCInteract(npcId, cTitle);
        const areaName = npcInfo?.areaName || 'World District';

        this.hud.pushChatMessage(cTitle, `Greetings traveler! Speaking from ${areaName} [X: ${posX}, Y: ${posY}, Z: ${posZ}].`);

        this.modals.openNPCDialogModal({
          id: npcId,
          name: cTitle,
          title: `${cRole} · ${areaName}`,
          badge: `[RESIDENT]`,
          badgeColor: cColor,
          locationBadge: `${areaName} [X: ${posX}, Z: ${posZ}]`,
          avatarHtml: getCitizenAvatarHtml(npcInfo?.emoji || '👤', cColor),
          text: `Hello there! I'm ${cTitle}, the ${cRole} here at ${areaName} [X: ${posX}, Y: ${posY}, Z: ${posZ}]. What brings you to our corner of the world today?`,
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '📍 Tell me about your location & surroundings',
              styleClass: 'mc-btn-blue',
              response: npcInfo?.detailedLocationText || `📍 Location: ${areaName} [X: ${posX}, Y: ${posY}, Z: ${posZ}]\n\nWelcome to ${areaName}! There is plenty to explore here. Press [M] anytime to open the Fast Travel map!`
            },
            {
              label: '🗺️ Where should I explore nearby?',
              styleClass: 'mc-btn-gold',
              response: `Nearby Highlights around ${areaName}:\n\n${npcInfo?.nearbyLandmarks ? npcInfo.nearbyLandmarks.map(l => `• ${l}`).join('\n') : '• Explore the nearby landmark monuments and pathways!'}\n\nCoordinates: [X: ${posX}, Y: ${posY}, Z: ${posZ}]`
            },
            {
              label: '👋 Wave and say hello',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                if (cPos) this.world.spawnHammerSparkles(cPos.x, cPos.y + 1.2, cPos.z);
              },
              response: `*Waves warmly!* "Wonderful to meet you! Enjoy your journey through Lakshya's Minecraft portfolio realm!"`
            }
          ]
        });
      } else {
        sound.playVillagerHuh();
        if (this.world.npcMesh) {
          this.world.spawnHammerSparkles(this.world.npcMesh.position.x, this.world.npcMesh.position.y + 1.2, this.world.npcMesh.position.z);
        }
        this.hud.pushChatMessage('Lakshya', 'Hey there! Welcome to my Minecraft Portfolio world! Press M anytime for World Map.');

        this.modals.openNPCDialogModal({
          id: 'lakshya_guide',
          name: 'Lakshya',
          title: 'Software Engineer & Designer · Portfolio Guide',
          badge: '[LVL 22]',
          badgeColor: '#ca8a04',
          locationBadge: 'Spawn Plaza [X: 3.5, Z: 7.5]',
          avatarHtml: getLakshyaAvatarHtml(),
          text: 'Hey explorer! Welcome to my interactive 3D voxel portfolio island. I built this realm with TypeScript, Three.js, and custom WebGL shaders to showcase my engineering projects, experience, and skills in a playable Minecraft format!\n\nBeside me is my loyal companion dog Roger. What would you like to explore today?',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '📜 Open Career Resume Chest & Download PDF',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.openResumeChestModal();
              }
            },
            {
              label: '💼 View Flagship Engineering Projects',
              styleClass: 'mc-btn-green',
              action: () => {
                this.modals.openProjectModal(PORTFOLIO_DATA.projects[0]);
              }
            },
            {
              label: '🎓 Tell me about your education & background',
              styleClass: 'mc-btn-blue',
              response: `I am pursuing my B.Tech in Computer Science and Engineering at SRMIST (${PORTFOLIO_DATA.profile.gpa} · 8.89 / 10.0). My coursework emphasizes Algorithms, Distributed Systems, Software Engineering, and AI/ML.\n\nI combine rigorous systems fundamentals with interactive front-end and real-time graphics engineering!`
            },
            {
              label: '🏢 Walk me through your work experience & leadership',
              styleClass: 'mc-btn-green',
              action: () => {
                this.modals.openExperienceModal(PORTFOLIO_DATA.experience[0]);
              },
              response: 'I served as Head of Alumni Relations for the Directorate of Alumni Affairs (DAA), managing an engaged community of 25,000+ alumni, coordinating flagship summits, and spearheading tech automation.\n\nI also lead technical initiatives at GenoSpark and 6Pistons, and won 1st Place at the UCSI University Hackathon!'
            },
            {
              label: '⚡ Inspect Technical Skills Matrix',
              styleClass: 'mc-btn-blue',
              action: () => {
                this.modals.openSkillsModal();
              }
            },
            {
              label: '📬 How can I reach out or hire you?',
              styleClass: 'mc-btn-gold',
              response: `I'd love to connect! You can reach me directly via:\n\n• Email: ${PORTFOLIO_DATA.profile.email}\n• LinkedIn: ${PORTFOLIO_DATA.profile.linkedinUrl}\n• Portfolio: ${PORTFOLIO_DATA.profile.portfolioUrl}\n• Resume: ${PORTFOLIO_DATA.profile.resumeUrl}\n• GitHub: ${PORTFOLIO_DATA.profile.githubUrl}\n\nOr click [RESUME CHEST] in the pause menu to download my full PDF!`
            },
            {
              label: '🗺️ Open Fast Travel Realm Map [M]',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.openFastTravelModal(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons(), this.world.liveTrains);
              }
            },
            {
              label: '🐶 Tell me about your dog Roger!',
              styleClass: 'mc-btn-stone',
              response: 'That\'s Roger! He\'s my golden companion dog. He guards the spawn plaza, knows all my resume highlights by heart, loves ear scratches, and gets super excited whenever visitors feed him steak.\n\nWalk over and tap Roger anytime to pet him, ask him about my career, or play fetch!'
            },
            {
              label: '🧭 Where should I explore first on the island?',
              styleClass: 'mc-btn-stone',
              response: 'Start by inspecting the Emerald Central Fountain right behind me!\n\n• West: Giant Panda Bamboo Valley & African Lion Kopje\n• East: Taj Mahal, India Gate, & Cultural Pavilions\n• South: Redstone Nether Portal, Circular Railway Train, and Builder Arena\n\nOr press [M] anytime to teleport directly to any landmark!'
            },
            {
              label: '🎮 Any secret tips or Easter eggs?',
              styleClass: 'mc-btn-stone',
              response: 'Here are a few builder secrets:\n\n1. Press [C] or [F5] to switch camera between 1st Person and 3rd Person!\n2. Press [F] to toggle Flight Mode and soar over the voxel clouds.\n3. Press [B] to open your creative building block palette.\n4. Walk up to the circular railway train or auto-rickshaw and press [E] to board and ride!'
            }
          ]
        });
      }
    }
  }
}
