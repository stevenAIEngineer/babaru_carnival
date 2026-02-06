export type BabaruMood =
    | 'happy'
    | 'excited'
    | 'mischievous'
    | 'sad'
    | 'shocked'
    | 'confused'
    | 'proud'
    | 'tired'

export type CommentContext =
    | 'greeting'
    | 'hover'
    | 'loading'
    | 'error'
    | 'achievement'
    | 'random'
    | 'empty'
    | 'comic'

interface CommentSet {
    messages: string[]
    mood?: BabaruMood
}

const comments: Record<CommentContext, CommentSet> = {
    greeting: {
        messages: [
            "Oh! You're here! I was wondering when you'd show up! 👋",
            "Welcome to the Carnival! 🎪 (I run the show here, obviously.)",
            "Hi! I'm Babaru! 👋 Your new best friend! (Whether you like it or not!)",
            "Look who decided to grace us with their presence! ✨",
            "The Ringmaster has arrived— oh wait, that's me. YOU arrived! 🎭",
            "Finally! Someone who appreciates good content! 📺",
        ],
        mood: 'excited',
    },
    hover: {
        messages: [
            "Ooh! 👀 This one's got EXPLOSIONS! (Allegedly.)",
            "I haven't actually watched this one. Don't tell anyone.",
            "The artist cried making this one. Happy tears! (Mostly.)",
            "Click it! CLICK IT! Do it! 🎬",
            "My favorite! (I say that about all of them.)",
            "This one's so good it made me reconsider my life choices.",
        ],
        mood: 'mischievous',
    },
    loading: {
        messages: [
            "Waking up the pixel hamsters... 🐹",
            "Teaching pixels how to dance... 💃",
            "Bribing the server hamsters... (They want overtime pay)",
            "Consulting the ancient comic scrolls... 📜",
            "Herding digital cats... 🐱 (This might take a while)",
            "Calibrating the chaos engine... ⚙️",
            "The hamsters unionized. We're in negotiations.",
        ],
        mood: 'happy',
    },
    error: {
        messages: [
            "Well THIS is embarrassing. 😬",
            "The internet gremlins ate your request. (They needed the fiber.)",
            "Houston, we have a problem! 🚀 (Actually it's me. I'm Houston.)",
            "Something broke! Wasn't me! (It was probably me.)",
            "Error 404: My dignity also not found. 🙈",
        ],
        mood: 'confused',
    },
    achievement: {
        messages: [
            "You found it! You're basically a detective! 🕵️",
            "ACHIEVEMENT UNLOCKED! You absolute legend! 🏆",
            "Well well well, look who's clever! ✨",
            "I'm genuinely impressed! (That doesn't happen often.)",
            "The Carnival celebrates you today! 🎪",
        ],
        mood: 'excited',
    },
    random: {
        messages: [
            "I'm 8 inches tall and I'm still right. 🎭",
            "You're taking advice from a stuffed clown. Sit with that.",
            "I don't have hands and I'm still carrying this conversation.",
            "Just checking in! Still here! Still adorable! ✨",
            "Fun fact: I think about comics approximately 78% of the time.",
            "Did you know you've been here for a while? (I'm not judging. Much.)",
            "The artist is probably crying somewhere. Standard Tuesday.",
            "Remember to drink water! (I can't drink water but I care about you.)",
        ],
        mood: 'mischievous',
    },
    empty: {
        messages: [
            "Your watchlist is lonelier than me at a party. Let's fix that! ✨",
            "Nothing here yet! Like my social calendar! 📅",
            "It's so empty... like my patience for bad takes. 😌",
            "Add something! I believe in you! (Low bar, but still.)",
        ],
        mood: 'sad',
    },
    comic: {
        messages: [
            "📺 On Air Now - Hot off the presses! (They're literally still warm!)",
            "🎬 Coming Soon - Sneak peeks! (Don't tell the artist I showed you!)",
            "⚡ Babaru's Faves - My personal stash (I have EXCELLENT taste)",
            "🔥 Action-Packed Mayhem - For when talking is overrated",
            "😂 Comedy Gold - Guaranteed to make you exhale through your nose",
            "🎨 Visual Feasts - Pretty pictures for your eyeballs",
            "🌙 Experimental & Weird - I... I don't know what these are tbh",
        ],
        mood: 'excited',
    },
}

// Time-based greetings
function getTimeBasedGreeting(): string {
    const hour = new Date().getHours()

    if (hour >= 0 && hour < 6) {
        return "😴 Up late? Me too! The chaos never sleeps! 🌙"
    } else if (hour >= 6 && hour < 12) {
        return "☀️ Good morning! Ready for some comics? (The coffee can wait.)"
    } else if (hour >= 12 && hour < 17) {
        return "👋 Afternoon! Perfect time to procrastinate with comics!"
    } else if (hour >= 17 && hour < 21) {
        return "🌆 Evening! Reward yourself with animated chaos!"
    } else {
        return "🌙 Night owl, huh? I respect the dedication. 🦉"
    }
}

export function getRandomComment(context: CommentContext): string {
    if (context === 'greeting' && Math.random() > 0.5) {
        return getTimeBasedGreeting()
    }

    const commentSet = comments[context]
    const randomIndex = Math.floor(Math.random() * commentSet.messages.length)
    return commentSet.messages[randomIndex]
}

export function getMoodForContext(context: CommentContext): BabaruMood {
    return comments[context].mood || 'happy'
}

// Production placeholder comments
export const productionComments = [
    "🎨 Our artist is cooking! (Literally. They're making lunch. Comics come after.)",
    "⏰ Coming soon™! (Very soon! Maybe! Time is relative!)",
    "🔨 Under construction! (And by construction I mean the artist's mental breakdown)",
    "📺 In production! (Which means I'm bothering the artist daily for updates)",
    "🎬 The cameras are rolling! (By cameras I mean the artist's tired eyes)",
]

export function getProductionComment(): string {
    return productionComments[Math.floor(Math.random() * productionComments.length)]
}
