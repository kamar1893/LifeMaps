export type StoryCategory =
  | "Adventure"
  | "Nostalgia"
  | "Romance"
  | "Growth"
  | "Wonder"
  | "Serenity";

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  favoriteCategory: StoryCategory;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Moment {
  id: string;
  userId: string;
  title: string;
  story: string;
  location: string;
  date?: string;
  category: StoryCategory;
  likes: number;
  liked: boolean;
  comments: Comment[];
  timestamp: string;
  gradient: string;
}

export const categoryStyles: Record<
  StoryCategory,
  { color: string; icon: string; gradient: string }
> = {
  Adventure: { color: "#f97316", icon: "🧭", gradient: "warm" },
  Nostalgia: { color: "#60a5fa", icon: "📷", gradient: "cool" },
  Romance: { color: "#f472b6", icon: "💫", gradient: "sunset" },
  Growth: { color: "#22c55e", icon: "🌱", gradient: "nature" },
  Wonder: { color: "#a78bfa", icon: "✨", gradient: "story" },
  Serenity: { color: "#14b8a6", icon: "🌊", gradient: "night" },
};

export const allCategories: StoryCategory[] = [
  "Adventure",
  "Nostalgia",
  "Romance",
  "Growth",
  "Wonder",
  "Serenity",
];

export const users: User[] = [
  {
    id: "u1",
    username: "atlas_walker",
    displayName: "Atlas Walker",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Atlas",
    bio: "Wanderer of streets and stories 🗺️",
    favoriteCategory: "Adventure",
    followers: 1480,
    following: 312,
  },
  {
    id: "u2",
    username: "mira_echoes",
    displayName: "Mira Echoes",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mira",
    bio: "Collecting memories in jars of light ✨",
    favoriteCategory: "Nostalgia",
    followers: 3120,
    following: 198,
  },
  {
    id: "u3",
    username: "kai_horizon",
    displayName: "Kai Horizon",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Kai",
    bio: "Every road has a story if you listen 🛤️",
    favoriteCategory: "Adventure",
    followers: 4890,
    following: 421,
  },
  {
    id: "u4",
    username: "ivy_bloom",
    displayName: "Ivy Bloom",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ivy",
    bio: "Growing through what I go through 🌿",
    favoriteCategory: "Growth",
    followers: 1050,
    following: 156,
  },
  {
    id: "u5",
    username: "noah_tides",
    displayName: "Noah Tides",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Noah",
    bio: "The ocean taught me patience 🌊",
    favoriteCategory: "Serenity",
    followers: 780,
    following: 89,
  },
  {
    id: "u6",
    username: "stella_light",
    displayName: "Stella Light",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Stella",
    bio: "Chasing wonder in everyday corners 🌟",
    favoriteCategory: "Wonder",
    followers: 3650,
    following: 275,
  },
  {
    id: "u7",
    username: "leo_compass",
    displayName: "Leo Compass",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Leo",
    bio: "Love letters written in footsteps 💕",
    favoriteCategory: "Romance",
    followers: 5200,
    following: 342,
  },
  {
    id: "u8",
    username: "aria_maps",
    displayName: "Aria Maps",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Aria",
    bio: "Cartographer of fleeting moments ✦",
    favoriteCategory: "Nostalgia",
    followers: 1890,
    following: 230,
  },
];

export const currentUser: User = users[0];

export const moments: Moment[] = [
  {
    id: "m1",
    userId: "u2",
    title: "The Bookshop That Remembered Me",
    story:
      "I returned to that tiny bookshop in Lisbon after five years. The owner smiled and said, 'I saved your favorite shelf.' Some places hold you even when you leave.",
    location: "Lisbon, Portugal",
    date: "Mar 2024",
    category: "Nostalgia",
    likes: 342,
    liked: false,
    timestamp: "2h ago",
    gradient: "cool",
    comments: [
      {
        id: "c1",
        userId: "u1",
        text: "This is so beautiful — places with memory 💙",
        timestamp: "1h ago",
      },
      {
        id: "c2",
        userId: "u7",
        text: "Lisbon does that to you",
        timestamp: "45m ago",
      },
    ],
  },
  {
    id: "m2",
    userId: "u1",
    title: "Dawn at the Edge of the World",
    story:
      "Stood on the cliffs of Moher at 5 AM. The wind was so fierce it felt like the earth was breathing. I've never felt so small and so alive.",
    location: "Cliffs of Moher, Ireland",
    date: "Jun 2023",
    category: "Adventure",
    likes: 218,
    liked: true,
    timestamp: "4h ago",
    gradient: "warm",
    comments: [
      {
        id: "c3",
        userId: "u4",
        text: "Ireland is on my bucket list 🍀",
        timestamp: "3h ago",
      },
    ],
  },
  {
    id: "m3",
    userId: "u3",
    title: "Lost in the Medina",
    story:
      "Took a wrong turn in Marrakech's medina and found a courtyard full of orange trees and singing birds. The best moments are unplanned.",
    location: "Marrakech, Morocco",
    date: "Sep 2023",
    category: "Adventure",
    likes: 567,
    liked: false,
    timestamp: "5h ago",
    gradient: "warm",
    comments: [
      {
        id: "c4",
        userId: "u6",
        text: "Unplanned magic is the best magic ✨",
        timestamp: "4h ago",
      },
      {
        id: "c5",
        userId: "u8",
        text: "The medina is a labyrinth of stories",
        timestamp: "3h ago",
      },
    ],
  },
  {
    id: "m4",
    userId: "u4",
    title: "Planting Roots",
    story:
      "Moved to a new city where I knew nobody. Today I hosted a dinner for six friends I made here. Growth isn't always visible, but it's always happening.",
    location: "Portland, Oregon",
    date: "Nov 2023",
    category: "Growth",
    likes: 189,
    liked: false,
    timestamp: "6h ago",
    gradient: "nature",
    comments: [],
  },
  {
    id: "m5",
    userId: "u5",
    title: "The Quiet Harbor",
    story:
      "Sat at the harbor in Dubrovnik as the sun melted into the Adriatic. Not a single thought, just the sound of water lapping against old stone.",
    location: "Dubrovnik, Croatia",
    date: "Aug 2023",
    category: "Serenity",
    likes: 421,
    liked: true,
    timestamp: "8h ago",
    gradient: "night",
    comments: [
      {
        id: "c6",
        userId: "u2",
        text: "Dubrovnik holds a special kind of peace",
        timestamp: "7h ago",
      },
    ],
  },
  {
    id: "m6",
    userId: "u6",
    title: "Fireflies in the Valley",
    story:
      "Camped in a valley in Kyoto where fireflies danced at dusk. It felt like the stars had fallen just for us. Some wonder can't be photographed.",
    location: "Kyoto, Japan",
    date: "Jul 2024",
    category: "Wonder",
    likes: 892,
    liked: false,
    timestamp: "10h ago",
    gradient: "story",
    comments: [
      {
        id: "c7",
        userId: "u1",
        text: "Japan is pure magic 🎋",
        timestamp: "9h ago",
      },
      {
        id: "c8",
        userId: "u3",
        text: "I need to experience this!",
        timestamp: "8h ago",
      },
    ],
  },
];

export const trendingLocations = [
  { name: "Kyoto, Japan", count: 234 },
  { name: "Lisbon, Portugal", count: 189 },
  { name: "Prague, Czech Republic", count: 156 },
  { name: "Dubrovnik, Croatia", count: 134 },
  { name: "Marrakech, Morocco", count: 121 },
  { name: "Barcelona, Spain", count: 98 },
];

export function getUserById(id: string | number): User | undefined {
  return users.find((u) => u.id === String(id));
}

export function getMomentsByUserId(id: string | number): Moment[] {
  return moments.filter((m) => m.userId === String(id));
}

export function getUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username === username);
}