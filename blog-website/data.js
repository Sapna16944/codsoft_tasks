/* ============================================================
   Fieldnotes — sample content
   ============================================================ */

const CATEGORIES = [
  { id: "design",       label: "Design",       letter: "D", gradient: "linear-gradient(135deg, #6C63FF 0%, #241E5E 100%)" },
  { id: "technology",   label: "Technology",   letter: "T", gradient: "linear-gradient(135deg, #2F63E0 0%, #0B1D42 100%)" },
  { id: "productivity", label: "Productivity", letter: "P", gradient: "linear-gradient(135deg, #1F8A5F 0%, #0B3B2A 100%)" },
  { id: "travel",       label: "Travel",       letter: "V", gradient: "linear-gradient(135deg, #16A3A3 0%, #063F3F 100%)" },
  { id: "wellness",     label: "Wellness",     letter: "W", gradient: "linear-gradient(135deg, #C9A227 0%, #5E4310 100%)" },
  { id: "business",     label: "Business",     letter: "B", gradient: "linear-gradient(135deg, #B23A62 0%, #401225 100%)" }
];

function getCategory(id){
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
}

const POSTS = [
  {
    id: "quiet-interfaces",
    title: "The case for quieter interfaces",
    excerpt: "Most products are shouting at their users. A look at why restraint, not decoration, is the harder and more valuable design skill.",
    category: "design",
    tags: ["design systems", "minimalism", "ux"],
    author: "Nina Osei",
    date: "2026-08-18",
    featured: true,
    content: [
      "Open ten apps on your phone and count how many things are trying to get your attention at once — badges, banners, animated tooltips, colored dots that mean nothing on their own. Individually, each one seems harmless. Together, they add up to an interface that never stops talking.",
      "Quiet design isn't the absence of personality. It's the discipline of deciding what actually deserves a person's attention on any given screen, and then having the confidence to let everything else recede. That's a harder skill than it sounds, because loud design is easy to justify one decision at a time — 'just one more banner won't hurt' — while quiet design requires someone to keep saying no.",
      "The best test I've found is to imagine explaining every visual element on a screen to a stranger, one at a time: what does this color mean, why is this bold, why does this pulse. If you can't give a fast, confident answer, it's decoration, not communication, and decoration is what makes interfaces exhausting.",
      "None of this is an argument for blank, lifeless products. It's an argument for spending your visual loudness on one or two things per screen that truly matter, and letting the rest of the interface do its job without raising its voice."
    ]
  },
  {
    id: "local-first-software",
    title: "Why local-first software is having a moment",
    excerpt: "Offline-capable, sync-when-you-can apps are quietly becoming the default architecture for a new generation of tools.",
    category: "technology",
    tags: ["software architecture", "offline", "sync"],
    author: "Marcus Webb",
    date: "2026-08-11",
    featured: false,
    content: [
      "For most of the last fifteen years, 'cloud-first' was simply how software got built: the server held the truth, and the client was a thin window onto it. That model is easy to reason about, but it comes with a quiet cost — your app stops working the moment your connection does.",
      "Local-first software flips the default. Data lives on the device first, changes are applied instantly with no spinner, and syncing to the server (and other devices) happens in the background whenever a connection is available. The user experience is dramatically better in the ordinary case, and it degrades gracefully in the bad one instead of breaking outright.",
      "The hard part was never the idea — it's conflict resolution. When two people edit the same document offline and reconnect, whose change wins? A new generation of data structures, broadly known as CRDTs, solve this in a way that lets edits merge automatically without a central arbiter, and that's what's made local-first practical at scale rather than just a nice theory.",
      "The teams shipping this well treat the network as an optimization, not a dependency. That single mental shift changes almost every decision downstream, from how state is stored to how errors are surfaced to the person actually using the product."
    ]
  },
  {
    id: "deep-work-myth",
    title: "The deep work myth nobody wants to hear",
    excerpt: "Four-hour focus blocks make for a good headline. For most working people, they're not the answer — here's what actually is.",
    category: "productivity",
    tags: ["focus", "time management", "work habits"],
    author: "Priya Chandran",
    date: "2026-08-04",
    featured: false,
    content: [
      "The advice is everywhere: block off four uninterrupted hours, turn off every notification, and do your most important work in one long, glorious stretch. For a small number of people with a small number of jobs, this genuinely works. For almost everyone else, it's a plan that fails by 10am and then gets blamed on the person, not the plan.",
      "Most real jobs are interrupt-driven by design. You have a team that needs answers, a manager who needs updates, and a role that exists precisely because other people depend on your responsiveness. Treating that as a personal failure to protect your calendar misses the actual shape of the problem.",
      "A more realistic approach starts smaller: protect ninety focused minutes, not four hours. Put it at the time of day your energy is naturally highest, not whenever looks empty on the calendar. And instead of trying to eliminate interruptions, build a two-minute capture habit so an interrupting thought doesn't have to be resolved immediately — it just has to be written down somewhere you'll trust later.",
      "Deep work isn't wrong as an idea. It's wrong as a one-size prescription. The goal isn't to copy someone else's four hours — it's to find the smallest reliable block that actually fits the job you have."
    ]
  },
  {
    id: "slow-travel-notebook",
    title: "What three weeks in one city taught me about travel",
    excerpt: "Ditching the two-cities-a-week itinerary for a single, slower trip changed how I think about being somewhere new.",
    category: "travel",
    tags: ["slow travel", "itinerary", "reflection"],
    author: "Elena Marsh",
    date: "2026-07-27",
    featured: false,
    content: [
      "My old approach to a two-week trip was a spreadsheet: five cities, color-coded, every day accounted for. It made for a full camera roll and an exhausted body. Last spring I tried the opposite — one city, three weeks, no itinerary past day three — and it rearranged something in how I think about travel.",
      "The first week felt strange, almost wasteful. I wasn't seeing enough. By the second week, I had a bakery I went back to, a bench I sat on most evenings, a bus route I no longer needed a map for. None of that shows up in a highlight reel, but it's the part that actually felt like being somewhere, rather than visiting it.",
      "Slow travel also changes your relationship to bad weather and bad days. When you have three weeks, a rained-out afternoon isn't a loss — it's just a Tuesday. That alone removed most of the anxiety that used to follow me through every trip.",
      "I'm not arguing everyone should abandon the whirlwind trip; sometimes that's genuinely the right call for the time you have. But if you've never tried staying still somewhere new, it's worth one trip to find out what you've been moving past."
    ]
  },
  {
    id: "boundary-setting-work",
    title: "Saying no without sounding like you're saying no",
    excerpt: "A handful of phrases that protect your time at work without torching the relationship in the process.",
    category: "wellness",
    tags: ["boundaries", "burnout", "communication"],
    author: "Priya Chandran",
    date: "2026-07-20",
    featured: false,
    content: [
      "Most advice about boundaries focuses on the decision to say no, as if the hard part is the willpower. In my experience the harder part is almost always the delivery — finding language that's honest without reading as cold, and firm without reading as difficult.",
      "One shift that helped me: instead of declining a request outright, offer the trade. 'I can get to this by Thursday if it comes ahead of the report I'm finishing — want me to reorder?' does the same job as 'no', but it hands the other person a real decision instead of a closed door.",
      "Another is to separate the relationship from the request. You can be warm about the person and still direct about the constraint: 'I want to help with this, and I also don't want to promise something I can't deliver well.' Both halves of that sentence are true, and saying both matters.",
      "None of this replaces an actual honest no when one is needed. But most workplace friction isn't caused by boundaries themselves — it's caused by boundaries that arrive as a surprise. Say the constraint earlier and more often, in smaller doses, and the big no becomes much rarer."
    ]
  },
  {
    id: "pricing-page-honesty",
    title: "The pricing page is where trust is won or lost",
    excerpt: "Clever pricing tricks might lift a quarter's numbers. They rarely survive contact with a customer who feels misled.",
    category: "business",
    tags: ["pricing", "trust", "saas"],
    author: "Marcus Webb",
    date: "2026-07-13",
    featured: false,
    content: [
      "There's a well-worn playbook for pricing pages: anchor high, hide the annual toggle's real savings, bury usage limits in a tooltip, make the 'contact us' tier deliberately vague. Each trick has a study behind it showing a short-term lift. What the studies rarely measure is what happens six months later.",
      "Customers who feel tricked at checkout don't usually complain — they just quietly stop trusting the rest of what you tell them. That distrust shows up later as higher support load, harder renewal conversations, and reviews that mention 'gotchas' long after the original decision has been forgotten.",
      "The teams I've seen build durable pricing pages do something almost boring: they say the number, they say what it includes, and they say what happens at the edges — overages, downgrades, cancellation — before anyone has to ask. It converts slightly worse on day one and dramatically better over a year.",
      "Pricing is one of the few pages where a customer is actively looking for a reason not to trust you. Removing the reasons is worth more than any single clever trick."
    ]
  },
  {
    id: "color-systems-that-scale",
    title: "Building a color system that survives contact with a real product",
    excerpt: "Most brand palettes fall apart the moment they meet a data table, a dark mode, and an error state. Here's a sturdier way to build one.",
    category: "design",
    tags: ["design systems", "color", "accessibility"],
    author: "Nina Osei",
    date: "2026-07-06",
    featured: false,
    content: [
      "A brand palette usually gets designed for a hero image and a homepage — five or six beautiful colors chosen for how they look together in a mood board. Then someone needs a warning state, a fourth chart series, and a dark theme, and the palette has nothing to offer.",
      "A system that scales starts from function, not mood: a neutral ramp with enough steps for text, borders and backgrounds in both themes; a small set of semantic colors for success, warning and danger that are chosen for contrast first and brand-fit second; and only then, an accent or two reserved for things that are genuinely interactive.",
      "The neutral ramp is the part everyone skips and the part that matters most. Ten grays, evenly stepped in perceived lightness, will do more for a product's day-to-day quality than any accent color choice — because most of an interface, by area, is neutral.",
      "Treat color as infrastructure, not decoration, and the palette stops being something you have to renegotiate every time the product grows a new feature."
    ]
  },
  {
    id: "notification-diet",
    title: "I turned off every notification for a month. Here's what happened",
    excerpt: "A blunt experiment in silence, and the surprising handful of alerts I chose to bring back.",
    category: "productivity",
    tags: ["focus", "digital habits", "experiment"],
    author: "Elena Marsh",
    date: "2026-06-29",
    featured: false,
    content: [
      "I didn't ease into it. One evening I went through every app on my phone and turned every push notification off — messages, email, social, news, all of it — and left only phone calls and calendar alerts. The plan was one week. It turned into a month.",
      "The first three days were uncomfortable in a specific way: I kept reaching for my phone out of habit, finding nothing waiting, and feeling a strange, low-grade anxiety about what I might be missing. By day five that anxiety had mostly evaporated, replaced by something closer to relief.",
      "What surprised me wasn't how little I missed — it was how much of what used to feel urgent turned out to be nothing. Group chats sorted themselves out without me. Work questions resolved before I even opened my laptop. The handful of things that were genuinely time-sensitive found me anyway, usually as a phone call.",
      "I did bring a few notifications back afterward: calendar reminders, a single messaging app for close family, and nothing else. A month of silence didn't make me anti-notification — it made me much stingier about which ones earn a place on the list."
    ]
  },
  {
    id: "budget-airline-playbook",
    title: "A realistic playbook for booking cheap flights without the stress",
    excerpt: "No secret incognito trick required — just a small set of habits that consistently beat the average fare.",
    category: "travel",
    tags: ["budget travel", "flights", "planning"],
    author: "Elena Marsh",
    date: "2026-06-22",
    featured: false,
    content: [
      "Most flight-deal advice collapses into folklore — clear your cookies, book on a Tuesday, fly at 3am. Airline pricing algorithms don't care about your browser history, and most of that folklore has been debunked repeatedly. What actually moves the needle is less exciting and more reliable.",
      "Flexibility is still the single biggest lever. Being willing to shift your travel dates by two or three days, or to fly into a nearby secondary airport, routinely beats any booking-time trick by a wide margin — because you're comparing across a wider set of fares instead of gaming one.",
      "Fare alerts do real work precisely because they remove the need to check manually, which is where most people give up. Set one for a flexible date range and a realistic price ceiling, and let the tedious part happen automatically instead of doom-scrolling a booking site every evening.",
      "Booking a one-way separately from a return can sometimes beat a round trip, and budget carriers occasionally undercut full-service ones enough to justify the extra baggage fee math. Neither is guaranteed, which is exactly why it's worth a five-minute comparison rather than a rule you follow blindly."
    ]
  },
  {
    id: "sleep-and-decisions",
    title: "The decision you make worse when you're tired isn't the one you think",
    excerpt: "Sleep deprivation doesn't just slow you down — it quietly changes which trade-offs feel acceptable.",
    category: "wellness",
    tags: ["sleep", "decision making", "health"],
    author: "Priya Chandran",
    date: "2026-06-15",
    featured: false,
    content: [
      "It's well known that tired people react more slowly and make more small errors. Less well known is that sleep deprivation changes the kinds of trade-offs that feel reasonable — it doesn't just dull your judgment, it tilts it.",
      "Research on sleep-deprived decision-making consistently finds a shift toward short-term reward and away from long-term risk assessment. Tired people don't just make more mistakes; they make a specific kind of mistake — favoring the option that feels good right now over the one that's better in a week.",
      "That has an obvious implication most advice skips: don't just avoid big decisions when you're exhausted, be suspicious of any decision that conveniently favors the easy, immediate option when you're exhausted, because that's exactly the bias tired brains reach for.",
      "The fix isn't complicated, even if it's inconvenient — a genuinely hard call deserves a night of real sleep before it gets made, not because sleep makes you smarter, but because it restores the part of your judgment that weighs the future fairly."
    ]
  },
  {
    id: "first-ten-hires",
    title: "What actually breaks between a company's first and tenth hire",
    excerpt: "It's rarely the product. The things that quietly break are process, communication, and shared context.",
    category: "business",
    tags: ["startups", "hiring", "management"],
    author: "Marcus Webb",
    date: "2026-06-08",
    featured: false,
    content: [
      "At two or three people, a company runs on shared context — everyone was in the room for every decision, so nothing needs to be written down. That works beautifully right up until it doesn't, usually somewhere around hire six or seven, when for the first time someone wasn't in the room.",
      "The failure mode is rarely dramatic. It shows up as small, repeated confusion: two people building slightly different versions of the same feature, a customer promise nobody else knew about, a decision that quietly gets re-litigated because the reasoning behind it was never written anywhere.",
      "The fix isn't heavyweight process — early-stage companies that over-correct into process too fast often suffocate the speed that made them worth joining. It's a handful of lightweight habits: a short written decision log, a default of writing things down instead of only saying them, and one weekly moment where the whole team hears the same update at the same time.",
      "Growing a team is really growing a communication system. Treat it as deliberately as you'd treat the product, and the tenth hire ramps up nearly as fast as the second one did."
    ]
  },
  {
    id: "designing-empty-states",
    title: "Empty states are not a blank screen problem",
    excerpt: "The moment before a product has any data is a chance to teach, not just a placeholder to fill.",
    category: "design",
    tags: ["ux", "onboarding", "content design"],
    author: "Nina Osei",
    date: "2026-06-01",
    featured: false,
    content: [
      "It's easy to treat an empty state as an edge case — a screen that only exists briefly, before real content shows up, so it gets a placeholder icon and a single line of gray text and nothing more. That's a missed moment, because the empty state is often a new user's very first impression of what the product actually does.",
      "A good empty state answers three questions in order: what would normally be here, why is it empty right now, and what's the one action that fixes that. Most bad empty states answer none of them — they just describe the absence ('No items yet') without pointing anywhere.",
      "The tone matters as much as the content. An empty state is not the place for an apology or for cleverness that requires context the user doesn't have yet. It's the place for the clearest, most confident sentence in the whole product, because it's often competing with a user's genuine uncertainty about whether anything is broken.",
      "Treat the empty state as onboarding, not decoration, and a screen that used to feel like a dead end starts doing real work for the product instead."
    ]
  }
];
