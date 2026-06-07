export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  overview: string;
  problem: string;
  objectives: string[];
  mathTheory: {
    title: string;
    description: string;
    equations: string[];
  };
  implementation: {
    tech: string[];
    algorithms: string[];
    details: string;
  };
  results: {
    metrics: { label: string; value: string }[];
    summary: string;
  };
  challenges: string[];
  futureWork: string[];
  githubUrl?: string;
  externalUrl?: string;
}

export interface ResearchPaper {
  title: string;
  authors: string[];
  publication: string;
  date: string;
  zenodoUrl: string;
  abstract: string;
  motivation: string;
  keyFindings: string[];
  citation: {
    apa: string;
    ieee: string;
    bibtex: string;
  };
  futureResearch: string[];
}

export interface Achievement {
  title: string;
  type: string; // "Academic" | "Award" | "Olympiad"
  description: string;
  highlight: boolean;
  verifyUrl?: string;
}

export interface Certification {
  category: string;
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
}
