import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Mail, Copy, Check, Github, Linkedin, ExternalLink, Code2, Database, Layers, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled ? 'bg-monolith-dark/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-[4vw] py-4">
        <div className="font-mono text-xs uppercase tracking-wider text-monolith-text">
          Meet Kumar©
        </div>
        <div className="hidden md:flex items-center gap-[2.2vw]">
          {['Home', 'Projects', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="font-mono text-[13px] uppercase tracking-wide text-monolith-text/80 hover:text-monolith-orange transition-colors link-underline"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const scrollCue = scrollCueRef.current;

    if (!section || !content || !title || !tagline || !scrollCue) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(
          title.querySelectorAll('.title-line'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
        )
        .fromTo(
          tagline,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          scrollCue,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([title.querySelectorAll('.title-line'), tagline, scrollCue], {
              opacity: 1,
              y: 0,
            });
          },
        },
      });

      // Exit phase (70% - 100%)
      scrollTl
        .fromTo(
          title.querySelectorAll('.title-line'),
          { y: 0, opacity: 1 },
          { y: '-22vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          tagline,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          scrollCue,
          { opacity: 1 },
          { opacity: 0 },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="pinned-section bg-monolith-dark z-10 flex items-center justify-center"
    >
      <div className="vignette" />
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4"
        style={{ transform: 'translateY(-5vh)' }}
      >
        <h1
          ref={titleRef}
          className="font-display font-bold text-hero tracking-tight text-monolith-text mb-6"
        >
          <span className="title-line block">Meet Kumar</span>
          <span className="title-line block text-monolith-orange">Full Stack Developer</span>
        </h1>
        <p
          ref={taglineRef}
          className="text-lg md:text-xl text-monolith-muted max-w-[52vw] mx-auto leading-relaxed"
        >
          Building scalable web solutions with React, Next.js & TypeScript.
          <br />
          Passionate about creating intuitive user experiences.
        </p>
        <div className="flex items-center justify-center gap-6 mt-8">
          <a
            href="https://github.com/Meet00028"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-monolith-muted hover:text-monolith-orange transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="font-mono text-sm">GitHub</span>
          </a>
        </div>
      </div>
      <div
        ref={scrollCueRef}
        className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-wide text-monolith-muted">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-monolith-muted scroll-indicator" />
      </div>
    </section>
  );
}

// Project Slider Component
function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      title: 'CODEBASE CARTOGRAPHER',
      subtitle: 'AI-Powered Code Visualization Tool with React Flow & Gemini API',
      image: '/project_codebase.jpg',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Google Gemini API'],
      github: 'https://github.com/Meet00028/Codebase-Cartographer',
      demo: 'https://codebase-cartographer.vercel.app',
      description: 'Engineered a developer productivity tool that transforms complex directory structures into interactive dependency graphs. Features real-time code summaries using Google Gemini API and secure client-side parsing.',
    },
    {
      title: 'THRIFT STORE',
      subtitle: 'E-commerce platform for secondhand goods with Next.js',
      image: '/project_thrift.jpg',
      tech: ['Next.js', 'TypeScript', 'CSS Modules', 'Styled Components'],
      github: 'https://github.com/Meet00028/Thrift-Store',
      demo: 'https://thrift-store-demo.vercel.app',
      description: 'Built an interactive e-commerce web application allowing users to browse, filter, and purchase secondhand items. Features a modern component-based UI with TypeScript for type safety.',
    },
    {
      title: 'NEWS APP',
      subtitle: 'Real-time news aggregation website with category filtering',
      image: '/project_news.jpg',
      tech: ['JavaScript', 'HTML5', 'CSS3', 'NewsAPI'],
      github: 'https://github.com/Meet00028/News-App',
      demo: 'https://news-app-demo.vercel.app',
      description: 'Dynamic news portal fetching latest articles from various categories. Features real-time updates, intuitive category-based filtering, and a clean responsive interface.',
    },
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Project Display */}
      <div className="relative flex-1 rounded-card overflow-hidden card-shadow">
        <img
          src={currentProject.image}
          alt={currentProject.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-monolith-dark/95 via-monolith-dark/50 to-transparent" />
        
        {/* Project Info */}
        <div className="absolute left-[6%] bottom-[8%] right-[6%]">
          <h3 className="font-display font-bold text-3xl md:text-4xl text-monolith-text mb-2">
            {currentProject.title}
          </h3>
          <p className="text-base md:text-lg text-monolith-muted mb-4 max-w-2xl">
            {currentProject.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {currentProject.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-monolith-orange/20 text-monolith-orange text-xs font-mono rounded"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href={currentProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-monolith-dark/80 text-monolith-text rounded-lg hover:bg-monolith-orange transition-colors"
            >
              <Github className="w-4 h-4" /> View Code
            </a>
            <a
              href={currentProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-monolith-orange text-white rounded-lg hover:bg-monolith-orange/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevProject}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-monolith-dark/60 hover:bg-monolith-orange text-white rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextProject}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-monolith-dark/60 hover:bg-monolith-orange text-white rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Project Indicators */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-monolith-orange w-8'
                : 'bg-monolith-text/30 hover:bg-monolith-text/50'
            }`}
          />
        ))}
      </div>

      {/* Project Counter */}
      <div className="text-center mt-4">
        <span className="font-mono text-sm text-monolith-muted">
          {currentIndex + 1} / {projects.length}
        </span>
      </div>
    </div>
  );
}

// Selected Works Section
function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const slider = sliderRef.current;

    if (!section || !header || !slider) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        },
      });

      // Header animation
      scrollTl
        .fromTo(
          header,
          { x: '-12vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .to(
          header,
          { x: '-6vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

      // Slider animation
      scrollTl
        .fromTo(
          slider,
          { x: '60vw', opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0.1
        )
        .to(
          slider,
          { x: '-30vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="pinned-section bg-monolith-dark z-20"
    >
      <div className="vignette" />
      <div
        ref={headerRef}
        className="absolute left-[6vw] top-[10vh] z-30"
      >
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-monolith-text mb-2">
          Featured Projects
        </h2>
        <p className="font-mono text-sm text-monolith-muted">
          Full Stack Development Portfolio
        </p>
      </div>

      <div
        ref={sliderRef}
        className="absolute inset-0 flex items-center justify-center px-[6vw] pt-[20vh] pb-[10vh]"
      >
        <div className="w-full max-w-5xl h-[65vh]">
          <ProjectSlider />
        </div>
      </div>
    </section>
  );
}

// Skills & About Section
function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'Prisma ORM'],
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: 'Tools',
      skills: ['Git', 'GitHub', 'Figma', 'Vite', 'React Native'],
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: 'AI & More',
      skills: ['Generative AI', 'Python', 'Pandas', 'NumPy'],
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const skills = skillsRef.current;

    if (!section || !headline || !body || !skills) return;

    const headlineLines = headline.querySelectorAll('.headline-line');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Headline entrance
      scrollTl
        .fromTo(
          headlineLines,
          { x: '-18vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.07, ease: 'none' },
          0.08
        )
        .to(
          headlineLines,
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

      // Body entrance
      scrollTl
        .fromTo(
          body,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.12
        )
        .to(
          body,
          { x: '6vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

      // Skills entrance
      scrollTl
        .fromTo(
          skills,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18
        )
        .to(
          skills,
          { y: '4vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="pinned-section bg-monolith-light z-30"
    >
      <div className="absolute inset-0 bg-gradient-radial from-white/50 via-transparent to-transparent" />

      <div className="absolute left-[6vw] top-[10vh]">
        <span className="font-mono text-xs uppercase tracking-wide text-monolith-dark/60">
          01 / About & Skills
        </span>
      </div>

      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[22vh] w-[46vw]"
      >
        <h2 className="font-display font-bold text-display tracking-tight text-monolith-dark leading-[1.02]">
          <span className="headline-line block">Full Stack</span>
          <span className="headline-line block">Developer</span>
          <span className="headline-line block text-monolith-orange">& Problem Solver.</span>
        </h2>
      </div>

      <div
        ref={bodyRef}
        className="absolute left-[58vw] top-[22vh] w-[36vw] space-y-6"
      >
        <div>
          <h3 className="font-display font-semibold text-lg text-monolith-dark mb-3">
            Who I Am
          </h3>
          <p className="text-base text-monolith-dark/70 leading-relaxed">
            I'm a Full Stack Developer specializing in React, Next.js, and TypeScript, 
            with strong backend expertise in MySQL and MongoDB. Currently pursuing my 
            B.Tech in Computer Science at Newton School of Technology, Pune.
          </p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-monolith-dark mb-3">
            What I Do
          </h3>
          <p className="text-base text-monolith-dark/70 leading-relaxed">
            Experienced in the full SDLC, delivering scalable, high-performance web 
            solutions and intuitive UIs in Agile environments. Passionate about 
            creating clean, maintainable code that solves real problems.
          </p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-monolith-dark mb-3">
            Certifications
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-monolith-dark/70">
              • Generative AI For Everyone — DeepLearning.AI
            </p>
            <p className="text-sm text-monolith-dark/70">
              • AI for Everyone — DeepLearning.AI
            </p>
          </div>
        </div>
      </div>

      <div
        ref={skillsRef}
        className="absolute left-[6vw] bottom-[10vh] right-[6vw]"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="p-4 bg-monolith-dark/5 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-3 text-monolith-orange">
                {category.icon}
                <span className="font-mono text-sm font-medium">{category.title}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-monolith-dark/70 bg-monolith-dark/10 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Education Spotlight Section
function SpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl
        .fromTo(
          content,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .to(
          content,
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section bg-monolith-dark z-40 flex items-center justify-center"
    >
      <div className="vignette" />
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-4xl px-[6vw]"
      >
        <span className="font-mono text-xs uppercase tracking-wide text-monolith-muted block mb-4">
          Education & Experience
        </span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-monolith-text mb-12">
          Building My <span className="text-monolith-orange">Foundation</span>
        </h2>

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-8 border-b border-monolith-text/10">
            <div className="md:w-1/4">
              <span className="font-mono text-sm text-monolith-orange">2024 - 2028</span>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-display font-semibold text-xl text-monolith-text mb-1">
                Bachelor of Technology — Computer Science
              </h3>
              <p className="text-monolith-muted mb-2">Newton School of Technology, Pune</p>
              <p className="text-sm text-monolith-muted/70">Grade: 8.18/10.0</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-8 border-b border-monolith-text/10">
            <div className="md:w-1/4">
              <span className="font-mono text-sm text-monolith-orange">2020 - 2021</span>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-display font-semibold text-xl text-monolith-text mb-1">
                Class X (Matriculation)
              </h3>
              <p className="text-monolith-muted mb-2">Laxmi International School</p>
              <p className="text-sm text-monolith-muted/70">Grade: 91.8%</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
            <div className="md:w-1/4">
              <span className="font-mono text-sm text-monolith-orange">Activities</span>
            </div>
            <div className="md:w-3/4 space-y-3">
              <div>
                <h4 className="font-display font-medium text-monolith-text">E-Cell (Entrepreneurship Cell)</h4>
                <p className="text-sm text-monolith-muted">Participated in workshops and events to learn about startups and business plans.</p>
              </div>
              <div>
                <h4 className="font-display font-medium text-monolith-text">Robotics Club</h4>
                <p className="text-sm text-monolith-muted">Worked with a team on building robots, applying classroom knowledge to solve problems.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const index = indexRef.current;
    const cta = ctaRef.current;
    const sub = subRef.current;
    const socials = socialsRef.current;

    if (!section || !index || !cta || !sub || !socials) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.7,
        },
      });

      // Index animation
      scrollTl
        .fromTo(
          index,
          { y: '-4vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .to(
          index,
          { opacity: 0, ease: 'power2.in' },
          0.7
        );

      // CTA animation
      scrollTl
        .fromTo(
          cta,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .to(
          cta,
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

      // Sub + email animation
      scrollTl
        .fromTo(
          sub,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        )
        .to(
          sub,
          { y: '3vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

      // Socials animation
      scrollTl
        .fromTo(
          socials,
          { x: '8vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.18
        )
        .to(
          socials,
          { x: '4vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('meet.kumar01@adypu.edu.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="pinned-section bg-monolith-dark z-50"
    >
      <div className="vignette" />

      <div
        ref={indexRef}
        className="absolute left-[6vw] top-[10vh]"
      >
        <span className="font-mono text-xs uppercase tracking-wide text-monolith-muted block mb-2">
          02 / Connect
        </span>
        <span className="font-mono text-sm text-monolith-text">
          Available for Opportunities
        </span>
      </div>

      <h2
        ref={ctaRef}
        className="absolute left-[6vw] top-[34vh] font-display font-bold text-display tracking-tight text-monolith-text"
      >
        Let's Work <span className="text-monolith-orange">Together</span>
      </h2>

      <div
        ref={subRef}
        className="absolute left-[6vw] top-[48vh] space-y-6"
      >
        <p className="font-mono text-sm text-monolith-muted">
          Have a project in mind? Let's discuss.
        </p>
        <button
          onClick={copyEmail}
          className="flex items-center gap-3 px-6 py-3 bg-monolith-orange text-white rounded-full font-mono text-sm hover:bg-monolith-orange/90 transition-colors"
        >
          <Mail className="w-4 h-4" />
          meet.kumar01@adypu.edu.in
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <p className="font-mono text-xs text-monolith-muted">
          Phone: +91 92054 23828
        </p>
      </div>

      <div
        ref={socialsRef}
        className="absolute right-[6vw] bottom-[10vh] text-right"
      >
        <span className="font-mono text-xs uppercase tracking-wide text-monolith-muted block mb-3">
          Links
        </span>
        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/Meet00028"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-monolith-text hover:text-monolith-orange transition-colors link-underline flex items-center justify-end gap-2"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/meetkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-monolith-text hover:text-monolith-orange transition-colors link-underline flex items-center justify-end gap-2"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/Meet00028"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-monolith-text hover:text-monolith-orange transition-colors link-underline flex items-center justify-end gap-2"
          >
            <Code2 className="w-4 h-4" /> LeetCode
          </a>
        </div>
      </div>
    </section>
  );
}

// Footer Section
function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const divider = dividerRef.current;
    const columns = columnsRef.current;

    if (!section || !divider || !columns) return;

    const ctx = gsap.context(() => {
      // Divider animation
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Columns animation
      const columnElements = columns.querySelectorAll('.footer-column');
      columnElements.forEach((col, i) => {
        gsap.fromTo(
          col,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative bg-monolith-dark z-[5] py-[8vh] px-[6vw]"
    >
      <div
        ref={dividerRef}
        className="hairline mb-[8vh]"
      />

      <div
        ref={columnsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
      >
        <div className="footer-column">
          <span className="font-mono text-xs uppercase tracking-wide text-monolith-muted block mb-4">
            Navigation
          </span>
          <div className="flex flex-col gap-2">
            {['Home', 'Projects', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-sm text-monolith-text hover:text-monolith-orange transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <span className="font-mono text-xs uppercase tracking-wide text-monolith-muted block mb-4">
            Social
          </span>
          <div className="flex flex-col gap-2">
            {[
              { name: 'GitHub', url: 'https://github.com/Meet00028' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/meetkumar' },
              { name: 'LeetCode', url: 'https://leetcode.com/u/Meet00028' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-monolith-text hover:text-monolith-orange transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <span className="font-mono text-xs uppercase tracking-wide text-monolith-muted block mb-4">
            Tech Stack
          </span>
          <div className="flex flex-col gap-2">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'].map((item) => (
              <span
                key={item}
                className="font-mono text-sm text-monolith-text"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-[10vh] pt-[4vh] border-t border-monolith-text/10">
        <span className="font-mono text-xs text-monolith-muted">
          © 2024 Meet Kumar. All Rights Reserved.
        </span>
        <span className="font-mono text-xs text-monolith-muted mt-2 md:mt-0">
          Built with React, TypeScript & Passion
        </span>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  useEffect(() => {
    // Global snap for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <WorksSection />
        <ManifestoSection />
        <SpotlightSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
