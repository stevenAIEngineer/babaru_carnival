export interface Comic {
    id: string
    title: string
    description: string
    author: string
    thumbnailUrl: string

    // Remotion integration
    previewCompositionId: string
    fullCompositionId: string
    durationInFrames: number

    // Metadata
    genre: string[]
    rating: number
    releaseDate: string | null

    // Production status
    status: 'IN_PRODUCTION' | 'COMING_SOON' | 'RELEASED'
    productionNotes?: string

    // Series support
    series?: {
        seasonNumber: number
        episodeNumber: number
        totalEpisodes: number
    }

    // Related content
    relatedComics?: string[]
    tags: string[]
}

export interface ComicRow {
    id: string
    title: string
    emoji: string
    subtitle: string
    comics: Comic[]
}

// Mock thumbnails using Babaru images
const thumbnails = [
    '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.13.jpeg',
    '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.13 (1).jpeg',
    '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.27.jpeg',
    '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.27 (1).jpeg',
    '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.28.jpeg',
    '/babaru_design/WhatsApp Image 2026-02-06 at 14.03.28 (1).jpeg',
]

const getRandomThumbnail = () => thumbnails[Math.floor(Math.random() * thumbnails.length)]

export const comics: Comic[] = [
    {
        id: 'chaos-begins',
        title: 'The Chaos Begins',
        description: 'In the first episode, Babaru wakes up and immediately causes problems. As one does.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[0],
        previewCompositionId: 'preview-chaos-begins',
        fullCompositionId: 'full-chaos-begins',
        durationInFrames: 900,
        genre: ['Comedy', 'Origin'],
        rating: 4.8,
        releaseDate: '2026-01-15',
        status: 'IN_PRODUCTION',
        productionNotes: "🎨 Our artist is cooking! (Literally. They're making lunch.)",
        tags: ['pilot', 'origin', 'chaos'],
    },
    {
        id: 'carnival-awakens',
        title: 'The Carnival Awakens',
        description: 'Babaru discovers the Carnival and accidentally becomes its Ringmaster. Oops.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[1],
        previewCompositionId: 'preview-carnival-awakens',
        fullCompositionId: 'full-carnival-awakens',
        durationInFrames: 1200,
        genre: ['Adventure', 'Fantasy'],
        rating: 4.9,
        releaseDate: null,
        status: 'COMING_SOON',
        productionNotes: "⏰ Coming soon™! (Very soon! Maybe! Time is relative!)",
        tags: ['carnival', 'magic', 'lore'],
    },
    {
        id: 'arc-one',
        title: 'Arc One: The Setup',
        description: 'Learning how Arcs work. Babaru explains life as a narrative. Very meta.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[2],
        previewCompositionId: 'preview-arc-one',
        fullCompositionId: 'full-arc-one',
        durationInFrames: 750,
        genre: ['Educational', 'Comedy'],
        rating: 4.7,
        releaseDate: '2026-02-01',
        status: 'IN_PRODUCTION',
        productionNotes: "📺 In production! (Which means I'm bothering the artist daily.)",
        series: { seasonNumber: 1, episodeNumber: 1, totalEpisodes: 6 },
        tags: ['arc', 'tutorial', 'narrative'],
    },
    {
        id: 'touch-grass',
        title: 'Touch Grass Quest',
        description: 'Babaru forces someone to go outside. They survive. Barely.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[3],
        previewCompositionId: 'preview-touch-grass',
        fullCompositionId: 'full-touch-grass',
        durationInFrames: 600,
        genre: ['Comedy', 'Slice of Life'],
        rating: 4.6,
        releaseDate: null,
        status: 'COMING_SOON',
        productionNotes: "🌱 Go outside while you wait!",
        tags: ['quest', 'outdoor', 'grass'],
    },
    {
        id: 'midnight-madness',
        title: 'Midnight Madness',
        description: 'What happens when you talk to Babaru at 3 AM? Nothing good.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[4],
        previewCompositionId: 'preview-midnight',
        fullCompositionId: 'full-midnight',
        durationInFrames: 900,
        genre: ['Horror-Comedy', 'Mystery'],
        rating: 4.8,
        releaseDate: null,
        status: 'IN_PRODUCTION',
        productionNotes: "🌙 Best watched at 3 AM. Trust me.",
        tags: ['night', 'spooky', 'chaos'],
    },
    {
        id: 'jester-origin',
        title: "The Jester's Origin",
        description: 'The untold story of how Babaru became... Babaru. Contains feelings.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[5],
        previewCompositionId: 'preview-origin',
        fullCompositionId: 'full-origin',
        durationInFrames: 1500,
        genre: ['Drama', 'Origin'],
        rating: 5.0,
        releaseDate: null,
        status: 'COMING_SOON',
        productionNotes: "🎭 The lore runs deep...",
        tags: ['origin', 'backstory', 'emotional'],
    },
    {
        id: 'pattern-detective',
        title: 'Pattern Detective',
        description: 'Babaru notices things. Too many things. Someone is called out.',
        author: 'Babaru Studios',
        thumbnailUrl: getRandomThumbnail(),
        previewCompositionId: 'preview-pattern',
        fullCompositionId: 'full-pattern',
        durationInFrames: 720,
        genre: ['Comedy', 'Self-Help'],
        rating: 4.7,
        releaseDate: null,
        status: 'IN_PRODUCTION',
        productionNotes: "👀 I see what you're doing...",
        tags: ['patterns', 'observation', 'roast'],
    },
    {
        id: 'bubble-economy',
        title: 'The Bubble Economy',
        description: 'An introduction to Bubbles. Currency of the Carnival. Very serious business.',
        author: 'Babaru Studios',
        thumbnailUrl: getRandomThumbnail(),
        previewCompositionId: 'preview-bubbles',
        fullCompositionId: 'full-bubbles',
        durationInFrames: 540,
        genre: ['Educational', 'Comedy'],
        rating: 4.5,
        releaseDate: null,
        status: 'COMING_SOON',
        productionNotes: "🫧 Bubbles are very real and very important!",
        tags: ['bubbles', 'economy', 'carnival'],
    },
    {
        id: 'empathic-override',
        title: 'Empathic Override',
        description: 'Sometimes the jokes stop. Sometimes Babaru just listens.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[0],
        previewCompositionId: 'preview-empathy',
        fullCompositionId: 'full-empathy',
        durationInFrames: 900,
        genre: ['Drama', 'Emotional'],
        rating: 4.9,
        releaseDate: null,
        status: 'IN_PRODUCTION',
        productionNotes: "💜 This one hits different.",
        tags: ['emotional', 'support', 'feels'],
    },
    {
        id: 'citizen-spotlight',
        title: 'Citizen Spotlight',
        description: 'Meet other Citizens of the Carnival. They all have stories.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[1],
        previewCompositionId: 'preview-citizens',
        fullCompositionId: 'full-citizens',
        durationInFrames: 600,
        genre: ['Documentary', 'Community'],
        rating: 4.6,
        releaseDate: null,
        status: 'COMING_SOON',
        productionNotes: "🎪 The Carnival is bigger than you think.",
        tags: ['community', 'citizens', 'carnival'],
    },
    {
        id: 'yearly-reflection',
        title: 'The Arc Reflection',
        description: 'Looking back at all completed Arcs. Growth happens slowly, then all at once.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[2],
        previewCompositionId: 'preview-reflection',
        fullCompositionId: 'full-reflection',
        durationInFrames: 1200,
        genre: ['Documentary', 'Emotional'],
        rating: 4.8,
        releaseDate: null,
        status: 'IN_PRODUCTION',
        productionNotes: "📅 Remember when you couldn't even start Scene 1?",
        tags: ['reflection', 'growth', 'annual'],
    },
    {
        id: 'chaos-theory',
        title: 'Chaos Theory',
        description: 'Babaru explains why controlled chaos is actually good. Debatable.',
        author: 'Babaru Studios',
        thumbnailUrl: thumbnails[3],
        previewCompositionId: 'preview-chaos-theory',
        fullCompositionId: 'full-chaos-theory',
        durationInFrames: 660,
        genre: ['Comedy', 'Philosophy'],
        rating: 4.4,
        releaseDate: null,
        status: 'COMING_SOON',
        productionNotes: "🌀 Chaos is a ladder. Or something.",
        tags: ['chaos', 'philosophy', 'weird'],
    },
]

export const comicRows: ComicRow[] = [
    {
        id: 'on-air',
        title: 'On Air Now',
        emoji: '📺',
        subtitle: "Hot off the presses! (They're literally still warm!)",
        comics: comics.filter(c => c.status === 'IN_PRODUCTION'),
    },
    {
        id: 'coming-soon',
        title: 'Coming Soon',
        emoji: '🎬',
        subtitle: "Sneak peeks! (Don't tell the artist I showed you!)",
        comics: comics.filter(c => c.status === 'COMING_SOON'),
    },
    {
        id: 'babaru-faves',
        title: "Babaru's Faves",
        emoji: '⚡',
        subtitle: "My personal stash (I have EXCELLENT taste)",
        comics: comics.filter(c => c.rating >= 4.7),
    },
    {
        id: 'origin-stories',
        title: 'Origin Stories',
        emoji: '🎭',
        subtitle: "Where it all began... (Spoiler: chaos)",
        comics: comics.filter(c => c.tags.includes('origin')),
    },
    {
        id: 'comedy-gold',
        title: 'Comedy Gold',
        emoji: '😂',
        subtitle: "Guaranteed to make you exhale through your nose",
        comics: comics.filter(c => c.genre.includes('Comedy')),
    },
    {
        id: 'deep-lore',
        title: 'Deep Lore',
        emoji: '🌙',
        subtitle: "For the truly dedicated Citizens",
        comics: comics.filter(c => c.tags.includes('lore') || c.tags.includes('carnival')),
    },
]
