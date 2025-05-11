import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { NotioLens } from "@/components/notio-lens"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Summarize Content as You <span className="text-teal-500 dark:text-teal-400">Scroll</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Skimify uses AI to instantly summarize articles, research papers, and long-form content as you read.
                </p>
              </div>
              {/* Buttons removed as requested */}
            </div>
          </div>
        </section>

        {/* Rest of the content remains the same */}
        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Skimify makes reading and research more efficient with powerful AI-driven features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600 dark:text-teal-400"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Real-time Summaries</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Get instant summaries of content as you scroll, powered by OpenAI's GPT-4o.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600 dark:text-teal-400"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Non-Intrusive</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Floating overlay that doesn't interfere with your reading experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-teal-600 dark:text-teal-400"
                  >
                    <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                    <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
                    <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Customizable</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Adjust summary length and response time to suit your preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Try Skimify in Action</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore these sample articles and see how Skimify summarizes content as you scroll.
                </p>
              </div>
            </div>

            <Tabs defaultValue="article1" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="article1">Technology</TabsTrigger>
                <TabsTrigger value="article2">Science</TabsTrigger>
                <TabsTrigger value="article3">History</TabsTrigger>
              </TabsList>
              <TabsContent value="article1" className="mt-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <h3 className="text-2xl font-bold mb-4">The Future of Artificial Intelligence</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Artificial Intelligence (AI) has rapidly evolved over the past decade, transforming from a niche
                      research field into a technology that permeates our daily lives. From voice assistants like Siri
                      and Alexa to recommendation systems on streaming platforms, AI has become an integral part of
                      modern technology.
                    </p>
                    <p>
                      The development of machine learning algorithms, particularly deep learning, has been a key driver
                      of this AI revolution. These algorithms enable computers to learn from data and improve their
                      performance over time without explicit programming. This capability has led to breakthroughs in
                      image recognition, natural language processing, and game playing.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Current Applications</h4>
                    <p>
                      Today, AI is being applied across numerous industries. In healthcare, AI algorithms are helping to
                      diagnose diseases from medical images with accuracy comparable to human doctors. In finance, AI
                      systems detect fraudulent transactions and optimize investment portfolios. In transportation, AI
                      powers self-driving cars and optimizes logistics networks.
                    </p>
                    <p>
                      Natural Language Processing (NLP) has seen particularly impressive advances. Large language models
                      like GPT-4 can generate human-like text, translate between languages, and even write code. These
                      models are trained on vast amounts of text data and can understand and generate language in ways
                      that were unimaginable just a few years ago.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Challenges and Concerns</h4>
                    <p>
                      Despite these advances, AI faces significant challenges. One major concern is bias in AI systems.
                      If an AI is trained on biased data, it will reproduce and potentially amplify those biases in its
                      outputs. This has led to documented cases of discrimination in areas like hiring, lending, and
                      criminal justice.
                    </p>
                    <p>
                      Privacy is another critical concern. AI systems often require large amounts of data to function
                      effectively, raising questions about how this data is collected, stored, and used. There are also
                      worries about surveillance and the potential for AI to be used to monitor individuals without
                      their knowledge or consent.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">The Future Landscape</h4>
                    <p>
                      Looking ahead, AI is likely to become even more integrated into our lives. Advances in robotics
                      combined with AI could lead to more capable robots in factories, homes, and public spaces. AI
                      could help address global challenges like climate change by optimizing energy use and discovering
                      new materials.
                    </p>
                    <p>
                      The concept of artificial general intelligence (AGI) – AI that can perform any intellectual task
                      that a human can – remains a long-term goal for some researchers. While current AI systems are
                      narrow, designed for specific tasks, AGI would be flexible and adaptable like human intelligence.
                    </p>
                    <p>
                      As AI continues to advance, it will be crucial to develop ethical frameworks and regulatory
                      approaches that maximize its benefits while minimizing risks. This will require collaboration
                      between technologists, policymakers, ethicists, and the public to ensure that AI serves humanity's
                      best interests.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="article2" className="mt-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <h3 className="text-2xl font-bold mb-4">Quantum Computing: A New Era of Processing</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Quantum computing represents a fundamental shift in how we process information. Unlike classical
                      computers that use bits (0s and 1s), quantum computers use quantum bits or "qubits" that can exist
                      in multiple states simultaneously thanks to the principles of quantum mechanics.
                    </p>
                    <p>
                      This property, known as superposition, allows quantum computers to process vast amounts of
                      information in parallel. Another quantum property, entanglement, enables qubits that are entangled
                      to be correlated in ways that have no classical equivalent, potentially allowing for even more
                      computational power.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Current State of Quantum Computing</h4>
                    <p>
                      Today's quantum computers are still in their early stages. Companies like IBM, Google, and
                      startups like Rigetti Computing and IonQ have built quantum processors with dozens of qubits. In
                      2019, Google claimed to have achieved "quantum supremacy" when its 53-qubit Sycamore processor
                      performed a specific calculation that would be practically impossible for the world's most
                      powerful supercomputers.
                    </p>
                    <p>
                      However, these early quantum computers are noisy and error-prone. Quantum states are extremely
                      fragile and can be disrupted by the slightest environmental interference, a problem known as
                      decoherence. Researchers are working on quantum error correction techniques to address this
                      challenge.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Potential Applications</h4>
                    <p>
                      Despite being in its infancy, quantum computing holds promise for several fields. In cryptography,
                      Shor's algorithm could potentially break widely used encryption methods like RSA, though practical
                      implementation would require far more qubits than currently available. This has spurred research
                      into quantum-resistant cryptography.
                    </p>
                    <p>
                      In chemistry and materials science, quantum computers could simulate molecular and chemical
                      processes with unprecedented accuracy. This could accelerate drug discovery and the development of
                      new materials with specific properties, such as better batteries or solar cells.
                    </p>
                    <p>
                      Optimization problems, which involve finding the best solution from a vast number of
                      possibilities, are another promising application. Quantum algorithms could potentially solve
                      complex optimization problems in logistics, finance, and machine learning more efficiently than
                      classical computers.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Challenges and Future Directions</h4>
                    <p>
                      Building a practical, error-corrected quantum computer remains a significant challenge. Current
                      estimates suggest that a quantum computer capable of running Shor's algorithm to break RSA
                      encryption would require millions of physical qubits, far beyond current capabilities.
                    </p>
                    <p>
                      Researchers are exploring various approaches to quantum computing, including superconducting
                      circuits, trapped ions, photonics, and topological qubits. Each approach has its advantages and
                      challenges, and it's not yet clear which will ultimately prove most successful.
                    </p>
                    <p>
                      The field is also grappling with how to program quantum computers effectively. Quantum algorithms
                      often work very differently from classical ones, and developing a quantum software ecosystem is an
                      active area of research.
                    </p>
                    <p>
                      Despite these challenges, investment in quantum computing continues to grow. Governments around
                      the world have launched major quantum initiatives, and private investment is also increasing.
                      While a fully fault-tolerant quantum computer may still be years away, the potential benefits make
                      this a field worth watching closely.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="article3" className="mt-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <h3 className="text-2xl font-bold mb-4">The Renaissance: A Cultural Rebirth</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      The Renaissance, meaning "rebirth" in French, was a period of cultural, artistic, political, and
                      economic "rebirth" following the Middle Ages. Generally described as taking place from the 14th to
                      the 17th century, the Renaissance promoted the rediscovery of classical philosophy, literature,
                      and art.
                    </p>
                    <p>
                      Beginning in Italy, the Renaissance spread throughout Europe, marking the transition from the
                      medieval period to modernity. The intellectual basis of the Renaissance was its version of
                      humanism, derived from the concept of Roman humanitas and the rediscovery of classical Greek
                      philosophy, such as that of Protagoras, who said that "man is the measure of all things."
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Origins and Spread</h4>
                    <p>
                      The Renaissance began in Florence, Italy, in the 14th century. Various theories have been proposed
                      to account for its origins and characteristics, focusing on a variety of factors including the
                      social and civic peculiarities of Florence at the time, its political structure, and the patronage
                      of its dominant family, the Medici.
                    </p>
                    <p>
                      The wealth of Italian merchant cities, such as Florence, Venice, and Genoa, provided significant
                      financial support for the arts. The Black Death, which wiped out a third of Europe's population,
                      resulted in a shift in the economy, providing more opportunities for the survivors and allowing
                      for the rise of a new merchant class.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Art and Architecture</h4>
                    <p>
                      Renaissance art marks a cultural rebirth at the close of the Middle Ages and rise of the Modern
                      world. One of the distinguishing features of Renaissance art was its development of highly
                      realistic linear perspective. Giotto di Bondone (1267–1337) is credited with first treating a
                      painting as a window into space, but it was not until the demonstrations of architect Filippo
                      Brunelleschi (1377–1446) and the subsequent writings of Leon Battista Alberti (1404–1472) that
                      perspective was formalized as an artistic technique.
                    </p>
                    <p>
                      The development of perspective was part of a wider trend towards realism in the arts. Painters
                      developed other techniques, studying light, shadow, and, famously in the case of Leonardo da
                      Vinci, human anatomy. Underlying these changes in artistic method was a renewed desire to depict
                      the beauty of nature and to unravel the axioms of aesthetics, with the works of Leonardo,
                      Michelangelo, and Raphael representing artistic pinnacles that were much imitated by other
                      artists.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Science and Technology</h4>
                    <p>
                      The Renaissance period saw a renewed interest in understanding the natural world through
                      observation and experimentation. This approach, which laid the groundwork for the Scientific
                      Revolution, was exemplified by figures like Leonardo da Vinci, who combined artistic skill with
                      scientific inquiry.
                    </p>
                    <p>
                      Technological innovations of the period included the printing press, developed by Johannes
                      Gutenberg around 1440. This invention revolutionized communication and facilitated the spread of
                      knowledge by making books more accessible.
                    </p>
                    <p>
                      In astronomy, Nicolaus Copernicus proposed a heliocentric model of the universe, challenging the
                      long-held geocentric view. This theory was later refined by Johannes Kepler and Galileo Galilei,
                      who also made significant contributions to physics and observational astronomy.
                    </p>
                    <h4 className="text-xl font-semibold mt-4 mb-2">Legacy</h4>
                    <p>
                      The Renaissance had a profound influence on subsequent intellectual and cultural history. Its
                      emphasis on the individual, on the value of human experience, and on the possibilities for human
                      achievement inspired similar movements across Europe and eventually in other parts of the world.
                    </p>
                    <p>
                      The rediscovery of ancient texts and the invention of printing democratized learning and allowed a
                      faster propagation of ideas. In all, the Renaissance could be viewed as an attempt by
                      intellectuals to study and improve the secular and worldly, both through the revival of ideas from
                      antiquity and through novel approaches to thought.
                    </p>
                    <p>
                      The Renaissance ideal of harmony and proportion was reflected not just in the arts but in a
                      broader worldview that sought to reconcile Christian faith with classical learning and to balance
                      religious devotion with secular achievements. This synthesis would continue to influence Western
                      civilization long after the Renaissance period had ended.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 Skimify. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Skimify Component */}
      <NotioLens />
    </div>
  )
}
