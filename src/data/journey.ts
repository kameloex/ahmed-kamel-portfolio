// src/data/journey.ts
// Typed structure for professional experience, training, freelance work, and academic milestones.
// Awaiting user-confirmed dates and verified details. No invented data or graduation years.

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  organization: string;
  summary: string;
  type: "academic" | "experience" | "training" | "initiative";
  verified: boolean;
}

// Left as an empty typed structure until Ahmed supplies confirmed dates and roles.
export const journeyMilestones: JourneyMilestone[] = [];
